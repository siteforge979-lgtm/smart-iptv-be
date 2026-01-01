import { LANGUAGES, defaultLanguage, type LanguageCode } from './i18n';

export interface PageRoute {
  slug: string;
  component: string;
}

export const PAGE_ROUTES: PageRoute[] = [
  { slug: '', component: 'index' },
  { slug: 'pricing', component: 'pricing' },
  { slug: 'features', component: 'features' },
  { slug: 'faq', component: 'faq' },
  { slug: 'contact', component: 'contact' },
  { slug: 'free-trial', component: 'free-trial' },
  { slug: 'reviews', component: 'reviews' },
  { slug: 'installation-guides', component: 'installation-guides' },
  { slug: 'privacy', component: 'privacy' },
  { slug: 'terms', component: 'terms' },
  { slug: 'refund-policy', component: 'refund-policy' },
  { slug: 'acceptable-use', component: 'acceptable-use' },
  { slug: 'gdpr-compliance', component: 'gdpr-compliance' },
  { slug: 'dmca', component: 'dmca' },
  { slug: 'checkout', component: 'checkout' },
  { slug: 'thank-you', component: 'thank-you' },
  { slug: 'blog', component: 'blog/index' },
  { slug: 'apps', component: 'apps/index' },
  { slug: 'devices', component: 'devices/index' },
];

export function localizedHref(path: string, currentLang: LanguageCode): string {
  if (currentLang === defaultLanguage) return path;
  const cleanPath = path === '/' ? '' : path;
  return `/${currentLang}${cleanPath}`;
}

export function getLocalizedStaticPaths() {
  const paths: { params: { lang: string; segments: string | undefined } }[] = [];
  
  const nonDefaultLanguages = Object.keys(LANGUAGES).filter(
    lang => lang !== defaultLanguage
  ) as LanguageCode[];
  
  for (const lang of nonDefaultLanguages) {
    for (const route of PAGE_ROUTES) {
      paths.push({
        params: {
          lang,
          segments: route.slug || undefined,
        },
      });
    }
  }
  
  return paths;
}

export function getRouteComponent(segments: string | undefined): string {
  const slug = segments || '';
  const route = PAGE_ROUTES.find(r => r.slug === slug);
  return route?.component || 'index';
}
