'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/name-Yeshiva/1.JPG',
  '/images/name-Yeshiva/2.jpg',
  '/images/name-Yeshiva/3.JPG',
  '/images/name-Yeshiva/4.JPG',
  '/images/name-Yeshiva/5.JPG',
  '/images/name-Yeshiva/6.JPG',
  '/images/name-Yeshiva/7.JPG',
];

export default function GedoleiYisraelGallery({ isHebrew }: { isHebrew: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="gedolei-gallery" aria-labelledby="gedolei-gallery-title">
      <div className="gedolei-gallery__heading">
        <p className="section-tag">{isHebrew ? 'מורשת והשראה' : 'Legacy and inspiration'}</p>
        <h2 id="gedolei-gallery-title">{isHebrew ? 'גדולי ישראל בישיבה' : 'Gedolei Yisrael at the yeshiva'}</h2>
        <p>
          {isHebrew
            ? 'רגעים של תורה, ברכה וקשר שממשיכים להאיר את דרכה של הישיבה.'
            : 'Moments of Torah, blessing, and connection that continue to illuminate the yeshiva.'}
        </p>
      </div>

      <div className="gedolei-gallery__stage">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={isHebrew ? `גדולי ישראל בישיבה ${index + 1}` : `Gedolei Yisrael at the yeshiva ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 72vw"
            priority={index === 0}
            className={`gedolei-gallery__main-image ${activeIndex === index ? 'is-active' : ''}`}
          />
        ))}
        <div className="gedolei-gallery__stage-shade" />
        <div className="gedolei-gallery__counter">
          <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
          <span>/ 07</span>
        </div>
      </div>

      <div className="gedolei-gallery__thumbs" role="tablist" aria-label={isHebrew ? 'בחירת תמונה' : 'Choose image'}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={isHebrew ? `הצג תמונה ${index + 1}` : `Show image ${index + 1}`}
            className={`gedolei-gallery__thumb ${activeIndex === index ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={src} alt="" fill sizes="120px" />
          </button>
        ))}
      </div>
    </section>
  );
}
