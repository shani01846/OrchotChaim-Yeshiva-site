# Open Questions & Stakeholder Decisions: Phase 2

**Document**: PHASE 2 Specification — Decision Log  
**Status**: To Be Determined  
**Date**: September 1, 2026

---

## OVERVIEW

This document captures all open questions that require stakeholder input before implementation can proceed.

**Organization**: 
- **P0 (Critical)**: Blocks implementation
- **P1 (High)**: Should be decided before launch
- **P2 (Medium)**: Can be decided during implementation
- **P3 (Low)**: Can be decided post-launch

---

## P0 - CRITICAL (BLOCK IMPLEMENTATION)

These decisions must be made before developers start coding.

### 1. Suggested Donation Amounts

**Question**: What are the correct suggested donation amounts in ILS?

**Current assumption** (from discovery, needs verification):
- ₪180 (Daily Partner)
- ₪500 (Student Partner)
- ₪1,800 (Monthly Partner)
- ₪5,000 (Building Partner)

**Context**: 
- Must be psychologically appropriate
- Should align with actual giving capacity
- Different from international amounts (likely)

**Decision required from**: Leadership / Finance

**Impact**: Affects donation form, marketing, psychology of giving

---

### 2. Student Stories for Launch

**Question**: How many verified student stories are ready for launch?

**Current assumption**: [TBD] — need to audit existing materials

**Context**:
- Minimum recommended: 6 stories
- Ideal: 10+ stories
- All must have written approval (parent/guardian if minor)
- Stories should be diverse (different journeys, years, outcomes)

**Decision required from**: Content team / Leadership

**Impact**: Content scope, launch timeline, homepage design

---

### 3. Building Project Status & Timeline

**Question**: What is the current status of the building project?

**Unknowns**:
- Has construction begun? (Y/N)
- Current phase? (Planning / Foundation / Walls / Interior / etc.)
- Architect rendering available? (Y/N)
- Timeline to completion? (months/years)
- Total budget? (for context)
- Fundraising goal? (for homepage)
- Funding raised to date? (for progress bar)

**Decision required from**: Builders / Finance / Leadership

**Impact**: Building page content, homepage narrative, donation campaign messaging

---

### 4. International Fundraising Structure

**Question**: How should international fundraising be organized?

**Current assumptions**:
- **USA**: Via Keren Yehoshua V'Yisroel (Tax ID 22-3209160)
- **UK**: Via Tiferet Baruch (charity registration needed)
- **Other countries**: [TBD]

**Unknowns**:
- Is Keren Yehoshua structure confirmed operational?
- What is Tiferet Baruch's current status?
- Are there other jurisdictions to support? (Canada, Australia, etc.)
- How are funds transferred from diaspora to Israel?
- Any legal/tax requirements we should know about?

**Decision required from**: Finance / International Fundraising partner

**Impact**: Donation form countries, tax documentation, compliance

---

### 5. Contact Person for Website Management

**Question**: Who will manage the website after launch?

**Needed**:
- CMS administration (Sanity.io)
- Content updates (stories, news, photos)
- Email support (contact form responses)
- Analytics monitoring
- Payment reconciliation

**Unknowns**:
- Will this be internal staff or external contractor?
- How many hours per week?
- Who approves content before publishing?
- Who handles emergency issues (payment processor down, security issue)?

**Decision required from**: Leadership / Operations

**Impact**: Team hiring, training timeline, support plan, ongoing costs

---

### 6. Donation Amount Translation (International)

**Question**: What should international donation amounts be?

**Current assumption**: Exact USD/GBP equivalents of ILS amounts

**Example**: 
- ₪180 ≈ $50 USD / £40 GBP (TBD exact rates)
- ₪500 ≈ $135 USD / £110 GBP (TBD)
- ₪1,800 ≈ $500 USD / £410 GBP (TBD)
- ₪5,000 ≈ $1,350 USD / £1,100 GBP (TBD)

**OR**: Psychological amounts (different for each currency)
- USA: $36, $120, $360, $1,000
- UK: £25, £75, £250, £750

**Decision required from**: Marketing / Finance

**Impact**: International donation form, fundraising psychology

---

### 7. Approval Process for Sensitive Content

**Question**: Who approves content before publishing?

**Content types**:
- Student stories (requires parental/student approval)
- Staff profiles (requires approval of person portrayed)
- Testimonials (requires approval from author)
- Building project updates (requires approval from builders?)
- News about donors (requires donor approval?)

**Unknowns**:
- Who is the approver for each content type?
- What is approval workflow? (Email? In CMS? Formal form?)
- How long should approval take? (24 hours? 1 week?)
- What happens if approval is denied?

**Decision required from**: Leadership / Content team

**Impact**: Content publishing workflow, launch date, ongoing operations

---

### 8. Recurring Donation Platform

**Question**: Should we support monthly/recurring donations?

**Current assumption**: Yes, at launch

**Unknowns**:
- Does Matara.pro support recurring donations?
- If yes, how does the API work?
- If no, should we implement manual monthly charging (more complex)?
- Should donors be able to modify/cancel recurring donations? (requires account dashboard)
- Should we promote recurring more heavily than one-time?

**Decision required from**: Finance / Technical lead

**Impact**: Payment integration complexity, user experience, recurring revenue

---

## P1 - HIGH (DECIDE BEFORE LAUNCH)

These should be decided before launch, but could potentially be decided during implementation.

### 9. Staff Member Photos & Profiles

**Question**: Which staff members should have profile pages?

**Current assumption**: At minimum, Rabbi Chaim Kirzon

**Unknowns**:
- How many staff should be featured?
- Should all staff have photos? (or just leadership)
- Should all staff profiles be public? (or only selected?)
- What biography details are appropriate to share?
- Who provides the bio information?

**Decision required from**: Leadership

**Impact**: Leadership page scope, content volume, data collection

---

### 10. Newsletter / Email Engagement

**Question**: Should we implement a newsletter?

**Current assumption**: Not for launch (nice to have Phase 2)

**Unknowns**:
- Do stakeholders want email newsletter?
- What frequency? (weekly, monthly, quarterly)
- What content? (news, stories, building updates, appeals)
- Who writes newsletter?
- What email service to use? (Mailchimp, SendGrid, etc.)

**Decision required from**: Marketing / Leadership

**Impact**: Content calendar, resource allocation, timeline

---

### 11. Social Media Integration

**Question**: Which social media platforms should be featured?

**Current assumption** (needs verification):
- Facebook (likely)
- Instagram (likely)
- WhatsApp (business channel)
- YouTube (for videos)
- Twitter/X (if used)
- TikTok (probably not for this audience)

**Unknowns**:
- Which platforms are currently active?
- What are the account handles?
- What's the content strategy for each platform?
- Should we embed social feeds on website? (Instagram, Facebook)
- Should we have social login? (probably not needed)

**Decision required from**: Marketing

**Impact**: Footer links, social proof integration, cross-promotion

---

### 12. Video Content

**Question**: Should we include video testimonials or other videos?

**Current assumption**: Not required for launch, but could enhance

**Unknowns**:
- Do we have existing video testimonials?
- Would stakeholders like to create video testimonials?
- Should homepage have a "watch our story" video?
- Where would videos be hosted? (YouTube)
- Who would film/edit videos?
- Production timeline and cost?

**Decision required from**: Leadership / Marketing

**Impact**: Homepage design, content production, launch readiness

---

### 13. Multi-Year Pledge Campaigns

**Question**: Should donors be able to pledge commitments (not yet paid)?

**Example**: "I pledge to give $50/month for 3 years starting January 2027"

**Current assumption**: Not for launch

**Unknowns**:
- Is this needed for major donor cultivation?
- How would pledge tracking work?
- How would reminder emails work?
- Should pledges be public (displayed on fundraising pages)?

**Decision required from**: Finance / Development

**Impact**: Payment system complexity, CRM integration

---

### 14. Matching Gifts / Challenge Campaigns

**Question**: Should we support matching gift campaigns?

**Example**: "For the next 30 days, all donations are matched dollar-for-dollar"

**Current assumption**: Not for launch, possible future feature

**Unknowns**:
- Is this a fundraising strategy the organization uses?
- How would matching be tracked in payment system?
- How would matching be displayed on donation page?
- Who tracks and verifies matches?

**Decision required from**: Finance / Development

**Impact**: Donation page complexity, payment tracking

---

### 15. Donor Recognition Program

**Question**: Should major donors be recognized on website?

**Current assumption**: Testimonials yes, but formal "Wall of Donors"?

**Unknowns**:
- Should we have a donor listing/honor roll?
- What donation amount triggers recognition?
- Should donor names be public or private?
- What about anonymous giving?
- Should recognition be permanent or annual?

**Decision required from**: Finance / Leadership

**Impact**: Website content, privacy concerns, donor motivation

---

### 16. Advanced Analytics & Reporting

**Question**: Should we implement user accounts / donor dashboard?

**Current assumption**: Not for launch

**Unknowns**:
- Would donors want to create accounts?
- Should they see donation history?
- Should they manage recurring donations?
- Should they modify communication preferences?
- What email service integration needed?

**Decision required from**: Finance / Operations

**Impact**: Platform complexity, post-launch feature, user privacy

---

### 17. Blog / News Content Strategy

**Question**: What is the content strategy for news section?

**Current assumptions**:
- Minimum: 1-2 articles per month
- Topics: student achievements, building updates, holiday announcements, events

**Unknowns**:
- Who writes news articles?
- What's the editorial calendar?
- How far in advance should we plan?
- What topics are sensitive (require approval)?
- Should there be a commenting section? (probably not)

**Decision required from**: Content team / Leadership

**Impact**: Content timeline, resource allocation, engagement strategy

---

## P2 - MEDIUM (CAN DECIDE DURING IMPLEMENTATION)

These can be decided once implementation has started, as they don't block critical features.

### 18. Advanced Filtering & Search

**Question**: Should gallery/stories have advanced filters?

**Ideas**:
- Filter stories by: year, theme, outcome
- Filter gallery by: location, date, subject
- Search bar on stories/gallery pages

**Current assumption**: Basic filtering only, search added Phase 2

**Decision required from**: Design / UX

---

### 19. Community Testimonials vs. Staff Testimonials

**Question**: How should testimonials be categorized and presented?

**Categories**:
- Alumni
- Parents
- Donors
- Staff / Rabbis
- Community members

**Current assumption**: Mix all testimonials on homepage, organize by category on dedicated page

**Decision required from**: Leadership

---

### 20. Mobile App (Future)

**Question**: Should we plan for a mobile app?

**Current assumption**: No, website is mobile-first for now

**Decision required from**: Leadership / Technology

---

### 21. WhatsApp Integration

**Question**: Should donors receive updates via WhatsApp?

**Current assumption**: Link to WhatsApp channel in footer, not automatic sending

**Unknowns**:
- Should we use WhatsApp Business API?
- How often would we message?
- What type of updates?

**Decision required from**: Marketing

---

### 22. Accessibility Beyond WCAG AA

**Question**: Should we implement advanced accessibility features?

**Ideas**:
- High contrast mode toggle
- Simplified language option
- Text-to-speech integration
- Reading guides for dyslexia

**Current assumption**: WCAG 2.2 AA compliance, Phase 2 for advanced features

**Decision required from**: Leadership (if supporting diverse needs is priority)

---

## P3 - LOW (CAN DECIDE POST-LAUNCH)

These are nice-to-have features that can be added later.

### 23. Seasonal Campaigns

**Question**: Should we create campaigns for holidays/seasons?

**Ideas**:
- Purim campaign (March)
- Passover campaign (April)
- Shavuot campaign (June)
- High Holidays campaign (September/October)
- Chanukah campaign (December)
- Year-end giving campaign (December)

**Current assumption**: Launch with general campaigns, add seasonal Phase 2

---

### 24. Peer-to-Peer Fundraising

**Question**: Should we enable donors to create fundraising pages?

**Example**: "Create a campaign to fundraise for Yeshivat Orchot Chaim for your birthday"

**Current assumption**: Not needed for launch

---

### 25. Affiliate/Referral Program

**Question**: Should we implement referral rewards?

**Example**: "Refer a friend and earn $5 credit"

**Current assumption**: Not needed for launch

---

### 26. Print Materials Integration

**Question**: Should website link to printable materials?

**Ideas**:
- Printable donation brochure
- Event posters
- Email templates

**Current assumption**: Not needed for launch

---

### 27. Podcast / Audio Content

**Question**: Should we add podcast or audio interviews?

**Current assumption**: Not needed for launch

---

### 28. Building 360-Degree Tour

**Question**: Should we add interactive 360° building tour?

**Current assumption**: Not needed for launch, but could enhance if content available

---

## DECISION LOG

| Question | Status | Decision | Decided By | Date | Notes |
|----------|--------|----------|-----------|------|-------|
| Suggested ILS amounts | [TBD] | [TBD] | [TBD] | [TBD] | |
| Student stories count | [TBD] | [TBD] | [TBD] | [TBD] | |
| Building project status | [TBD] | [TBD] | [TBD] | [TBD] | |
| International structure | [TBD] | [TBD] | [TBD] | [TBD] | |
| Website manager | [TBD] | [TBD] | [TBD] | [TBD] | |
| Intl amounts | [TBD] | [TBD] | [TBD] | [TBD] | |
| Content approval | [TBD] | [TBD] | [TBD] | [TBD] | |
| Recurring donations | [TBD] | [TBD] | [TBD] | [TBD] | |

---

## TIMELINE FOR DECISIONS

**Before Development Starts**: P0 questions (Critical) + questions 9-10

**Week 1 of Development**: Questions 11-17 (can be parallelized)

**Week 2-3 of Development**: Questions 18-22 (refinement questions)

**After Launch**: Questions 23-28 (enhancements)

---

## HOW TO ANSWER THESE QUESTIONS

**For each question**:
1. Lead stakeholder reviews question and options
2. Discussion with team if needed
3. Decision documented (see Decision Log above)
4. Update relevant specification document
5. Notify development team if architectural impact

**Communication channel**: [TBD - email, meeting, etc.]

**Decision timeline goal**: All P0 questions answered before development starts

---

## CONTINGENCY PLANS

**If decisions are delayed**:
- **P0**: Development is blocked (cannot start)
- **P1**: Use default assumptions and implement, refactor if decision changes
- **P2-P3**: Implement with toggle/feature flag, can change later

---

**STATUS**: AWAITING STAKEHOLDER INPUT

No development can begin until P0 questions are answered.
