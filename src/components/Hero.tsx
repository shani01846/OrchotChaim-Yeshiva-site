'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedNumber from '@/components/AnimatedNumber';

interface HeroProps {
  imageSrc?: string;
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
}

export default function Hero({
  imageSrc = '/images/building.jpg',
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

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative z-10 max-w-2xl text-white"
          >
            <p className="hero-badge">{displayEyebrow}</p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="mb-5 text-balance"
            >
              {displayHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="max-w-xl text-lg text-white/85 md:text-xl"
            >
              {displaySubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link href={`/${locale}/donate`} className="btn-accent">
                {t('cta')}
              </Link>
              <Link href={`/${locale}/about`} className="btn-secondary border-white text-white hover:bg-white/10 hover:text-white">
                {locale === 'he' ? 'להכיר את הישיבה' : 'Meet the yeshiva'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="hero-stat-grid mt-10"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02, rotateX: 4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="hero-stat"
              >
                <strong>
                  <AnimatedNumber value={40} suffix="+" duration={1.4} delay={0.2} locale={locale} />
                </strong>
                <span>{locale === 'he' ? 'תלמידים' : 'Students'}</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -8, scale: 1.02, rotateX: 4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="hero-stat"
              >
                <strong>
                  <AnimatedNumber value={15} suffix="+" duration={1.5} delay={0.35} locale={locale} />
                </strong>
                <span>{locale === 'he' ? 'שנים' : 'Years'}</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -8, scale: 1.02, rotateX: 4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="hero-stat"
              >
                <strong>
                  <AnimatedNumber value={100} suffix="%" duration={1.7} delay={0.5} locale={locale} />
                </strong>
                <span>{locale === 'he' ? 'תמיכה אישית' : 'Personal care'}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="hero-visual">
              <motion.div whileHover={{ scale: 1.02, rotate: 0.2 }} className="video-shell">
                <Image
                  src={imageSrc}
                  alt={locale === 'he' ? 'ישיבת ארחות חיים' : 'Orchot Chaim Yeshiva'}
                  fill
                  priority
                  className="video-frame object-cover"
                />
                <div className="video-overlay" />
                <div className="video-badge">
                  {locale === 'he' ? 'למידה • קהילה • תורה' : 'Learning • Community • Torah'}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className="floating-card floating-card--top"
              >
                <span className="floating-card__label">{locale === 'he' ? 'לימוד חודשי' : 'Monthly study'}</span>
                <strong>{locale === 'he' ? 'מסלול אישי' : 'Personal path'}</strong>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className="floating-card floating-card--bottom"
              >
                <span className="floating-card__label">{locale === 'he' ? 'קהילה' : 'Community'}</span>
                <strong>{locale === 'he' ? 'חיים של תורה' : 'Life of Torah'}</strong>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
