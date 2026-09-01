# Sitemap & Information Architecture: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Site Structure  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## EXECUTIVE SUMMARY

This document defines the complete information architecture, URL structure, and navigation hierarchy for the redesigned website.

The website supports:
- **Primary language**: Hebrew (he)
- **Secondary language**: English (en)
- **Primary direction**: RTL (Hebrew) / LTR (English)
- **Canonical domain**: https://orchotchaim.co.il

---

## URL STRUCTURE & ROUTING

### Base Structure

```
https://orchotchaim.co.il
  /he/          → Hebrew site root
  /en/          → English site root
```

### Language Detection & Routing

**Default behavior**:
1. User visits `orchotchaim.co.il` or root paths
2. Browser language preference detected
3. Redirect to `/he/` (Hebrew) or `/en/` based on preference
4. User can switch language (toggle in header/footer)
5. Language preference stored in localStorage

**Direct language access**:
- `/he/` → Always serves Hebrew
- `/en/` → Always serves English

---

## COMPLETE SITEMAP

### HEBREW SITE: `/he/`

```
/he/
  ├─ /               → Homepage
  ├─ /about          → About the Yeshiva
  ├─ /approach       → Learning Approach
  ├─ /students/      → Students Directory
  │  └─ /[slug]      → Individual Student Story
  ├─ /building/      → Building Project Overview
  │  └─ /updates/    → Building Updates Directory
  │     └─ /[slug]   → Individual Update
  ├─ /gallery/       → Photo Gallery
  ├─ /news/          → News & Updates
  │  └─ /[slug]      → Individual Article
  ├─ /leadership/    → Leadership Team
  │  └─ /[slug]      → Individual Profile
  ├─ /history/       → Institutional History
  ├─ /donate/        → Donation Experience
  │  ├─ /amount      → Step: Amount Selection
  │  ├─ /location    → Step: Country/Currency
  │  ├─ /details     → Step: Donor Information
  │  ├─ /payment     → Step: Payment
  │  └─ /thank-you   → Confirmation
  ├─ /campaign/[slug]/ → Campaign Pages
  ├─ /contact/       → Contact Information
  └─ /404            → Not Found Page
```

### ENGLISH SITE: `/en/`

```
/en/
  ├─ /               → Homepage
  ├─ /about          → About the Yeshiva
  ├─ /approach       → Learning Approach
  ├─ /students/      → Students Directory
  │  └─ /[slug]      → Individual Student Story
  ├─ /building/      → Building Project Overview
  │  └─ /updates/    → Building Updates Directory
  │     └─ /[slug]   → Individual Update
  ├─ /gallery/       → Photo Gallery
  ├─ /news/          → News & Updates
  │  └─ /[slug]      → Individual Article
  ├─ /leadership/    → Leadership Team
  │  └─ /[slug]      → Individual Profile
  ├─ /history/       → Institutional History
  ├─ /donate/        → Donation Experience
  │  ├─ /amount      → Step: Amount Selection
  │  ├─ /location    → Step: Country/Currency
  │  ├─ /details     → Step: Donor Information
  │  ├─ /payment     → Step: Payment
  │  └─ /thank-you   → Confirmation
  ├─ /campaign/[slug]/ → Campaign Pages
  ├─ /contact/       → Contact Information
  └─ /404            → Not Found Page
```

---

## PAGE HIERARCHY & NAVIGATION

### Primary Navigation (Header)

**All pages show main navigation**:

**Hebrew**:
- ישיבה (Home/About)
- גישה (Approach)
- תלמידים (Students)
- בנייה (Building)
- גלריה (Gallery)
- חדשות (News)
- אני רוצה להיות שותף (Donate) ← CTA

**English**:
- Yeshiva
- Approach
- Students
- Building
- Gallery
- News
- Donate ← CTA

### Secondary Navigation (Footer)

**About Section**:
- About
- Leadership
- History
- Contact

**Resources**:
- News
- Gallery
- Building Updates
- Newsletter signup

**Donate Section**:
- Make a Donation
- Campaign Page
- Becoming a Partner

**Legal/Settings**:
- Privacy Policy
- Terms of Use
- Accessibility
- Language Toggle

---

## DETAILED PAGE DESCRIPTIONS

### `/he/` | `/en/` — HOMEPAGE

**Purpose**: Introduce yeshiva, build emotional connection, drive donation conversion

**Sections** (narrative order):
1. Hero (mission + CTA)
2. Trust Strip (credentials)
3. Meet the Yeshiva (differentiation)
4. Personal Relationship (core value)
5. Student Stories (featured 2-3 stories)
6. Impact (transformation narrative)
7. Building Project (fundraising centerpiece)
8. Why Now (urgency + need)
9. Donation Tiers (psychological conversion)
10. Testimonials (social proof)
11. Leadership (institutional trust)
12. Gallery Preview (authenticity)
13. Latest News (engagement)
14. Final CTA (partnership moment)
15. Footer

**Dynamic Content**: Pulls latest news, featured student stories, building updates

**CTA Density**: Minimum 3 donation CTAs (hero, building, final), all linking to `/donate`

---

### `/he/about` | `/en/about` — ABOUT THE YESHIVA

**Purpose**: Educate visitor on yeshiva's mission, approach, values

**Content**:
- Mission statement
- History overview (with link to `/history`)
- Learning approach (with link to `/approach`)
- Student demographics
- Impact overview
- Building project context (with link to `/building`)
- How to get involved
- Contact information

**Navigation**:
- Link to `/approach`
- Link to `/building`
- Link to `/history`
- Link to `/donate`
- Link to `/contact`

---

### `/he/approach` | `/en/approach` — LEARNING APPROACH

**Purpose**: Explain what makes this yeshiva different - personal relationships, pedagogy

**Content**:
- Personal relationship philosophy
- One-on-one mentorship model
- Rigorous Torah study
- Character development
- Community aspect
- How students are supported
- Alumni outcomes
- Student testimonials (if available)

**Visual**:
- Real photos of learning, mentoring, community
- No stock photography

**CTA**: Link to `/students` and `/donate`

---

### `/he/students/` | `/en/students/` — STUDENTS DIRECTORY

**Purpose**: Build emotional connection by highlighting real individuals

**Content**:
- Grid of featured student stories (minimum 6, ideally more)
- Each card shows: photo, name, opening line, CTA "Read Story"

**Filtering/Sorting**: Optional
- By year (first year, second year, third year)
- By journey (searching, growth, impact)

**Design**:
- Responsive grid (desktop: 3 columns, tablet: 2, mobile: 1)
- Lightbox view for previews
- Link to individual story pages

---

### `/he/students/[slug]` | `/en/students/[slug]` — INDIVIDUAL STUDENT STORY

**Purpose**: Deep narrative of student's journey and transformation

**Content** (from CMS):
- Full-size hero image
- Student name and subtitle
- Opening hook
- Full story narrative
- Impact statement
- Optional: video testimony
- Optional: student quote
- Related student stories (sidebar/below)
- CTA: "Support students like [name]" → `/donate`

**Metadata**:
- SEO title, description
- OG image for social sharing
- Author (if applicable)
- Published date
- Related stories (cross-links)

---

### `/he/building/` | `/en/building/` — BUILDING PROJECT OVERVIEW

**Purpose**: Central fundraising narrative - introduce the building project

**Content**:
- Vision & purpose
- Current vs. future comparison (images)
- Timeline (construction phases)
- Building specifications [TBD]
- Impact of new facility
- How to support (link to `/donate?campaign=building`)
- Latest updates (pulls from BuildingUpdate content)

**Visual**:
- Current building photos
- Architectural rendering (if available)
- Construction progress photos
- Timeline graphic

**CTA**: "Become a Building Partner" → `/donate?campaign=building`

---

### `/he/building/updates/` | `/en/building/updates/` — BUILDING UPDATES DIRECTORY

**Purpose**: Ongoing construction progress transparency

**Content**:
- Chronological grid of updates
- Each update: date, title, photo, excerpt
- Filter by: milestone, timeline phase

**Design**:
- Latest updates first
- Pagination for archive
- Search by date/keyword

---

### `/he/building/updates/[slug]` | `/en/building/updates/[slug]` — INDIVIDUAL UPDATE

**Purpose**: Detailed progress report with photos, construction details

**Content**:
- Title and date
- Detailed description
- Photo gallery from update
- Progress percentage (if available)
- Next milestone
- Related updates

**Sharing**: OG tags for social media previews

---

### `/he/gallery/` | `/en/gallery/` — PHOTO GALLERY

**Purpose**: Visual storytelling showing yeshiva in action

**Content**:
- Responsive image grid
- Categorized: Students, Learning, Beit Midrash, Staff, Building, Events, Community
- Optional filters/tabs

**Features**:
- Lightbox/modal view
- Image captions
- Alt text for accessibility
- Lazy loading
- No stock photography (all real)

---

### `/he/news/` | `/en/news/` — NEWS & UPDATES DIRECTORY

**Purpose**: Keep visitors engaged with latest yeshiva activities

**Content**:
- Grid of latest articles
- Each: featured image, date, category badge, headline, excerpt, "Read More" link
- Latest first
- Pagination/infinite scroll

**Categories**: Yeshiva Updates, Building, Events, Students, Community, Torah

---

### `/he/news/[slug]` | `/en/news/[slug]` — INDIVIDUAL ARTICLE

**Purpose**: Full article with details, sharing options

**Content**:
- Featured image
- Title and date
- Author
- Full content
- Related articles
- Social sharing buttons (WhatsApp, Facebook, Email)
- Comment section (optional, TBD)

**Metadata**: SEO title, description, OG tags

---

### `/he/leadership/` | `/en/leadership/` — LEADERSHIP TEAM

**Purpose**: Attach trusted faces to institution

**Content**:
- Grid of leadership members
- Each: photo, name, title/role, short bio
- Clickable cards for detailed profiles

**Prominently featured**: Rabbi Chaim Kirzon (Rosh Hayeshiva)

---

### `/he/leadership/[slug]` | `/en/leadership/[slug]` — INDIVIDUAL PROFILE

**Purpose**: Deep bio and philosophy of each leader

**Content**:
- Professional portrait
- Full biography
- Role and responsibilities
- Teaching philosophy (if applicable)
- Contact (if publicly available)
- Related articles/news

---

### `/he/history/` | `/en/history/` — INSTITUTIONAL HISTORY

**Purpose**: Build trust through proven track record

**Content**:
- Visual timeline (vertical desktop, horizontal mobile)
- Milestones with years
- Growth narrative
- Key events
- Alumni impact

**Format**:
- Minimal text, visual focus
- Each milestone: year, icon/image, headline, optional details

---

### `/he/donate/` | `/en/donate/` — DONATION ENTRY POINT

**Purpose**: Begin donation funnel with emotional motivation

**Content** (from CMS or hardcoded):
- Compelling headline: "אני רוצה להיות שותף"
- Emotional appeal paragraph
- Key benefit bullets
- CTA Button: "Start Partnership" → `/donate/amount`

**Design**:
- Optional small hero image or background
- Focus on copy and CTA
- Single clear next step

**Mobile**: Fast loading, clear CTA

---

### `/he/donate/amount` | `/en/donate/amount` — STEP 1: AMOUNT SELECTION

**Purpose**: Visitor chooses suggested amount or custom

**Content**:
- "כמה תרצו לתרום?" heading
- 4 suggested tiers (displayed as cards)
- Custom amount input field
- Frequency toggle: One-Time / Monthly
- "Continue" button → `/donate/location`

**Suggested Amounts** [TBD - REQUIRES VERIFICATION]:
- ₪180 | Daily Partner
- ₪500 | Student Partner
- ₪1,800 | Monthly Partner
- ₪5,000 | Building Partner

**Design**:
- Large, bold amounts
- Clear selection state
- Mobile: full-width cards, vertically stacked

---

### `/he/donate/location` | `/en/donate/location` — STEP 2: COUNTRY & CURRENCY

**Purpose**: Geolocation-based payment method selection

**Content**:
- "איפה אתם?" heading
- Country dropdown (with flag icons)
- Currency display (auto-set, user can override)
- Messaging specific to country (tax deductibility, payment options)
- "Continue" button → `/donate/details`

**Logic**:
- JavaScript geolocation detection (with consent)
- Set country/currency automatically
- User can override
- Remember preference (localStorage)

---

### `/he/donate/details` | `/en/donate/details` — STEP 3: DONOR INFORMATION

**Purpose**: Collect minimal required information

**Form Fields**:
- Full Name (required)
- Email (required)
- Phone (optional)
- Country (pre-filled from step 2, can override)
- Email preferences (checkboxes: updates, newsletter)

**Copy**:
- "We'll use this for receipting and updates"
- Privacy assurance: "We never share your information"
- Link to privacy policy

**Validation**: Real-time error feedback, required field indicators

**Button**: "Continue" → `/donate/payment`

**Mobile**: Full-width fields, large font, mobile-friendly

---

### `/he/donate/payment` | `/en/donate/payment` — STEP 4: PAYMENT

**Purpose**: Secure payment processing

**Content**:
- Summary: amount, frequency, donor name
- Payment method selection (context-specific by country)
- Security messaging: "🔒 Secure payment powered by [Processor]"
- "Complete Donation" button

**Payment Processors** [TBD]:
- **Israel (ILS)**: Matara.pro (primary), Stripe (fallback)
- **International (USD/GBP/EUR)**: Stripe (primary), PayPal (secondary)

**Design**:
- Clear summary of what's being charged
- Mobile wallet support (Apple Pay, Google Pay)
- Error handling with retry options
- No autofocus on payment field (accessibility)

**Security**: HTTPS, external processor (no card data storage), PCI compliance

---

### `/he/donate/thank-you` | `/en/donate/thank-you` — CONFIRMATION

**Purpose**: Celebrate donation, enable sharing, enable retention

**Content**:
- ✓ Gratitude header
- Donation summary (amount, frequency, type)
- Transaction ID
- "Confirmation email sent to: [email]"
- Next steps:
  - Stay informed: WhatsApp, Email, Newsletter signup
  - Share: Customizable message for WhatsApp, Facebook, Email, Copy Link
  - Questions: Contact info
- CTAs: "Return to Home", "View Building Updates"

**Design**:
- Celebratory tone
- Clear sharing options
- Mobile-optimized
- Fast loading

**Email Flow**: Transactional email sent immediately with receipt

---

### `/he/campaign/[slug]` | `/en/campaign/[slug]` — CAMPAIGN PAGES

**Purpose**: Targeted fundraising campaigns for specific initiatives

**Example Campaigns** [from CMS]:
- `building` → Building project campaign
- `annual` → Annual giving campaign
- `purim` → Holiday-specific giving
- etc.

**Content** (from CMS):
- Campaign hero image/video
- Campaign story
- Goal and progress (if available)
- Donor count (if available)
- Donation tiers (campaign-specific)
- Featured testimonials
- Related student stories
- CTA: "Become a Partner" → `/donate?campaign=[slug]`

**URL Parameters**: Campaign slug preserved through donation funnel for attribution

---

### `/he/contact/` | `/en/contact/` — CONTACT INFORMATION

**Purpose**: Provide all ways to reach the yeshiva

**Content**:
- Rabbi Chaim Kirzon contact (personal)
- Office contact
- Mailing address
- Phone
- Email
- Office hours (if applicable)
- WhatsApp link (if applicable)
- Map/location embed
- Contact form (optional, TBD)

**Social**:
- Links to social media profiles

**Tones**: Warm, accessible, welcoming

---

### `/404` or Error Pages

**Purpose**: Handle broken/unknown URLs gracefully

**Content**:
- Friendly message
- Link back to homepage
- Navigation options
- Suggest: `/donate`, `/about`, `/contact`

**Design**: Consistent with site design, helpful rather than error-focused

---

## NAVIGATION PATTERNS

### Sticky Donation CTA (All Pages)

**Desktop**: Subtle floating button or sticky footer CTA
**Mobile**: Sticky bottom CTA "תרמו עכשיו" or "Donate Now"
- Visible on scroll but not intrusive
- Disappears if user already on donation page

---

### Breadcrumb Navigation (Dynamic Routes)

Example breadcrumbs:
- Homepage > Students > David's Story
- Homepage > Building > Updates > Foundation Complete

**Format**: `Home > Parent > Current Page`

**Implementation**: Schema markup for SEO, visible in header

---

### Language Toggle

**Location**: Header and footer
**Behavior**: Switch between `/he/` and `/en/` while preserving route
- User on `/he/about` clicks "English" → `/en/about`
- Remember preference for future visits

---

## DYNAMIC ROUTES & SLUG GENERATION

### Student Stories

**Slug format**: `/students/[slug]`
- Slug generated from: `{firstName}-{lastName}` or nickname
- Example: `/students/david-levi` or `/students/david`
- Case-insensitive
- URL-safe (hyphens for spaces)

---

### Building Updates

**Slug format**: `/building/updates/[slug]`
- Slug generated from: Title (auto-generated or manual)
- Example: `/building/updates/foundation-complete`
- URL-safe, date-agnostic (no dates in URL)

---

### News Articles

**Slug format**: `/news/[slug]`
- Slug generated from: Article title
- Example: `/news/sukkot-celebration-2026`
- No dates in URL (better for evergreen content)

---

### Leadership Profiles

**Slug format**: `/leadership/[slug]`
- Slug generated from: Name
- Example: `/leadership/rabbi-chaim-kirzon`

---

### Campaigns

**Slug format**: `/campaign/[slug]`
- Slug set manually for clarity
- Example: `/campaign/building`, `/campaign/annual`, `/campaign/purim`

---

## REDIRECTS FROM OLD SITE

| Old URL | New URL | Status |
|---------|---------|--------|
| `/תרומות/` | `/he/donate` | 301 |
| `/` | `/he/` | 301 |
| `/index.php` | `/he/` | 301 |
| Other old pages | `/he/` | 301 (generic) |

**Implementation**: Via `next.config.js` redirects

---

## 404 & ERROR HANDLING

**Routes not found**:
- `/he/unknown-page` → `/404` with Hebrew message
- `/en/unknown-page` → `/404` with English message

**Search engines**:
- 404 pages return HTTP 410 (Gone) or 404 (Not Found)
- Sitemap excludes 404 pages

---

## ACCESSIBILITY REQUIREMENTS

**All routes must support**:
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader (semantic HTML, ARIA labels)
- Focus management (visible focus states)
- Color contrast (WCAG 2.2 AA minimum)
- Alt text on all images
- Proper heading hierarchy (H1 → H2 → H3)

---

## SEO STRUCTURE

**Every page includes**:
- Unique `<title>` tag (50-60 characters)
- Unique `<meta name="description">` (155-160 characters)
- `<link rel="canonical">` (self-referential)
- `<link rel="alternate" hreflang>` (all language versions)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter/X card tags (if relevant)

**Sitemap**:
- `/sitemap.xml` index
- `/sitemap-pages.xml`
- `/sitemap-news.xml`
- `/sitemap-students.xml`
- All routes indexed except 404/private

---

## IMPLEMENTATION NOTES

### Next.js Routing

**File structure** (App Router):
```
app/
  [locale]/
    layout.tsx
    page.tsx
    about/
      page.tsx
    students/
      page.tsx
      [slug]/
        page.tsx
    building/
      page.tsx
      updates/
        page.tsx
        [slug]/
          page.tsx
    donate/
      page.tsx
      amount/
        page.tsx
      location/
        page.tsx
      details/
        page.tsx
      payment/
        page.tsx
      thank-you/
        page.tsx
    campaign/
      [slug]/
        page.tsx
    gallery/
      page.tsx
    news/
      page.tsx
      [slug]/
        page.tsx
    leadership/
      page.tsx
      [slug]/
        page.tsx
    history/
      page.tsx
    contact/
      page.tsx
    404.tsx
    not-found.tsx
```

### Internationalization

**Using `next-intl` library**:
- Locale prefix in URL: `/he/`, `/en/`
- Automatic routing based on locale
- Dictionary-based translations
- Client-side language switching

---

## VALIDATION CHECKLIST

- [ ] All Hebrew routes use `/he/` prefix
- [ ] All English routes use `/en/` prefix
- [ ] Donation funnel routes are consistent
- [ ] Student story slugs are URL-safe
- [ ] Building update slugs are URL-safe
- [ ] News article slugs are URL-safe
- [ ] Campaign slugs are manual/consistent
- [ ] Leadership profile slugs match names
- [ ] Breadcrumbs work on all dynamic routes
- [ ] Language toggle preserves current route
- [ ] 404 page is accessible and helpful
- [ ] Old `/תרומות/` URL redirects correctly
- [ ] Sitemap includes all routes
- [ ] All routes have SEO metadata

---

**Status**: IMPLEMENTATION READY

This sitemap defines the complete URL structure and page hierarchy for the Yeshivat Orchot Chaim website.
