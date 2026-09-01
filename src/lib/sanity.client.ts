import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';

if (!projectId || !dataset) {
  throw new Error('Missing Sanity project ID or dataset');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const sanityFetch = async (query: string, params?: Record<string, unknown>) => {
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
};

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
