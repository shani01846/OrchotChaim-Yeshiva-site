'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Create three layers using the CSS box-shadow technique for cheap stars
    const stars = document.createElement('div');
    stars.id = 'stars';
    const stars2 = document.createElement('div');
    stars2.id = 'stars2';
    const stars3 = document.createElement('div');
    stars3.id = 'stars3';

    stars.setAttribute('aria-hidden', 'true');
    stars2.setAttribute('aria-hidden', 'true');
    stars3.setAttribute('aria-hidden', 'true');

    el.appendChild(stars);
    el.appendChild(stars2);
    el.appendChild(stars3);

    return () => {
      if (el.contains(stars)) el.removeChild(stars);
      if (el.contains(stars2)) el.removeChild(stars2);
      if (el.contains(stars3)) el.removeChild(stars3);
    };
  }, []);

  return <div ref={containerRef} className="starfield-root" aria-hidden="true" />;
}
