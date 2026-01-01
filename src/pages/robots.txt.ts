import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const serviceInfoEntries = await getCollection('service-info');
  const serviceInfo = serviceInfoEntries[0];
  const baseURL = serviceInfo?.data?.siteUrl || 'https://example.com';

  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /.well-known/
Disallow: /thank-you

Sitemap: ${baseURL}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
