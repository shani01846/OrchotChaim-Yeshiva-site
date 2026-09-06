'use client';

import { useEffect, useRef } from 'react';

export default function MarqueeGallery({ images = [], height = 120 }: { images?: string[]; height?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Duplicate children to create seamless loop
    const wrappers = Array.from(el.querySelectorAll('.marquee-track'));
    wrappers.forEach((track) => {
      const clone = track.cloneNode(true) as HTMLElement;
      track.parentElement?.appendChild(clone);
    });
  }, []);

  return (
    <div ref={ref} className="marquee-gallery" aria-hidden="true" style={{ height }}>
      <div className="marquee-track track-a">
        {images.map((src, i) => (
          <div key={`a-${i}`} className="marquee-item"><img src={src} alt="" loading="lazy" /></div>
        ))}
      </div>
      <div className="marquee-track track-b">
        {images.map((src, i) => (
          <div key={`b-${i}`} className="marquee-item"><img src={src} alt="" loading="lazy" /></div>
        ))}
      </div>
    </div>
  );
}
