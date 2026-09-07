type ImpactCard = {
  symbol: string;
  label: string;
  value: string;
  detail: string;
};

export default function DonationsChart({ locale = 'en' }: { locale?: string }) {
  const isHebrew = locale === 'he';
  const cards: ImpactCard[] = isHebrew
    ? [
        { symbol: 'ת', label: 'תורה', value: '120+', detail: 'שעות לימוד בחודש' },
        { symbol: 'ב', label: 'בית', value: '84', detail: 'ארוחות של יציבות' },
        { symbol: 'ע', label: 'עתיד', value: '40+', detail: 'תלמידים בדרך שלהם' },
      ]
    : [
        { symbol: 'T', label: 'Torah', value: '120+', detail: 'learning hours each month' },
        { symbol: 'H', label: 'Home', value: '84', detail: 'meals that create stability' },
        { symbol: 'F', label: 'Future', value: '40+', detail: 'students finding their path' },
      ];

  return (
    <section className="donation-impact-wall" aria-labelledby="donation-wall-title">
      <div className="donation-impact-wall__topline">
        <div>
          <p className="donation-impact-wall__kicker">{isHebrew ? 'הכסף שלך בתנועה' : 'Your gift in motion'}</p>
          <h3 id="donation-wall-title">{isHebrew ? 'כך נראית השפעה' : 'This is what impact looks like'}</h3>
        </div>
        <span className="donation-impact-wall__stamp">{isHebrew ? 'שותפים' : 'PARTNERS'}</span>
      </div>

      <p className="donation-impact-wall__intro">
        {isHebrew
          ? 'התרומה שלך אינה רק מספר. היא הופכת ללימוד, לבית ולכיוון עבור תלמידים.'
          : 'Your donation is more than a number. It becomes learning, home, and direction for students.'}
      </p>

      <div className="donation-impact-wall__cards">
        {cards.map((card, index) => (
          <article className={`donation-impact-card donation-impact-card--${index + 1}`} key={card.label}>
            <div className="donation-impact-card__symbol" aria-hidden="true">{card.symbol}</div>
            <div className="donation-impact-card__content">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <small>{card.detail}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="donation-impact-wall__signature">
        <span className="donation-impact-wall__signature-line" />
        <span>{isHebrew ? 'בונים את הדור הבא יחד' : 'Building the next generation together'}</span>
        <span className="donation-impact-wall__signature-line" />
      </div>
    </section>
  );
}
