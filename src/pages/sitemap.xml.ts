import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { LANGUAGES, defaultLanguage } from '../utils/i18n';

export const GET: APIRoute = async () => {
  const [serviceInfoEntries, blogPosts, pages, devices, apps, iptvServices] = await Promise.all([
    getCollection('service-info'),
    getCollection('blog').catch(() => []),
    getCollection('pages').catch(() => []),
    getCollection('devices').catch(() => []),
    getCollection('apps').catch(() => []),
    getCollection('iptv-services').catch(() => []),
  ]);

  const serviceInfo = serviceInfoEntries[0];
  const baseURL = serviceInfo?.data?.siteUrl || 'https://example.com';
  const enabledLanguages = serviceInfo?.data?.languages?.enabled || [defaultLanguage];
  const nonDefaultLangs = enabledLanguages.filter((lang: string) => lang !== defaultLanguage);

  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/pricing', priority: 0.9, changefreq: 'monthly' },
    { url: '/features', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/apps', priority: 0.7, changefreq: 'monthly' },
    { url: '/devices', priority: 0.7, changefreq: 'monthly' },
    { url: '/iptv', priority: 0.7, changefreq: 'monthly' },
    { url: '/reviews', priority: 0.7, changefreq: 'monthly' },
    { url: '/free-trial', priority: 0.8, changefreq: 'monthly' },
    { url: '/installation-guides', priority: 0.6, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.4, changefreq: 'yearly' },
    { url: '/terms', priority: 0.4, changefreq: 'yearly' },
    { url: '/refund-policy', priority: 0.4, changefreq: 'yearly' },
    { url: '/acceptable-use', priority: 0.4, changefreq: 'yearly' },
    { url: '/gdpr-compliance', priority: 0.4, changefreq: 'yearly' },
    { url: '/dmca', priority: 0.4, changefreq: 'yearly' },
  ];

  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
    lastmod: (post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0],
  }));

  const pageUrls = pages.map(page => ({
    url: `/${page.data.slug}/`,
    priority: 0.6,
    changefreq: 'monthly' as const,
  }));

  const deviceUrls = devices.map(device => ({
    url: `/devices/${device.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  }));

  const appUrls = apps.map(app => ({
    url: `/apps/${app.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  }));

  const iptvUrls = iptvServices.map(service => ({
    url: `/iptv/${service.id}/`,
    priority: 0.8,
    changefreq: 'monthly' as const,
  }));

  const defaultLangUrls = [
    ...staticPages.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...blogUrls,
    ...pageUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...deviceUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...appUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...iptvUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
  ];

  const localizedUrls: typeof defaultLangUrls = [];
  for (const lang of nonDefaultLangs) {
    for (const page of staticPages) {
      localizedUrls.push({
        url: `/${lang}${page.url === '/' ? '' : page.url}`,
        priority: page.priority * 0.9,
        changefreq: page.changefreq as 'weekly' | 'monthly' | 'yearly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
    for (const post of blogPosts) {
      localizedUrls.push({
        url: `/${lang}/blog/${post.id}/`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: (post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0],
      });
    }
    for (const device of devices) {
      localizedUrls.push({
        url: `/${lang}/devices/${device.id}/`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
    for (const app of apps) {
      localizedUrls.push({
        url: `/${lang}/apps/${app.id}/`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
    for (const service of iptvServices) {
      localizedUrls.push({
        url: `/${lang}/iptv/${service.id}/`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
  }

  const allUrls = [...defaultLangUrls, ...localizedUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    item => `  <url>
    <loc>${baseURL}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
