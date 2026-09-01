# SEO Plan: Yeshivat Orchot Chaim

**Document**: PHASE 1 Discovery — Search Optimization Strategy  
**Status**: For Review  
**Date**: September 1, 2026

---

## EXECUTIVE SUMMARY

This document outlines the search engine optimization strategy for the redesigned Yeshivat Orchot Chaim website.

**Goals**:
1. Increase organic search visibility for key fundraising keywords
2. Support international search (English + Hebrew)
3. Maintain existing domain authority
4. Build backlink profile through storytelling and partnerships
5. Maximize SEO for donor acquisition keywords

---

## KEYWORD STRATEGY

### Primary Keywords (Hebrew)

**Informational** (awareness-building):
- ישיבה בירושלים (Yeshiva in Jerusalem)
- ישיבה לצעירים (Yeshiva for young men)
- תורה בירושלים (Torah in Jerusalem)
- מקום ללמוד תורה (Place to learn Torah)
- ישיבה חדשה (New yeshiva)
- יחס אישי בישיבה (Personal relationship in yeshiva)
- מכינה בירושלים (Preparatory program in Jerusalem)

**Transactional** (donation-focused):
- תרומה לישיבה (Donation to yeshiva)
- תמיכה בישיבה (Support yeshiva)
- שותפות בתורה (Partnership in Torah)
- תרומה לחזרה בתשובה (Donation to BT yeshiva)
- תרומה בירושלים (Donation in Jerusalem)
- בניית בית מדרש (Building Beit Midrash)
- תרומה ישנה לתלמידים (Old yeshiva donation/support)

**Local Keywords**:
- ישיבות בירושלים (Yeshivas in Jerusalem)
- בי"ד ירושלים (Torah learning Jerusalem)
- עיתונות דתית (Religious news)

### Primary Keywords (English)

**Informational**:
- Yeshiva in Jerusalem
- Yeshiva for young men
- Torah learning Israel
- Jewish educational institution
- Rosh Hayeshiva
- Beit Midrash Jerusalem
- Jewish seminary

**Transactional**:
- Support a yeshiva
- Donate to Torah institution
- Partner with Jewish organization
- Build synagogue/yeshiva
- Jewish charitable giving
- Support Jewish education

**Geographic**:
- Jerusalem educational programs
- Orthodox yeshiva
- Intensive Torah learning

### Long-Tail Keywords

These capture specific visitor intents:

**Hebrew**:
- איך לתרום לישיבה (How to donate to a yeshiva)
- ישיבה עם יחס אישי (Yeshiva with personal relationship)
- קרן לבנית בית כנסת (Building fund for synagogue)
- תלמידי ישיבה בירושלים (Yeshiva students Jerusalem)
- שנה שנייה בישיבה (Second year yeshiva)

**English**:
- Best yeshiva in Jerusalem (avoid: too competitive, false claim)
- Orthodox yeshiva learning approach
- Tax deductible donation to yeshiva
- Yeshiva building project updates
- Rabbi Chaim Kirzon (branded search)

### Keyword Research Tools

Recommended for ongoing research:
- Google Search Console (free, integrated)
- Ahrefs
- SEMrush
- Google Keyword Planner
- AnswerThePublic

---

## ON-PAGE SEO

### Meta Tags Strategy

Every page needs:

**Title Tags** (50-60 characters, Hebrew + English)
```
Format: Primary keyword + | Brand

Examples:
"תרומה לישיבת אורחות חיים | Yeshivat Orchot Chaim"
"ישיבה בירושלים | Yeshiva Learning in Jerusalem"
```

**Meta Descriptions** (155-160 characters)
```
Compelling summary that encourages click-through

Hebrew example:
"ישיבת אורחות חיים בראשות הרב חיים קירזון. 
למדנו תורה בעומק, יחס אישי עם כל תלמיד, 
בנייה של בית קבע."

English example:
"Join Yeshivat Orchot Chaim. Deep Torah learning, 
personal mentorship, building the future. 
Support Jewish education in Jerusalem."
```

### URL Structure

**Semantic, consistent, multilingual**:

```
/he/
  /
  /about
  /approach
  /students/
  /students/[slug]
  /building/
  /building/updates/
  /building/updates/[slug]
  /gallery/
  /news/
  /news/[slug]
  /donate/
  /campaign/[slug]/
  /contact

/en/
  /
  /about
  /approach
  /students/
  /students/[slug]
  /building/
  /building/updates/
  /building/updates/[slug]
  /gallery/
  /news/
  /news/[slug]
  /donate/
  /campaign/[slug]/
  /contact
```

### Heading Hierarchy (H1, H2, H3)

**Rule**: One H1 per page

```
H1: Page main title (should match meta title or be primary keyword)

H2: Section headings
  H3: Subsection headings
  H3: Subsection headings

H2: Another major section
  H3: Details
```

**Example Homepage**:
```
H1: ישיבת אורחות חיים — בניית עתיד של תורה

H2: מי אנחנו
H2: הגישה שלנו ללימוד
  H3: תורה עמוקה
  H3: יחס אישי
H2: המבנה החדש
H2: כיצד תוכלו לתמוך
```

### Schema Markup / Structured Data

Implement using JSON-LD (Google's preferred format):

**Organization Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Yeshivat Orchot Chaim",
  "alternateName": "ישיבת אורחות חיים",
  "url": "https://orchotchaim.co.il",
  "logo": "https://orchotchaim.co.il/logo.png",
  "image": "https://orchotchaim.co.il/hero.jpg",
  "description": "A yeshiva in Jerusalem...",
  "sameAs": [
    "https://facebook.com/...",
    "https://youtube.com/..."
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Jerusalem",
    "postalCode": "9123102",
    "addressCountry": "IL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "054-8407472",
    "contactType": "customer service"
  },
  "founder": {
    "@type": "Person",
    "name": "Rabbi Chaim Kirzon"
  }
}
```

**Breadcrumb Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://orchotchaim.co.il"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Students",
      "item": "https://orchotchaim.co.il/students"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "David's Story",
      "item": "https://orchotchaim.co.il/students/david"
    }
  ]
}
```

**Article Schema** (for news/stories):
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article title",
  "description": "Summary",
  "image": ["https://..."],
  "datePublished": "2026-09-01T10:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author name"
  }
}
```

**VideoObject Schema** (if embedding videos):
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Building Progress",
  "description": "...",
  "thumbnailUrl": "https://...",
  "uploadDate": "2026-09-01T00:00:00Z",
  "duration": "PT3M",
  "contentUrl": "https://youtube.com/..."
}
```

---

## INTERNATIONAL SEO

### hreflang Implementation

**Canonical & Alternate Language Tags**

Every page should declare all language versions:

**Hebrew page** (/he/about):
```html
<link rel="canonical" href="https://orchotchaim.co.il/he/about" />
<link rel="alternate" hreflang="he-IL" href="https://orchotchaim.co.il/he/about" />
<link rel="alternate" hreflang="en-US" href="https://orchotchaim.co.il/en/about" />
<link rel="alternate" hreflang="x-default" href="https://orchotchaim.co.il/en/" />
```

**English page** (/en/about):
```html
<link rel="canonical" href="https://orchotchaim.co.il/en/about" />
<link rel="alternate" hreflang="he-IL" href="https://orchotchaim.co.il/he/about" />
<link rel="alternate" hreflang="en-US" href="https://orchotchaim.co.il/en/about" />
<link rel="alternate" hreflang="x-default" href="https://orchotchaim.co.il/en/" />
```

### Language Detection

**Implementation**:
1. Detect browser language preference
2. Show option: "Switch to עברית" or "Change to English"
3. Remember user choice (localStorage)
4. Default to Hebrew (user's primary language)

### Multi-Regional Targeting

**Current Geography**:
- Primary: Israel (Hebrew)
- Secondary: USA, UK, Canada, Europe (English)

**Future**: Could expand to:
- `/en-gb/` for UK donors
- `/en-ca/` for Canadian donors
- `/en-au/` for Australian donors

---

## TECHNICAL SEO

### Core Web Vitals Targets

Google's Page Experience metrics:

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5 seconds |
| FID (First Input Delay) | < 100 milliseconds |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTB (Time to First Byte) | < 500ms |

**Optimization tactics**:
- Optimize images (next/image, WebP format)
- Minimize JavaScript
- Lazy load non-critical content
- Use Server Components (Next.js)
- Cache strategically (Vercel CDN default)

### Sitemap

**XML Sitemap** (/sitemap.xml):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>https://orchotchaim.co.il/he/</loc>
    <lastmod>2026-09-01</lastmod>
    <priority>1.0</priority>
  </url>
  
  <!-- English -->
  <url>
    <loc>https://orchotchaim.co.il/en/</loc>
    <lastmod>2026-09-01</lastmod>
    <priority>0.9</priority>
  </url>
  
  <!-- Dynamic pages -->
  <url>
    <loc>https://orchotchaim.co.il/he/students/david</loc>
    <lastmod>2026-08-15</lastmod>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" 
      href="https://orchotchaim.co.il/en/students/david" />
  </url>
  
  <!-- More entries... -->
</urlset>
```

**Sitemap Index** (if large):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-news.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://orchotchaim.co.il/sitemap-students.xml</loc>
  </sitemap>
</sitemapindex>
```

### robots.txt

```
# Allow all search engines
User-agent: *
Allow: /

# Block admin/private areas (if any)
Disallow: /admin/
Disallow: /api/

# Slow crawlers on large sites
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# Sitemap location
Sitemap: https://orchotchaim.co.il/sitemap.xml
Sitemap: https://orchotchaim.co.il/sitemap-he.xml
```

### Mobile Optimization

- **Viewport meta tag**: Already set in Next.js
- **Mobile-friendly design**: Required (covered in design phase)
- **Touch-friendly buttons**: 48px minimum
- **Fast mobile page load**: Target LCP < 2.5s on 4G

### HTTPS & Security

- **Enforce HTTPS**: All pages must use HTTPS
- **SSL Certificate**: Already included with Vercel hosting
- **HSTS Header**: Consider implementing (be careful with dev environments)
- **Security.txt**: Consider for security researchers

---

## OFF-PAGE SEO / LINK BUILDING

### Content-Based Link Attraction

**Strategies**:

1. **Storytelling**: Student stories are inherently link-worthy
   - Students/families share stories
   - Alumni networks link and share
   - Jewish education networks may feature

2. **Building Updates**: Real-time construction progress
   - Religious architecture blogs may link
   - Real estate/construction news
   - Jewish community media

3. **Educational Content**: If creating resources
   - Torah study guides (link-worthy)
   - Jewish education articles
   - Mentorship approach documentation

4. **Partnerships**: Local and institutional links
   - Link from related yeshivas
   - Jewish organizations (diaspora communities)
   - Educational directories
   - Nonprofit networks

### Link Building Tactics

1. **Outreach to Alumni**: "Help us share your story"
2. **Charity Directories**: Register with Jewish nonprofit listings
3. **Local Directories**: Add to Jerusalem business listings
4. **International Links**: UK/US charities (for diaspora organizations)
5. **Media Outreach**: Press releases for milestones
6. **Partner Websites**: Link from international fundraising partners

### Backlink Targets

**Quality sources** (high authority):
- Jewish newspapers (Haaretz, Jerusalem Post)
- Educational directories (nonprofit.org, globalgiving.org)
- Religious media (Torah.org, Yeshiva.org.uk)
- Alumni networks
- Charity evaluators

**Avoid**: Low-quality link schemes, paid links, private blog networks

---

## CONVERSION SEO

### Balancing SEO with Conversions

**Rule**: Optimize for people first, search engines second.

**Best practices**:
1. Write compelling headlines (not keyword-stuffed)
2. Use descriptive anchor text (not generic "click here")
3. Include CTAs naturally in content
4. Don't sacrifice user experience for keyword density
5. Prioritize clear navigation

### Donation Page SEO

**Key pages for monetization**:
- `/he/donate`
- `/en/donate`
- `/he/building`
- `/en/building`
- `/campaign/[slug]`

**Optimization**:
- Clear, compelling titles
- Strong CTAs (not subtle)
- Trust signals (testimonials, security badges)
- Fast loading (money page priority)
- Mobile-optimized

---

## ANALYTICS & MONITORING

### Google Search Console Setup

1. **Verify domain ownership**
2. **Submit sitemaps**
3. **Monitor search queries**: What keywords drive traffic?
4. **Track rankings**: Monitor top keywords over time
5. **Fix crawl errors**: Address any site issues
6. **Review security**: Monitor for hacking attempts

### Google Analytics 4 Setup

**Key events to track**:
- `page_view`: Track all page loads
- `view_donation_page`: When users visit donation flow
- `select_donation_amount`: Which amounts are selected
- `donation_completed`: Successful donations
- `campaign_view`: Campaign page visits
- `story_open`: Student story opens
- `share_click`: Social sharing

**Goals/Conversions**:
- Primary: Donation completed
- Secondary: Newsletter signup
- Tertiary: Story view
- Quaternary: Contact form submission

### Ranking Tracking

Monitor these key terms monthly:
- Hebrew: תרומה לישיבה, ישיבה בירושלים, יחס אישי בישיבה
- English: Yeshiva donation, Jerusalem Torah learning, Support yeshiva

Use: Google Search Console, Ahrefs, or SEMrush

---

## CONTENT CALENDAR FOR SEO

### Monthly SEO Tasks

| Week 1 | Week 2 | Week 3 | Week 4 |
|--------|--------|--------|--------|
| Google Search Console review | Publish news article | Building update | Rank tracking |
| Identify top queries | Link outreach | Link opportunities | Performance analysis |
| | | | Plan next month |

### Content Opportunities by Season

**Spring (Passover)**:
- Student reflections on freedom themes
- Educational content about traditions
- Fundraising for holiday programs

**Summer**:
- Building progress updates (construction active)
- Alumni summer activities
- Scholarship announcements

**Fall (Rosh Hashanah/Yom Kippur)**:
- Holiday giving appeal
- Reflection pieces
- Year-ahead visions

**Winter (Chanukah/Year-end)**:
- Year-end giving campaign
- Building progress milestone
- Gratitude/impact report

---

## COMMON SEO MISTAKES TO AVOID

❌ **DON'T**:
- Keyword stuff: "donate donate donate yeshiva donate"
- Duplicate content: Same story on multiple pages
- Thin pages: Pages with almost no content
- Slow loading: Large unoptimized images
- Broken links: 404 errors throughout site
- Hidden text: Text color matching background
- Misleading titles: Clickbait-style headlines
- Mobile-unfriendly: Pages that don't work on mobile
- Doorway pages: Pages created just for SEO, not users
- Cloaking: Different content for bots vs. users

✓ **DO**:
- Write for people first
- Create valuable, original content
- Use proper heading hierarchy
- Optimize images
- Fix broken links
- Test mobile experience
- Update stale content
- Use clear, descriptive links
- Monitor Google Search Console
- Build authority through quality content

---

## MIGRATING FROM OLD SITE

### URL Mapping Strategy

**Map old site URLs to new URLs**:

| Old URL | New URL | Status |
|---------|---------|--------|
| `/` | `/he/` | 301 redirect |
| `/תרומות/` | `/he/donate` | 301 redirect |
| `/הסטוריה/` | `/he/history` | 301 redirect (if exists) |
| `/יחס-אישי/` | `/he/approach#personal-relationship` | 301 redirect |
| `/wp-admin/` | — | Gone (no redirect) |
| `/sample-page/` | — | Gone (410 or no redirect) |

**Implementation**:
- Server-side redirects (preferred, 301)
- Implement in Next.js: `next.config.js` redirects
- Monitor for redirect chains (bad for SEO)
- Test all redirects thoroughly

### Preserve Authority

- Keep the same domain (orchotchaim.co.il)
- Redirect old URLs to relevant new pages (not homepage)
- Maintain SSL certificate
- Update internal links to new URL structure
- Submit new sitemap to Google Search Console

---

## LOCAL SEO (ISRAEL)

### Google My Business

1. **Claim and optimize GMB listing**:
   - Business name: ישיבת אורחות חיים
   - Category: Educational Institution
   - Address: Jerusalem location
   - Phone: 054-8407472
   - Hours: Office hours
   - Photos: Yeshiva building, Beit Midrash, students
   - About: Compelling description
   - Website: orchotchaim.co.il

2. **Post updates**:
   - Building progress
   - Events
   - Classes/programs
   - Announcements

3. **Encourage reviews**:
   - Ask students, parents, donors
   - Respond to all reviews
   - Thank positive reviewers

### Local Directories

Add to:
- Waze (if location important)
- Google Maps (via GMB)
- Israeli nonprofit directories
- Jewish education portals
- Local business listings

---

## FUTURE SEO OPPORTUNITIES

**Phase 2+**:
- Blog section (if resources available)
- FAQ schema markup
- Enhanced images with captions
- Video optimization
- Podcast transcripts (if launching)
- Interactive tools (donation calculator, etc.)
- Community Q&A forum
- Student success tracking (privacy-respectful)

---

## QUESTIONS FOR STAKEHOLDER REVIEW

1. **Backlink Profile**: Does current site have significant links? From where?
2. **Historical Rankings**: What keywords did the old site rank for?
3. **Traffic Data**: What's the current organic traffic breakdown by source?
4. **Content Themes**: Any topics that receive lots of inquiries?
5. **Social Channels**: Which social platforms drive most engagement?
6. **Partnership Opportunities**: Any Jewish organizations that might link/feature?
7. **Alumni Network**: Can we leverage alumni for sharing/visibility?
8. **Media Contacts**: Any journalists covering yeshivas/Judaism?

---

## NEXT STEPS

1. **Implement technical SEO** (Phase 2): Schema, sitemaps, robots.txt
2. **Create content calendar**: Plan posts aligned with keywords
3. **Set up monitoring**: Google Search Console, Analytics, ranking tracker
4. **Build links**: Outreach to potential partners
5. **Optimize on-page**: Implement meta tags, headings, CTA optimization
6. **Regular reviews**: Monthly analysis, quarterly strategy updates

---

*SEO is an ongoing process, not a one-time project.*  
*Success requires consistent content creation, monitoring, and optimization.*

**Status**: Ready for stakeholder review and implementation.
