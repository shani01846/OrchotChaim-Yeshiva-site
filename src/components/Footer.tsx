'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  const navItems = [
    { href: '', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/students', label: t('students') },
    { href: '/rabbanim', label: locale === 'he' ? 'רבני הישיבה' : 'Rabbanim' },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-accent">
              ישיבת ארחות חיים
            </h3>
            <p className="text-gray-300">
              {locale === 'he'
                ? 'ישיבה המתמקדת בלמידת תורה עם יחס אישי עמוק'
                : 'A yeshiva focused on Torah learning with deep personal mentorship'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">
              {locale === 'he' ? 'קישורים מהירים' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href ? `/${locale}${item.href}` : `/${locale}`}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">
              {locale === 'he' ? 'יצירת קשר' : 'Contact'}
            </h4>
            <p className="text-gray-300 mb-2">02-6426587</p>
            <p className="text-gray-300">
              {locale === 'he' ? 'ירושלים' : 'Jerusalem, Israel'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Yeshivat Orchot Chaim. All rights
              reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href={`/${locale}/privacy`} className="hover:text-white">
                {locale === 'he' ? 'פרטיות' : 'Privacy'}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-white">
                {locale === 'he' ? 'תנאי שימוש' : 'Terms'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
