# SEO Specification: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Search Engine Optimization  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## SEO STRATEGY OVERVIEW

**Goal**: Rank highly in Hebrew search for "תרומה לישיבה" and related terms; establish English presence for international donors

**Approach**: 
- Content-first SEO (excellent copy attracts links)
- Technical excellence (crawlability, speed, security)
- On-page optimization (metadata, schema)
- Link building (partnerships, press coverage)
- Local SEO (Jerusalem, Israel)

---

## TARGET KEYWORDS

### Hebrew Keywords (Priority Order)

**Commercial Intent** (high conversion):
1. "תרומה לישיבה" (donation to yeshiva)
2. "ישיבה בירושלים" (yeshiva in Jerusalem)
3. "תרמו לישיבה" (donate to yeshiva)
4. "ישיבה ארחות חיים" (Yeshivat Orchot Chaim - branded)

**Informational Intent** (awareness):
5. "ישיבה בישראל" (yeshiva in Israel)
6. "יחס אישי בישיבה" (personal relationship in yeshiva)
7. "ישיבה תורה" (yeshiva Torah learning)
8. "ישיבה מודרנית" (modern yeshiva)

**Target Volume**: 50-500 monthly searches per term

### English Keywords (For International Audience)

**Commercial Intent**:
1. "Support yeshiva" / "Donate to yeshiva"
2. "Jerusalem yeshiva"
3. "Torah learning yeshiva"
4. "Yeshiva donation"

**Informational Intent**:
5. "Yeshiva in Israel"
6. "Personal relationship yeshiva"
7. "Israeli yeshiva"
8. "Study Torah in Jerusalem"

---

## ON-PAGE SEO ELEMENTS

### Page Title Tag

**Format**: `[Page Title] | Yeshivat Orchot Chaim` (Hebrew) / `[Page Title] | Orchot Chaim Yeshiva` (English)

**Length**: 50-60 characters (including brand)

**Examples**:
- Hebrew: `תורות ישיבה ארחות חיים | ישיבה בירושלים`
- English: `Support Torah Learning | Orchot Chaim Yeshiva`

**Best Practices**:
- Include primary keyword first (if natural)
- Include brand at end (builds recognition)
- No keyword stuffing
- Make it compelling (CTR matters for ranking)

### Meta Description

**Format**: Natural sentence, 150-160 characters

**Purpose**: Encourage click-through from search results (not direct ranking signal, but impacts CTR)

**Examples**:
- Hebrew: `ישיבה ארחות חיים נמצאת בירושלים. אנחנו מציעים למידת תורה עם יחס אישי וקשר עמוק עם רב. תרמו כעת.`
- English: `Orchot Chaim Yeshiva in Jerusalem offers Torah learning with personal mentorship. Support our mission to transform lives through Torah.`

**Best Practices**:
- Include primary keyword (not required, but helpful)
- Unique per page (not duplicated)
- Compelling CTA or benefit statement
- No keyword stuffing

### Heading Hierarchy

**H1** (one per page):
- Unique, descriptive
- Should match (or relate to) page title
- Example: `שיתופות בתרומה לישיבה` (Donation Partnerships)

**H2** (multiple, logical grouping):
- Sub-sections
- Example: `תרומה בתוך גבולות ישראל` (Giving in Israel)

**H3+** (as needed):
- Further nesting
- No gaps (H1 → H2 → H3, never H1 → H3)

**NO**: Multiple H1s on same page

### URL Slugs

**Format**: Lowercase, hyphens, descriptive

**Good**:
- `/he/donate` ✓
- `/he/students/david-levi` ✓
- `/he/building/updates/foundation-complete` ✓

**Bad**:
- `/he/page1`, `/donate-page-v2` ✗

---

## TECHNICAL SEO

### XML Sitemap

**File**: `/sitemap.xml` (index file)

**Structure**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-pages.xml</loc>
    <lastmod>2026-09-01</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-news.xml</loc>
    <lastmod>2026-09-01</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-students.xml</loc>
    <lastmod>2026-09-01</lastmod>
  </sitemap>
</sitemapindex>
```

**Include**:
- All public pages
- Student stories
- Building updates
- News articles
- Campaigns
- Leadership profiles

**Exclude**:
- 404 pages
- Private/draft content
- Duplicate content (different language = different URL, so include both)

**Submit to**: Google Search Console, Bing Webmaster Tools

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Allow: /api/public/

Sitemap: https://orchotchaim.co.il/sitemap.xml
```

### Canonical Tags

**Purpose**: Prevent duplicate content issues

**Usage**: Every page should have:
```html
<link rel="canonical" href="https://orchotchaim.co.il/he/donate" />
```

**Rule**: Self-referential (page points to itself)

**Not used for**:
- hreflang alternatives (separate tag)
- Pagination (no canonical between pages)

### hreflang (International/Language)

**Purpose**: Tell Google about Hebrew vs. English versions

**Implementation**:

Hebrew page:
```html
<link rel="alternate" hreflang="he" href="https://orchotchaim.co.il/he/donate" />
<link rel="alternate" hreflang="en" href="https://orchotchaim.co.il/en/donate" />
<link rel="canonical" href="https://orchotchaim.co.il/he/donate" />
```

English page:
```html
<link rel="alternate" hreflang="he" href="https://orchotchaim.co.il/he/donate" />
<link rel="alternate" hreflang="en" href="https://orchotchaim.co.il/en/donate" />
<link rel="canonical" href="https://orchotchaim.co.il/en/donate" />
```

### Open Graph Tags

**Purpose**: Control how content appears on social media

**Every page should have**:
```html
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://orchotchaim.co.il/og-image.png" />
<meta property="og:url" content="https://orchotchaim.co.il/he/donate" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Orchot Chaim Yeshiva" />

<!-- Language -->
<meta property="og:locale" content="he_IL" /> (Hebrew)
<meta property="og:locale" content="en_US" /> (English)
```

**Image**: 1200 × 630px (recommended)

### Twitter / X Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="URL to image" />
```

---

## SCHEMA MARKUP

### Organization Schema

**Every page should include**:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yeshivat Orchot Chaim",
  "url": "https://orchotchaim.co.il",
  "logo": "https://orchotchaim.co.il/logo.png",
  "description": "Torah learning yeshiva in Jerusalem",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "Jerusalem",
    "addressCountry": "IL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+972-2-6426587",
    "email": "[Email]"
  },
  "sameAs": [
    "https://www.facebook.com/[page]",
    "https://www.instagram.com/[account]"
  ]
}
```

### Breadcrumb Schema

**On dynamic pages** (e.g., student stories):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://orchotchaim.co.il/he/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Students",
      "item": "https://orchotchaim.co.il/he/students"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "David's Story",
      "item": "https://orchotchaim.co.il/he/students/david-levi"
    }
  ]
}
```

### Article Schema

**On news articles, student stories, building updates**:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Short description",
  "image": "URL to image",
  "datePublished": "2026-09-01T10:00:00Z",
  "dateModified": "2026-09-01T14:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Rabbi Chaim Kirzon"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Yeshivat Orchot Chaim",
    "logo": "https://orchotchaim.co.il/logo.png"
  }
}
```

### Video Schema (if applicable)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Video description",
  "thumbnailUrl": "https://example.com/photo1.jpg",
  "uploadDate": "2026-09-01T10:00:00Z",
  "duration": "PT5M30S",
  "contentUrl": "https://www.youtube.com/embed/[VIDEO_ID]"
}
```

**Test with**: Google Rich Results Test

---

## TECHNICAL PERFORMANCE

### Page Speed

**Lighthouse Target**:
- Performance: 90+
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimization tactics**:
- Lazy load images (below fold)
- Minify CSS/JavaScript
- Use Next.js Server Components (reduce JS)
- Preload critical fonts
- Enable Gzip compression
- Use CDN (Vercel + Sanity CDN)

### HTTPS & Security

**Required**: HTTPS everywhere (Vercel provides)

**Headers**:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy` (restrict unsafe content)
- `X-Content-Type-Options: nosniff`

### Mobile Friendly

**Test with**: Google Mobile-Friendly Test

**Requirements**:
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Font size: 16px minimum (no small fonts)
- Touch targets: 48px+ buttons
- No interstitials blocking content
- Responsive design (works at all widths)

### Core Web Vitals

**Monitor via**: Google Search Console

**Targets**:
- LCP: < 2.5s
- FID: < 100ms (or INP < 200ms in newer spec)
- CLS: < 0.1

---

## LINK BUILDING STRATEGY

### Internal Linking

**Best practices**:
- Link to related stories within story cards
- Link from campaign pages to student stories
- Link from news to relevant building updates
- Use descriptive anchor text (not "click here")

**Example anchor text**:
- ✓ "Read about David's Torah transformation"
- ✗ "click here"

### External Linking

**Earn backlinks from**:
- Press coverage (local Jerusalem news, Jewish publications)
- Directory listings (Israeli nonprofit directories)
- Partnerships with other yeshivas
- Educational websites
- Donor advisory boards

**Do NOT buy links** (violates Google guidelines)

### Local SEO

**Google Business Profile**:
- Name: Yeshivat Orchot Chaim
- Address: [Full Address]
- Phone: [Office Phone]
- Categories: Educational Institution, Nonprofit
- Website: orchotchaim.co.il
- Photos: Real building and learning environment
- Open: Hours and holiday closures

**Local Citations**:
- Ensure consistent name, address, phone across web
- List on: Walla!, Tapuz, Israeli nonprofit databases
- Claim profiles on: Google Maps, Yandex (if applicable)

---

## MONITORING & ONGOING OPTIMIZATION

### Google Search Console

**Setup**:
1. Add property (Hebrew and English versions)
2. Verify ownership (via DNS or meta tag)
3. Submit sitemap
4. Monitor performance

**Monitor**:
- Impressions (queries people search)
- Clicks (people visit from search)
- CTR (click-through rate)
- Average Position (where you rank)
- Coverage issues (crawl errors)
- Security issues

### Google Analytics 4

**Setup**: Track all events (see analytics-specification.md)

**Monitor**:
- Traffic sources (organic search vs. direct)
- Landing pages
- Bounce rate (especially for landing pages)
- Conversion rate (donations from organic search)
- User segments (Israel vs. international)

### SEO Audit Schedule

**Monthly**:
- Check Google Search Console for issues
- Review top-performing keywords
- Review top-performing pages
- Check for technical errors (404s, redirects)

**Quarterly**:
- Full site crawl (Screaming Frog or similar)
- Backlink profile review
- Competitor analysis
- Keyword ranking review

**Annually**:
- Core Web Vitals review
- Content refresh (update old articles)
- Link building strategy review

---

## CONTENT STRATEGY FOR SEO

### Keyword-Driven Content

**Strategy**: Create content around target keywords

**Example**:
- Target: "יחס אישי בישיבה" (personal relationship in yeshiva)
- Content: Page or article explaining mentorship model
- Link: From homepage and donation pages

### Evergreen Content

**Creates lasting SEO value**:
- About page (always relevant)
- Student stories (valuable anytime)
- Learning approach (timeless)
- Building project (ongoing)

**Do not deprecate too quickly** (archive old articles, don't delete)

### Regular Publishing

**Benefits ranking**:
- Fresh content signals activity
- More pages = more entry points
- Building updates keep site fresh

**Minimum**: 1-2 news articles per month

---

## REDIRECT STRATEGY

**From old URLs** (WordPress):

```
/תרומות/ → /he/donate (301 permanent)
/ → /he/ (301 permanent)
/any-old-page → /he/ (catch-all, 301)
```

**Implementation**: Via `next.config.js` redirects

**Preserve domain authority**: Redirects pass ranking power

---

## SEO AUDIT CHECKLIST

**Pre-Launch**:
- [ ] Title tags unique and keyword-optimized
- [ ] Meta descriptions written for every page
- [ ] Heading hierarchy correct (H1, H2, H3)
- [ ] Internal links descriptive and relevant
- [ ] Images have alt text (Hebrew + English)
- [ ] hreflang tags correct for Hebrew/English
- [ ] Canonical tags self-referential
- [ ] Open Graph tags complete
- [ ] Schema markup implemented
- [ ] Sitemap submitted
- [ ] robots.txt correct
- [ ] Mobile-friendly test passed
- [ ] Core Web Vitals on track
- [ ] Page speed 90+ Lighthouse
- [ ] No crawl errors in Search Console
- [ ] Redirects working (old URLs → new)
- [ ] HTTPS enforced
- [ ] Security headers present

---

**STATUS**: IMPLEMENTATION READY

This SEO specification provides a foundation for technical excellence and organic search visibility.
