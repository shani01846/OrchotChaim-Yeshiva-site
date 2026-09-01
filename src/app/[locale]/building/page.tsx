import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Link from 'next/link';

interface PageProps {
  params: { locale: string };
}

export default function BuildingPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  const milestones = [
    {
      title: isHebrew ? 'מטרת הבנייה' : 'Project purpose',
      text: isHebrew
        ? 'הבניין החדש יהיה בית לקהילה, ללימוד, ולצמיחה רוחנית של הדור הבא.'
        : 'The new building will become a home for community, study, and spiritual growth of the next generation.',
    },
    {
      title: isHebrew ? 'המרחב הפנימי' : 'The learning environment',
      text: isHebrew
        ? 'חדרי לימוד, עמידה בקבוצות, ופינות מחשבה המיועדות לדיון ולגדילה.'
        : 'Study rooms, learning spaces, and areas that support deeper discussion and growth.',
    },
    {
      title: isHebrew ? 'המרחב החברתי' : 'The communal space',
      text: isHebrew
        ? 'מקום לשיח, כינוסים, ותמיכה רוחנית שמחזקת את חווית הישיבה בכללה.'
        : 'A place for gathering, connection, and spiritual support that strengthens the whole yeshiva experience.',
    },
  ];

  const stats = [
    { value: '3', label: isHebrew ? 'שלבי תכנון' : 'Planning stages' },
    { value: '1', label: isHebrew ? 'מגרש מרכזי' : 'Main campus' },
    { value: '100%', label: isHebrew ? 'חזון רחב יותר' : 'Future vision' },
  ];

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'הפרויקט' : 'The project'}
        headline={isHebrew ? 'בניין שמקבל את העתיד' : 'A building that welcomes the future'}
        subheadline={
          isHebrew
            ? 'הבית החדש של הישיבה נועד לאפשר למידה, קהילה, ומסגרת יציבה לגדילה של הדור הבא.'
            : 'The new home of the yeshiva is designed to create a stable, meaningful environment for study, community, and the next generation.'
        }
        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=800&fit=crop"
      />

      <main>
        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'החזון' : 'The vision'}</p>
              <h2>{isHebrew ? 'בית ליישוב, לימוד, וקהילה' : 'A home for learning, connection, and growth'}</h2>
            </div>

            <div className="stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-number">{stat.value}</span>
                  <span className="mt-3 block text-primary font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container split-grid">
            <div>
              <p className="section-tag">{isHebrew ? 'למה זה חשוב' : 'Why it matters'}</p>
              <h2>{isHebrew ? 'הבית החדש יאפשר קצב חדש' : 'The new home will create a new rhythm'}</h2>
              <p className="mb-4">
                {isHebrew
                  ? 'בניין חדש אינו רק מבנה — הוא מסגרת שמאפשרת לכל תלמיד להרגיש שהוא שייך, יכול ללמוד בשקט, ולצמוח מתוך בית חם ומכבד.'
                  : 'A new building is not just a structure — it is a framework that allows each student to feel rooted, focused, and supported in a warm environment.'}
              </p>
              <p>
                {isHebrew
                  ? 'המדידה של ההצלחות היא לא רק בממדים הפיזיים, אלא בסביבה הרוחנית, החברתית והמחנכת שנבנה סביבם.'
                  : 'Its true success is measured not only by physical size, but by the spiritual and communal environment it creates.'}
              </p>
            </div>

            <div className="image-panel">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=700&fit=crop"
                alt={isHebrew ? 'הבית החדש' : 'The new building'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'שלבי תכנון' : 'Project plan'}</p>
              <h2>{isHebrew ? 'מה ייכלל במקום' : 'What the space will include'}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {milestones.map((item) => (
                <div key={item.title} className="feature-card">
                  <div className="feature-icon">✦</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-primary text-white">
          <div className="container text-center">
            <p className="section-tag light-tag">{isHebrew ? 'תמיכה' : 'Support'}</p>
            <h2 className="text-white mb-6">{isHebrew ? 'בואו להפוך את החזון למציאות' : 'Help turn the vision into reality'}</h2>
            <p className="max-w-2xl mx-auto text-white/85 mb-8">
              {isHebrew
                ? 'הבניין הוא חלק מהמסר הכולל של הישיבה — תחושת בית, מסגרת, והכנה לעתיד טהור ומכבד.'
                : 'This building is part of the yeshiva’s larger mission: creating a place of belonging, learning, and a meaningful future.'}
            </p>
            <Link href={`/${locale}/donate`} className="btn-accent">
              {isHebrew ? 'תרמו לפרויקט' : 'Support the project'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
