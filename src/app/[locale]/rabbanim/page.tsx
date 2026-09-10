import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RabbanimCarousel from '@/components/RabbanimCarousel';
import RabbanimHorizontalExperience from '@/components/RabbanimHorizontalExperience';
import { rabbanim } from '@/data/rabbanim';

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isHebrew = params.locale === 'he';
  return {
    title: isHebrew ? 'רבני ישיבת ארחות חיים' : 'The Rabbis of Orchot Chaim Yeshiva',
    description: isHebrew
      ? 'הדמויות, המסורת והמורשת של רבני ישיבת ארחות חיים לאורך השנים.'
      : 'Meet the rabbis whose Torah, guidance, and legacy shape Orchot Chaim Yeshiva.',
  };
}

export default function RabbanimPage({ params }: PageProps) {
  const isHebrew = params.locale === 'he';

  return (
    <div className="rabbanim-page">
      <Header />
      <main>
        <RabbanimHorizontalExperience isHebrew={isHebrew}>
          <div className="container rabbanim-directory__layout">
            <RabbanimCarousel rabbanim={rabbanim} />
          </div>
        </RabbanimHorizontalExperience>
      </main>
      <Footer />
    </div>
  );
}