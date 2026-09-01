# Verified Facts Database: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Source of Truth  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## OVERVIEW

This document is the single source of truth for institutional facts, extracted only from verified sources (discovery documents, confirmed communications, etc.).

**Rules**:
- ✓ Only facts from Discovery phase 1 documents included
- ✓ No invented information
- ✓ All other facts marked [TBD]
- ✓ Updated when new verified information arrives

---

## INSTITUTIONAL IDENTITY

### Name & Branding

**Legal Name**: Yeshivat Orchot Chaim (ישיבת ארחות חיים)
- **Hebrew**: ישיבת ארחות חיים
- **English**: Yeshivat Orchot Chaim
- **Source**: Discovery phase 1 (domain name)

**Domain**: orchotchaim.co.il
- **Source**: Discovery phase 1

### Location

**City**: Jerusalem (ירושלים)
- **Source**: Discovery phase 1

**Full Address**: [TBD]
- **Source**: Awaiting confirmation

**Contact Coordinates**: [TBD]
- **Source**: To be verified

---

## LEADERSHIP

### Primary Leadership

**Name**: Rabbi Chaim Kirzon (הרב חיים קירזון)
- **Title**: Rosh Hayeshiva (ראש הישיבה)
- **Role**: Head of yeshiva, primary institutional leader
- **Source**: Discovery phase 1 (site-analysis.md)

**Contact Information**:
- **Phone**: 054-8407472
- **Email**: rabbi.kirzon@gmail.com
- **Note**: Email domain suggests gmail (personal) - verify if public
- **Source**: Discovery phase 1

**Bio**: [TBD]
- **Source**: Awaiting biographical details

### Additional Leadership

**Other Staff Members**: [TBD]
- **Names**: [TBD]
- **Roles**: [TBD]
- **Bios**: [TBD]
- **Source**: Awaiting information

---

## INSTITUTIONAL CONTACT

### Office Contact

**Main Office Phone**: 02-6426587
- **Source**: Discovery phase 1

**Office Email**: [TBD]
- **Source**: Not yet verified

**WhatsApp**: [TBD]
- **Source**: Not yet confirmed

**Mailing Address**: [TBD]
- **Source**: Awaiting confirmation

### Operating Hours

**Hours**: [TBD]
- **Source**: Not yet determined

**Holiday Closures**: [TBD]
- **Source**: Not yet provided

---

## BANKING & DONATIONS (ISRAEL)

### Bank Account (Israel)

**Bank**: Bank Leumi (בנק לאומי)
- **Source**: Discovery phase 1

**Branch**: 902
- **Source**: Discovery phase 1

**Account Number**: 59990014
- **Source**: Discovery phase 1

**Note**: Verify this is still active and correct before launching

### Payment Methods (Israel)

**Primary**: Matara.pro (existing, verified)
- **Status**: Currently in use on website
- **Source**: Discovery phase 1

**Alternative**: Direct bank transfer (details above)
- **Status**: Currently used
- **Source**: Discovery phase 1

**Backup**: Stripe (if Matara unavailable)
- **Status**: To be configured
- **Source**: Architecture decision

---

## INTERNATIONAL FUNDRAISING

### United States

**Nonprofit Organization**: Keren Yehoshua V'Yisroel
- **Tax ID**: 22-3209160
- **Status**: IRS-recognized, can receive tax-deductible donations
- **Source**: Discovery phase 1

**Currency**: USD
- **Source**: Geography

**Payment Processor**: Stripe primary, PayPal secondary
- **Source**: Architecture decision

### United Kingdom

**Charity Name**: Tiferet Baruch
- **Charity Registration**: [TBD - need to verify]
- **Status**: UK-registered charity
- **Source**: Discovery phase 1 (mentioned as channel)

**Currency**: GBP
- **Source**: Geography

**Payment Processor**: Stripe
- **Source**: Architecture decision

---

## EXISTING WEBSITE

### Current Platform

**Platform**: WordPress
- **Source**: Discovery phase 1

**Domain**: orchotchaim.co.il
- **Source**: Discovery phase 1

### Current Pages

**Homepage**: `/` → Minimal content
- **Source**: Discovery phase 1

**Donations Page**: `/תרומות/` (Hebrew)
- **Status**: To be redirected to `/he/donate`
- **Source**: Discovery phase 1

---

## STATISTICS & NUMBERS

### Student Numbers

**Current Enrollment**: [TBD]
- **Source**: Not yet provided
- **TODO**: Verify with institution

### Years Operating

**Founded**: [TBD]
- **Source**: Not yet provided
- **TODO**: Verify with leadership

### Alumni Count

**Alumni**: [TBD]
- **Source**: Not yet provided
- **TODO**: Verify if available

---

## BUILDING PROJECT

### Project Status

**Current Facility**: Existing building in Jerusalem
- **Source**: Discovery phase 1

**Building Vision**: New facility to expand capacity and improve learning environment
- **Details**: From discovery phase 1 (homepage-wireframe.md)

**Construction Timeline**: [TBD]
- **Source**: Not yet provided
- **TODO**: Obtain architect timeline

**Current Phase**: [TBD]
- **Source**: Not yet determined
- **TODO**: Get project status from builders

### Funding Status

**Total Goal**: [TBD]
- **Source**: Not yet provided
- **TODO**: Determine final fundraising target

**Amount Raised**: [TBD]
- **Source**: Not yet provided
- **TODO**: Verify with finance

**Progress**: [TBD]
- **Source**: Not yet tracked

---

## CORE VALUES & MISSION

### Mission Statement

**Stated Mission**: [TBD]
- **Source**: Not yet formally documented
- **TODO**: Collect from leadership

### Core Values

**Primary Value**: Personal relationship between rabbi and student
- **Description**: "Every student is an entire world" - focus on individual growth, not just mass learning
- **Source**: Discovery phase 1 (homepage-wireframe.md)

**Other Values**: [TBD]
- **Source**: To be confirmed with leadership

### Learning Approach

**Approach**: Torah learning focused on personal relationship and character development
- **Details**: From discovery phase 1
- **TODO**: Expand with educational philosophy

---

## SUGGESTED DONATION AMOUNTS (ISRAEL)

### Proposed Tiers

These amounts were suggested in discovery but REQUIRE VERIFICATION:

| Amount | Name | Description | Status |
|--------|------|-------------|--------|
| ₪180 | Daily Partner | Supporting daily learning | [TBD] |
| ₪500 | Student Partner | Supporting one student | [TBD] |
| ₪1,800 | Monthly Partner | Monthly commitment | [TBD] |
| ₪5,000 | Building Partner | Building project support | [TBD] |

**CRITICAL NOTE**: These amounts are HYPOTHETICAL until verified with leadership

**TODO**: 
- [ ] Confirm amounts with leadership
- [ ] Verify psychological positioning
- [ ] Adjust based on institutional preference

---

## SUGGESTED DONATION AMOUNTS (INTERNATIONAL)

### Proposed International Tiers

| Amount | Currency | Description | Status |
|--------|----------|-------------|--------|
| $36 | USD | [TBD] | [TBD] |
| $120 | USD | [TBD] | [TBD] |
| $360 | USD | [TBD] | [TBD] |
| $1,000 | USD | [TBD] | [TBD] |

**CRITICAL NOTE**: These amounts are HYPOTHETICAL

**TODO**:
- [ ] Set USD amounts based on ILS equivalents
- [ ] Set GBP amounts (same as USD, converted)
- [ ] Verify with international fundraising strategy

---

## PREVIOUS YEAR DATA (IF AVAILABLE)

### Donation Statistics

**Total Donations**: [TBD]
- **Source**: Not yet provided

**Average Donation**: [TBD]
- **Source**: Not yet provided

**Donor Count**: [TBD]
- **Source**: Not yet provided

**Fundraising Goal**: [TBD]
- **Source**: Not yet provided

---

## IMPORTANT NOTES

### Data Freshness

**Last Updated**: September 1, 2026
**Source Document**: Discovery phase 1 docs
**Verification Status**: Facts confirmed during discovery phase
**Next Review**: Before launch (update with latest data)

### What's Missing

**High Priority (Block Launch)**:
- [ ] Full leadership team bios
- [ ] Confirmed donation tier amounts
- [ ] Student numbers and statistics
- [ ] Building project timeline and budget

**Medium Priority (Should Have)**:
- [ ] Alumni count
- [ ] Years operating
- [ ] Institutional history/milestones
- [ ] Academic achievements

**Low Priority (Nice to Have)**:
- [ ] Student demographics
- [ ] Detailed curriculum details
- [ ] Student placement rates

---

## NEVER INCLUDE (These would be fabrications)

❌ Student names without explicit approval
❌ Testimonial quotes without verification
❌ Statistical claims without source
❌ Institutional achievements without documentation
❌ Building specifications without architect confirmation
❌ Financial figures without accounting verification
❌ Staff credentials without documentation

---

## UPDATING THIS DOCUMENT

**When**: Whenever new verified information arrives
**Who**: Content lead + leadership approval
**Process**:
1. Receive information with source
2. Verify authenticity (no secondhand info)
3. Update document
4. Note source and date
5. Commit to version control

---

**STATUS**: IMPLEMENTATION READY

This document serves as the single source of truth. All institutional facts in the website must be traced back to this document or explicitly marked as "TBD" / "Requires verification."
