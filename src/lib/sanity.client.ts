import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';

const isValidSanityProjectId = (value?: string) => Boolean(value && /^[a-z0-9-]+$/.test(value));
const isValidSanityDataset = (value?: string) => Boolean(value && /^[a-zA-Z0-9_-]+$/.test(value));

const hasSanityConfig = isValidSanityProjectId(projectId) && isValidSanityDataset(dataset);

if (!hasSanityConfig) {
  console.warn('Sanity env vars are missing. App will run in fallback mode without CMS content.');
}

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

export const sanityFetch = async (query: string, params?: Record<string, unknown>) => {
  if (!client) {
    return [];
  }

  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return [];
  }
};

const builder = client ? imageUrlBuilder(client) : null;

export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    return '';
  }
  return builder.image(source);
};
