import type { APIRoute } from 'astro';
import { generateSitemapEntries, createSitemapXML } from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://linkbuildingagencies.com';
  const entries = await generateSitemapEntries(baseUrl);
  
  // If we have more than 200 entries, create paginated sitemaps
  if (entries.length > 200) {
    // This will redirect to sitemap index
    return new Response('', {
      status: 301,
      headers: {
        Location: '/sitemap-index.xml'
      }
    });
  }
  
  const sitemap = createSitemapXML(entries);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};