'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HomepageScrollExperienceProps = {
  isHebrew: boolean;
};

const panels = [
  { image: '/images/students-1.jpg', tone: 'sand' },
  { image: '/images/students-3.jpg', tone: 'blue' },
  { image: '/images/building.jpg', tone: 'gold' },
  { image: '/images/students-5.JPG', tone: 'night' },
];

export default function HomepageScrollExperience({ isHebrew }: HomepageScrollExperienceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.homepage-scroll-experience__panel').forEach((panel, index) => {
        const image = panel.querySelector<HTMLElement>('[data-horizontal-parallax]');
        const copy = panel.querySelector<HTMLElement>('[data-horizontal-copy]');
        if (image) {
          gsap.to(image, {
            xPercent: index % 2 === 0 ? 8 : -8,
            rotate: index % 2 === 0 ? 2 : -2,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        }
        if (copy) {
          gsap.fromTo(copy, { y: 50, opacity: 0 }, {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left 85%',
              end: 'left 45%',
              scrub: true,
            },
          });
        }
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    return () => {
      window.removeEventListener('resize', refresh);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="homepage-scroll-experience" aria-label={isHebrew ? 'מסע בין רגעי הישיבה' : 'A journey through yeshiva life'}>
      <div className="homepage-scroll-experience__viewport">
        <div ref={trackRef} className="homepage-scroll-experience__track">
          {panels.map((panel, index) => (
            <article className={`homepage-scroll-experience__panel homepage-scroll-experience__panel--${panel.tone}`} key={panel.image}>
              <div className="homepage-scroll-experience__shape" aria-hidden="true" />
              <div className="homepage-scroll-experience__copy" data-horizontal-copy>
                <span>{String(index + 1).padStart(2, '0')} / 04</span>
                <h2>
                  {isHebrew
                    ? ['תורה שחיה בכל יום', 'אנשים שבונים קהילה', 'בית שמכין את העתיד', 'הברכה שממשיכה הלאה'][index]
                    : ['Torah lived every day', 'People building community', 'A home for the future', 'A blessing carried forward'][index]}
                </h2>
                <p>
                  {isHebrew
                    ? ['לימוד עמוק, חברותא וקול תורה שממלא את הבית.', 'קשר אישי וקהילה שמכירה כל תלמיד בשמו.', 'מרחב חדש לצמיחה, אחריות וחיים של משמעות.', 'הצטרפו למסע שמחבר בין דורות של תורה.'][index]
                    : ['Deep learning, study partners, and a house filled with Torah.', 'Personal connection and a community that knows every student.', 'A new space for growth, responsibility, and meaning.', 'Join a journey connecting generations of Torah.'][index]}
                </p>
              </div>
              <div className="homepage-scroll-experience__image-wrap" data-horizontal-parallax>
                <Image src={panel.image} alt="" fill sizes="(max-width: 768px) 82vw, 48vw" className="homepage-scroll-experience__image" />
              </div>
            </article>
          ))}
        </div>
        <div className="homepage-scroll-experience__hint" aria-hidden="true">
          <span>{isHebrew ? 'גללו כדי לגלות' : 'Scroll to discover'}</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
