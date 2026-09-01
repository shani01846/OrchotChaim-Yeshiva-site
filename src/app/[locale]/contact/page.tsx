import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

interface PageProps {
  params: { locale: string };
}

export default function ContactPage({ params }: PageProps) {
  const locale = params.locale;
  const isHebrew = locale === 'he';

  return (
    <>
      <Header />
      <Hero
        eyebrow={isHebrew ? 'צור קשר' : 'Contact us'}
        headline={isHebrew ? 'נשמח לשמוע מכם' : 'We’d love to hear from you'}
        subheadline={
          isHebrew
            ? 'לכל שאלה, הצעה, או עניין של שותפות — אנחנו כאן. נענה בהקדם.'
            : 'For questions, partnership ideas, or support, we are here and happy to connect.'
        }
        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=800&fit=crop"
      />

      <main>
        <section className="section-spacing bg-white">
          <div className="container split-grid">
            <div className="contact-card">
              <h3 className="text-white mb-4">{isHebrew ? 'פרטי יצירת קשר' : 'Contact details'}</h3>
              <ul className="space-y-4 text-white/85">
                <li><strong>{isHebrew ? 'טלפון:' : 'Phone:'}</strong> 02-6426587</li>
                <li><strong>{isHebrew ? 'מיקום:' : 'Location:'}</strong> {isHebrew ? 'ירושלים' : 'Jerusalem, Israel'}</li>
                <li><strong>{isHebrew ? 'דוא"ל:' : 'Email:'}</strong> info@orchotchaim.org</li>
              </ul>
            </div>

            <div className="donation-card">
              <p className="section-tag">{isHebrew ? 'הודעה' : 'Message'}</p>
              <h2>{isHebrew ? 'שלחו לנו הודעה' : 'Send us a message'}</h2>
              <form className="space-y-4 mt-6">
                <div className="form-grid">
                  <div>
                    <label className="form-label">{isHebrew ? 'שם' : 'Name'}</label>
                    <input className="inline-form" type="text" placeholder={isHebrew ? 'הקלידו את שמכם' : 'Your name'} />
                  </div>
                  <div>
                    <label className="form-label">{isHebrew ? 'אימייל' : 'Email'}</label>
                    <input className="inline-form" type="email" placeholder={isHebrew ? 'your@email.com' : 'your@email.com'} />
                  </div>
                </div>

                <div>
                  <label className="form-label">{isHebrew ? 'ההודעה' : 'Message'}</label>
                  <textarea rows={6} className="inline-form resize-none" placeholder={isHebrew ? 'כתוב/כתבי את ההודעה' : 'Write your message'} />
                </div>

                <button type="button" className="btn-primary">
                  {isHebrew ? 'שלח הודעה' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
