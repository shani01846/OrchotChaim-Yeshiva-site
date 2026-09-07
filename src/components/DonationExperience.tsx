'use client';

import AnimatedNumber from '@/components/AnimatedNumber';
import { motion } from 'framer-motion';
import { type CSSProperties, type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DonationsChart = dynamic(() => import('./DonationsChart'), { ssr: false });

type DonationExperienceProps = {
  locale: string;
};

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  drift: number;
  duration: number;
  delay: number;
};

const presetAmounts = [90, 180, 360, 720, 1500, 3000];

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(value);
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-item ${className}`.trim()}>
      {children}
    </div>
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`,
      transition: 'transform 0.18s ease-out',
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.28s ease-out',
    });
  };

  return (
    <div
      className={`tilt-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={tiltStyle}
    >
      {children}
    </div>
  );
}

export default function DonationExperience({ locale }: DonationExperienceProps) {
  const isHebrew = locale === 'he';
  const [selectedAmount, setSelectedAmount] = useState(360);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.5,
        drift: 8 + Math.random() * 18,
        duration: 10 + Math.random() * 16,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setPointer({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const impactSummary = useMemo(() => {
    const students = Math.max(4, Math.round(selectedAmount / 18));
    const meals = Math.max(18, Math.round(selectedAmount * 1.7));
    const learningHours = Math.max(12, Math.round(selectedAmount / 12));

    return { students, meals, learningHours };
  }, [selectedAmount]);

  // Accessibility: expose current amount to assistive tech
  const amountLiveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (amountLiveRef.current) {
      amountLiveRef.current.textContent = formatCurrency(selectedAmount, locale);
    }
  }, [selectedAmount, locale]);

  const statCards = [
    {
      value: 1200,
      suffix: '+',
      label: isHebrew ? 'שעות לימוד' : 'Study hours',
      prefix: '',
      duration: 1.8,
    },
    {
      value: 84,
      suffix: '%',
      label: isHebrew ? 'תמיכה חודשית' : 'Monthly support',
      prefix: '',
      duration: 1.6,
    },
    {
      value: 260,
      suffix: '+',
      label: isHebrew ? 'משפחות' : 'Families',
      prefix: '',
      duration: 1.9,
    },
  ];

  return (
    <main className="donation-page-shell">
      <section className="donation-hero section-spacing">
        <div className="donation-particles" aria-hidden="true">
          {particles.map((particle) => {
            const shiftX = (pointer.x - 50) * (particle.drift / 10);
            const shiftY = (pointer.y - 50) * (particle.drift / 10);

            return (
              <span
                key={particle.id}
                className="donation-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                  transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
              />
            );
          })}
        </div>

        <div className="container donation-hero__inner">
          <ScrollReveal className="donation-copy">
            <p className="section-tag">{isHebrew ? 'תרומה' : 'Support'}</p>
            <h2 className="donation-heading">
              {isHebrew ? 'בנו יחד את העתיד של תורה, קהילה ומחויבות' : 'Build the future of learning, community, and purpose'}
            </h2>
            <p className="donation-subcopy">
              {isHebrew
                ? 'תרומתכם מעניקה יציבות למערכת הלימודית, מעודדת תלמידים להמשיך ולהצליח, ומסייעת ליצירת סביבה תומכת ועתידית.'
                : 'Your contribution creates stability for the learning framework, supports students in their growth, and strengthens a lasting foundation for the yeshiva.'}
            </p>

            <div className="donation-mini-actions">
              <button type="button" className="btn-accent">
                {isHebrew ? 'הצטרפו עכשיו' : 'Join now'}
              </button>
              <button type="button" className="btn-secondary">
                {isHebrew ? 'שאלו אותנו' : 'Ask a question'}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal className="donation-form-wrap">
            <TiltCard className="donation-amount-panel">
              <div className="donation-panel__header">
                <div>
                  <p className="donation-panel__eyebrow">{isHebrew ? 'תרומה חודשית' : 'Monthly giving'}</p>
                  <h3>{formatCurrency(selectedAmount, locale)}</h3>
                </div>
                <span className="donation-badge">{isHebrew ? 'השפעה ישירה' : 'Direct impact'}</span>
              </div>

              <div className="donation-slider-wrap">
                <label className="donation-label" htmlFor="donation-range">
                  {isHebrew ? 'בחרו סכום' : 'Choose amount'}
                </label>
                <input
                  id="donation-range"
                  type="range"
                  min={50}
                  max={5000}
                  step={25}
                  value={selectedAmount}
                    onChange={(event) => setSelectedAmount(Number(event.target.value))}
                  className="donation-range"
                  aria-label={isHebrew ? 'בחרו סכום תרומה' : 'Choose donation amount'}
                />

                  <div aria-hidden="true" className="visually-hidden" ref={amountLiveRef} />

                <div className="donation-range-scale">
                  <span>{isHebrew ? '₪50' : '$50'}</span>
                  <span>{isHebrew ? '₪5,000' : '$5,000'}</span>
                </div>
              </div>

              <div className="donation-preset-grid">
                {presetAmounts.map((amount) => (
                  <div key={amount} className="p-1">
                    <button
                      type="button"
                      className={`donation-chip w-full justify-center ${selectedAmount === amount ? 'is-active' : ''}`}
                      onClick={() => setSelectedAmount(amount)}
                      onPointerDown={(e) => (e.currentTarget.classList.add('is-pressed'))}
                      onPointerUp={(e) => (e.currentTarget.classList.remove('is-pressed'))}
                      onPointerCancel={(e) => (e.currentTarget.classList.remove('is-pressed'))}
                      aria-pressed={selectedAmount === amount}
                    >
                      {formatCurrency(amount, locale)}
                    </button>
                  </div>
                ))}
              </div>

              <div className="donation-summary-grid">
                <div className="donation-impact-box">
                  <span>{isHebrew ? 'תלמידים' : 'Students'}</span>
                  <strong>{impactSummary.students}</strong>
                </div>
                <div className="donation-impact-box">
                  <span>{isHebrew ? 'ארוחות' : 'Meals'}</span>
                  <strong>{impactSummary.meals}</strong>
                </div>
                <div className="donation-impact-box">
                  <span>{isHebrew ? 'שעות לימוד' : 'Learning hours'}</span>
                  <strong>{impactSummary.learningHours}</strong>
                </div>
              </div>
              <div className="mt-6">
                <DonationsChart locale={locale} />
              </div>

                <button type="button" className="btn-primary donation-submit">
                  {isHebrew ? 'המשך לתשלום' : 'Continue to payment'}
                </button>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal className="text-center mb-12">
            <p className="section-tag">{isHebrew ? 'ההשפעה' : 'Impact'}</p>
            <h2>{isHebrew ? 'מספרים שמדברים' : 'Numbers that tell the story'}</h2>
          </ScrollReveal>

          <div className="impact-stat-grid">
            {statCards.map((stat, index) => (
              <ScrollReveal key={stat.label} className="impact-stat-card">
                <div className="impact-stat-card__value">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={stat.duration}
                    delay={index * 0.12}
                    locale={locale}
                  />
                </div>
                <p>{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-light">
        <div className="container">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
            <p className="section-tag">{isHebrew ? 'למה לתרום' : 'Why give'}</p>
            <h2>{isHebrew ? 'כל תרומה מייצרת שינוי אמיתי' : 'Every contribution creates real change'}</h2>
          </ScrollReveal>

          <div className="donation-feature-grid">
            {[
              {
                title: isHebrew ? 'למידה איכותית' : 'Quality learning',
                description: isHebrew
                  ? 'התרומה מספקת משאבים, חומרי לימוד, ותמיכה שוטפת לחיי הלמידה היומיומיים.'
                  : 'Funding provides educational resources, learning materials, and steady support for daily study life.',
              },
              {
                title: isHebrew ? 'סביבה תומכת' : 'A supportive environment',
                description: isHebrew
                  ? 'תמיכה קבועה מאפשרת יציבות, תחושת ביטחון, ושקט תכנוני עבור התלמידים והקהילה.'
                  : 'Regular support creates stability, reassurance, and a stronger everyday environment for students and the community.',
              },
              {
                title: isHebrew ? 'עתיד של תורה' : 'A future rooted in Torah',
                description: isHebrew
                  ? 'כל תרומה היא השקעה בדור הבא, במעגל של תורה, אחריות, וקשר עמוק לקהילה.'
                  : 'Every gift invests in the next generation and in a future shaped by Torah, responsibility, and community.',
              },
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} className="feature-card donation-feature-card">
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.1 }}>
                  <div className="feature-icon">{index + 1}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
