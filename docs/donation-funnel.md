# Donation Funnel Design: Yeshivat Orchot Chaim

**Document**: PHASE 1 Discovery — Conversion Funnel  
**Status**: For Review  
**Date**: September 1, 2026

---

## EXECUTIVE SUMMARY

The donation experience is NOT a form. It is a **conversion funnel** with psychological milestones.

Current state: Visitors reach a donations page with payment methods.  
Desired state: Visitors complete a structured journey that removes friction while reinforcing emotional connection.

---

## CURRENT DONATION EXPERIENCE (EXISTING SITE)

### User Flow
```
Homepage
   ↓
Donations page (תרומות)
   ↓
Choose payment method:
   • Online (Matara processor)
   • Bank transfer (Israel)
   • International (UK/USA)
   ↓
Complete payment
   ↓
Email receipt (maybe)
```

### Current Friction Points
1. **No narrative before ask** — Visitor goes directly to payment
2. **No suggested amounts** — Only one amount (₪150)
3. **No impact explanation** — Doesn't clarify what donation enables
4. **No monthly option visibility** — Recurring giving not obvious
5. **No thank you experience** — No confirmation message or next steps
6. **Limited international UX** — International donors must search for options
7. **No social sharing** — Missed viral/referral opportunity
8. **No donor retention** — No follow-up, updates, or community

---

## DESIRED DONATION FUNNEL

### Complete User Journey

```
STEP 1: AWARENESS
Homepage or campaign
   ↓
   Visitor understands story
   Visitor cares about mission
   Visitor recognizes need

STEP 2: MOTIVATION
Donation page (entry point)
   ↓
   Reinforces emotional story
   Explains impact
   Removes doubt

STEP 3: SELECTION
Amount selection
   ↓
   Choose suggested tier OR custom amount
   Psychological activation

STEP 4: FREQUENCY
One-time vs. monthly
   ↓
   Monthly giving emphasized
   Clear choice

STEP 5: COUNTRY/CURRENCY
Location & payment method
   ↓
   Detect country
   Show appropriate currency
   Show appropriate payment method

STEP 6: INFORMATION
Minimal form fields
   ↓
   Name
   Email
   Phone (optional)
   Country
   (NOT collecting unnecessary data)

STEP 7: PAYMENT
Secure payment processor
   ↓
   PCI-compliant external processor
   NEVER store card data
   Clear security messaging

STEP 8: CONFIRMATION
Thank you + next steps
   ↓
   Confirmation message
   Donation details
   Receipt generation
   Next actions (follow updates, share, etc.)

STEP 9: ENGAGEMENT
Donor retention + community
   ↓
   Welcome to donor community
   Invitation to follow
   Optional sharing
   Update subscription
```

---

## FUNNEL PHASE 1: ENTRY & MOTIVATION

### Page: `/donate` or `/he/donate`

**Visual Hierarchy**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│ [SMALL HERO IMAGE - Optional, 40% height]      │
│                                                 │
│ ┌──────────────────────────────────────────┐   │
│ │ אני רוצה להיות שותף                      │   │
│ │ I want to be a partner                   │   │
│ │                                          │   │
│ │ Emotional hook paragraph (2-3 sentences)│   │
│ │ "Your partnership helps us build..."    │   │
│ │                                          │   │
│ │ Key benefit bullets:                     │   │
│ │ • Support the next generation           │   │
│ │ • Contribute to permanent building      │   │
│ │ • Join our community of partners        │   │
│ │                                          │   │
│ └──────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copy Framework

**Headline**:  
"אני רוצה להיות שותף"

**Subheading**:  
"כל שותפות עוזרת לנו להמשיך לבנות תורה, להעניק לתלמידים בית של צמיחה, ולהשלים את בית הקבע של הישיבה."

[Translation: "Every partnership helps us continue building Torah, giving students a home of growth, and completing the permanent home of the yeshiva."]

**Key Messages**:
- Clear value proposition
- Specific impact
- Community invitation
- Urgency (if real)

---

## FUNNEL PHASE 2: AMOUNT SELECTION

### Page: `/donate/amount` (POST from Step 1)

**Interface**

```
┌────────────────────────────────────────────────┐
│                                                │
│ כמה תרצו לתרום?                               │
│ What amount would you like to contribute?      │
│                                                │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │   ₪180   │ │   ₪500   │ │ ₪1,800   │       │
│ │          │ │          │ │          │       │
│ │ Daily    │ │ Partner  │ │ Monthly  │       │
│ │ Partner  │ │ in a     │ │ Partner  │       │
│ │          │ │ Student's│ │          │       │
│ │          │ │ Learning │ │          │       │
│ └──────────┘ └──────────┘ └──────────┘       │
│                                                │
│ ┌──────────┐ ┌──────────────────────────────┐ │
│ │ ₪5,000   │ │ סכום אחר: ₪ [input]         │ │
│ │          │ │                            │ │
│ │ Building │ │ Enter custom amount        │ │
│ │ Partner  │ │                            │ │
│ │          │ │                            │ │
│ └──────────┘ └──────────────────────────────┘ │
│                                                │
│ ┌────────────────────────────────────────┐   │
│ │ המשך ← [NEXT BUTTON]                    │   │
│ └────────────────────────────────────────┘   │
│                                                │
└────────────────────────────────────────────────┘
```

### Tier Design

**Each tier should include**:

1. **Amount**: Large, bold number with currency symbol
2. **Title**: Partnership language (not "donation level")
3. **Description**: 1-2 line explanation of impact
4. **Icon/Color**: Visual differentiation
5. **Selection State**: Clear when selected
6. **Custom Option**: Fallback for other amounts

### Suggested Amounts (REQUIRES VERIFICATION)

| Amount | Title | Description |
|--------|-------|-------------|
| ₪180 | יומי (Daily) | "Share in daily offerings as we build" |
| ₪500 | שותפות בתלמיד (Student Partner) | "Support one student's learning for a month" |
| ₪1,800 | חודשי (Monthly) | "Become a monthly building partner" |
| ₪5,000 | שותפות בבניין (Building Partner) | "Direct contribution to the permanent home" |
| Custom | סכום אחר (Other) | "Enter your own amount" |

### Frequency Selection (Visible at This Stage)

**Add frequency toggle BELOW amount selection**:

```
┌────────────────────────┬────────────────────────┐
│ חד פעמית               │ חודשית                  │
│ One Time               │ Monthly                │
│ (Standard)            │ (Recommended)          │
└────────────────────────┴────────────────────────┘
```

### Mobile Behavior
- Full-width cards
- Vertically stacked on small screens
- Large tap targets (48px+ height)
- Custom amount field visible, not hidden

### Psychological Considerations
1. **Suggested amounts**: Removes cognitive load
2. **Middle option prominence**: Typically ₪500 is most selected
3. **Monthly option emphasis**: Higher LTV
4. **Custom fallback**: Doesn't exclude others
5. **Clear selection**: User always knows where they are

### Accessibility
- Radio button groups for screen readers
- Keyboard navigation
- Clear focus states
- Alt text for tier icons

---

## FUNNEL PHASE 3: COUNTRY & CURRENCY

### Page: `/donate/location` (POST from Phase 2)

**Detect & Default**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│ איפה אתם?                                      │
│ Where are you?                                  │
│                                                 │
│ This helps us ensure secure payment and proper │
│ tax receipting.                                 │
│                                                 │
│ ┌──────────────────────────────────────────┐   │
│ │ עם מדינה / Select country:              │   │
│ │                                          │   │
│ │ [Dropdown with flag icons]               │   │
│ │ • 🇮🇱 Israel                            │   │
│ │ • 🇺🇸 United States                     │   │
│ │ • 🇬🇧 United Kingdom                    │   │
│ │ • 🇪🇺 Other European                    │   │
│ │ • 🌍 Other Country                      │   │
│ │                                          │   │
│ └──────────────────────────────────────────┘   │
│                                                 │
│ Suggested Currency: $ USD                      │
│ (User can override)                            │
│                                                 │
│ ┌────────────────────────────────────────┐    │
│ │ המשך ← [NEXT BUTTON]                    │    │
│ └────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Implementation Details

**Geolocation Strategy**:
1. JavaScript detects visitor IP geolocation (optional, requires consent)
2. Pre-fill country dropdown
3. Allow user override
4. Remember preference (localStorage)

**Currency Mapping**:

| Country | Currency | Payment Method |
|---------|----------|-----------------|
| Israel | ILS (₪) | Matara, Bank Transfer |
| USA | USD ($) | Stripe/PayPal, ACH |
| UK | GBP (£) | Stripe, UK Bank Transfer |
| Canada | CAD ($) | Stripe/PayPal |
| EU | EUR (€) | Stripe, SEPA |
| Other | USD ($) | Stripe/PayPal |

### Dynamic Content by Location

**Israel**:
- Currency: ILS
- Mature text: "תודה שאתם תומכים בתורה בארץ"
- Payment methods: Matara, bank transfer
- Tax receipt: Israeli nonprofit form

**USA**:
- Currency: USD
- Message: "Your donation is tax-deductible"
- Payment methods: Stripe, PayPal, ACH
- Tax receipt: US 501(c)(3) form
- Organization: Keren Yehoshua V'Yisroel

**UK**:
- Currency: GBP
- Message: "Your donation is tax-deductible in the UK"
- Payment methods: Stripe, UK bank transfer
- Tax receipt: UK charity form
- Organization: Tiferet Baruch

### Design Principles
- Clear language (not technical)
- Visual flag indicators
- Reassurance messaging
- Tax benefit transparency

---

## FUNNEL PHASE 4: DONOR INFORMATION

### Page: `/donate/details` (POST from Phase 3)

**Minimal Form Collection**

```
┌──────────────────────────────────────────────────┐
│                                                  │
│ פרטי התרם                                        │
│ Donor Information                                │
│                                                  │
│ We'll use this for tax receipting and updates.   │
│                                                  │
│ ┌───────────────────────────────────────────┐   │
│ │ שם מלא *                                   │   │
│ │ Full Name                                  │   │
│ │ [__________________________]               │   │
│ └───────────────────────────────────────────┘   │
│                                                  │
│ ┌───────────────────────────────────────────┐   │
│ │ דוא"ל *                                    │   │
│ │ Email Address                              │   │
│ │ [__________________________]               │   │
│ └───────────────────────────────────────────┘   │
│                                                  │
│ ┌───────────────────────────────────────────┐   │
│ │ טלפון (לא חובה)                            │   │
│ │ Phone (Optional)                           │   │
│ │ [__________________________]               │   │
│ └───────────────────────────────────────────┘   │
│                                                  │
│ ┌───────────────────────────────────────────┐   │
│ │ ☐ I would like email updates about this   │   │
│ │   project                                  │   │
│ │                                            │   │
│ │ ☐ I would like to receive the newsletter  │   │
│ └───────────────────────────────────────────┘   │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ המשך ← [NEXT BUTTON]                       │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Form Fields

**Required** (marked with *):
1. **Full Name**: Used for receipt and contact
2. **Email**: Donation confirmation, receipts, updates
3. **Country**: Already collected, confirm display

**Optional**:
1. **Phone**: For contact/questions, not required
2. **Company/Organization**: If donating on behalf of organization
3. **Address**: Only if required for tax receipt (varies by country)

**Preferences**:
1. **Email updates**: Building progress, impact stories
2. **Newsletter**: General yeshiva news
3. **Sharing**: "Tell me when my donation is matched" (gamification)

### Mobile Behavior
- Full-width input fields
- Large, readable font (16px+)
- Proper input types (type="email", type="tel")
- Mobile keyboard optimization
- Single-column layout

### Validation
- Real-time error feedback (but not intrusive)
- Email validation
- Required field indicators
- Clear error messages in Hebrew and English

### Privacy & Trust
- Clear statement: "We never share your information"
- Link to privacy policy
- Security certification badge (if applicable)

---

## FUNNEL PHASE 5: PAYMENT

### Page: `/donate/payment` (POST from Phase 4)

**Payment Method Display**

```
┌──────────────────────────────────────────────┐
│                                              │
│ תשלום                                         │
│ Payment                                      │
│                                              │
│ Total: ₪500 (One-time)                      │
│                                              │
│ SUMMARY:                                     │
│ ┌──────────────────────────────────────────┐ │
│ │ Partnership Type: Student Partner        │ │
│ │ Amount: ₪500                              │ │
│ │ Frequency: One-time                      │ │
│ │ Currency: ILS (Israeli Shekel)           │ │
│ │                                          │ │
│ │ Donor: [Name from Phase 4]               │ │
│ │ Email: [Email from Phase 4]              │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ PAYMENT METHOD:                              │
│                                              │
│ [CONTEXT-SPECIFIC OPTION A]                 │
│   Credit/Debit Card (Recommended)           │
│   [Stripe embedded form]                    │
│                                              │
│ Or                                          │
│                                              │
│ [CONTEXT-SPECIFIC OPTION B]                 │
│   PayPal / Apple Pay / Google Pay           │
│   [PayPal button]                           │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ 🔒 Secure payment powered by [Processor] │ │
│ │ Your card data is never stored            │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ ← Back    [Complete Donation] ✓          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

### Payment Processing Strategy

**Context-Specific Processors**

**For Israel (ILS)**:
- Primary: Matara.pro (existing partner)
- Fallback: Stripe (if Matara integration fails)
- Backup: Manual bank transfer option

**For USA/International (USD/GBP/EUR)**:
- Primary: Stripe
- Secondary: PayPal
- Tertiary: ACH (USA only) / Bank transfer

### Security Considerations
1. **PCI Compliance**: Use external processors ONLY (never collect card data)
2. **HTTPS**: All payment pages over TLS
3. **Tokenization**: If storing payment method for recurring, use tokens (not raw cards)
4. **Fraud Detection**: Processor's built-in tools
5. **Security Badges**: Display trust indicators

### UX for Recurring (Monthly) Donations
```
This is a monthly recurring donation.

Your card will be charged ₪500 on the 1st of 
each month.

You can manage or cancel anytime in your 
donor dashboard.

☑ I understand and authorize this recurring charge
```

### Mobile Payment
- Mobile wallet integration (Apple Pay, Google Pay)
- One-tap payment if available
- Simplified card entry
- Avoid requiring ZIP code if not necessary

### Error Handling
- Clear error messages (not technical codes)
- Retry options
- Contact support link
- Alternative payment method button

---

## FUNNEL PHASE 6: CONFIRMATION & THANK YOU

### Page: `/donate/thank-you` (POST-PAYMENT REDIRECT)

**Thank You Experience**

```
┌────────────────────────────────────────────────┐
│                                                │
│              ✓ תודה רבה!                      │
│              ✓ Thank You!                      │
│                                                │
│  Your partnership means everything            │
│  to the yeshiva and its students.             │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ DONATION CONFIRMED                          │ │
│ │                                             │ │
│ │ Donation Amount:    ₪500                   │ │
│ │ Partner Type:       Student Partner         │ │
│ │ Transaction ID:     [ID]                   │ │
│ │ Date:               [Date]                 │ │
│ │ Frequency:          One-time               │ │
│ │                                             │ │
│ │ A confirmation email has been sent to:     │ │
│ │ [email@example.com]                        │ │
│ │                                             │ │
│ │ Your tax receipt is attached/available.    │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ NEXT STEPS:                                    │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ 1. STAY INFORMED                           │ │
│ │                                             │ │
│ │ ☑ Follow building progress on WhatsApp    │ │
│ │ ☑ Get email updates (monthly)             │ │
│ │ ☑ Join the donor community                │ │
│ │                                             │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ 2. MAKE AN IMPACT NOW                      │ │
│ │                                             │ │
│ │ Share with a friend who might want to     │ │
│ │ be a partner too.                         │ │
│ │                                             │ │
│ │ [WhatsApp Share]  [Facebook]  [Copy Link] │ │
│ │                                             │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ 3. QUESTIONS?                              │ │
│ │                                             │ │
│ │ Contact: rabbi.kirzon@gmail.com            │ │
│ │ Phone: 054-8407472                         │ │
│ │                                             │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ [Return to Home]  [View Building Updates]    │
│                                                │
└────────────────────────────────────────────────┘
```

### Thank You Page Components

**1. Confirmation Header**
- Large checkmark icon
- "תודה רבה!" (Thank you very much)
- Emotional gratitude message

**2. Donation Summary**
- Clearly display what was donated
- Transaction ID (for reference)
- Confirmation that receipt was sent
- Link to download receipt/tax form

**3. Preference Setup**
- WhatsApp: "Get building updates" (link to WhatsApp contact)
- Email: "Choose update frequency" (link or checkbox)
- Newsletter: "Stay connected" option

**4. Sharing Opportunities**
- **"Share with friends"**: Viral loop opportunity
- **WhatsApp**: Pre-filled message (customizable)
- **Facebook**: OG tags for rich preview
- **Copy Link**: For any platform
- **Email**: Traditional sharing

### Share Message Template

**One-Time Donor**:  
> "I just became a partner in building Yeshivat Orchot Chaim. 
> 
> This yeshiva is building a permanent home for the next generation of students.
> 
> Join me: [link]"

**Monthly Donor**:  
> "I'm a monthly partner supporting Yeshivat Orchot Chaim.
> 
> Every month, I'm helping students grow in Torah and character.
> 
> You can be a partner too: [link]"

**Building-Specific**:  
> "I just contributed to building the permanent home of Yeshivat Orchot Chaim.
> 
> This is a real building happening right now. Be part of it: [link]"

### Donor Dashboard (Future Phase)

Future feature: Recurring donors can access:
- Donation history
- Receipt downloads
- Update preferences
- Payment method management
- Donation impact tracking
- Alumni/student updates

---

## FUNNEL PHASE 7: POST-DONATION ENGAGEMENT

### Email Sequence

**Email 1: Immediate (Transactional)**
- Subject: "Your donation confirmation - Yeshivat Orchot Chaim"
- Content: Donation details, tax receipt, thank you
- Action: Link to download receipt

**Email 2: 24 hours later (Welcome)**
- Subject: "Welcome to our partnership"
- Content: Yeshiva story, student impact, building updates
- Action: Invite to WhatsApp updates, set preferences

**Email 3: 7 days later (Value)**
- Subject: "[Name], your partnership in action"
- Content: Building progress photo, student story
- Action: Link to full story, donation history

**Email 4: 30 days later (Engagement)**
- Subject: "This month's impact - from your partnership"
- Content: Recent updates, achievements, next milestone
- Action: Suggest monthly giving upgrade

### WhatsApp Engagement

**Automated Sequence**:
1. Welcome message with building link
2. Weekly building progress photo (with caption)
3. Monthly impact story
4. Special updates (milestones, events)

**Manual Touchpoints**:
- Donor appreciation message on Yom Tov
- Personalized thank you from Rabbi
- Invitation to special events
- Building completion announcement

### Newsletter Integration

- Monthly "Partnership Update"
- Building progress with photos
- Student story feature
- Upcoming events
- Donation impact metrics
- Invitation to donate/upgrade

---

## FUNNEL ANALYTICS & TRACKING

### Conversion Metrics

**Track at Each Funnel Stage**:
1. **Page Views**: `/donate`
2. **Amount Selection**: `donate_amount_selected`
3. **Location Confirmed**: `donate_location_confirmed`
4. **Information Entered**: `donate_info_entered`
5. **Payment Initiated**: `donate_payment_initiated`
6. **Payment Completed**: `donation_completed` ← **KEY METRIC**
7. **Thank You Viewed**: `thank_you_viewed`
8. **Share Clicked**: `donation_shared`

### Drop-off Analysis

Track where visitors leave:
- % who start but don't complete amount selection
- % who complete amount but don't confirm location
- % who confirm location but don't enter details
- % who enter details but don't initiate payment
- % who initiate payment but don't complete

### Segment Analysis

- **One-time vs. Monthly**: Conversion rate, average amount
- **By Source**: Homepage, campaign, WhatsApp, etc.
- **By Country**: Israel, USA, UK, other
- **By Tier**: Which amounts are most popular?
- **By Language**: Hebrew vs. English conversion
- **By Device**: Mobile vs. desktop success rate

### Attribution

Preserve UTM parameters through entire funnel:
- `utm_source`: Where they came from (homepage, whatsapp, facebook)
- `utm_medium`: How (social, email, direct)
- `utm_campaign`: Which campaign (building, annual, purim)
- `utm_content`: Specific element clicked
- `utm_term`: Search term (if applicable)

---

## OPTIMIZATION PRIORITIES

### Phase 1 (MVP)
- ✓ Basic amount selection
- ✓ Single payment processor (Matara for Israel, Stripe international)
- ✓ Email confirmation
- ✓ Thank you page
- ✓ Basic analytics

### Phase 2 (Enhancement)
- Recurring donation optimization
- WhatsApp integration
- Social sharing templates
- Multiple payment methods
- Donor preferences
- Newsletter subscription

### Phase 3 (Scaling)
- A/B testing of amounts
- Donor dashboard
- Advanced segmentation
- Email automation
- Mobile app integration
- International expansion

---

## MOBILE-FIRST DONATION FLOW

### Optimizations for Mobile

1. **Faster Loading**: Lazy load images, minimize JavaScript
2. **Touch Targets**: 48px minimum button height
3. **Readable Text**: 16px+ minimum
4. **Minimal Scrolling**: One section per screen on small devices
5. **Form Simplification**: Only essential fields on mobile
6. **Payment**: Mobile wallet (Apple Pay, Google Pay) preferred
7. **Confirmation**: Full-screen success state (not modal)
8. **Sticky CTA**: "Complete Donation" button stays visible

### Mobile-Specific UX

```
MOBILE FLOW:

Screen 1:
├─ Amount Selection
└─ Frequency Toggle

Screen 2:
├─ Confirm Amount
└─ Country Selector

Screen 3:
├─ Donor Name
├─ Email
└─ Phone (optional)

Screen 4:
├─ Payment Method
└─ "Complete" Button

Screen 5:
├─ Thank You
├─ Sharing
└─ Back to Home
```

---

## INTERNATIONAL DONATION EXPERIENCE

### USA Visitor Flow

```
1. Visits homepage (auto-detected US)
2. Views donation page
3. Sees: "Your donation is tax-deductible"
4. Selects amount in USD
5. Enters name/email
6. Pays via Stripe
7. Receives tax receipt for Keren Yehoshua V'Yisroel
8. Gets added to US donor mailing list
```

### UK Visitor Flow

```
1. Visits homepage (auto-detected UK)
2. Views donation page
3. Sees: "Registered charity in UK"
4. Selects amount in GBP
5. Enters name/email
6. Pays via Stripe or bank transfer
7. Receives UK charity receipt
8. Gets added to UK supporter communications
```

### Israel Visitor Flow

```
1. Visits homepage
2. Views donation page (Hebrew default)
3. Selects amount in ILS
4. Chooses bank transfer or online (Matara)
5. Completes payment
6. Gets Israeli nonprofit receipt
7. Added to Israeli mailing list/WhatsApp
```

---

## QUESTIONS FOR STAKEHOLDER REVIEW

1. **Suggested Amounts**: Are ₪180, ₪500, ₪1,800, ₪5,000 appropriate? Any data on historical giving?
2. **Monthly Giving**: What percentage of donors are monthly vs. one-time?
3. **Payment Processors**: Is Matara the existing processor? Any issues?
4. **Recurring Donation Default**: Should monthly be pre-selected or just suggested?
5. **Tax Forms**: Which countries require what forms?
6. **International Giving**: Are UK/USA channels still active? Any volumes?
7. **Communication Preferences**: WhatsApp, email, newsletter — what's the preference?
8. **Donor CRM**: Is there existing donor database? Any integration needed?

---

## NEXT STEPS

1. **Stakeholder review** of this funnel
2. **Verify amounts** and international payment options
3. **Finalize copy** and emotional messaging
4. **Create wireframes** for each page
5. **Set up payment processors**:
   - Matara (Israel)
   - Stripe (International)
   - PayPal (backup)
6. **Build analytics** event tracking
7. **Implement forms** with validation
8. **Test on mobile**
9. **Launch and iterate**

---

*This is a strategic funnel design, not a visual mockup.*  
*Detailed UI implementation will follow in Phase 2.*

**Status**: Ready for stakeholder review and feedback.
