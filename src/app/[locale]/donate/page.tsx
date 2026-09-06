import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import DonationExperience from '@/components/DonationExperience';

interface PageProps {
  params: { locale: string };
}

export default function DonatePage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  const amounts = [
    { value: '180', label: isHebrew ? 'תרומה חודשית' : 'Monthly support' },
    { value: '360', label: isHebrew ? 'תמיכה בלמידה' : 'Study support' },
    { value: '720', label: isHebrew ? 'תמיכה במשפחה' : 'Family support' },
    { value: 'Custom', label: isHebrew ? 'סכום אחר' : 'Custom amount' },
  ];

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'תרומה' : 'Donate'}
        headline={isHebrew ? 'הצטרפו למפעל של תורה ועתיד' : 'Join the mission of Torah and future'}
        subheadline={
          isHebrew
            ? 'כל תרומה מחזקת את המסגרת הלימודית, את הקהילה, ואת האפשרות להעמיק את החזון של הישיבה.'
            : 'Every donation strengthens the learning framework, the community, and the future of the yeshiva.'
        }
        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop"
      />

      <DonationExperience locale={locale} />

      <Footer />
    </>
  );
}
