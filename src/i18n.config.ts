import { getRequestConfig } from 'next-intl/server';

export const locales = ['he', 'en'] as const;
export const defaultLocale = 'he' as const;

export default getRequestConfig(async ({ locale }) => {
  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Messages for locale ${locale} not found, using default`);
    messages = (await import('./messages/he.json')).default;
  }

  return {
    messages,
  };
});
