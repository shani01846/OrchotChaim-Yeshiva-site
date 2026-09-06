import { sanityFetch } from '@/lib/sanity.client';
import { GET_HOMEPAGE, GET_STUDENT_STORIES, GET_TESTIMONIALS } from '@/lib/queries';
import HomepageContent from '@/components/HomepageContent';

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

  const stats = [
    { value: 40, suffix: '+', label: isHebrew ? 'תלמידים' : 'Students' },
    { value: 15, suffix: '+', label: isHebrew ? 'שנים' : 'Years' },
    { value: 100, suffix: '%', label: isHebrew ? 'תמיכה אישית' : 'Personal care' },
  ];

  const featureCards = [
    {
      title: isHebrew ? 'לימוד איכותי' : 'Deep learning',
      text: isHebrew
        ? 'תוכניות לימוד שמחברות בין תורה, חכמת ישראל והכנה לחיים של מסירות וערך.'
        : 'A learning environment that connects Torah, personal growth, and daily life with purpose.',
    },
    {
      title: isHebrew ? 'יחס אישי' : 'Personal mentorship',
      text: isHebrew
        ? 'כל תלמיד זוכה ליווי, הקשבה והכוונה — לא רק בשיעור, אלא גם בבניית הדרך.'
        : 'Each student is seen, guided, and supported with meaningful attention beyond the classroom.',
    },
    {
      title: isHebrew ? 'קהילה מחזקת' : 'Strong community',
      text: isHebrew
        ? 'סביבה תומכת, ערכית ומחבקת — מקום שבו נבנה לא רק לימוד, אלא גם זהות.'
        : 'A warm, values-driven environment where students grow together in Torah and commitment.',
    },
  ];

  const pillarCards = [
    {
      title: isHebrew ? 'התורה' : 'Torah',
      text: isHebrew
        ? 'הפנמה של לימוד איכותי, עיון יסודי והעמקה במקורות.'
        : 'Strong, structured Torah study rooted in depth, clarity, and commitment.',
    },
    {
      title: isHebrew ? 'האופי' : 'Character',
      text: isHebrew
        ? 'הישיבה מחזקת אחריות, יושרה, והתנהגות שמובילה לחיים מכובדים.'
        : 'A place that strengthens integrity, dignity, and responsible personal growth.',
    },
    {
      title: isHebrew ? 'השליחות' : 'Mission',
      text: isHebrew
        ? 'המסגרת יוצרת תלמידים המוכנים להוביל, לתרום ולהיות שותפים לעתיד.'
        : 'A learning framework that prepares students to lead, contribute, and serve with purpose.',
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
      photo: { asset: { url: '/images/students-1.jpg' }, alt_he: 'תלמיד לומד', alt_en: 'Student learning' },
    },
    {
      _id: 'fallback-2',
      slug: 'story-2',
      firstName_he: 'אברהם',
      firstName_en: 'Avraham',
      openingLine_he: 'הקשר עם הרב והאווירה של הישיבה שינו לי את הדרך.',
      openingLine_en: 'The relationship with the rabbi and the yeshiva atmosphere changed my path.',
      photo: { asset: { url: '/images/students-2.jpg' }, alt_he: 'קבוצה לומדת', alt_en: 'Study group' },
    },
    {
      _id: 'fallback-3',
      slug: 'story-3',
      firstName_he: 'שמעון',
      firstName_en: 'Shimon',
      openingLine_he: 'התחלתי להרגיש את התורה לא רק כמחויבות, אלא כחיים.',
      openingLine_en: 'I began to feel Torah not only as obligation, but as life itself.',
      photo: { asset: { url: '/images/students-3.jpg' }, alt_he: 'שיעור בישיבה', alt_en: 'Learning session' },
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
      quote_he: 'הקשר האישי עם הרב וההרגשה של משפחה היו המפתח עבורי.',
      quote_en: 'The personal connection with the rabbi and the feeling of family were the decisive factor for me.',
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
    <HomepageContent
      locale={locale}
      isHebrew={isHebrew}
      stats={stats}
      featureCards={featureCards}
      pillarCards={pillarCards}
      storyCards={storyCards}
      testimonialCards={testimonialCards}
    />
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
