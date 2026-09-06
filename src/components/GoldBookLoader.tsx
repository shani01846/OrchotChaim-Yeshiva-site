import React from 'react';

type GoldBookLoaderProps = {
  visible?: boolean;
  ariaLabel?: string;
};

export default function GoldBookLoader({ visible = true, ariaLabel = 'Loading' }: GoldBookLoaderProps) {
  // Render loader only for route transitions (visible=true). When visible=false, return null.
  if (!visible) return null;

  return (
    <div className="gold-book-loader" role="status" aria-label={ariaLabel}>
      <div className="loader" aria-hidden="true">
        <div className="book">
          <div className="page" />
          <div className="page page2" />
        </div>
      </div>
    </div>
  );
}
