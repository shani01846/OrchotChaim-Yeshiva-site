# CMS Schema Specification: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Sanity.io Content Model  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## OVERVIEW

This document defines the content types (schemas) for Sanity.io CMS.

All content types support bilingual content (Hebrew + English) via field translation.

**Translation Strategy**:
```
Each translatable field should be:
{
  fieldName_he: "Hebrew content",
  fieldName_en: "English content"
}

OR use Sanity's i18n support if upgrading CMS layer.
```

---

## CONTENT TYPES

### 1. SITE SETTINGS

**Purpose**: Global site configuration

**Document ID**: `siteSettings` (single document)

```typescript
{
  _type: 'siteSettings'
  
  // Branding
  siteName_he: string
  siteName_en: string
  siteDescription_he: string
  siteDescription_en: string
  tagline_he: string
  tagline_en: string
  logo: image
  favIcon: image
  metaImage: image
  
  // Contact
  contactEmail: string
  contactPhone: string
  contactWhatsApp: string
  mobilePhone: string (optional)
  officePhone: string (optional)
  faxNumber: string (optional)
  
  // Address
  streetAddress: string
  poBox: string
  city: string
  zipCode: string
  country: string
  coordinates: geopoint (optional)
  
  // Social
  socialProfiles: array [
    {
      platform: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'whatsapp'
      url: string
    }
  ]
  
  // Languages & Currencies
  languages: array (['he', 'en'])
  defaultLanguage: 'he' | 'en'
  currencies: array (['ILS', 'USD', 'GBP'])
  defaultCurrency: string
  
  // Building Status
  buildingStatus_he: string
  buildingStatus_en: string
  buildingPhase: string (e.g., "Phase 2 - Structural Work")
  
  // Donation Info
  donationAbstract_he: string
  donationAbstract_en: string
}
```

---

### 2. PAGE

**Purpose**: Static content pages (About, History, Approach, etc.)

**Document ID**: Auto-generated or custom

```typescript
{
  _type: 'page'
  _id: string (custom: 'page-about', 'page-approach', etc.)
  
  // Metadata
  title_he: string (required)
  title_en: string (required)
  slug: string (required, unique, format: 'about', 'approach', 'history')
  description_he: string (150-160 chars)
  description_en: string
  
  // Content
  content_he: portableText (rich text)
  content_en: portableText
  
  // SEO
  ogImage: image (optional)
  ogTitle_he: string (optional)
  ogTitle_en: string
  ogDescription_he: string (optional)
  ogDescription_en: string
  
  // Display
  heroImage: image (optional)
  heroImageAlt_he: string
  heroImageAlt_en: string
  showInNav: boolean (default: true)
  navOrder: number (for sorting)
  isPublished: boolean (default: false)
  publishedAt: datetime
  updatedAt: datetime
  
  // Relationships
  relatedPages: array [reference to Page]
  featuredImage: image (optional)
}
```

---

### 3. STUDENT STORY

**Purpose**: Individual student narratives (most important for conversion)

**Document ID**: Auto-generated

```typescript
{
  _type: 'studentStory'
  _id: auto
  
  // Identity
  firstName_he: string (required)
  firstName_en: string
  lastName_he: string (optional)
  lastName_en: string
  nickname: string (optional, for privacy)
  slug: string (required, unique, auto-generated: 'david-levi' or 'david')
  
  // Personal Info (NOT PUBLIC unless approved)
  age: number (optional)
  startYear: number (year enrolled)
  yearsAtYeshiva: number (calculated)
  bio_he: string (short)
  bio_en: string
  
  // Media
  photo: image (required, should be real student photo)
  photoAlt_he: string
  photoAlt_en: string
  photoApproval: boolean (parent/guardian approval recorded)
  
  // Story Content
  openingLine_he: string (required, one compelling sentence)
  openingLine_en: string
  story_he: portableText (required, 2-5 paragraphs)
  story_en: portableText
  
  // Impact
  impactStatement_he: string (required, "What this yeshiva meant to me...")
  impactStatement_en: string
  quote_he: string (optional, if student approved)
  quote_en: string
  quoteApprovalByStudent: boolean
  
  // Multimedia
  videoId: string (optional, YouTube ID)
  videoTitle_he: string (optional)
  videoTitle_en: string
  
  // Metadata
  category: array [
    'personal-growth' | 'torah-learning' | 'community' | 'leadership'
  ]
  featured: boolean (show on homepage?)
  publishedAt: datetime
  
  // Approvals
  approvals: array [
    {
      approverName: string (student/parent name)
      approverEmail: string
      approvalDate: datetime
      consentNotes: string
    }
  ]
  
  // SEO
  description_he: string (for preview)
  description_en: string
  ogImage: image (custom, or use photo)
}
```

**CRITICAL VALIDATION**:
- ✓ Approvals array MUST have at least one entry
- ✓ Photo MUST be approved (no approval = cannot publish)
- ✓ Opening line MUST be compelling
- ✓ Story MUST be 2-5 paragraphs (enforce min/max length)

---

### 4. TESTIMONIAL

**Purpose**: Quotes from alumni, donors, parents, rabbis

**Document ID**: Auto-generated

```typescript
{
  _type: 'testimonial'
  _id: auto
  
  // Quote Content
  quote_he: string (required)
  quote_en: string (required)
  author_he: string (required)
  author_en: string
  
  // Context
  role_he: string (e.g., "Parent", "Alumni", "Donor", "Rabbi")
  role_en: string
  context_he: string (optional, brief background)
  context_en: string
  
  // Media
  photo: image (optional, requires approval)
  photoApproval: boolean
  
  // Classification
  category: array [
    'alumni' | 'parent' | 'donor' | 'staff' | 'community'
  ]
  featured: boolean
  
  // Source & Approval
  source_he: string (where/when was this said?)
  source_en: string
  approvalNotes: string
  approvalEmail: string
  approvalDate: datetime
  
  // Publishing
  publishedAt: datetime
  isPublished: boolean
}
```

**CRITICAL VALIDATION**:
- ✓ NEVER fabricate testimonials
- ✓ Approval MUST be documented
- ✓ Author MUST be verified
- ✓ Quote MUST be authentic

---

### 5. STAFF MEMBER

**Purpose**: Rabbi, faculty, leadership profiles

**Document ID**: Custom (rabbis are public figures)

```typescript
{
  _type: 'staffMember'
  _id: string (e.g., 'staff-rabbi-chaim-kirzon')
  
  // Identity
  name_he: string (required)
  name_en: string
  firstName_he: string
  firstName_en: string
  slug: string (required, unique)
  
  // Professional
  title_he: string (e.g., "Rosh Hayeshiva")
  title_en: string
  role_he: string (longer description)
  role_en: string
  specialization: array [
    'torah-learning' | 'mentorship' | 'administration' | 'outreach' | 'leadership'
  ]
  
  // Bio & Philosophy
  shortBio_he: string (1-2 sentences)
  shortBio_en: string
  longBio_he: portableText (detailed biography)
  longBio_en: portableText
  philosophy_he: string (teaching/leadership philosophy)
  philosophy_en: string
  
  // Media
  photo: image (professional portrait)
  photoAlt_he: string
  photoAlt_en: string
  
  // Contact (discretionary)
  email: string (optional, public if provided)
  phone: string (optional, public if provided)
  
  // Background
  experience: number (years of experience)
  education: array [
    {
      institution: string
      field_he: string
      field_en: string
      year: number
    }
  ]
  
  // Display
  featured: boolean (show on leadership page?)
  order: number (sorting)
  publishedAt: datetime
  
  // SEO
  description_he: string
  description_en: string
}
```

---

### 6. BUILDING UPDATE

**Purpose**: Construction project progress reports

**Document ID**: Auto-generated

```typescript
{
  _type: 'buildingUpdate'
  _id: auto
  
  // Content
  title_he: string (required)
  title_en: string (required)
  slug: string (required, unique)
  description_he: portableText (required)
  description_en: portableText
  
  // Date & Timeline
  date: datetime (required, when was photo/update taken?)
  publishedAt: datetime
  category: 'milestone' | 'progress' | 'announcement' | 'phases' (required)
  
  // Progress Tracking
  progressPercentage: number (0-100, optional)
  currentPhase_he: string (e.g., "Structural Work")
  currentPhase_en: string
  nextMilestone_he: string
  nextMilestone_en: string
  nextMilestoneDate: datetime (optional)
  timelineRemainingMonths: number (optional)
  
  // Media
  images: array [
    {
      image: image
      caption_he: string
      caption_en: string
      altText_he: string
      altText_en: string
      dateTaken: datetime (optional)
    }
  ]
  featuredImage: image (required, shown in lists)
  
  // Video
  videoId: string (optional, YouTube ID)
  videoTitle_he: string
  videoTitle_en: string
  
  // Publishing
  featured: boolean (show on homepage?)
  isPublished: boolean
  
  // SEO
  description_he: string
  description_en: string
}
```

---

### 7. NEWS ARTICLE

**Purpose**: Yeshiva announcements, events, milestones

**Document ID**: Auto-generated

```typescript
{
  _type: 'newsArticle'
  _id: auto
  
  // Content
  title_he: string (required)
  title_en: string (required)
  slug: string (required, unique)
  excerpt_he: string (summary, 2-3 sentences)
  excerpt_en: string
  content_he: portableText (required)
  content_en: portableText
  
  // Media
  featuredImage: image (required)
  featuredImageAlt_he: string
  featuredImageAlt_en: string
  gallery: array [image] (optional)
  
  // Metadata
  date: datetime (publication date)
  publishedAt: datetime
  author: reference to staffMember (optional)
  
  // Classification
  category: array [
    'yeshiva-update' | 'event' | 'student-achievement' | 'holiday' | 'news'
  ]
  tags: array [string] (optional)
  featured: boolean
  
  // Relationships
  relatedArticles: array [reference to newsArticle]
  mentionedStudents: array [reference to studentStory]
  
  // SEO
  description_he: string
  description_en: string
  ogImage: image (optional)
  ogTitle_he: string (optional)
  ogTitle_en: string
}
```

---

### 8. GALLERY IMAGE

**Purpose**: Categorized photo collection

**Document ID**: Auto-generated

```typescript
{
  _type: 'galleryImage'
  _id: auto
  
  // Image
  image: image (required, high-res)
  title_he: string (optional)
  title_en: string
  description_he: portableText (optional, story behind photo)
  description_en: portableText
  altText_he: string (required for accessibility)
  altText_en: string
  
  // Metadata
  dateTaken: date (when was photo taken?)
  photographer: string (credit)
  location: string (optional)
  
  // Organization
  category: array [
    'students' | 'learning' | 'beit-midrash' | 'staff' | 'events' | 'building' | 'community' | 'construction'
  ]
  featured: boolean
  sequence: number (ordering within category)
  tags: array [string]
  
  // Relationships
  relatedArticle: reference to newsArticle (optional)
  relatedStory: reference to studentStory (optional)
}
```

---

### 9. CAMPAIGN

**Purpose**: Targeted fundraising initiatives

**Document ID**: Custom (slugs are static)

```typescript
{
  _type: 'campaign'
  _id: string (e.g., 'campaign-building', 'campaign-annual')
  
  // Identity
  title_he: string (required)
  title_en: string (required)
  slug: string (required, unique, manual: 'building', 'annual', 'purim')
  description_he: string
  description_en: string
  
  // Narrative
  story_he: portableText (compelling campaign story)
  story_en: portableText
  callToAction_he: string
  callToAction_en: string
  
  // Media
  heroImage: image
  heroImageAlt_he: string
  heroImageAlt_en: string
  heroVideo: string (YouTube ID, optional)
  
  // Goals & Progress
  goal: object
    amount: number (fundraising goal)
    currency: string ('ILS', 'USD', 'GBP')
  amountRaised: number (manual or automated?)
  donorCount: number (display if available)
  
  // Timing
  startDate: datetime
  deadline: datetime (optional)
  active: boolean
  
  // Content Links
  donationTiers: array [reference to donationTier]
  featuredStories: array [reference to studentStory]
  relatedArticles: array [reference to newsArticle]
  relatedUpdates: array [reference to buildingUpdate]
  testimonials: array [reference to testimonial]
  
  // Sharing
  shareText_he: string (custom message for social)
  shareText_en: string
  
  // UTM Tracking
  utm: object
    source: string
    medium: string
    campaign: string
  
  // SEO
  ogImage: image
  ogTitle_he: string
  ogTitle_en: string
  ogDescription_he: string
  ogDescription_en: string
  
  // Publishing
  isPublished: boolean
}
```

---

### 10. DONATION TIER

**Purpose**: Suggested giving amounts and impact messaging

**Document ID**: Auto-generated

```typescript
{
  _type: 'donationTier'
  _id: auto
  
  // Amount
  amount: number (required, e.g., 180, 500, 1800, 5000)
  currency: string (required, 'ILS', 'USD', 'GBP')
  
  // Labeling & Description
  title_he: string (required, e.g., "Daily Partner")
  title_en: string
  description_he: string (what this gift enables)
  description_en: string
  impact_he: string (emotional outcome)
  impact_en: string
  
  // Visual
  icon: image | svg (optional, visual identity)
  color: string (hex code, e.g., '#FFD700')
  
  // Configuration
  frequency: array [
    'one-time' | 'monthly' | 'annual'
  ] (which frequencies available for this tier?)
  highlighted: boolean (featured tier?)
  order: number (display order)
  
  // Relationships
  campaign: reference to campaign (optional)
  relatedStories: array [reference to studentStory] (optional, which stories does this enable?)
  
  // Publishing
  isActive: boolean
}
```

---

## FIELD TYPES & VALIDATION

### String Fields

**Validation** (where applicable):
- Email: valid email format
- URL: valid URL format
- Phone: valid phone format
- Slug: lowercase, hyphens only, unique

### Number Fields

- **Amount**: integer, > 0
- **Percentage**: 0-100
- **Year**: 1900-2100
- **Number**: flexible

### Image Fields

**Requirements**:
- Format: JPG, PNG, WebP
- Max size: 5MB
- Dimensions: flexible (will be optimized)
- Alt text REQUIRED for accessibility

### DateTime Fields

**Format**: ISO 8601 (handled by Sanity)

### PortableText (Rich Text)

**Allowed formatting**:
- Headings (H2, H3, H4)
- Paragraphs
- Lists (ordered, unordered)
- Bold, italic
- Links
- Images (inline)
- Blockquotes
- Line breaks

**NOT allowed**:
- Scripts/code blocks (not needed)
- Columns/complex layouts (use simple text)
- Embedded content (YouTube OK via IDs)

### References

**Cross-document links**:
```
{
  _type: 'reference'
  _ref: '[document-id]'
}
```

Used for:
- Page relationships
- Story mentions
- Campaign content
- etc.

---

## EDITORIAL ACCESS & PERMISSIONS

### Public Editor (Content Staff)

**Can edit**:
- Student Stories (create, edit, publish)
- News Articles
- Building Updates
- Gallery Images
- (All content types except config)

**Cannot edit**:
- Site Settings
- Payment/system configs
- Staff Members (limited read-only)

### Admin

**Can edit**:
- All content types
- Site Settings
- Schemas
- User permissions
- Backup/restore

---

## REQUIRED FIELDS SUMMARY

| Content Type | Required Fields |
|--------------|-----------------|
| Site Settings | siteName_he, siteName_en, contactEmail |
| Page | title_he, title_en, slug |
| Student Story | firstName, slug, openingLine_he, story_he, photo, approvals |
| Testimonial | quote_he, quote_en, author_he |
| Staff Member | name_he, name_en, title_he, slug |
| Building Update | title_he, slug, date, featuredImage |
| News Article | title_he, title_en, slug, featuredImage, content_he |
| Gallery Image | image, category, altText_he, altText_en |
| Campaign | title_he, title_en, slug, goal |
| Donation Tier | amount, currency, title_he, description_he |

---

## CONTENT GOVERNANCE

### Publishing Workflow

**State machine**:
```
DRAFT
  ↓
IN REVIEW (optional, TBD)
  ↓
APPROVED (optional, TBD)
  ↓
PUBLISHED (isPublished: true)
  ↓
ARCHIVED (optional field)
```

**Who publishes?**
- Content staff: Student stories, news, updates, gallery
- Admin: Final approval required for sensitive content

### Versioning

**Sanity feature**: Automatic version history (included)

- All changes tracked
- Can revert to previous versions
- Author tracked automatically

---

## IMPLEMENTATION NOTES

### Sanity Studio Configuration

**File**: `sanity.config.ts`

```typescript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/plugins'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Yeshivat Orchot Chaim',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### Querying Data (GROQ)

**Example**:
```groq
*[_type == "studentStory" && isPublished == true] | order(publishedAt desc) [0...6] {
  ...,
  photo {
    ...,
    "url": asset->url
  }
}
```

---

**STATUS**: IMPLEMENTATION READY

All schemas defined and ready for Sanity.io implementation.
