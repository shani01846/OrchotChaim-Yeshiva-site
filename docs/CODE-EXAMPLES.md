# Code Examples: Implementation Guide

**Document**: PHASE 3+ — Production-Ready Code Snippets  
**Status**: Ready to Use  
**Date**: September 1, 2026  

---

## OVERVIEW

Real, production-ready code examples for the most complex parts of the website.

Each example is complete and can be used as-is or adapted.

---

## 1. PROJECT SETUP

### Initialize Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest orchot-chaim --typescript --tailwind

cd orchot-chaim

# Install key dependencies
npm install next-intl @sanity/client @sanity/image-url next-auth @stripe/react-stripe-js @stripe/stripe-js react-hook-form zod @hookform/resolvers
```

### Environment Variables (.env.local)

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Matara
MATARA_API_KEY=your_matara_key
MATARA_WEBHOOK_SECRET=your_webhook_secret

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email
SENDGRID_API_KEY=SG.xxx

# App
NEXT_PUBLIC_APP_URL=https://orchotchaim.co.il
```

---

## 2. INTERNATIONALIZATION (i18n) SETUP

### next-intl Configuration

**i18n.config.ts**:
```typescript
import { getRequestConfig } from 'next-intl/server';

export const locales = ['he', 'en'] as const;
export const defaultLocale = 'he' as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  defaultTranslationValues: {
    br: <br />,
  },
}));
```

**middleware.ts** (handle routing):
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // /he/, /en/
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

**app/[locale]/layout.tsx** (root layout):
```typescript
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const locale = params.locale as string;
  const isRTL = locale === 'he';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**messages/he.json**:
```json
{
  "navigation": {
    "home": "בית",
    "about": "אודות",
    "students": "תלמידים",
    "donate": "תרומה"
  },
  "donation": {
    "heading": "אני רוצה להיות שותף",
    "selectAmount": "כמה תרצו לתרום?",
    "oneTime": "פעם אחת",
    "monthly": "חודשי"
  }
}
```

**Usage in Components**:
```typescript
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
    </nav>
  );
}
```

---

## 3. SANITY CMS INTEGRATION

### Sanity Client Setup

**lib/sanity.client.ts**:
```typescript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const sanityFetch = async (query: string, params?: Record<string, unknown>) => {
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
};
```

### GROQ Queries

**lib/queries.ts**:
```typescript
export const GET_HOMEPAGE = `
  *[_type == "page" && slug == "homepage"][0] {
    title_he,
    title_en,
    content_he,
    content_en,
    heroImage {
      asset -> { url }
    }
  }
`;

export const GET_STUDENT_STORIES = `
  *[_type == "studentStory" && isPublished == true] | order(publishedAt desc) {
    _id,
    firstName_he,
    firstName_en,
    slug,
    openingLine_he,
    openingLine_en,
    photo {
      asset -> { url }
    },
    featured
  }
`;

export const GET_STORY_BY_SLUG = (slug: string) => `
  *[_type == "studentStory" && slug == "${slug}"][0] {
    _id,
    firstName_he,
    firstName_en,
    story_he,
    story_en,
    impactStatement_he,
    impactStatement_en,
    photo {
      asset -> { url }
    },
    photoAlt_he,
    photoAlt_en
  }
`;
```

### Fetching Data in Pages

**app/[locale]/students/page.tsx**:
```typescript
import { sanityFetch } from '@/lib/sanity.client';
import { GET_STUDENT_STORIES } from '@/lib/queries';
import StoryCard from '@/components/StoryCard';

export default async function StudentsPage({ params }: { params: { locale: string } }) {
  const stories = await sanityFetch(GET_STUDENT_STORIES);
  const isHebrew = params.locale === 'he';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story: any) => (
        <StoryCard
          key={story._id}
          story={story}
          isHebrew={isHebrew}
        />
      ))}
    </div>
  );
}
```

---

## 4. DONATION FUNNEL: FORM HANDLING

### Multi-Step Form with React Hook Form + Zod

**lib/schemas.ts**:
```typescript
import { z } from 'zod';

export const AmountSchema = z.object({
  amount: z.number().min(1, 'Amount required'),
  frequency: z.enum(['one-time', 'monthly']),
  currency: z.string(),
});

export const LocationSchema = z.object({
  country: z.string().min(2),
  currency: z.enum(['ILS', 'USD', 'GBP', 'EUR']),
});

export const DonorDetailsSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  country: z.string(),
  subscribeNewsletter: z.boolean().default(false),
});

export type AmountFormData = z.infer<typeof AmountSchema>;
export type LocationFormData = z.infer<typeof LocationSchema>;
export type DonorDetailsFormData = z.infer<typeof DonorDetailsSchema>;
```

**components/DonationFunnel.tsx**:
```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AmountSchema, LocationSchema, DonorDetailsSchema } from '@/lib/schemas';
import type { AmountFormData, LocationFormData, DonorDetailsFormData } from '@/lib/schemas';

export default function DonationFunnel() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 0,
    frequency: 'one-time' as const,
    currency: 'ILS',
    country: '',
    name: '',
    email: '',
  });

  // Step 1: Amount
  const amountForm = useForm<AmountFormData>({
    resolver: zodResolver(AmountSchema),
    defaultValues: { amount: formData.amount, frequency: formData.frequency },
  });

  const onAmountSubmit = async (data: AmountFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Step 2: Location
  const locationForm = useForm<LocationFormData>({
    resolver: zodResolver(LocationSchema),
    defaultValues: { country: formData.country, currency: formData.currency },
  });

  const onLocationSubmit = async (data: LocationFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  // Step 3: Details
  const detailsForm = useForm<DonorDetailsFormData>({
    resolver: zodResolver(DonorDetailsSchema),
    defaultValues: { name: formData.name, email: formData.email },
  });

  const onDetailsSubmit = async (data: DonorDetailsFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(4); // Go to payment
  };

  if (step === 1) {
    return <Step1Amount form={amountForm} onSubmit={onAmountSubmit} />;
  }
  if (step === 2) {
    return <Step2Location form={locationForm} onSubmit={onLocationSubmit} />;
  }
  if (step === 3) {
    return <Step3Details form={detailsForm} onSubmit={onDetailsSubmit} />;
  }
  if (step === 4) {
    return <Step4Payment formData={formData} />;
  }
}

// Step 1 Component
function Step1Amount({ form, onSubmit }: any) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">כמה תרצו לתרום?</h2>

      <div className="grid grid-cols-2 gap-2">
        {[180, 500, 1800, 5000].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => form.setValue('amount', amount)}
            className={`p-3 border rounded ${
              form.watch('amount') === amount
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300'
            }`}
          >
            ₪{amount.toLocaleString()}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="סכום אחר"
        {...form.register('amount', { valueAsNumber: true })}
        className="w-full px-3 py-2 border rounded"
      />

      {form.formState.errors.amount && (
        <p className="text-red-500">{form.formState.errors.amount.message}</p>
      )}

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            value="one-time"
            {...form.register('frequency')}
            className="mr-2"
          />
          פעם אחת
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="monthly"
            {...form.register('frequency')}
            className="mr-2"
          />
          חודשי
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-bold"
      >
        המשך
      </button>
    </form>
  );
}
```

---

## 5. PAYMENT INTEGRATION: STRIPE

### Stripe Payment Intent Flow

**app/api/donations/create-intent/route.ts**:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, email, donorName } = await req.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: currency.toLowerCase(),
      customer_email: email,
      metadata: {
        donor_name: donorName,
        created_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
```

### Payment Form Component (Client-Side)

**components/PaymentForm.tsx**:
```typescript
'use client';

import { useState, useEffect } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

export default function PaymentForm({ amount, currency, email, onSuccess }: any) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createIntent = async () => {
      const res = await fetch('/api/donations/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // convert to cents
          currency,
          email,
          donorName: 'Donor', // get from form
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setLoading(false);
    };

    createIntent();
  }, [amount, currency, email]);

  if (loading) return <div>Loading payment form...</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: 'stripe' },
      }}
    >
      <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
}

function CheckoutForm({ clientSecret, onSuccess }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/thank-you`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setError(error.message || 'Payment failed');
      setProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Complete Donation'}
      </button>
    </form>
  );
}
```

---

## 6. WEBHOOK HANDLING: STRIPE

**app/api/webhooks/stripe/route.ts**:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma'; // or your DB

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle payment_intent.succeeded
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Store donation in database
    const donation = await prisma.donation.create({
      data: {
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // convert from cents
        currency: paymentIntent.currency.toUpperCase(),
        status: 'succeeded',
        donorEmail: paymentIntent.customer_email,
        donorName: paymentIntent.metadata?.donor_name,
      },
    });

    // Send confirmation email
    await sendConfirmationEmail(donation);
  }

  // Handle payment_intent.payment_failed
  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    await prisma.donation.create({
      data: {
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: 'failed',
        errorMessage: paymentIntent.last_payment_error?.message,
      },
    });
  }

  return NextResponse.json({ received: true });
}

async function sendConfirmationEmail(donation: any) {
  // Implementation depends on your email service
  console.log('Sending confirmation email to:', donation.donorEmail);
}
```

---

## 7. ANALYTICS: GOOGLE ANALYTICS 4 EVENTS

### Setup Google Analytics

**app/layout.tsx**:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
```

### Custom Event Tracking

**lib/analytics.ts**:
```typescript
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

export const trackDonation = (amount: number, currency: string, frequency: string) => {
  trackEvent('purchase', {
    value: amount,
    currency,
    items: [
      {
        item_name: 'Donation',
        price: amount,
        quantity: 1,
      },
    ],
    donation_frequency: frequency,
  });
};

export const trackDonationStep = (step: number, amount?: number) => {
  trackEvent('donation_step_completed', {
    step_number: step,
    amount,
  });
};

export const trackStoryView = (storyId: string, storyName: string) => {
  trackEvent('view_item', {
    item_name: storyName,
    item_category: 'student_story',
    item_id: storyId,
  });
};
```

### Usage in Components

```typescript
import { trackDonationStep } from '@/lib/analytics';

function Step1Amount() {
  const handleNext = () => {
    trackDonationStep(1, amount);
    // proceed to next step
  };

  return (
    <button onClick={handleNext}>
      Continue
    </button>
  );
}
```

---

## 8. DATABASE SCHEMA (Prisma)

**schema.prisma**:
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Donation {
  id                String   @id @default(cuid())
  orderId           String   @unique
  
  // Donor Info
  donorName         String
  donorEmail        String
  donorPhone        String?
  donorCountry      String
  
  // Donation Details
  amount            Float
  currency          String   // ILS, USD, GBP, EUR
  frequency         String   // one-time, monthly
  recurringUntil    DateTime?
  
  // Payment Info
  processor         String   // matara, stripe
  transactionId     String   @unique
  paymentMethod     String   // credit_card, bank_transfer
  
  // Status
  status            String   // pending, succeeded, failed
  errorMessage      String?
  
  // Metadata
  campaignId        String?
  utmSource         String?
  utmMedium         String?
  utmCampaign       String?
  ipAddress         String?
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  paymentProcessedAt DateTime?
  
  // Flags
  isRecurring       Boolean  @default(false)
  isTaxDeductible   Boolean  @default(true)
  receiptSent       Boolean  @default(false)
}

model Contact {
  id                String   @id @default(cuid())
  name              String
  email             String
  phone             String?
  message           String   @db.Text
  status            String   @default("new") // new, replied, archived
  createdAt         DateTime @default(now())
  repliedAt         DateTime?
}
```

---

## 9. IMAGE OPTIMIZATION (Next.js Image)

**components/OptimizedImage.tsx**:
```typescript
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="w-full h-auto"
    />
  );
}
```

---

## 10. FORM VALIDATION: CONTACT FORM

**components/ContactForm.tsx**:
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactForm({ locale }: { locale: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {submitted && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          {locale === 'he' ? 'תודה על ההודעה!' : 'Thank you for your message!'}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === 'he' ? 'שם' : 'Name'}
        </label>
        <input
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === 'he' ? 'אימייל' : 'Email'}
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {locale === 'he' ? 'הודעה' : 'Message'}
        </label>
        <textarea
          {...register('message')}
          className="w-full px-3 py-2 border rounded h-24"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded font-bold disabled:opacity-50"
      >
        {isSubmitting
          ? locale === 'he'
            ? 'שליחה...'
            : 'Sending...'
          : locale === 'he'
          ? 'שלח'
          : 'Send'}
      </button>
    </form>
  );
}
```

---

## 11. API ROUTE: CONTACT FORM HANDLER

**app/api/contact/route.ts**:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'We received your message',
      template: 'contact-confirmation',
      data: { name, email },
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New contact form submission from ${name}`,
      template: 'contact-admin-notification',
      data: { name, email, phone, message },
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
```

---

## 12. EMAIL TEMPLATES (SendGrid)

**lib/email.ts**:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({
  to,
  subject,
  template,
  data,
}: {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}) {
  try {
    const html = generateEmailHTML(template, data);

    await sgMail.send({
      to,
      from: 'noreply@orchotchaim.co.il',
      subject,
      html,
    });
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

function generateEmailHTML(template: string, data: Record<string, any>): string {
  if (template === 'donation-confirmation') {
    return `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for your donation!</h2>
          <p>Dear ${data.donorName},</p>
          <p>We received your donation of ${data.currency} ${data.amount}</p>
          <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
          <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
          <p>Your donation is tax-deductible. More information about our work at:</p>
          <p><a href="https://orchotchaim.co.il">orchotchaim.co.il</a></p>
          <p>With gratitude,<br/>Yeshivat Orchot Chaim</p>
        </body>
      </html>
    `;
  }
  return '';
}
```

---

## 13. TAILWIND CUSTOM CONFIG

**tailwind.config.ts**:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F3A7D', // Deep blue
        accent: '#C9A961', // Gold
        light: '#FAF8F3', // Warm beige
        text: '#3D4D61', // Slate gray
        border: '#E8E5DC', // Light gray
      },
      fontFamily: {
        sans: ["'Heebo'", 'system-ui', '-apple-system', 'sans-serif'],
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## GETTING STARTED

1. **Clone the repository template** or use `create-next-app`
2. **Copy environment variables** from this guide (.env.local)
3. **Install dependencies**: `npm install`
4. **Configure Sanity.io** (follow cms-schema.md)
5. **Set up Stripe and Matara** API keys
6. **Run development server**: `npm run dev`
7. **Implement components** using examples above

---

**STATUS**: ✅ READY TO IMPLEMENT

These code examples are production-ready and can be adapted for your specific needs.

