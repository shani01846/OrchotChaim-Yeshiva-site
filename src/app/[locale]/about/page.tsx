import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Link from 'next/link';

interface PageProps {
  params: { locale: string };
}

export default function AboutPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  const values = [
    {
      title: isHebrew ? 'לימוד אמיתי' : 'Genuine Learning',
      text: isHebrew
        ? 'לא לימוד לשם פרסום, אלא לימוד שמעמיק את האדם, מחזק את הערכים ומעצים את דרך החיים.'
        : 'Not learning for appearances, but learning that deepens the person and strengthens their values and way of life.',
    },
    {
      title: isHebrew ? 'יחס אישי' : 'Personal Attention',
      text: isHebrew
        ? 'כל תלמיד נלמד מתוך הכרה, הקשבה והתאמה אישית — לא רק ברמת הלימוד, אלא גם ברמת המדרגה האישית.'
        : 'Each student is known, listened to, and guided as a person, not only as a learner.',
    },
    {
      title: isHebrew ? 'קהילתיות' : 'Community',
      text: isHebrew
        ? 'אווירת הישיבה היא סביבה חמה, מחבקת, ומחזקת — מקום של חיי תורה, אחריות, וערבות הדדית.'
        : 'The yeshiva atmosphere is warm, supportive, and deeply rooted in mutual responsibility and belonging.',
    },
  ];

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'אודות הישיבה' : 'About the Yeshiva'}
        headline={isHebrew ? 'ישיבה שמבנית חיים' : 'A yeshiva that builds lives'}
        subheadline={
          isHebrew
            ? 'הישיבה נבנית על אהבת תורה, אחריות, יחס אישי, וערבות הדדית שמעצבת את הדור הבא.'
            : 'The yeshiva is built on love of Torah, responsibility, personal attention, and mutual commitment to the next generation.'
        }
        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=800&fit=crop"
      />

      <main>
        <section className="section-spacing bg-white">
          <div className="container split-grid">
            <div>
              <p className="section-tag">{isHebrew ? 'החזון' : 'Our vision'}</p>
              <h2>{isHebrew ? 'לימוד תורה עם שורשים עמוקים' : 'Torah learning with deep roots'}</h2>
              <p className="mb-4">
                {isHebrew
                  ? 'בישיבת ארחות חיים אנו מאמינים כי למידה אמיתית אינה מסתכמת רק בידע, אלא נוצרת מתוך קשר פנימי, חריצות, והבנה של התורה כחיים.'
                  : 'At Yeshivat Orchot Chaim, we believe that true learning is not only knowledge — it grows from connection, commitment, and the understanding that Torah is life.'}
              </p>
              <p>
                {isHebrew
                  ? 'המסגרת מכוונת ליצור תהליך של גדילה לכל תלמיד: למידה איכותית, חיזוק האופי, והכנה לעשייה משמעותית בחיים.'
                  : 'The framework is designed to foster growth in every student: meaningful learning, character development, and preparation for life with purpose.'}
              </p>
            </div>

            <div className="image-panel">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=700&fit=crop"
                alt={isHebrew ? 'לימוד בישיבה' : 'Learning at the yeshiva'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'הערכים' : 'Our values'}</p>
              <h2>{isHebrew ? 'מה מניע את המקום' : 'What drives the place'}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((item) => (
                <div key={item.title} className="card feature-panel">
                  <div className="feature-icon">✦</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'המסגרת' : 'The framework'}</p>
              <h2>{isHebrew ? 'מקום שבו הכל מתהדק לכיוון אחד' : 'A place where everything points in one direction'}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="feature-card">
                <h3>{isHebrew ? 'לימוד יומי' : 'Daily Study'}</h3>
                <p>{isHebrew ? 'תכנית לימוד מסודרת המשלבת עיון, תלמוד, ועמידה על עקרונות תורה.' : 'A structured daily learning plan combining study, review, and foundation-building.'}</p>
              </div>
              <div className="feature-card">
                <h3>{isHebrew ? 'הכוונה אישית' : 'Personal Guidance'}</h3>
                <p>{isHebrew ? 'רבנים ותלמידים עובדים יחד במטרה לעודד צמיחה, יושר, וכיוון.' : 'Rabbinic guidance helps students grow with clarity, integrity, and purpose.'}</p>
              </div>
              <div className="feature-card">
                <h3>{isHebrew ? 'יחס לקהילה' : 'Community Commitment'}</h3>
                <p>{isHebrew ? 'תלמידים משתלבים בסביבה תומכת, עם אחריות, כבוד, ושותפות.' : 'Students join a warm and responsible environment grounded in respect and partnership.'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-primary text-white">
          <div className="container text-center">
            <p className="section-tag light-tag">{isHebrew ? 'שיתופי פעולה' : 'Partnership'}</p>
            <h2 className="text-white mb-6">{isHebrew ? 'הישיבה זקוקה לשותפים' : 'The yeshiva needs partners'}</h2>
            <p className="max-w-2xl mx-auto text-white/85 mb-8">
              {isHebrew
                ? 'השלב הבא של הישיבה דורש סבלנות, תמיכה, והתמדה — וכל תרומה היא חלק מתהליך בניין העתיד.'
                : 'The next stage of the yeshiva requires support, patience, and dedication — and every contribution becomes part of building the future.'}
            </p>
            <Link href={`/${locale}/donate`} className="btn-accent">
              {isHebrew ? 'תרמו עכשיו' : 'Support now'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
