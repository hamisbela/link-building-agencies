import type { APIRoute } from 'astro';
import { generateSitemapEntries, chunkSitemapEntries, createSitemapIndexXML } from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://linkbuildingagencies.com';
  const entries = await generateSitemapEntries(baseUrl);
  const chunks = chunkSitemapEntries(entries, 200);
  
  const sitemapIndex = createSitemapIndexXML(baseUrl, chunks.length);
  
  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};