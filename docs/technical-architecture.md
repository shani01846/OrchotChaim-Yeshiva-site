# Technical Architecture: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Technical Decisions  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────┐
│         User Browser (Client)               │
│  HTML + CSS + JavaScript (Next.js)          │
│  RTL/LTR Support | Internationalization    │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│      Next.js Application Server             │
│  - App Router (React 18+)                   │
│  - Server Components by default             │
│  - API Routes for backend                   │
│  - Image optimization (next/image)          │
│  - Routing & i18n (next-intl)              │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       ↓                ↓
┌─────────────────┐  ┌──────────────────────┐
│   CMS Backend   │  │  External Services   │
│  (Sanity.io)    │  │ - Payment (Matara,   │
│  Content         │  │   Stripe)            │
│  Management     │  │ - Analytics (GA4)    │
│  Editorial UI   │  │ - Email              │
│  Data Storage   │  │ - Forms              │
└─────────────────┘  └──────────────────────┘
```

---

## TECHNOLOGY STACK

### Frontend Framework

**DECISION**: Next.js 14+ (App Router) with TypeScript

**REASON**:
- Built-in internationalization support (i18n via next-intl)
- Excellent RTL/LTR handling
- Server Components for performance
- Built-in image optimization
- Static generation (SSG) for fast pages
- Zero-config deployment on Vercel
- Great DX and community

**ALTERNATIVES CONSIDERED**:
- Remix: Good for forms/interactive, overkill for this project
- Nuxt: Vue-based, unnecessary complexity
- Astro: Static-first, less suitable for dynamic content
- SvelteKit: Smaller community, fewer resources

**RECOMMENDATION**: Next.js 14+ App Router

---

### Language & Type Safety

**DECISION**: TypeScript (strict mode)

**REASON**:
- Catches errors at compile time
- Better IDE support (autocomplete)
- Self-documenting code
- Type safety for CMS content
- Industry standard

**CONFIG**: `tsconfig.json` with strict mode enabled

---

### Styling & Design System

**DECISION**: Tailwind CSS + CSS Modules

**REASONING**:
- Utility-first CSS reduces custom CSS
- Excellent RTL support
- Great for rapid development
- Small bundle size
- Consistent design system
- CSS Modules for component-scoped styles

**ALTERNATIVE**: Styled-components, CSS-in-JS (not recommended due to RTL complexity)

---

### Internationalization (i18n)

**DECISION**: `next-intl` library

**REASON**:
- Built for Next.js
- Type-safe translations
- Client & server component support
- Locale prefix routing (`/he/`, `/en/`)
- Automatic redirects
- Language switching without page reload
- Small bundle impact

**IMPLEMENTATION**:
```
messages/
  he.json    # Hebrew translations
  en.json    # English translations
```

**LOCALE SETUP**:
- Locale: `he` (Hebrew) - RTL
- Locale: `en` (English) - LTR
- Default: `he`

---

### Content Management System (CMS)

**DECISION**: Sanity.io (recommended) OR Payload CMS (self-hosted alternative)

#### Option A: Sanity.io

**PROS**:
- Excellent TypeScript support
- GROQ query language (powerful, flexible)
- Real-time collaboration
- Modern editing experience
- Structured content model
- Good free tier ($0-200/month)
- Fast global CDN
- Easy to extend

**CONS**:
- Hosted (SaaS cost)
- Learning curve for Groq queries
- Pricing scales with users

#### Option B: Payload CMS

**PROS**:
- Open-source, self-hosted
- Full control over infrastructure
- One-time setup cost
- Good admin UI
- Runs on Node.js

**CONS**:
- Requires server management
- Smaller community
- More maintenance overhead
- Setup complexity

**RECOMMENDATION FOR PHASE 1**: Sanity.io (lower maintenance, better for launch)

**POSSIBILITY FOR FUTURE**: Migrate to self-hosted Payload CMS if cost becomes concern

---

### Database & Content Storage

**DECISION**: CMS-managed storage (Sanity.io includes managed DB)

**NOTES**:
- No separate database for web content
- All editorial content lives in CMS
- Donation/form data stored separately (see Payment section)
- Images stored in CMS or Cloudinary

**BACKUP**: Regular exports from CMS (Sanity allows data backup)

---

### Image Optimization

**DECISION**: Next.js `next/image` component + CDN

**IMPLEMENTATION**:
- Use `next/image` for all images in React
- Automatic WebP conversion
- Responsive images
- Lazy loading by default
- Lossless compression

**IMAGE SOURCES**:
- CMS-hosted images (Sanity CDN)
- Cloudinary (optional, if CMS storage insufficient)
- User uploads (form submissions) → Cloudinary

**RESPONSIVE IMAGES**:
- Desktop: up to 1440px
- Tablet: up to 768px
- Mobile: up to 480px
- Auto srcset generation

---

### Font Strategy

**DECISION**: Hosted fonts with fallbacks

#### Hebrew Typography

**FONTS** (select one):
- **Recommended**: Heebo (Google Fonts) - modern, clean
- **Alternative**: IBM Plex Sans Hebrew - professional
- **Fallback**: System-ui, -apple-system, sans-serif

**IMPLEMENTATION**:
- Load via `next/font` (built-in optimization)
- Subset to required characters
- Display: swap (show fallback while loading)

#### English Typography

**FONTS** (select one):
- **Body**: Inter (Google Fonts) - clean, readable
- **Headlines**: Playfair Display (Google Fonts) - editorial, premium
- **Fallback**: serif or sans-serif

**IMPLEMENTATION**: Same as Hebrew

**LOADING STRATEGY**:
- Preload critical fonts (H1, body text)
- Async load decorative fonts
- Minimize FOUT (Flash of Unstyled Text)

---

### Forms & Validation

**DECISION**: React Hook Form + Zod

**REASON**:
- Minimal re-renders
- Type-safe validation (Zod)
- Small bundle size
- Easy to extend
- Great error handling
- RTL-friendly

**FORMS**:
1. Donation form (multi-step)
2. Contact form
3. Newsletter signup
4. (Optional) Comment form

**SERVER-SIDE VALIDATION**: Always validate on server (never trust client)

---

### Payment Integration

**DECISION**: External payment processors (never store card data)

**ISRAEL (ILS)**:
- **Primary**: Matara.pro (existing, verified)
- **Fallback**: Stripe

**INTERNATIONAL (USD/GBP/EUR)**:
- **Primary**: Stripe
- **Secondary**: PayPal

**IMPLEMENTATION**:
- Embedded payment forms (Stripe Elements)
- PCI-compliant (no card data touches our servers)
- Webhooks for payment confirmation
- Tokenization for recurring donations

**SECURITY**: All payment communication via HTTPS, external processor handles card data

---

### Analytics & Tracking

**DECISION**: Google Analytics 4 + Google Tag Manager + event abstraction layer

**IMPLEMENTATION**:
- GA4 property for website
- GTM for tag management
- Custom event abstraction layer (so we can swap providers later)
- UTM parameter tracking through donation funnel

**WHAT TO TRACK**:
- Page views
- CTA clicks (donation, story, building)
- Donation funnel steps
- Conversion events
- Language switches
- Social shares
- (No PII tracked)

---

### Email Service

**DECISION**: SendGrid or Mailgun (transactional emails only)

**USE CASES**:
1. Donation confirmation email
2. Receipt with tax form attachment
3. Newsletter (optional, Phase 2)
4. Contact form responses

**NOT USING**: Hosted mailing list services (yet)

**FUTURE**: Integrate Mailchimp or Klaviyo for marketing automation (Phase 2+)

---

### Hosting & Deployment

**DECISION**: Vercel (Next.js native)

**REASON**:
- Zero-config Next.js deployment
- Global CDN
- Automatic scaling
- Built-in SSL
- Environment variable management
- Preview deployments (for testing)
- Integrated analytics
- Competitive pricing

**ALTERNATIVES CONSIDERED**:
- AWS (more complex, over-engineered)
- Netlify (good, but Vercel better for Next.js)
- Self-hosted (requires DevOps expertise)

**RECOMMENDATION**: Vercel for Phase 1-2, evaluate others if cost becomes issue

---

### Environment Variables & Secrets

**DECISION**: Vercel environment variables + `.env.local` (local development)

**REQUIRED VARIABLES**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (server-only)
- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY` (server-only)
- `MATARA_API_KEY` (server-only)
- `GA_TRACKING_ID` (public)
- `SENDGRID_API_KEY` (server-only)
- etc.

**SECURITY**:
- Never commit secrets to git (.gitignore)
- Rotate keys regularly
- Use separate keys for dev/staging/production
- Audit access logs

---

### Caching Strategy

**DECISION**: Edge caching (Vercel CDN) + ISR (Incremental Static Regeneration)

**STATIC CONTENT** (SSG):
- Homepage: Cache 1 hour
- Pages: Cache 24 hours
- Student stories: Cache 1 hour (updated occasionally)
- News articles: Cache 1 hour (daily updates)

**ISR IMPLEMENTATION**:
- Revalidate on-demand (when content updated in CMS)
- Fallback to stale while revalidate
- Background regeneration

**DYNAMIC CONTENT**:
- Donation page: Cache 30 minutes
- Building updates: Cache 30 minutes

**DATABASE CACHING**:
- Query results cached with ISR
- Webhook from Sanity triggers revalidation

---

### Performance Targets

**METRICS** (Google Core Web Vitals):
- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 500ms

**LIGHTHOUSE TARGETS**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

**OPTIMIZATION TACTICS**:
- Lazy load below-fold images
- Minimize JavaScript (tree-shake unused code)
- Optimize fonts (font-display: swap)
- Use Server Components (reduce JS sent to client)
- Preload critical resources
- Code splitting (dynamic imports)
- CDN for assets (Vercel + Sanity CDN)

---

### Monitoring & Observability

**DECISION**: Vercel Analytics + Sentry (error tracking)

**MONITORING**:
- Page load times (Vercel Analytics)
- Web Vitals (Core Web Vitals)
- Error rates (Sentry)
- Uptime monitoring (UptimeRobot or similar, TBD)

**LOGGING**:
- Server-side errors: Sentry
- Client-side errors: Sentry
- Donation transaction logs: Stripe/Matara logs
- CMS changes: Sanity audit trail

---

### Security Headers

**DECISION**: Implement security headers via Vercel config

**HEADERS TO IMPLEMENT**:
- `Content-Security-Policy` (restrict unsafe content)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (clickjacking protection)
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (restrict browser features)

**HTTPS**: Enforced by Vercel (automatic SSL)

---

### Rate Limiting & DDoS Protection

**DECISION**: Vercel DDoS protection + Cloudflare (optional, Phase 2)

**ENDPOINTS TO PROTECT**:
- `/api/donate` (payment)
- `/api/contact` (contact form)
- All API routes

**RATE LIMITING**:
- 10 requests per minute per IP (contact form)
- 5 requests per minute per IP (payment)
- 100 requests per minute per IP (other endpoints)

**IMPLEMENTATION**: Custom middleware in Next.js

---

### Error Handling

**DECISION**: Structured error handling with user-friendly messages

**STRATEGY**:
- **4xx Errors** (client fault):
  - 400: Bad request (invalid form data)
  - 404: Not found (page doesn't exist)
  - 429: Too many requests (rate limit)
- **5xx Errors** (server fault):
  - 500: Server error (log to Sentry)
  - 503: Service unavailable (maintenance)

**USER-FACING**:
- Generic messages (don't expose internals)
- Suggest next steps
- Contact information for issues
- Log full error details server-side

---

### Accessibility Standards

**DECISION**: WCAG 2.2 Level AA compliance

**REQUIREMENTS**:
- Semantic HTML (proper heading hierarchy, landmarks)
- ARIA labels (form labels, buttons, live regions)
- Keyboard navigation (all interactive elements)
- Focus management (visible focus styles)
- Color contrast (4.5:1 for text, 3:1 for graphics)
- Alt text (all images)
- Captions (videos)
- Skip navigation link
- Reduced motion support

**TESTING**:
- axe DevTools
- WAVE
- Lighthouse
- Manual keyboard testing
- Screen reader testing (NVDA, JAWS)

---

### RTL/LTR Handling

**DECISION**: Native CSS support + next-intl locale routing

**IMPLEMENTATION**:
- `dir="rtl"` on `<html>` for Hebrew
- `dir="ltr"` on `<html>` for English
- Tailwind RTL mode (if using)
- Careful CSS (not assuming left/right)

**CHALLENGES**:
- Images (flipped or directional?)
- Flexbox direction reversal
- Margin/padding adjustments
- Icon rotation (if appropriate)

**TESTING**:
- Hebrew content layout check
- English content layout check
- Mixed content (minimal, but check)

---

### Testing Strategy

**DECISION**: Automated testing + manual testing (comprehensive but pragmatic)

**UNIT TESTS** (not comprehensive):
- Utility functions
- Form validation logic
- API helpers

**INTEGRATION TESTS**:
- CMS content fetching
- Payment flow (sandbox)
- Form submissions

**E2E TESTS** (key flows):
- Homepage load and navigation
- Donation funnel (all steps)
- Student story viewing
- Language switching

**TOOLS**:
- Jest (unit/integration)
- Playwright (E2E)
- Lighthouse (performance)

**COVERAGE TARGET**: 60-70% (pragmatic, focus on critical paths)

---

## REQUIRED DEPENDENCIES

### Core

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.0"
}
```

### Internationalization

```json
{
  "next-intl": "^2.20.0"
}
```

### CMS & Content

```json
{
  "@sanity/client": "^6.0.0",
  "@sanity/image-url": "^1.0.0",
  "@portabletext/react": "^3.0.0"
}
```

### Styling

```json
{
  "tailwindcss": "^3.3.0",
  "postcss": "^8.4.0"
}
```

### Forms & Validation

```json
{
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

### Payment

```json
{
  "@stripe/react-stripe-js": "^2.4.0",
  "@stripe/stripe-js": "^1.46.0"
}
```

### Analytics

```json
{
  "@next/third-parties": "latest"
}
```

### Utilities

```json
{
  "clsx": "^2.0.0",
  "date-fns": "^2.30.0"
}
```

### Development

```json
{
  "eslint": "^8.50.0",
  "eslint-config-next": "^14.0.0",
  "prettier": "^3.0.0"
}
```

---

## DEPLOYMENT CHECKLIST

- [ ] Vercel project created and configured
- [ ] Environment variables set (production)
- [ ] Domain configured (orchotchaim.co.il)
- [ ] SSL certificate active
- [ ] DNS records verified
- [ ] Sanity.io project connected
- [ ] Payment keys configured (production)
- [ ] Analytics tracking ID set
- [ ] Email service keys configured
- [ ] Sentry project created and connected
- [ ] Monitoring alarms configured
- [ ] Backup strategy documented
- [ ] Rollback plan documented

---

**STATUS**: IMPLEMENTATION READY

This architecture supports a performant, secure, scalable website focused on content and fundraising, not unnecessary complexity.
