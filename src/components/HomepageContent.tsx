'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AnimatedNumber from '@/components/AnimatedNumber';
import GedoleiYisraelGallery from '@/components/GedoleiYisraelGallery';
import HomepageScrollExperience from '@/components/HomepageScrollExperience';
import YeshivaNewsTicker from '@/components/YeshivaNewsTicker';

interface HomepageContentProps {
  locale: string;
  isHebrew: boolean;
  stats: Array<{ value: number; suffix: string; label: string }>;
  featureCards: Array<{ title: string; text: string }>;
  pillarCards: Array<{ title: string; text: string }>;
  storyCards: any[];
  testimonialCards: any[];
}

export default function HomepageContent({
  locale,
  isHebrew,
  stats,
  featureCards,
  pillarCards,
  storyCards,
  testimonialCards,
}: HomepageContentProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="homepage-starfield" aria-hidden>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <Header overlay />
      <Hero
            headline={isHebrew ? 'בונים את הבית שבו יגדל הדור הבא' : 'Building the home where the next generation grows'}
            subheadline={
              isHebrew
                ? 'ישיבה שמחברת בין לימוד תורה, מסירות, ויחס אישי עמוק.'
                : 'A yeshiva that combines Torah learning, commitment, and deep personal guidance.'
            }
          />
          <YeshivaNewsTicker isHebrew={isHebrew} locale={locale} />
          <HomepageScrollExperience isHebrew={isHebrew} />

          <main id="homepage-content" className="homepage-sequence">
            <section className="section-spacing bg-white">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
              className="trust-strip"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="trust-strip__item"
                >
                  <span>
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1.6}
                      locale={locale}
                    />
                  </span>
                  <small>{stat.label}</small>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container intro-grid">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="content-block"
            >
              <p className="section-tag">{isHebrew ? 'המסגרת שלנו' : 'Our framework'}</p>
              <h2 className="mb-6">
                {isHebrew ? 'לימוד תורה שנשמע גם בחיי היום-יום' : 'Torah learning that shapes everyday life'}
              </h2>
              <p className="mb-5">
                {isHebrew
                  ? 'בישיבה אנו מאמינים שהלימוד הוא לא רק שיעור אלא דרך חיים. כל תלמיד מוזמן להיכנס למסגרת שבה תורה, יושרה, ומחויבות נוצרים יחד.'
                  : 'We believe learning is not only a lesson, but a way of life. Every student enters a framework where Torah, integrity, and dedication grow together.'}
              </p>
              <div className="info-list">
                <motion.div whileHover={{ x: 6 }} className="info-item">
                  <strong>{isHebrew ? 'לימוד איכותי' : 'Meaningful study'}</strong>
                  <p>{isHebrew ? 'שיעורים, עיון, והעמקה על יסודות ברורים.' : 'Structured study that builds depth, clarity, and confidence.'}</p>
                </motion.div>
                <motion.div whileHover={{ x: 6 }} className="info-item">
                  <strong>{isHebrew ? 'הקשבה אישית' : 'Personal guidance'}</strong>
                  <p>{isHebrew ? 'הכוונה שמכירה את כל תלמיד ואת המסלול שלו.' : 'Guidance that recognizes each student and their path.'}</p>
                </motion.div>
                <motion.div whileHover={{ x: 6 }} className="info-item">
                  <strong>{isHebrew ? 'קהילה תומכת' : 'Supportive community'}</strong>
                  <p>{isHebrew ? 'מקום שבו לומדים, מתבגרים ומחויבים יחד.' : 'A warm community that learns and grows together.'}</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="image-stack"
            >
              <motion.div whileHover={{ y: -8, scale: 1.01 }} className="feature-image feature-image-main">
                <Image
                  src="/images/students-2.jpg"
                  alt={isHebrew ? 'לומדים בישיבה' : 'Students learning'}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div whileHover={{ y: -8, scale: 1.04 }} className="feature-image feature-image-side">
                <Image
                  src="/images/students-3.jpg"
                  alt={isHebrew ? 'אווירת הישיבה' : 'Yeshiva atmosphere'}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container">
              <div className="text-center mx-auto mb-12 max-w-3xl">
              <p className="section-tag">{isHebrew ? 'מה עומד במרכז' : 'What drives us'}</p>
              <h2 className="mb-4">
                {isHebrew ? 'במקום הזה, כל פרט נבנה לכיוון המקום הנכון' : 'Here, every detail is built toward the right direction'}
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="grid gap-6 md:grid-cols-3"
            >
              {featureCards.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="feature-card"
                >
                  <div className="feature-icon">✦</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-primary text-white building-section">
          <div className="container building-inner">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="building-copy"
            >
              <p className="section-tag light-tag">{isHebrew ? 'החזון' : 'Vision'}</p>
              <h2 className="mb-6 text-white">
                {isHebrew ? 'בית חדש בשביל דור העתיד' : 'A new home for the next generation'}
              </h2>
              <p className="mb-8 text-white/85">
                {isHebrew
                  ? 'הבניין החדש הוא לא רק מבנה; הוא סביבה שתאפשר לימוד איכותי, קשרים עמוקים, ויצירת זמן בית עבור כל מי שמחפש מקום ללמוד, להתבגר ולהשקיע בתורה.'
                  : 'The new building is not only a structure; it is an environment that enables serious learning, deeply rooted relationships, and a true place to grow in Torah and character.'}
              </p>
              <Link href={`/${locale}/building`} className="btn-accent">
                {isHebrew ? 'לפרטים מלאים' : 'View the project'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="building-preview"
            >
              <Image
                src="/images/building.jpg"
                alt={isHebrew ? 'הבניין החדש' : 'The new building'}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-light">
          <div className="container">
              <div className="text-center mx-auto mb-12 max-w-3xl">
              <p className="section-tag">{isHebrew ? 'מה יש לנו להציע' : 'Our commitment'}</p>
              <h2 className="mb-4">{isHebrew ? 'שלושה עמודי יסוד' : 'Three pillars of growth'}</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="grid gap-6 md:grid-cols-3"
            >
              {pillarCards.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card feature-panel"
                >
                  <div className="mini-badge">{item.title}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-spacing gedolei-gallery-section">
          <div className="container">
            <GedoleiYisraelGallery isHebrew={isHebrew} />
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container">
            <div className="text-center mx-auto mb-12 max-w-3xl">
              <p className="section-tag">{isHebrew ? 'סיפורי תלמידים' : 'Student stories'}</p>
              <h2 className="mb-4">{isHebrew ? 'הדרך שבה התורה משנה חיים' : 'The path where Torah transforms lives'}</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {storyCards.map((story: any) => (
                <motion.div key={story._id} variants={fadeUp} whileHover={{ y: -8, scale: 1.01 }}>
                  <Link href={`/${locale}/students/${story.slug || 'story'}`} className="story-card">
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
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <Link href={`/${locale}/students`} className="btn-secondary">
                {isHebrew ? 'ראה עוד סיפורים' : 'Read more stories'}
              </Link>
            </div>
          </div>
        </section>

        {testimonialCards.length > 0 && (
          <section id="pin-windmill-wrap" className="section-spacing bg-light testimonial-scroll-section">
            <div className="container testimonial-layout">
              <div className="testimonial-copy-col">
                <div className="text-center mx-auto mb-12 max-w-3xl md:text-right">
                  <p className="section-tag">{isHebrew ? 'ממליצים עלינו' : 'Words from our community'}</p>
                  <h2 className="mb-4">{isHebrew ? 'ההרגשה של מי שחווה את המקום' : 'The feeling of those who experienced it'}</h2>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                  className="testimonial-stack"
                >
                  {testimonialCards.map((testimonial: any) => (
                    <motion.div
                      key={testimonial._id}
                      variants={fadeUp}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="card testimonial-card"
                    >
                      <p className="testimonial-quote">
                        “{isHebrew ? testimonial.quote_he : testimonial.quote_en}”
                      </p>
                      <div className="testimonial-author">
                        <strong>{isHebrew ? testimonial.author_name_he : testimonial.author_name_en}</strong>
                        <span>{isHebrew ? testimonial.author_role_he : testimonial.author_role_en}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div id="pin-windmill" className="testimonial-visual-col">
                <div className="testimonial-visual-wrap">
                  <svg
                    id="pin-windmill-svg"
                    viewBox="0 0 260 260"
                    className="testimonial-windmill"
                    style={{ transformOrigin: '50% 50%' }}
                    aria-label={isHebrew ? 'גלילת סיבוב של חוויית תלמידים' : 'Rotating testimonial windmill'}
                  >
                    <circle cx="130" cy="130" r="22" fill="#d7a94d" />
                    <g fill="#f5d48b">
                      <rect x="118" y="8" width="24" height="90" rx="12" />
                      <rect x="118" y="162" width="24" height="90" rx="12" />
                      <rect x="8" y="118" width="90" height="24" rx="12" />
                      <rect x="162" y="118" width="90" height="24" rx="12" />
                    </g>
                    <circle cx="130" cy="130" r="70" fill="none" stroke="rgba(13,35,53,0.18)" strokeWidth="2" />
                    <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(13,35,53,0.08)" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-spacing bg-primary text-white">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="cta-panel"
            >
              <p className="section-tag light-tag">{isHebrew ? 'הצטרפו אלינו' : 'Join the mission'}</p>
              <h2 className="mb-6 text-white">
                {isHebrew ? 'בואו להיות שותפים בבניין העתיד' : 'Become part of building the future'}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/85">
                {isHebrew
                  ? 'כל תרומה תורמת ליצירת סביבה לימודית, אישית ומשפחתית שמעצבת תלמידים, מנחית אותם ומביאה לידי ביטוי את ערכי התורה.'
                  : 'Every contribution helps create a study environment that is personal, meaningful, and deeply rooted in Torah values.'}
              </p>
              <Link href={`/${locale}/donate`} className="btn-accent">
                {isHebrew ? 'תרמו עכשיו' : 'Donate now'}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
