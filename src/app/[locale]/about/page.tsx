'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: { locale: string };
}

type Stat = {
  value: string;
  label: string;
  detail: string;
};

export default function AboutPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let locked = false;
    const sections = Array.from(rail.querySelectorAll<HTMLElement>('.about-frame'));
    sections[0]?.classList.add('is-active');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-active');
        });
      },
      { root: rail, threshold: 0.58 }
    );

    sections.forEach((section) => revealObserver.observe(section));

    const move = (direction: number) => {
      if (locked) return;
      const current = Math.round(rail.scrollLeft / Math.max(rail.clientWidth, 1));
      const next = Math.max(0, Math.min(sections.length - 1, current + direction));
      if (next === current) return;
      locked = true;
      rail.scrollTo({ left: sections[next].offsetLeft, behavior: 'smooth' });
      window.setTimeout(() => { locked = false; }, 720);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 10) return;
      event.preventDefault();
      move(event.deltaY > 0 ? 1 : -1);
    };

    rail.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      rail.removeEventListener('wheel', onWheel);
      revealObserver.disconnect();
    };
  }, []);

  const stats: Stat[] = isHebrew
    ? [
        { value: '500+', label: 'תלמידים', detail: 'כל אחד מקבל מקום, קול וליווי אישי' },
        { value: '20', label: 'שנות תורה', detail: 'מסורת שנבנית יום אחרי יום' },
        { value: '24/7', label: 'קהילה חיה', detail: 'בית של לימוד, אחריות וחברותא' },
      ]
    : [
        { value: '500+', label: 'Students', detail: 'Each one receives attention and guidance' },
        { value: '20', label: 'Years of Torah', detail: 'A tradition built day after day' },
        { value: '24/7', label: 'Living community', detail: 'A home of learning and belonging' },
      ];

  return (
    <div className="about-page">
      <Header />
      <div className="about-rail" ref={railRef} dir="ltr">
        <section className="about-frame about-frame--opening">
          <Image src="/images/students-2.jpg" alt={isHebrew ? 'תלמידים בבית המדרש' : 'Students in the study hall'} fill priority className="about-frame__media" />
          <div className="about-frame__veil" />
          <div className="about-frame__content about-frame__content--center">
            <p className="about-overline">{isHebrew ? 'אודות אורחות חיים' : 'About Orchot Chaim'}</p>
            <h1>{isHebrew ? 'בונים את הבית שבו גדלים' : 'Building the home where people grow'}</h1>
            <p>{isHebrew ? 'תורה, קשר אישי וחיים של משמעות — במסע אחד מתמשך.' : 'Torah, personal connection, and a life of meaning in one unfolding journey.'}</p>
            <Link href={`/${locale}/donate`} className="about-round-cta">{isHebrew ? 'להיות שותף' : 'Join us'}</Link>
          </div>
          <div className="about-frame__index">01 <span>/ 06</span></div>
        </section>

        <section className="about-frame about-frame--statement">
          <div className="about-frame__content about-frame__content--split">
            <div>
              <p className="about-overline">{isHebrew ? 'הסיפור שלנו' : 'Our story'}</p>
              <h2>{isHebrew ? 'ישיבה היא לא רק מקום ללמוד בו' : 'A yeshiva is more than a place to study'}</h2>
            </div>
            <div className="about-frame__copy">
              <p>{isHebrew ? 'אורחות חיים נולדה מתוך אמונה פשוטה: תלמיד גדל כאשר רואים אותו באמת. כאן הלימוד פוגש את האדם, והאדם לומד להפוך את התורה לדרך חיים.' : 'Orchot Chaim was born from a simple belief: a student grows when he is truly seen. Here learning meets the person, and Torah becomes a way of life.'}</p>
              <Link href={`/${locale}/contact`} className="about-text-link">{isHebrew ? 'להכיר את הדרך ←' : 'Meet the approach →'}</Link>
            </div>
          </div>
          <div className="about-frame__index">02 <span>/ 06</span></div>
        </section>

        <section className="about-frame about-frame--numbers">
          <div className="about-frame__content">
            <p className="about-overline">{isHebrew ? 'במספרים' : 'By the numbers'}</p>
            <h2>{isHebrew ? 'המספרים הם רק ההתחלה' : 'The numbers are only the beginning'}</h2>
            <div className="about-stat-row">
              {stats.map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-frame__index">03 <span>/ 06</span></div>
        </section>

        <section className="about-frame about-frame--video">
          <video className="about-frame__media" autoPlay muted loop playsInline preload="metadata" poster="/images/building.jpg" aria-label={isHebrew ? 'חיי הישיבה' : 'Yeshiva life'}>
            <source src="/images/students-main-vidioe.MOV" />
          </video>
          <div className="about-frame__veil about-frame__veil--strong" />
          <div className="about-frame__content about-frame__content--bottom">
            <p className="about-overline">{isHebrew ? 'יום יום' : 'Every day'}</p>
            <h2>{isHebrew ? 'קול התורה. הקשר. התנועה קדימה.' : 'The sound of Torah. Connection. Moving forward.'}</h2>
            <p>{isHebrew ? 'החיים בישיבה נבנים מהרגעים הקטנים: חברותא, שיחה, שיעור, וסעודה משותפת.' : 'Yeshiva life is built from the small moments: study partners, conversations, lessons, and shared meals.'}</p>
          </div>
          <div className="about-frame__play-label">{isHebrew ? 'הסרטה חיה' : 'Live story'} <span>●</span></div>
          <div className="about-frame__index">04 <span>/ 06</span></div>
        </section>

        <section className="about-frame about-frame--gallery">
          <div className="about-frame__content about-frame__content--gallery">
            <div>
              <p className="about-overline">{isHebrew ? 'האנשים' : 'The people'}</p>
              <h2>{isHebrew ? 'כל פנים מספרות סיפור' : 'Every face carries a story'}</h2>
              <p>{isHebrew ? 'קהילה נבנית מאנשים שמגיעים מכל מקום, לומדים יחד, וממשיכים לשאת את הברכה הלאה.' : 'A community is built by people who come together, learn together, and carry the blessing forward.'}</p>
            </div>
            <div className="about-gallery-grid">
              <div><Image src="/images/students-1.jpg" alt="" fill className="about-gallery-image" /></div>
              <div><Image src="/images/students-3.jpg" alt="" fill className="about-gallery-image" /></div>
              <div><Image src="/images/students-4.JPG" alt="" fill className="about-gallery-image" /></div>
            </div>
          </div>
          <div className="about-frame__index">05 <span>/ 06</span></div>
        </section>

        <section className="about-frame about-frame--donate">
          <div className="about-frame__content about-frame__content--center">
            <p className="about-overline">{isHebrew ? 'השותפות שלכם' : 'Your partnership'}</p>
            <h2>{isHebrew ? 'הפרק הבא נכתב יחד' : 'The next chapter is written together'}</h2>
            <p>{isHebrew ? 'הצטרפו למסע של תורה, צמיחה ובניית בית אמיתי לדור הבא.' : 'Join a journey of Torah, growth, and building a true home for the next generation.'}</p>
            <Link href={`/${locale}/donate`} className="about-donate-button">{isHebrew ? 'לתרומה ולשותפות' : 'Give and join'}</Link>
          </div>
          <div className="about-frame__index">06 <span>/ 06</span></div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
