import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: { locale: string };
}

export default function NewsPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  const articles = [
    {
      slug: 'new-learning-cycle',
      title: isHebrew ? 'מחזור לימודי חדש נפתח' : 'A new learning cycle is opening',
      excerpt: isHebrew
        ? 'הישיבה פותחת מחזור לימודי חדש, עם תכנית עשירה יותר, קבוצה מחודשת, ויותר מקום להעמקת לימוד אישית.'
        : 'The yeshiva is opening a new learning cycle with a richer study plan, a refreshed cohort, and more room for deep personal learning.',
      image: '/images/students-1.jpg',
      date: '12 באוקטובר 2026',
    },
    {
      slug: 'community-evening',
      title: isHebrew ? 'ערב קהילה בישיבה' : 'Community evening at the yeshiva',
      excerpt: isHebrew
        ? 'במהלך הערב התקיימו הרצאות, שיח בין תלמידים, ואווירה חמה שמחזקת את תחושת השייכות.'
        : 'The event included talks, student discussions, and a warm atmosphere that strengthened the sense of belonging.',
      image: '/images/students-2.jpg',
      date: '2 בנובמבר 2026',
    },
    {
      slug: 'building-progress',
      title: isHebrew ? 'התקדמות הפרויקט בבנייה' : 'Building project progress',
      excerpt: isHebrew
        ? 'אנו ממשיכים לקדם את חזון הבניין החדש, עם הכנה לקראת שלב הבא של המגרש והפנים.'
        : 'We continue advancing the building vision with preparations for the next phase of the campus and internal spaces.',
      image: '/images/building.jpg',
      date: '19 בנובמבר 2026',
    },
  ];

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'חדשות' : 'News'}
        headline={isHebrew ? 'עדכונים מהישיבה' : 'Updates from the yeshiva'}
        subheadline={
          isHebrew
            ? 'מעקב אחר החיים, הלמידה והחזון של הישיבה — לקראת עתיד מלא משמעות.'
            : 'A look at the life, learning, and vision of the yeshiva as it grows toward a meaningful future.'
        }
        imageSrc="/images/building.jpg"
      />

      <main>
        <section className="section-spacing bg-light">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <>
                <p className="section-tag">{isHebrew ? 'העדכונים האחרונים' : 'Latest updates'}</p>
                <h2>{isHebrew ? 'מה קורה כאן עכשיו' : 'What is happening here now'}</h2>
              </>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-3">
              {articles.map((article, index) => (
                <ScrollReveal key={article.slug} delay={index * 0.08}>
                  <article className="news-card">
                    <div className="news-card__image">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                    <div className="news-card__content">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary/70">{article.date}</p>
                      <h3 className="mb-3 text-2xl">{article.title}</h3>
                      <p className="mb-5">{article.excerpt}</p>
                      <Link href={`/${locale}`} className="inline-flex items-center gap-2 font-bold text-primary">
                        {isHebrew ? 'קרא עוד' : 'Read more'}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
