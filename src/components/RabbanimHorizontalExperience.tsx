'use client';

import type { ReactNode, WheelEvent } from 'react';
import Link from 'next/link';

type RabbanimHorizontalExperienceProps = {
  isHebrew: boolean;
  children: ReactNode;
};

const navigationItems = [
  { href: '/about', he: 'על הישיבה', en: 'About the yeshiva' },
  { href: '/students', he: 'עולם התלמידים', en: 'Student life' },
  { href: '/building', he: 'בית המדרש', en: 'The building' },
  { href: '/news', he: 'חדשות ועדכונים', en: 'News and updates' },
  { href: '/contact', he: 'צור קשר', en: 'Contact us' },
  { href: '/donate', he: 'תרומה לישיבה', en: 'Support the yeshiva' },
];

export default function RabbanimHorizontalExperience({ isHebrew, children }: RabbanimHorizontalExperienceProps) {
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const distance = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (distance === 0) return;

    event.preventDefault();
    event.currentTarget.scrollLeft += distance;
  };

  return (
    <div className="rabbanim-horizontal-page">
      <div className="rabbanim-fixed-background" aria-hidden="true" />
      <div className="rabbanim-horizontal-scroll" onWheel={handleWheel}>
        <section className="rabbanim-horizontal-slide rabbanim-horizontal-slide--directory" aria-labelledby="rabbanim-directory-title">
          {children}
          <nav className="rabbanim-side-navigation" aria-label={isHebrew ? 'ניווט באתר' : 'Site navigation'}>
            {navigationItems.map((item, index) => (
              <Link key={item.href} href={item.href} className="rabbanim-side-navigation__link">
                <span className="rabbanim-side-navigation__number">0{index + 1}</span>
                <span>{isHebrew ? item.he : item.en}</span>
                <span aria-hidden="true">←</span>
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}