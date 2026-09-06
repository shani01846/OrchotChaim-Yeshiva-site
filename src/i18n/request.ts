import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  return {
    locale: locale || 'he',
    messages: (await import(`../messages/${locale || 'he'}.json`)).default,
  };
});
