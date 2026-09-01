# Content Model: Yeshivat Orchot Chaim

**Document**: PHASE 1 Discovery — CMS Content Model  
**Status**: For Review  
**Date**: September 1, 2026  
**Recommended CMS**: Sanity.io or Payload CMS

---

## EXECUTIVE SUMMARY

This document defines the structure of all content types for the Yeshivat Orchot Chaim website.

The content model is designed to be:
- **CMS-first**: Content lives in a structured database, not in code
- **Reusable**: Same content can appear in multiple contexts
- **Multilingual**: Hebrew and English support built-in
- **Future-proof**: Extensible for campaigns, A/B testing, personalization
- **Editorial-friendly**: Non-technical staff can manage content

---

## CORE CONTENT TYPES

### 1. SITE SETTINGS

**Purpose**: Global site configuration

**Fields**:
- `siteName`: string (Hebrew + English)
- `siteDescription`: string (for meta tags)
- `siteUrl`: string
- `contactEmail`: string
- `contactPhone`: string
- `contactWhatsApp`: string
- `address`: object
  - `hebrewAddress`: string
  - `city`: string
  - `country`: string
  - `postalCode`: string
  - `coordinates`: geopoint
- `socialProfiles`: object array
  - `platform`: "facebook" | "instagram" | "twitter" | "youtube" | "whatsapp"
  - `url`: string
- `languages`: array ["he", "en"]
- `defaultLanguage`: string ("he")
- `currencies`: array ["ILS", "USD", "GBP", "EUR"]
- `buildingStatus`: string (e.g., "Phase 2", "Under Construction")
- `logoImage`: image
- `favIcon`: image
- `metaImage`: image (OG default)
- `donationAbstract`: text (for recurring across pages)

**Example Use**:
```
{{siteName}} = "ישיבת אורחות חיים"
{{contactPhone}} = displayed in footer
{{currencies}} = determines payment options
{{buildingStatus}} = affects homepage messaging
```

---

### 2. PAGE

**Purpose**: Static content pages (About, History, Students, etc.)

**Fields**:
- `title`: string (Hebrew + English)
- `slug`: string (URL path: /about, /history, /students)
- `description`: string (meta description)
- `content`: rich text (markdown or block editor)
  - Supports: headings, paragraphs, images, videos, quotes
- `heroImage`: image
  - `alt`: string
  - `caption`: string
- `sections`: array of content blocks
  - Each block can be: text, image, video, testimonial, call-to-action
- `ogImage`: image (custom OG for this page)
- `ogTitle`: string (custom title for sharing)
- `ogDescription`: string (custom description for sharing)
- `isPublished`: boolean
- `publishedAt`: datetime
- `order`: number (for navigation ordering)
- `showInNav`: boolean
- `parent`: reference (for nested pages)
- `relatedPages`: array of page references

**Example Pages**:
- `/yeshiva` — About the yeshiva
- `/approach` — Teaching approach
- `/leadership` — Staff and rabbis
- `/building` — Building project details
- `/contact` — Contact information

---

### 3. STUDENT STORY

**Purpose**: Individual student narratives

**Fields**:
- `name`: string (Hebrew + English)
- `firstName`: string (for display)
- `nickname`: string (optional, privacy)
- `age`: number
- `startYear`: number
- `photo`: image
  - `alt`: string
  - Requires: Student/guardian approval
- `openingLine`: string (one compelling sentence)
  - Example: "הגעתי לישיבה בתקופה שבה התעלפתי מהרגישויות שלי"
- `story`: rich text (2-5 paragraphs)
- `impact`: text (What the yeshiva meant to me...)
- `video`: object (optional)
  - `youtubeId`: string
  - `thumbnail`: image
  - `duration`: number
- `quote`: object (optional, if approved)
  - `text`: string
  - `author`: string
- `category`: array
  - "personal-growth" | "torah-learning" | "community" | "leadership"
- `featured`: boolean (highlight on homepage)
- `publishedAt`: datetime
- `approvalsReceived`: array
  - Contact info of those who approved
  - Record of consent

**Example Structure**:
```json
{
  "name": "דוד לוי",
  "firstName": "דוד",
  "photo": "[image]",
  "openingLine": "הגעתי לישיבה בתקופה שבה התעלפתי מהרגישויות שלי",
  "story": "בשנה הראשונה...",
  "impact": "הישיבה נתנה לי...",
  "featured": true
}
```

---

### 4. TESTIMONIAL

**Purpose**: Quotes from alumni, parents, donors, etc.

**Fields**:
- `quote`: string (the testimonial text)
- `author`: string (Hebrew + English)
- `role`: string (e.g., "Parent", "Alumni", "Donor", "Rabbi")
- `context`: string (brief background)
- `photo`: image (optional, with approval)
- `category`: array
  - "parent" | "alumni" | "donor" | "staff" | "community"
- `featured`: boolean
- `publishedAt`: datetime
- `approvalsReceived`: array
- `source`: string (where/when was this said?)

**Example**:
```json
{
  "quote": "כל מה שהרב חיים עשה בשבילי הוא שינה את חיי",
  "author": "יוסף כהן",
  "role": "Graduate",
  "featured": true
}
```

---

### 5. STAFF MEMBER

**Purpose**: Rabbi, faculty, and leadership profiles

**Fields**:
- `name`: string (Hebrew + English)
- `role`: string (Rabbi, Director, Educator)
- `title`: string (formal title)
- `bio`: rich text (short biography)
- `longBio`: rich text (detailed profile)
- `photo`: image (professional portrait)
- `email`: string
- `phone`: string
- `specialization`: array
  - "torah-learning" | "mentorship" | "administration" | "outreach"
- `experience`: number (years)
- `education`: array of objects
  - `institution`: string
  - `field`: string
  - `year`: number
- `philosophy`: text (Teaching/leadership philosophy)
- `featured`: boolean
- `order`: number
- `slugField`: slug (for individual profile pages)
- `socialProfiles`: array
  - `platform`: string
  - `url`: string

**Example**:
```json
{
  "name": "הרב חיים קירזון",
  "role": "Rosh Hayeshiva",
  "title": "Founder and Spiritual Leader",
  "phone": "054-8407472",
  "email": "rabbi.kirzon@gmail.com",
  "featured": true
}
```

---

### 6. BUILDING UPDATE

**Purpose**: Progress updates on construction project

**Fields**:
- `title`: string (Hebrew + English)
- `date`: datetime
- `category`: string
  - "milestone" | "progress" | "milestone" | "timeline" | "announcement"
- `content`: rich text
- `images`: array of images
  - Each image: photo, caption, date taken
- `video`: object (optional)
  - `youtubeId`: string
  - `title`: string
- `progressPercentage`: number (0-100)
- `nextMilestone`: string
- `nextMilestoneDate`: datetime
- `featuredImage`: image
- `publishedAt`: datetime
- `featured`: boolean (show on homepage)
- `slug`: string

**Example**:
```json
{
  "title": "Foundation Work Complete",
  "date": "2026-09-01",
  "category": "milestone",
  "progressPercentage": 35,
  "nextMilestone": "Structural Work Begin",
  "nextMilestoneDate": "2026-10-01",
  "featured": true
}
```

---

### 7. NEWS ARTICLE

**Purpose**: General yeshiva news and announcements

**Fields**:
- `title`: string (Hebrew + English)
- `slug`: slug
- `excerpt`: string (summary for listings)
- `content`: rich text (full article)
- `featuredImage`: image
- `gallery`: array of images (optional)
- `date`: datetime
- `category`: array
  - "event" | "student-achievement" | "yeshiva-update" | "holiday" | "staff"
- `author`: reference (staff member)
- `tags`: array of strings
- `ogImage`: image (custom sharing image)
- `relatedArticles`: array of article references
- `publishedAt`: datetime
- `featured`: boolean

**Example**:
```json
{
  "title": "Sukkot at Yeshivat Orchot Chaim",
  "excerpt": "This year's Sukkot celebration featured...",
  "date": "2026-09-15",
  "category": ["holiday", "community"],
  "featured": true
}
```

---

### 8. GALLERY IMAGE

**Purpose**: Photos organized by category

**Fields**:
- `image`: image (high-res)
- `title`: string (photo title, Hebrew + English)
- `description`: string (long description/story)
- `category`: array
  - "students" | "learning" | "beit-midrash" | "staff" | "building" | "events" | "community" | "construction"
- `date`: date (photo taken)
- `photographer`: string (credit)
- `featured`: boolean
- `sequence`: number (ordering within category)
- `tags`: array

**Example**:
```json
{
  "image": "[photo of students learning]",
  "title": "Students in Beit Midrash",
  "category": ["students", "learning"],
  "featured": true
}
```

---

### 9. CAMPAIGN

**Purpose**: Targeted fundraising campaigns

**Fields**:
- `title`: string (Hebrew + English)
- `slug`: slug
- `description`: string
- `story`: rich text (compelling narrative)
- `heroImage`: image
- `heroVideo`: object (optional)
  - `youtubeId`: string
  - `thumbnail`: image
- `goal`: object
  - `amount`: number
  - `currency`: string
- `amountRaised`: number (auto-updated or manual)
- `donorCount`: number
- `startDate`: datetime
- `deadline`: datetime
- `active`: boolean
- `donationTiers`: array of references (to DonationTier)
- `testimonials`: array of references (to Testimonial)
- `relatedStories`: array of references (to StudentStory)
- `relatedArticles`: array of references (to NewsArticle)
- `shareText`: string (custom message for sharing)
- `ogImage`: image
- `ogTitle`: string
- `ogDescription`: string
- `utm`: object
  - `source`: string
  - `medium`: string
  - `campaign`: string
- `published`: boolean

**Example Campaigns**:
- `/campaign/building` — Building project
- `/campaign/annual` — Annual fundraiser
- `/campaign/purim` — Holiday giving
- `/campaign/year-end` — Year-end appeal

**Example**:
```json
{
  "title": "Build the Permanent Home",
  "slug": "building",
  "goal": {
    "amount": 5000000,
    "currency": "ILS"
  },
  "deadline": "2028-01-01",
  "active": true
}
```

---

### 10. DONATION TIER

**Purpose**: Suggested giving amounts and their impact

**Fields**:
- `amount`: number
- `currency`: string
- `title`: string (Hebrew + English)
- `description`: string (what this gift enables)
- `impact`: string (emotional outcome)
- `icon`: image or svg
- `color`: string (hex code)
- `frequency`: array
  - "one-time" | "monthly" | "annual"
- `highlighted`: boolean (featured tier)
- `order`: number
- `campaign`: reference (which campaign uses this)
- `translations`: object
  - Multilingual title/description

**Example**:
```json
[
  {
    "amount": 180,
    "currency": "ILS",
    "title": "Daily Partner",
    "description": "Share in daily offerings",
    "highlighted": false
  },
  {
    "amount": 500,
    "currency": "ILS",
    "title": "Student Partner",
    "description": "Support one student's learning",
    "highlighted": true
  },
  {
    "amount": 1800,
    "currency": "ILS",
    "title": "Monthly Partner",
    "description": "Become a monthly supporter",
    "highlighted": false
  }
]
```

---

### 11. LOCALE / TRANSLATION

**Purpose**: Manage translations across all content

**Implementation Approach**:
Every content type should support:
- `title_he`, `title_en`
- `description_he`, `description_en`
- `content_he`, `content_en`

Or use a translation object:
```json
{
  "title": {
    "he": "ישיבת אורחות חיים",
    "en": "Yeshivat Orchot Chaim"
  }
}
```

**CMS Recommendation**: Use `next-intl` library for seamless i18n support

---

## CONTENT RELATIONSHIPS

### Visual Map

```
SITE SETTINGS
    ├─→ PAGES
    │   ├─→ Related PAGES
    │   ├─→ Related STUDENT STORIEs
    │   ├─→ Related NEWS ARTICLEs
    │   └─→ Related TESTIMONIALs
    │
    ├─→ CAMPAIGNS
    │   ├─→ DONATION TIERs
    │   ├─→ Related TESTIMONIALs
    │   ├─→ Related STUDENT STORIEs
    │   └─→ Related NEWS ARTICLEs
    │
    ├─→ STUDENT STORIEs
    │   └─→ Related STUDENT STORIEs
    │
    ├─→ BUILDING UPDATEs
    │   ├─→ Featured in CAMPAIGNS
    │   └─→ Related STUDENT STORIEs
    │
    ├─→ NEWS ARTICLEs
    │   ├─→ By STAFF MEMBER (author)
    │   ├─→ Related NEWS ARTICLEs
    │   ├─→ Related STUDENT STORIEs
    │   └─→ Related CAMPAIGNS
    │
    ├─→ GALLERY IMAGEs
    │   └─→ Optional reference to STUDENT STORIEs or NEWS ARTICLEs
    │
    ├─→ STAFF MEMBERs
    │   ├─→ Authored NEWS ARTICLEs
    │   └─→ Featured in PAGES
    │
    └─→ TESTIMONIALs
        ├─→ Featured in CAMPAIGNS
        ├─→ Featured in PAGES
        └─→ Featured in STUDENT STORIEs
```

---

## CONTENT GOVERNANCE

### Approval Workflows

**Student Stories**:
1. Draft created
2. Review by student/family
3. Signature/consent recorded
4. Approval by Rabbi/Director
5. Published

**Testimonials**:
1. Collected from source
2. Written approval obtained
3. Stored in `approvalsReceived`
4. Published

**Staff Bios**:
1. Draft by editor
2. Approval by staff member
3. Published

**Building Updates**:
1. Created with documentation
2. Reviewed for accuracy
3. Published with date

### Publishing Workflow

```
DRAFT
  ↓
REVIEW
  ↓
APPROVED
  ↓
SCHEDULED (optional)
  ↓
PUBLISHED
```

---

## EDITORIAL TASKS & CONTENT CALENDAR

### Recurring Tasks

**Weekly**:
- [ ] Building update (if under construction)
- [ ] Social media content
- [ ] Email newsletter draft

**Monthly**:
- [ ] Impact story / testimonial
- [ ] Photo selection for gallery
- [ ] Archive/organize old news

**Quarterly**:
- [ ] Campaign review
- [ ] SEO audit
- [ ] Newsletter analysis

**Annually**:
- [ ] Full content audit
- [ ] Build update compilation
- [ ] Impact report

---

## CMS RECOMMENDATIONS

### Option 1: Sanity.io

**Pros**:
- Excellent for multilingual content
- Powerful query language (GROQ)
- Great editor experience
- Flexible rich text (Portable Text)
- Good free tier

**Cons**:
- Requires coding to set up schemas
- Not ideal for non-technical teams

### Option 2: Payload CMS

**Pros**:
- Open-source
- Runs on your own server
- Full control
- Good admin UI
- Typescript-first

**Cons**:
- More setup required
- Smaller ecosystem

### Option 3: Contentful

**Pros**:
- Excellent API
- Mature platform
- Good for enterprises

**Cons**:
- Expensive for small sites
- Overkill for initial launch

**Recommendation**: Start with **Sanity.io** for flexibility and developer experience. Can migrate to self-hosted Payload CMS later if needed.

---

## DATABASE SCHEMA (PSEUDO-CODE)

### Sanity Example Structure

```typescript
// Site Settings
{
  _type: 'siteSettings',
  siteName: { he: '...', en: '...' },
  contactEmail: 'rabbi.kirzon@gmail.com',
  // ... more fields
}

// Page
{
  _type: 'page',
  title: { he: '...', en: '...' },
  slug: 'about',
  content: [ /* blocks */ ],
  isPublished: true,
  // ... more fields
}

// Student Story
{
  _type: 'studentStory',
  name: { he: 'דוד', en: 'David' },
  firstName: 'דוד',
  photo: { /* image */ },
  openingLine: '...',
  story: '...',
  featured: true,
  // ... more fields
}

// Campaign
{
  _type: 'campaign',
  title: { he: '...', en: '...' },
  slug: 'building',
  goal: { amount: 5000000, currency: 'ILS' },
  amountRaised: 1250000,
  donationTiers: [ /* references */ ],
  // ... more fields
}
```

---

## CONTENT WORKFLOW TOOLS

### Recommended Stack

1. **Content Management**: Sanity.io
2. **Images**: Cloudinary or Sanity's built-in CDN
3. **Videos**: YouTube or Vimeo (stored, embedded)
4. **Forms**: Formspree or Typeform (contact, newsletter)
5. **Analytics**: Google Analytics 4, Google Tag Manager
6. **Email**: SendGrid or Mailgun (transactional)
7. **Comments**: Disqus (optional, for blog)

---

## API & CONTENT DELIVERY

### REST/GraphQL Endpoints

**Content fetched via**:
- Sanity GROQ queries
- GraphQL (if using Payload or other platforms)
- Next.js data fetching (client or server)

### Caching Strategy

- **Homepage**: Cache 1 hour
- **Building updates**: Cache 30 minutes
- **News articles**: Cache 1 hour
- **Static pages**: Cache 24 hours
- **Building status**: Cache 30 minutes (frequently updated)

---

## DATA PRIVACY & COMPLIANCE

### GDPR Compliance

- User consent before collecting emails
- Clear privacy policy
- Easy unsubscribe from communications
- Data deletion on request
- No unnecessary data collection

### Content Governance

- Student photos: Written approval required
- Testimonials: Explicit permission
- Staff info: Self-managed by staff
- Building updates: Accuracy reviewed

---

## CONTENT MIGRATION STRATEGY

### From Current WordPress Site

**Step 1**: Export existing content
- Current pages
- Donation information
- Contact details
- Navigation structure

**Step 2**: Map old URLs to new
- Create redirect rules
- Preserve SEO

**Step 3**: Populate new CMS
- Import existing copy
- Add new narrative content
- Structure for multilingual

**Step 4**: Verify
- All links work
- Content complete
- No orphaned pages

---

## QUESTIONS FOR STAKEHOLDER REVIEW

1. **Approval Process**: Who approves student stories? How long does it take?
2. **Update Frequency**: How often can news/updates be published?
3. **Photo Archive**: Do you have existing photos we can import?
4. **Editorial Team**: Who will manage content post-launch?
5. **Building Timeline**: How often will building updates be posted?
6. **Donor CRM**: Do you have existing donor database to integrate?
7. **Email Lists**: What newsletters currently exist?
8. **Content Types**: Are there other content types we should include?

---

## NEXT STEPS

1. Select CMS platform (recommend: Sanity.io)
2. Set up CMS workspace
3. Create Sanity schemas based on this model
4. Import existing content
5. Gather new content (stories, photos, testimonials)
6. Train editorial team
7. Build content calendar
8. Launch with initial content set

---

*This content model is designed for scalability and maintenance.*  
*It allows non-technical staff to manage the site after launch.*

**Status**: Ready for stakeholder review and CMS selection.
