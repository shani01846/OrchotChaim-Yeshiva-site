# Analytics & Event Tracking Specification: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Google Analytics 4 Implementation  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## ANALYTICS STRATEGY

**Goal**: Understand user behavior and donation funnel performance

**Approach**: Event-based tracking with Google Analytics 4

**Key Questions**:
- Where do donors come from? (traffic source)
- Which pages convert best? (page performance)
- Where do users drop off in donation funnel? (funnel analysis)
- Which stories resonate most? (content performance)
- International vs. Israel donor split?

---

## IMPLEMENTATION

### Google Analytics 4 Setup

**Property**: Create one GA4 property for the entire site

**Data Streams**:
- Web stream (all traffic)
- Optional: App stream (future mobile app)

**Tracking ID**: `G-XXXXXXXXXX` (provided by Google)

**Implementation**: Via Google Tag Manager (GTM) container

### Google Tag Manager Setup

**Purpose**: Centralized tag management without code changes

**Container**: Create one GTM container for all tags

**Advantages**:
- Change tracking without developer intervention
- Manage multiple platforms (GA, Facebook pixel, etc.)
- Version history and rollback
- User permission management

---

## STANDARD EVENTS

### Page View (Auto-tracked)

**Event**: `page_view`

**Automatic**: GA4 tracks all page views

**No action needed** (included by default)

### Scroll Depth

**Event**: `scroll` (auto-tracked)

**Tracks**: How far down page user scrolls

**Threshold**: 10%, 25%, 50%, 75%, 90%

**No action needed** (GA4 default)

---

## CUSTOM EVENTS

### CTA Click Events

**Events to track**:

| Event | Trigger | Location | Goal |
|-------|---------|----------|------|
| `click_donate_cta` | Click "Donate Now" button | Homepage sticky bar | Track CTA clicks |
| `click_hero_cta` | Click hero section CTA | Homepage hero | Hero performance |
| `click_story_cta` | Click story card | Student stories | Story engagement |
| `click_building_cta` | Click building section | Homepage | Building interest |
| `click_contact_link` | Click contact link | Any page | Contact interest |

**Event Parameters**:
```
{
  "event": "click_donate_cta",
  "button_location": "homepage-sticky",
  "button_text": "אני רוצה להיות שותף",
  "page_title": "Homepage"
}
```

### Donation Funnel Events

**Step 1: Donation Page Entry**

```
Event: page_view
Page: /donate
Parameters:
  - page_path: "/he/donate"
  - page_title": "תרומה לישיבה"
```

**Step 2: Amount Selection**

```
Event: "donation_amount_selected"
Parameters:
  - amount: 180 (number)
  - currency: "ILS"
  - frequency: "one-time" | "monthly"
```

**Step 3: Country Selection**

```
Event: "donation_location_selected"
Parameters:
  - country: "IL" (ISO code)
  - currency: "ILS" | "USD" | "GBP"
  - processor: "matara" | "stripe"
```

**Step 4: Details Form Submission**

```
Event: "donation_details_provided"
Parameters:
  - country: "IL"
  - form_completion: true
  - validation_errors: 0
```

**Step 5: Payment Page Reached**

```
Event: "donation_payment_started"
Parameters:
  - amount: 180
  - currency: "ILS"
  - processor: "matara"
```

**Step 6: Donation Completed**

```
Event: "purchase"
Parameters:
  - value: 180
  - currency: "ILS"
  - items: [
      {
        "item_id": "donation",
        "item_name": "Donation",
        "price": 180
      }
    ]
  - transaction_id: "[UNIQUE_ID]"
  - payment_type: "credit_card" | "bank_transfer"
```

**Step 7: Thank You Page Reached**

```
Event: "thank_you_page_view"
Parameters:
  - amount: 180
  - currency: "ILS"
  - frequency: "one-time" | "monthly"
  - donation_success: true
```

### Content Engagement Events

**Story View**

```
Event: "view_item"
Parameters:
  - item_name: "David's Torah Journey"
  - item_category: "student_story"
  - item_id": "student-david-levi"
```

**Building Update View**

```
Event: "view_item"
Parameters:
  - item_name: "Foundation Complete"
  - item_category: "building_update"
  - item_id: "building-foundation-complete"
  - progress_percentage: 30
```

**News Article View**

```
Event: "view_item"
Parameters:
  - item_name: "Sukkot Celebration 2026"
  - item_category: "news_article"
  - item_id: "news-sukkot-2026"
```

**Gallery Image View**

```
Event: "view_item"
Parameters:
  - item_name: "Students Learning"
  - item_category: "gallery_image"
  - item_id: "gallery-students-01"
```

### Share Events

**Share on Social Media**

```
Event: "share"
Parameters:
  - method: "whatsapp" | "facebook" | "email" | "copy-link"
  - content_type: "donation_thank_you" | "story" | "building_update"
  - content_id: "[CONTENT_ID]"
```

**Example trigger**: User shares donation thank-you page on WhatsApp

### Form Events

**Contact Form Submission**

```
Event: "generate_lead"
Parameters:
  - form_type: "contact"
  - form_name: "General Contact"
  - status: "submitted"
  - phone_provided: true | false
  - message_length: 150 (characters)
```

**Newsletter Signup**

```
Event: "newsletter_signup"
Parameters:
  - signup_source: "homepage" | "footer" | "popup"
  - language_preference: "he" | "en"
```

### Language Switch Event

**Language Toggle**

```
Event: "language_switched"
Parameters:
  - from_language: "he"
  - to_language: "en"
  - page_path: "/he/about"
```

### Error Events

**Payment Error**

```
Event: "exception"
Parameters:
  - description: "Payment processor timeout"
  - fatal: false
  - step: "payment"
```

**Form Validation Error**

```
Event: "form_validation_error"
Parameters:
  - form_type: "contact"
  - error_field: "email"
  - error_message": "Invalid email format"
```

---

## CONVERSION TRACKING

### Primary Conversion: Donation

**Conversion Goal**: `purchase` event with value

**Attribution**: Last-click (default)

**Value tracked**: Amount in native currency (ILS, USD, GBP)

### Secondary Conversions

**Contact Form Submission**:
```
Event: "generate_lead"
```

**Newsletter Signup**:
```
Event: "newsletter_signup"
```

**High-Engagement Page Visit** (if applicable):
```
Event: "view_item" for any story/building update
```

---

## CONVERSION FUNNEL ANALYSIS

**Funnel Steps** (in order):

1. **Funnel Entry**: `/donate` page view
2. **Step 1**: Amount selected (`donation_amount_selected`)
3. **Step 2**: Location selected (`donation_location_selected`)
4. **Step 3**: Details provided (`donation_details_provided`)
5. **Step 4**: Payment started (`donation_payment_started`)
6. **Conversion**: Donation completed (`purchase`)

**Analysis**: Which step has highest drop-off? Where should we optimize?

---

## USER SEGMENTATION

### Geographic Segments

**Israel vs. International**:
```
Segment: "Israel Donors"
Condition: country == "IL"
Purpose: Understand local vs. international giving

Segment: "International Donors"
Condition: country != "IL"
Purpose: Track diaspora engagement
```

### Traffic Source Segments

**Organic Search**:
```
Segment: "Organic Search"
Condition: source == "google"
Purpose: Understand SEO effectiveness
```

**Direct**:
```
Segment: "Direct Traffic"
Condition: source == "(direct)"
Purpose: Identify returning visitors, email links
```

**Referral** (links from other sites):
```
Segment: "Referral Traffic"
Condition: source contains "referral"
Purpose: Track partnerships, press coverage
```

### Device Type Segments

**Mobile vs. Desktop**:
```
Segment: "Mobile Users"
Condition: device_type == "mobile"
Purpose: Optimize mobile experience

Segment: "Desktop Users"
Condition: device_type == "desktop"
Purpose: Track desktop-specific metrics
```

### Language Segments

**Hebrew vs. English**:
```
Segment: "Hebrew Site Users"
Condition: language == "he"
Purpose: Understand primary audience

Segment: "English Site Users"
Condition: language == "en"
Purpose: Track international interest
```

---

## DASHBOARD & REPORTS

### Executive Dashboard (Leadership)

**Key Metrics** (refresh daily):
- Total donations (YTD)
- Number of donors
- Average donation amount
- Donation source (Israel vs. International)
- Donation frequency (one-time vs. monthly)
- Key conversion events this week

**Goal**: Understand fundraising performance at a glance

### Performance Dashboard (Marketing/Operations)

**Metrics**:
- Page views by page
- Top entry pages
- Funnel completion rate (by step)
- Traffic sources
- Geographic distribution
- Device distribution
- Language preferences

### Fundraising Dashboard (Development Team)

**Metrics**:
- Donations by source (organic, direct, referral)
- Donations by geographic segment
- Donations by device type
- Average time from first visit to conversion
- Repeat donor rate

### Content Performance Dashboard (Editorial)

**Metrics**:
- Story views (by story)
- Building update views (by update)
- News article views (by article)
- Engagement rate (views per session)
- Share rate (by content type)

### Technical Dashboard (DevOps)

**Metrics**:
- Page load time
- JavaScript errors
- Form submission errors
- Payment errors
- API errors

---

## ALERTS & NOTIFICATIONS

### Critical Alerts

**Set up** (via email or Slack):

1. **Drop in Donations**: Alert if weekly donations drop 50%
2. **Funnel Drop-off**: Alert if donation funnel drop-off > 80% at any step
3. **Error Rate Spike**: Alert if error events > 10 per day
4. **Traffic Anomaly**: Alert if daily traffic drops 50%

### Weekly Reports (Auto-generated)

**Delivered**: Every Monday morning

**Content**:
- Weekly donations summary
- Top performing pages
- Traffic sources breakdown
- Funnel metrics
- Any alerts or anomalies

---

## DATA RETENTION & PRIVACY

### Data Retention

**Set**: 14 months (default GA4)

**Rationale**: 12 months of year-over-year data + 2 months buffer

### User Privacy

**Do NOT track**:
- ❌ Names, email addresses (in GA directly)
- ❌ Credit card details
- ❌ Addresses (location only)
- ❌ Sensitive personal information

**Filtering**:
- Remove internal traffic (office IP)
- Remove test traffic (staging domain)

**Consent**:
- Cookie consent banner for EU visitors (if any)
- Respect browser "Do Not Track" signal

---

## UTM PARAMETERS

**For tracking campaigns**:

### Email Campaigns

```
utm_source=email
utm_medium=newsletter
utm_campaign=building_2026
utm_content=story-link
```

**Example**:
```
https://orchotchaim.co.il/donate?utm_source=email&utm_medium=newsletter&utm_campaign=building_2026
```

### Social Media

```
utm_source=facebook
utm_medium=social
utm_campaign=[campaign_name]
utm_content=[post_id]
```

### Partnerships

```
utm_source=partner-site
utm_medium=referral
utm_campaign=[partner_name]
```

---

## IMPLEMENTATION CHECKLIST

**Setup**:
- [ ] Google Analytics 4 property created
- [ ] Measurement ID configured
- [ ] Google Tag Manager container created
- [ ] Website domain added to GTM
- [ ] GA4 tag added to GTM
- [ ] Custom events defined in GTM
- [ ] Conversion goals defined in GA4

**Events**:
- [ ] `page_view` tracking verified
- [ ] `click_donate_cta` implemented
- [ ] Donation funnel events implemented
- [ ] Content engagement events implemented
- [ ] Error tracking implemented
- [ ] Share events implemented

**Validation**:
- [ ] Real-time reports showing traffic
- [ ] Test events appearing in GA4
- [ ] Conversion funnel shows data
- [ ] Segments filtering correctly
- [ ] UTM parameters tracked

**Dashboards**:
- [ ] Executive dashboard created
- [ ] Performance dashboard created
- [ ] Funnel dashboard created
- [ ] Alerts configured
- [ ] Weekly reports scheduled

---

**STATUS**: IMPLEMENTATION READY

This analytics specification provides comprehensive tracking of user behavior and donation funnel performance, enabling data-driven optimization.
