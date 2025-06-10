import { getLocationPages, generateLocationSlug } from './csvLoader';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export async function generateSitemapEntries(baseUrl: string): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Add main pages
  const mainPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' as const },
    { url: 'about', priority: '0.8', changefreq: 'monthly' as const },
    { url: 'contact', priority: '0.8', changefreq: 'monthly' as const },
  ];

  mainPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.url ? `/${page.url}` : ''}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Add location pages
  const locations = await getLocationPages();
  locations.forEach(location => {
    const slug = generateLocationSlug(location);
    entries.push({
      url: `${baseUrl}/${slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: location.type === 'city' ? '0.9' : '0.8'
    });
  });

  return entries;
}

export function createSitemapXML(entries: SitemapEntry[]): string {
  const urlset = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

export function chunkSitemapEntries(entries: SitemapEntry[], chunkSize: number = 200): SitemapEntry[][] {
  const chunks: SitemapEntry[][] = [];
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize));
  }
  return chunks;
}

export function createSitemapIndexXML(baseUrl: string, sitemapCount: number): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemaps = Array.from({ length: sitemapCount }, (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${i + 1}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}