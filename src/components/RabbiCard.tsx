import Image from 'next/image';
import type { Rabbi } from '@/data/rabbanim';

type RabbiCardProps = {
  rabbi: Rabbi;
  index: number;
  isSelected: boolean;
  isDuplicate?: boolean;
  onSelect: () => void;
};

export default function RabbiCard({ rabbi, index, isSelected, isDuplicate = false, onSelect }: RabbiCardProps) {
  const headingId = `rabbi-${rabbi.id}${isDuplicate ? '-duplicate' : ''}`;

  return (
    <article
      className={`rabbi-card${isSelected ? ' is-selected' : ''}`}
      tabIndex={isDuplicate ? -1 : 0}
      role="button"
      aria-pressed={isSelected}
      aria-hidden={isDuplicate}
      aria-labelledby={headingId}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="rabbi-card__image-wrap">
        <Image
          src={rabbi.image}
          alt={rabbi.alt}
          fill
          sizes="(max-width: 700px) 82vw, (max-width: 1100px) 45vw, 31vw"
          className="rabbi-card__image"
          priority={index < 2}
        />
        <span className="rabbi-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="rabbi-card__body">
        <h2 id={headingId}>{rabbi.name}</h2>
        <p className="rabbi-card__title">{rabbi.title}</p>
      </div>
    </article>
  );
}