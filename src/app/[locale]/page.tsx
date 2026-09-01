import { sanityFetch } from '@/lib/sanity.client';
import { GET_HOMEPAGE, GET_STUDENT_STORIES, GET_TESTIMONIALS } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';

interface HomepageProps {
  params: { locale: string };
}

export default async function Homepage({ params }: HomepageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  let homepage = null;
  let stories = [];
  let testimonials = [];

  try {
    homepage = await sanityFetch(GET_HOMEPAGE);
    stories = await sanityFetch(GET_STUDENT_STORIES(6));
    testimonials = await sanityFetch(GET_TESTIMONIALS(5));
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
  }

  const featureCards = [
    {
      title: isHebrew ? 'לימוד איכותי' : 'Deep Learning',
      text: isHebrew
        ? 'תוכניות לימוד שמחברות בין תורה, חכמת ישראל והכנה לחיים של מסירות וערך.'
        : 'A learning environment that connects Torah, character, and purposeful life-building.',
    },
    {
      title: isHebrew ? 'יחס אישי' : 'Personal Mentorship',
      text: isHebrew
        ? 'כל תלמיד זוכה ליווי, הקשבה והכוונה — לא רק בשיעור, אלא גם בבניית הדרך.'
        : 'Each student is seen, guided, and supported with meaningful attention beyond the classroom.',
    },
    {
      title: isHebrew ? 'קהילה מחזקת' : 'Strong Community',
      text: isHebrew
        ? 'סביבה תומכת, ערכית ומחבקת — מקום שבו נבנה לא רק לימוד, אלא גם זהות.'
        : 'A warm, values-driven environment where students grow together in Torah and commitment.',
    },
  ];

  const pillarCards = [
    {
      title: isHebrew ? 'העולם של התורה' : 'The World of Torah',
      text: isHebrew
        ? 'שיעורים, עיון, ובניית יסודות חכמים, אמוניים ומעשיים.'
        : 'Study, review, and structured learning that forms strong Torah foundations.',
    },
    {
      title: isHebrew ? 'המסגרת האישית' : 'The Personal Framework',
      text: isHebrew
        ? 'הקשבה, הכוונה ותמיכה שמאפשרים לכל תלמיד לצמוח לפי יכולתו ודרכו.'
        : 'Individual guidance and support that helps each student grow with confidence and clarity.',
    },
    {
      title: isHebrew ? 'העתיד והשליחות' : 'Future and Mission',
      text: isHebrew
        ? 'הישיבה בונה דור של לומדים, מנהיגים וחיים עם משמעות, אהבת תורה וערבות.'
        : 'Our mission is to shape a generation of learners and leaders rooted in Torah and responsibility.',
    },
  ];

  const storyCards = stories.length > 0 ? stories.slice(0, 3) : [
    {
      _id: 'fallback-1',
      slug: 'story-1',
      firstName_he: 'דניאל',
      firstName_en: 'Daniel',
      openingLine_he: 'הישיבה נתנה לי מקום ללמוד, להתבגר ולחזק את חיי תורה.',
      openingLine_en: 'The yeshiva gave me a place to learn, grow, and strengthen my Torah life.',
      photo: { asset: { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?...' }, alt_he: 'תלמיד לומד', alt_en: 'Student learning' },
    },
    {
      _id: 'fallback-2',
      slug: 'story-2',
      firstName_he: 'אברהם',
      firstName_en: 'Avraham',
      openingLine_he: 'הקשר עם הרב והאווירה של הישיבה שינו לי את הדרך.',
      openingLine_en: 'The relationship with the rabbi and the yeshiva atmosphere changed my path.',
      photo: { asset: { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?...' }, alt_he: 'קבוצה לומדת', alt_en: 'Study group' },
    },
    {
      _id: 'fallback-3',
      slug: 'story-3',
      firstName_he: 'שמעון',
      firstName_en: 'Shimon',
      openingLine_he: 'התחלתי להרגיש את התורה לא רק כמחויבות, אלא כחיים.',
      openingLine_en: 'I began to feel Torah not only as obligation, but as life itself.',
      photo: { asset: { url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?...' }, alt_he: 'שיעור בישיבה', alt_en: 'Learning session' },
    },
  ];

  const testimonialCards = testimonials.length > 0 ? testimonials.slice(0, 3) : [
    {
      _id: 'testimonial-1',
      quote_he: 'למדתי כאן לא רק תורה, אלא דרך חיים שמלווה אותי גם מחוץ לכותלי הישיבה.',
      quote_en: 'Here I learned not only Torah, but a way of life that continues to guide me beyond the yeshiva walls.',
      author_name_he: 'אברהם ש.',
      author_name_en: 'Avraham S.',
      author_role_he: 'בוגר',
      author_role_en: 'Alumnus',
    },
    {
      _id: 'testimonial-2',
      quote_he: 'הקשר האישי עם הרב וההרגשה של משפחה היו for me the deciding factor.',
      quote_en: 'The personal connection with the rabbi and the feeling of family were the deciding factor for me.',
      author_name_he: 'דוד מ.',
      author_name_en: 'David M.',
      author_role_he: 'תלמיד',
      author_role_en: 'Student',
    },
    {
      _id: 'testimonial-3',
      quote_he: 'הישיבה נותנת לכל תלמיד מקום, כיוון, ומחויבות אמיתית לעתיד.',
      quote_en: 'The yeshiva gives every student a place, direction, and real commitment to the future.',
      author_name_he: 'מורן ל.',
      author_name_en: 'Moran L.',
      author_role_he: 'תומכת',
      author_role_en: 'Supporter',
    },
  ];

  return (
    <>
      <Header />
      <Hero
        headline={isHebrew ? 'בונים את הבית שבו יגדל הדור הבא' : 'Building the home where the next generation grows'}
        subheadline={
          isHebrew
            ? 'ישיבה שמחברת בין לימוד תורה, מסירות, ויחס אישי עמוק.'
            : 'A yeshiva that combines Torah learning, commitment, and deep personal guidance.'
        }
      />

      <main>
        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">
                {isHebrew ? 'למה דווקא אצלנו?' : 'Why this yeshiva?'}
              </p>
              <h2 className="mb-4">
                {isHebrew ? 'תורה, אישי, וקהילה' : 'Torah, personal growth, and community'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featureCards.map((item) => (
                <div key={item.title} className="feature-card">
                  <div className="feature-icon">✦</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="image-panel">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=700&fit=crop"
                  alt={isHebrew ? 'לומדים בישיבה' : 'Students learning in yeshiva'}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="section-tag">
                  {isHebrew ? 'מי אנחנו' : 'Who we are'}
                </p>
                <h2 className="mb-6">
                  {isHebrew ? 'ישיבה היא הרבה יותר מבניין' : 'A yeshiva is so much more than a building'}
                </h2>
                <p className="mb-4">
                  {isHebrew
                    ? 'בישיבת ארחות חיים אנו רואים את הלימוד לא כמשימה, אלא כמסלול חיים. כל תלמיד זוכה לסביבה שמחזקת את דרכו, את שורשיו ואת עתידו.'
                    : 'At Yeshivat Orchot Chaim, we see learning not as a task but as a life path. Every student is given an environment that strengthens their path, their roots, and their future.'}
                </p>
                <p className="mb-8">
                  {isHebrew
                    ? 'הישיבה מאופיינת בתורה, בקשר אישי, ובאחריות כלפי הדור הבא — מתוך אמונה שהחזון הגדול נבנה לאט, בעבודה יסודית, ובשיתוף אמת.'
                    : 'Our yeshiva is defined by Torah, personal connection, and responsibility toward the next generation — rooted in the belief that great vision is built steadily, with depth and partnership.'}
                </p>
                <Link href={`/${locale}/about`} className="btn-primary">
                  {isHebrew ? 'לגלות עוד' : 'Discover More'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">
                {isHebrew ? 'מה יש לנו להציע' : 'What we offer'}
              </p>
              <h2 className="mb-4">
                {isHebrew ? 'המרכז של הלמידה והגדילה' : 'The center of learning and growth'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillarCards.map((item) => (
                <div key={item.title} className="card feature-panel">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-primary text-white building-section">
          <div className="container building-inner">
            <div className="building-copy">
              <p className="section-tag light-tag">
                {isHebrew ? 'החזון' : 'Our vision'}
              </p>
              <h2 className="text-white mb-6">
                {isHebrew ? 'בניין לעתיד של תורה וקהילה' : 'A building for the future of Torah and community'}
              </h2>
              <p className="mb-8 text-white/85">
                {isHebrew
                  ? 'בניית הבית החדש היא לא רק מבנה פיזי — היא יצרן של אווירה, של מסגרת, של חיבור בין הדורות, ושל אפשרות לגדול בצורה יציבה ומעמיקה.'
                  : 'The new building is not only a physical structure — it is a foundation for atmosphere, for identity, for connection across generations, and for deep and stable growth.'}
              </p>
              <Link href={`/${locale}/building`} className="btn-accent">
                {isHebrew ? 'להרחיב על הפרויקט' : 'See the project'}
              </Link>
            </div>

            <div className="building-preview">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop"
                alt={isHebrew ? 'הבניין החדש' : 'The new building'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">
                {isHebrew ? 'סיפורי תלמידים' : 'Student stories'}
              </p>
              <h2 className="mb-4">
                {isHebrew ? 'הדרך שבה התורה משנה חיים' : 'The path where Torah transforms lives'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storyCards.map((story: any) => (
                <Link
                  key={story._id}
                  href={`/${locale}/students/${story.slug || 'story'}`}
                  className="story-card"
                >
                  {story.photo && (
                    <div className="story-image-wrap">
                      <Image
                        src={story.photo.asset.url}
                        alt={isHebrew ? story.photo.alt_he : story.photo.alt_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="story-content">
                    <h3>{isHebrew ? story.firstName_he : story.firstName_en}</h3>
                    <p>{isHebrew ? story.openingLine_he : story.openingLine_en}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href={`/${locale}/students`} className="btn-secondary">
                {isHebrew ? 'ראה עוד סיפורים' : 'Read more stories'}
              </Link>
            </div>
          </div>
        </section>

        {testimonialCards.length > 0 && (
          <section className="section-spacing bg-white">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="section-tag">
                  {isHebrew ? 'ממליצים עלינו' : 'Words from our community'}
                </p>
                <h2 className="mb-4">
                  {isHebrew ? 'ההרגשה של מי שחווה את המקום' : 'The feeling of those who experienced it'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonialCards.map((testimonial: any) => (
                  <div key={testimonial._id} className="card testimonial-card">
                    <p className="testimonial-quote">
                      “{isHebrew ? testimonial.quote_he : testimonial.quote_en}”
                    </p>
                    <div className="testimonial-author">
                      <strong>{isHebrew ? testimonial.author_name_he : testimonial.author_name_en}</strong>
                      <span>{isHebrew ? testimonial.author_role_he : testimonial.author_role_en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-spacing bg-primary text-white">
          <div className="container text-center">
            <p className="section-tag light-tag">
              {isHebrew ? 'הצטרפו אלינו' : 'Join the mission'}
            </p>
            <h2 className="text-white mb-6">
              {isHebrew ? 'בואו להיות שותפים בבניין העתיד' : 'Become part of building the future'}
            </h2>
            <p className="max-w-2xl mx-auto text-white/85 mb-8">
              {isHebrew
                ? 'כל תרומה תורמת ליצירת סביבה לימודית, אישית ומשפחתית שמעצבת תלמידים, מנחית אותם ומביאה לידי ביטוי את ערכי התורה.'
                : 'Every contribution helps create a study environment that is personal, meaningful, and deeply rooted in Torah values.'}
            </p>
            <Link href={`/${locale}/donate`} className="btn-accent">
              {isHebrew ? 'תרמו עכשיו' : 'Donate now'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: HomepageProps) {
  const isHebrew = params.locale === 'he';

  return {
    title: isHebrew
      ? 'ישיבת ארחות חיים | מבנים את הדור הבא'
      : 'Orchot Chaim Yeshiva | Building the next generation',
    description: isHebrew
      ? 'ישיבה בירושלים המשלבת לימוד תורה, יחסים אישיים, קהילה והקמת בית לעתיד הדור הבא.'
      : 'A Jerusalem yeshiva combining Torah learning, personal mentorship, community, and building a future home for the next generation.',
  };
}
