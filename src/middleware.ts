import createMiddleware from 'next-intl/middleware';

const locales = ['he', 'en'];
const defaultLocale = 'he';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
