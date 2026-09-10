import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import Starfield from '@/components/Starfield';
import dynamic from 'next/dynamic';

const PageTransitionLoader = dynamic(() => import('@/components/PageTransitionLoader'), { ssr: false });
import ChatBotButton from '@/components/ChatBotButton';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHebrew = params.locale === 'he';

  return {
    title: isHebrew
      ? 'ישיבת ארחות חיים | ישיבה בירושלים'
      : 'Orchot Chaim Yeshiva | Torah Learning in Jerusalem',
    description: isHebrew
      ? 'ישיבת ארחות חיים בירושלים - למידת תורה עם יחס אישי עמוק'
      : 'Orchot Chaim Yeshiva in Jerusalem - Torah learning with deep personal mentorship',
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || 'https://orchotchaim.co.il'
    ),
    openGraph: {
      title: isHebrew ? 'ישיבת ארחות חיים' : 'Orchot Chaim Yeshiva',
      description: isHebrew
        ? 'למידת תורה עם יחס אישי'
        : 'Torah learning with personal mentorship',
      url: `https://orchotchaim.co.il/${params.locale}`,
      siteName: 'Orchot Chaim Yeshiva',
      locale: params.locale,
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const messages = await getMessages();
  const isRTL = params.locale === 'he';

  return (
    <html lang={params.locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;300;400;500;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-text font-sans">
          <NextIntlClientProvider messages={messages}>
          <Starfield />
          <PageTransitionLoader />
          {children}
          <ChatBotButton />
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              // Dynamically load ChatPanel when chat button is opened to keep initial JS small
              const observer = new MutationObserver((mutations) => {
                for (const m of mutations) {
                  for (const n of m.addedNodes) {
                    if (n instanceof Element) {
                      const panel = n.querySelector('#chatbot-panel');
                      if (panel) {
                        panel.addEventListener('click', function(){
                          // no-op
                        });
                      }
                    }
                  }
                }
              });
              observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
          ` }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
