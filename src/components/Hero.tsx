'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  imageSrc?: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
}

export default function Hero({
  imageSrc,
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
    <section className="hero-shell relative overflow-hidden">
      <div className="hero-shell__stars hero-shell__stars--1" aria-hidden="true" />
      <div className="hero-shell__stars hero-shell__stars--2" aria-hidden="true" />
      <div className="hero-shell__stars hero-shell__stars--3" aria-hidden="true" />
      <div className="hero-shell__glow hero-shell__glow--left" />
      <div className="hero-shell__glow hero-shell__glow--right" />

      <div className="hero-video-banner">
        {imageSrc ? (
          <Image
            className="hero-video-media"
            src={imageSrc}
            alt={locale === 'he' ? 'ישיבת אורחות חיים' : 'Orchot Chaim Yeshiva'}
            fill
            priority
          />
        ) : (
          <video
            className="hero-video-media"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/building.jpg"
            aria-label={locale === 'he' ? 'הסרטה על ישיבת אורחות חיים' : 'A video about Orchot Chaim Yeshiva'}
          >
            <source src="/images/students-main-vidioe.MOV" />
          </video>
        )}
        <div className="hero-video-shade" />
        <div className="hero-video-copy container">
          <div className="hero-video-content">
            <p className="hero-kicker hero-landing-reveal hero-landing-reveal--1">
              {displayEyebrow}
            </p>
            <h1 className="hero-landing-reveal hero-landing-reveal--2">
              {locale === 'he' ? 'אורחות חיים' : 'Orchot Chaim'}
            </h1>
            <p className="hero-video-title hero-landing-reveal hero-landing-reveal--3">
              {locale === 'he'
                ? 'ממשיכים את הברכה של ר׳ חיים קנייבסקי'
                : 'Continuing the blessing of Rabbi Chaim Kanievsky'}
            </p>
            <p className="hero-video-subtitle">{displaySubheadline}</p>

            <div className="hero-video-actions hero-landing-reveal hero-landing-reveal--4">
              <Link href={`/${locale}/donate`} className="btn-accent">
                {t('cta')}
              </Link>
            </div>
          </div>

          <a href="#homepage-content" className="hero-scroll-cue" aria-label={locale === 'he' ? 'גלו עוד' : 'Discover more'}>
            <span className="hero-scroll-cue__arrow">↓</span>
            <span>{locale === 'he' ? 'גלו עוד' : 'Discover more'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
