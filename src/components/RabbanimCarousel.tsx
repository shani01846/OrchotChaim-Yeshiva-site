'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import RabbiCard from '@/components/RabbiCard';
import type { Rabbi } from '@/data/rabbanim';

type RabbanimCarouselProps = {
  rabbanim: Rabbi[];
};

export default function RabbanimCarousel({ rabbanim }: RabbanimCarouselProps) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const filteredRabbanim = useMemo(
    () => rabbanim.filter((rabbi) => `${rabbi.name} ${rabbi.title} ${rabbi.biography}`.includes(query)),
    [query, rabbanim],
  );
  const selectedRabbi = selectedId
    ? filteredRabbanim.find((rabbi) => rabbi.id === selectedId) ?? filteredRabbanim[0]
    : undefined;

  return (
    <div className="rabbanim-carousel">
      <div className="rabbanim-search">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="חיפוש"
          aria-label="חיפוש רבנים"
        />
        <span aria-hidden="true">⌕</span>
      </div>
      <div className="rabbanim-carousel__workspace">
        <div
          className="rabbanim-carousel__rail"
          ref={railRef}
          tabIndex={0}
          aria-label="רבני הישיבה"
          onWheel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const distance = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
            event.currentTarget.scrollLeft += distance;
          }}
        >
          <div className="rabbanim-carousel__track">
            <div className="rabbanim-carousel__group">
              {filteredRabbanim.map((rabbi, index) => (
                <RabbiCard
                  key={rabbi.id}
                  rabbi={rabbi}
                  index={index}
                  isSelected={rabbi.id === selectedRabbi?.id}
                  onSelect={() => setSelectedId(rabbi.id)}
                />
              ))}
            </div>
            <div className="rabbanim-carousel__group" aria-hidden="true">
              {filteredRabbanim.map((rabbi, index) => (
                <RabbiCard
                  key={`${rabbi.id}-duplicate`}
                  rabbi={rabbi}
                  index={index}
                  isSelected={rabbi.id === selectedRabbi?.id}
                  isDuplicate
                  onSelect={() => setSelectedId(rabbi.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {filteredRabbanim.length === 0 && <p className="rabbanim-carousel__empty">לא נמצאו תוצאות</p>}
      {selectedRabbi && (
        <>
          <button className="rabbanim-detail-backdrop" type="button" onClick={() => setSelectedId(null)} aria-label="סגירת פרטי הרב" />
          <aside className="rabbanim-detail" aria-live="polite">
            <button className="rabbanim-detail__close" type="button" onClick={() => setSelectedId(null)} aria-label="סגירת פרטי הרב">×</button>
            <div className="rabbanim-detail__image-wrap">
              <Image src={selectedRabbi.image} alt={selectedRabbi.alt} fill className="rabbanim-detail__image" sizes="min(520px, 92vw)" />
            </div>
            <div className="rabbanim-detail__content">
              <p className="rabbanim-detail__eyebrow">{selectedRabbi.title}</p>
              <h2>{selectedRabbi.name}</h2>
              <p className="rabbanim-detail__years">{selectedRabbi.years}</p>
              <div className="rabbanim-detail__rule" />
              <h3>תולדותיו</h3>
              <p>{selectedRabbi.biography}</p>
              <h3>חיבוריו</h3>
              <ul>
                {selectedRabbi.works.map((work) => <li key={work}>{work}</li>)}
              </ul>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}