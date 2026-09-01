'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface HeroProps {
  imageSrc?: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
}

export default function Hero({
  imageSrc = 'https://images.unsplash.com/photo-1507842308343-583f20270319?w=1440&h=600&fit=crop',
  headline,
  subheadline,
  eyebrow,
}: HeroProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  const displayHeadline = headline || t('headline');
  const displaySubheadline = subheadline || t('subheadline');
  const displayEyebrow = eyebrow || (locale === 'he' ? 'ישיבת ארחות חיים' : 'Yeshivat Orchot Chaim');

  return (
    <section className="relative w-full h-[520px] md:h-[640px] overflow-hidden">
      <Image
        src={imageSrc}
        alt="Hero background"
        fill
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/30" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative h-full flex items-center">
        <div className="container">
          <div className="max-w-2xl text-white">
            <p className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm mb-6">
              {displayEyebrow}
            </p>
            <h1 className="mb-5">{displayHeadline}</h1>
            <p className="max-w-xl text-lg md:text-xl text-white/90 mb-8">
              {displaySubheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/donate`} className="btn-accent">
                {t('cta')}
              </Link>
              <Link href={`/${locale}/about`} className="btn-secondary border-white text-white hover:bg-white/10 hover:text-white">
                {locale === 'he' ? 'להכיר את הישיבה' : 'Meet the yeshiva'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
