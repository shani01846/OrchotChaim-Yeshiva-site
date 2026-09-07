'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type YeshivaNewsTickerProps = {
  isHebrew: boolean;
  locale: string;
};

type TickerItem = {
  icon: string;
  label: string;
  text: string;
  tone: 'gold' | 'blue' | 'rose';
};

export default function YeshivaNewsTicker({ isHebrew, locale }: YeshivaNewsTickerProps) {
  const [isHidden, setIsHidden] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - previousScrollY.current;

      if (currentScrollY <= 12 || distance < -8) setIsHidden(false);
      else if (distance > 8) setIsHidden(true);

      previousScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items: TickerItem[] = isHebrew
    ? [
        { icon: '🍼', label: 'מזל טוב', text: 'שמחת ברית לנכד ראש הישיבה', tone: 'gold' },
        { icon: '📜', label: 'אירוע', text: 'סיום מסכת חגיגי בבית המדרש', tone: 'blue' },
        { icon: '🍏', label: 'הודעה', text: 'שנה טובה ומתתוקה לידידי הישיבה', tone: 'rose' },
        { icon: '✦', label: 'מהנעשה', text: 'שיעור מיוחד עם ראש הישיבה השבוע', tone: 'gold' },
      ]
    : [
        { icon: '💍', label: 'Mazal tov', text: 'Simchah Brit for the Rosh Yeshiva\'s grandson', tone: 'gold' },
        { icon: '📜', label: 'Event', text: 'A festive siyum in the study hall', tone: 'blue' },
        { icon: '🍏', label: 'Announcement', text: 'Shana Tova and a sweet new year to our yeshiva family', tone: 'rose' },
        { icon: '✦', label: 'This week', text: 'A special shiur with the Rosh Yeshiva', tone: 'gold' },
      ];

  const repeatedItems = [...items, ...items];

  return (
    <section className={`yeshiva-ticker${isHidden ? ' is-hidden' : ''}`} aria-label={isHebrew ? 'חדשות ומזל טוב' : 'Yeshiva news and Mazal Tov'} dir="ltr">
      <div className="container">
        <div className="yeshiva-ticker__glass">
          <div className="yeshiva-ticker__heading" dir={isHebrew ? 'rtl' : 'ltr'}>
            <span className="yeshiva-ticker__live-dot" aria-hidden="true" />
            <span>{isHebrew ? 'חדשות ומזל טוב' : 'News & Mazal Tov'}</span>
          </div>
          <div className="yeshiva-ticker__viewport" tabIndex={0}>
            <div className="yeshiva-ticker__track">
              {repeatedItems.map((item, index) => (
                <Link
                  href={`/${locale}/news`}
                  className={`yeshiva-ticker__item yeshiva-ticker__item--${item.tone}`}
                  dir={isHebrew ? 'rtl' : 'ltr'}
                  key={`${item.label}-${index}`}
                  aria-hidden={index >= items.length}
                  tabIndex={index >= items.length ? -1 : 0}
                >
                  <span className="yeshiva-ticker__icon" aria-hidden="true">{item.icon}</span>
                  <span className="yeshiva-ticker__copy">
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
