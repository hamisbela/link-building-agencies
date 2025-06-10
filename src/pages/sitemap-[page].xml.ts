import type { APIRoute } from 'astro';
import { generateSitemapEntries, chunkSitemapEntries, createSitemapXML } from '../utils/sitemap';

export async function getStaticPaths() {
  const baseUrl = 'https://linkbuildingagencies.com';
  const entries = await generateSitemapEntries(baseUrl);
  const chunks = chunkSitemapEntries(entries, 200);
  
  return chunks.map((chunk, index) => ({
    params: { page: (index + 1).toString() },
    props: { entries: chunk }
  }));
}

interface Props {
  entries: any[];
}

export const GET: APIRoute = async ({ props }) => {
  const { entries } = props as Props;
  const sitemap = createSitemapXML(entries);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};