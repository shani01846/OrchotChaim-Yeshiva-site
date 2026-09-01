import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Link from 'next/link';

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

      <main>
        <section className="section-spacing bg-white">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="donation-card">
                <p className="section-tag">{isHebrew ? 'בחירת סכום' : 'Choose an amount'}</p>
                <h2>{isHebrew ? 'בחרו את רמת התמיכה' : 'Select your level of support'}</h2>

                <div className="amount-grid mt-8">
                  {amounts.map((amount) => (
                    <button key={amount.label} type="button" className="amount-button">
                      <div className="text-xl font-bold">{amount.value}</div>
                      <div className="mt-2 text-sm">{amount.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="donation-card">
                <p className="section-tag">{isHebrew ? 'תרומה חודשי' : 'Monthly giving'}</p>
                <h2>{isHebrew ? 'הצטרפות קבועה' : 'Ongoing partnership'}</h2>
                <p className="mt-4 mb-6">
                  {isHebrew
                    ? 'התרומה החודשית מאפשרת תכנון ארוך טווח, יציבות, ושקט תכנוני לקהילה ולפיתוח הישיבה.'
                    : 'Monthly giving creates long-term stability, consistent support, and confidence in the future of the yeshiva.'}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">{isHebrew ? 'סכום' : 'Amount'}</label>
                    <input className="inline-form" type="text" placeholder={isHebrew ? 'הקלידו סכום' : 'Enter amount'} />
                  </div>
                  <div>
                    <label className="form-label">{isHebrew ? 'שם מלא' : 'Full name'}</label>
                    <input className="inline-form" type="text" placeholder={isHebrew ? 'שם מלא' : 'Full name'} />
                  </div>
                  <div>
                    <label className="form-label">{isHebrew ? 'אימייל' : 'Email'}</label>
                    <input className="inline-form" type="email" placeholder="name@email.com" />
                  </div>
                  <button type="button" className="btn-primary w-full justify-center">
                    {isHebrew ? 'המשך לתשלום' : 'Continue to payment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="section-tag">{isHebrew ? 'ההשפעה' : 'Impact'}</p>
              <h2>{isHebrew ? 'מה התרומה עושה' : 'What your support enables'}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="card feature-panel">
                <h3>{isHebrew ? 'למידה איכותית' : 'Quality learning'}</h3>
                <p>{isHebrew ? 'התרומה מאפשרת תכנון לימוד, מאגרי חומר, ועזרה לניהול חיי היום-יום של התלמידים.' : 'Support helps fund educational resources and a stronger daily learning environment.'}</p>
              </div>
              <div className="card feature-panel">
                <h3>{isHebrew ? 'סביבה תומכת' : 'Supportive environment'}</h3>
                <p>{isHebrew ? 'הקמת מבנה, תחבורה, וחיי קהילה שמאפשרים למידה מכובדת ומרוכזת.' : 'Funding helps create a warm environment that supports study and community life.'}</p>
              </div>
              <div className="card feature-panel">
                <h3>{isHebrew ? 'עתיד של תורה' : 'Future of Torah'}</h3>
                <p>{isHebrew ? 'כל תרומה היא השקעה בדור הבא, בבניין של תורה, ערכים, וקהילה מקיימת.' : 'Each contribution invests in the next generation and in a future rooted in Torah and values.'}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
