'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface PageProps {
  params: { locale: string };
}

export default function AboutPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';
  const snapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const snapContainer = snapRef.current;
    if (!snapContainer) return;

    const sections = Array.from(snapContainer.querySelectorAll('.about-section')) as HTMLElement[];
    if (!sections.length) return;

    let activeIndex = 0;
    let isAnimating = false;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const scrollToIndex = (index: number) => {
      const nextIndex = clamp(index, 0, sections.length - 1);
      const target = sections[nextIndex];
      if (!target) return;

      isAnimating = true;
      snapContainer.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth',
      });

      activeIndex = nextIndex;
      window.setTimeout(() => {
        isAnimating = false;
      }, 800);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12 || isAnimating) return;

      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      scrollToIndex(activeIndex + direction);
    };

    const onScroll = () => {
      const currentIndex = clamp(Math.round(snapContainer.scrollLeft / Math.max(snapContainer.clientWidth, 1)), 0, sections.length - 1);
      activeIndex = currentIndex;
    };

    snapContainer.addEventListener('wheel', onWheel, { passive: false });
    snapContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      snapContainer.removeEventListener('wheel', onWheel);
      snapContainer.removeEventListener('scroll', onScroll);
    };
  }, []);

  const values = [
    {
      title: isHebrew ? 'לימוד אמיתי' : 'Genuine Learning',
      text: isHebrew
        ? 'לא לימוד לשם פרסום, אלא לימוד שמעמיק את האדם, מחזק את הערכים ומעצים את דרך החיים.'
        : 'Not learning for appearances, but learning that deepens the person and strengthens their values and way of life.',
    },
    {
      title: isHebrew ? 'יחס אישי' : 'Personal Attention',
      text: isHebrew
        ? 'כל תלמיד נלמד מתוך הכרה, הקשבה והתאמה אישית — לא רק ברמת הלימוד, אלא גם ברמת המדרגה האישית.'
        : 'Each student is known, listened to, and guided as a person, not only as a learner.',
    },
    {
      title: isHebrew ? 'קהילתיות' : 'Community',
      text: isHebrew
        ? 'אווירת הישיבה היא סביבה חמה, מחבקת, ומחזקת — מקום של חיי תורה, אחריות, וערבות הדדית.'
        : 'The yeshiva atmosphere is warm, supportive, and deeply rooted in mutual responsibility and belonging.',
    },
  ];

  return (
    <>
      <Header />

      <div className="about-fullpage" ref={snapRef}>
        <section className="about-section">
          <Hero
            eyebrow={isHebrew ? 'אודות הישיבה' : 'About the Yeshiva'}
            headline={isHebrew ? 'ישיבה שמבנית חיים' : 'A yeshiva that builds lives'}
            subheadline={
              isHebrew
                ? 'הישיבה נבנית על אהבת תורה, אחריות, יחס אישי, וערבות הדדית שמעצבת את הדור הבא.'
                : 'The yeshiva is built on love of Torah, responsibility, personal attention, and mutual commitment to the next generation.'
            }
            imageSrc="/images/students-2.jpg"
          />
        </section>

        <section className="about-section bg-white">
          <div className="section-spacing h-full">
            <div className="container split-grid h-full items-center">
              <ScrollReveal disableGate>
                <div>
                  <p className="section-tag">{isHebrew ? 'החזון' : 'Our vision'}</p>
                  <h2>{isHebrew ? 'לימוד תורה עם שורשים עמוקים' : 'Torah learning with deep roots'}</h2>
                  <p className="mb-4">
                    {isHebrew
                      ? 'בישיבת ארחות חיים אנו מאמינים כי למידה אמיתית אינה מסתכמת רק בידע, אלא נוצרת מתוך קשר פנימי, חריצות, והבנה של התורה כחיים.'
                      : 'At Yeshivat Orchot Chaim, we believe that true learning is not only knowledge — it grows from connection, commitment, and the understanding that Torah is life.'}
                  </p>
                  <p>
                    {isHebrew
                      ? 'המסגרת מכוונת ליצור תהליך של גדילה לכל תלמיד: למידה איכותית, חיזוק האופי, והכנה לעשייה משמעותית בחיים.'
                      : 'The framework is designed to foster growth in every student: meaningful learning, character development, and preparation for life with purpose.'}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08} disableGate>
                <div className="page-visual-card h-full min-h-[420px]">
                  <Image src="/images/students-1.jpg" alt={isHebrew ? 'לימוד בישיבה' : 'Learning at the yeshiva'} fill className="object-cover" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="about-section bg-light">
          <div className="section-spacing h-full">
            <div className="container h-full">
              <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center" disableGate>
                <>
                  <p className="section-tag">{isHebrew ? 'הערכים' : 'Our values'}</p>
                  <h2>{isHebrew ? 'מה מניע את המקום' : 'What drives the place'}</h2>
                </>
              </ScrollReveal>

              <div className="page-feature-list">
                {values.map((item, index) => (
                  <ScrollReveal key={item.title} delay={index * 0.08} disableGate>
                    <div className="card feature-panel">
                      <div className="feature-icon">✦</div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-section bg-white">
          <div className="section-spacing h-full">
            <div className="container h-full">
              <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center" disableGate>
                <>
                  <p className="section-tag">{isHebrew ? 'המסגרת' : 'The framework'}</p>
                  <h2>{isHebrew ? 'מקום שבו הכל מתהדק לכיוון אחד' : 'A place where everything points in one direction'}</h2>
                </>
              </ScrollReveal>

              <div className="page-feature-list">
                {[
                  { title: isHebrew ? 'לימוד יומי' : 'Daily Study', text: isHebrew ? 'תכנית לימוד מסודרת המשלבת עיון, תלמוד, ועמידה על עקרונות תורה.' : 'A structured daily learning plan combining study, review, and foundation-building.' },
                  { title: isHebrew ? 'הכוונה אישית' : 'Personal Guidance', text: isHebrew ? 'רבנים ותלמידים עובדים יחד במטרה לעודד צמיחה, יושר, וכיוון.' : 'Rabbinic guidance helps students grow with clarity, integrity, and purpose.' },
                  { title: isHebrew ? 'יחס לקהילה' : 'Community Commitment', text: isHebrew ? 'תלמידים משתלבים בסביבה תומכת, עם אחריות, כבוד, ושותפות.' : 'Students join a warm and responsible environment grounded in respect and partnership.' },
                ].map((item, index) => (
                  <ScrollReveal key={item.title} delay={index * 0.08} disableGate>
                    <div className="feature-card">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-section bg-primary text-white">
          <div className="section-spacing h-full">
            <div className="container h-full flex items-center justify-center text-center">
              <ScrollReveal disableGate>
                <>
                  <p className="section-tag light-tag">{isHebrew ? 'שיתופי פעולה' : 'Partnership'}</p>
                  <h2 className="text-white mb-6">{isHebrew ? 'הישיבה זקוקה לשותפים' : 'The yeshiva needs partners'}</h2>
                  <p className="max-w-2xl mx-auto text-white/85 mb-8">
                    {isHebrew
                      ? 'השלב הבא של הישיבה דורש סבלנות, תמיכה, והתמדה — וכל תרומה היא חלק מתהליך בניין העתיד.'
                      : 'The next stage of the yeshiva requires support, patience, and dedication — and every contribution becomes part of building the future.'}
                  </p>
                  <Link href={`/${locale}/donate`} className="btn-accent">
                    {isHebrew ? 'תרמו עכשיו' : 'Support now'}
                  </Link>
                </>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
