'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

type HeaderProps = {
  overlay?: boolean;
};

export default function Header({ overlay = false }: HeaderProps) {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const otherLocale = locale === 'he' ? 'en' : 'he';

  const navItems = [
    { href: '', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/students', label: t('students') },
    { href: '/rabbanim', label: locale === 'he' ? 'רבני הישיבה' : 'Rabbanim' },
    { href: '/building', label: t('building') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-white/10 bg-[#0b1d2f]/80 backdrop-blur-xl${overlay ? ' site-header--overlay' : ''}`}>
      <div className="container header-layout flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="header-logo-link flex-shrink-0">
          <div className="header-logo">
            <div className="header-logo__mark">
              <Image
                src="/images/logo.png"
                alt="לוגו ישיבת ארחות חיים"
                width={58}
                height={58}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        <nav className="header-nav hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href ? `/${locale}${item.href}` : `/${locale}`}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions flex items-center gap-3">
          <Link href={`/${locale}/donate`} className="btn-primary hidden md:inline-block">
            {t('donate')}
          </Link>

          <Link
            href={`/${otherLocale}`}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            {otherLocale === 'he' ? 'עברית' : 'English'}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0b1d2f] md:hidden">
          <nav className="container space-y-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href ? `/${locale}${item.href}` : `/${locale}`}
                className="block rounded-xl px-4 py-3 text-white/85 hover:bg-white/5 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/donate`}
              className="block rounded-xl bg-accent px-4 py-3 font-bold text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('donate')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
