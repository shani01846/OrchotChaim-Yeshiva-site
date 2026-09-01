'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRTL = locale === 'he';

  const otherLocale = locale === 'he' ? 'en' : 'he';

  const navItems = [
    { href: '', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/students', label: t('students') },
    { href: '/building', label: t('building') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="text-2xl font-serif font-bold text-primary">
            ארחות חיים
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href ? `/${locale}${item.href}` : `/${locale}`}
              className="text-text hover:text-accent font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Language */}
        <div className="flex items-center gap-4">
          {/* Donation CTA */}
          <Link
            href={`/${locale}/donate`}
            className="btn-primary hidden md:inline-block"
          >
            {t('donate')}
          </Link>

          {/* Language Toggle */}
          <Link
            href={`/${otherLocale}`}
            className="px-3 py-2 text-sm font-medium text-primary hover:bg-light rounded transition-colors"
          >
            {otherLocale === 'he' ? 'עברית' : 'English'}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-light rounded"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href ? `/${locale}${item.href}` : `/${locale}`}
                className="block px-4 py-2 text-text hover:bg-light rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/donate`}
              className="block px-4 py-2 text-primary font-bold hover:bg-light rounded transition-colors"
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
