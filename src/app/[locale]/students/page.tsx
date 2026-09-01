import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: { locale: string };
}

export default function StudentsPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  const stories = [
    {
      slug: 'daniel',
      name: isHebrew ? 'דניאל' : 'Daniel',
      text: isHebrew
        ? 'הישיבה נתנה לי את ההזדמנות ללמוד עם מחשבה, עם עוצמה, ולחזק את חיי התורה בכל יום.'
        : 'The yeshiva gave me the chance to learn with depth, strength, and daily commitment to Torah life.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=700&fit=crop',
    },
    {
      slug: 'avraham',
      name: isHebrew ? 'אברהם' : 'Avraham',
      text: isHebrew
        ? 'היחס האישי והסביבה של הגרעין החברתי שינו לי את הדרך ואת ההבנה של תורה וחיים.'
        : 'The personal attention and community environment changed my path and my understanding of Torah and life.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop',
    },
    {
      slug: 'shimon',
      name: isHebrew ? 'שמעון' : 'Shimon',
      text: isHebrew
        ? 'התחלתי להרגיש את התורה לא רק כמשימה, אלא כנפילה פנימית של דרך חיים.'
        : 'I began to feel Torah not just as duty, but as a path that becomes part of life itself.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&h=700&fit=crop',
    },
  ];

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'תלמידים' : 'Students'}
        headline={isHebrew ? 'סיפורי דרך של תלמידים' : 'Student stories of growth'}
        subheadline={
          isHebrew
            ? 'הישיבה נוצרת מתוך אנשים, מסעות, וחוויות של חיבור לתורה ולחיים.'
            : 'The yeshiva is shaped by people, journeys, and lived experiences of connection to Torah and life.'
        }
        imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&h=800&fit=crop"
      />

      <main>
        <section className="section-spacing bg-light">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'המסע' : 'The journey'}</p>
              <h2>{isHebrew ? 'החוויות שעושות הבדל' : 'Experiences that make a difference'}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {stories.map((story) => (
                <Link key={story.slug} href={`/${locale}/students/${story.slug}`} className="story-card">
                  <div className="story-image-wrap">
                    <Image src={story.image} alt={story.name} fill className="object-cover" />
                  </div>
                  <div className="story-content">
                    <h3>{story.name}</h3>
                    <p>{story.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
