# Phase 3: Implementation Roadmap — Yeshivat Orchot Chaim

**Document**: PHASE 3 — Sprint-by-Sprint Development Plan  
**Status**: Ready to Execute (pending P0 decisions)  
**Date**: September 1, 2026  
**Duration**: 7 weeks (50 days)  
**Team Size**: 2-3 developers + 1 content lead + 1 QA

---

## TIMELINE AT A GLANCE

```
Week 1: Project Setup & Infrastructure
Week 2: Core Pages & Navigation
Week 3: Donation Funnel (Steps 1-3)
Week 4: Payment Integration & Thank You
Week 5: Content Pages (Stories, Building, News)
Week 6: Optimization & Testing
Week 7: Launch Preparation
```

**Parallel Track**: Content creation (weeks 1-7 concurrent)

---

## WEEK 1: PROJECT SETUP & INFRASTRUCTURE

### Goal
Foundation ready for feature development

### Developer Tasks (Dev Lead + 1 Dev)

**Setup** (Day 1):
- [ ] Git repository initialized (with .gitignore)
- [ ] Next.js 14 project created (npx create-next-app)
- [ ] TypeScript configured (strict mode)
- [ ] Tailwind CSS configured with custom colors
- [ ] Environment variables set (.env.local)
- [ ] Vercel project connected and deployed

**Sanity.io CMS** (Day 2-3):
- [ ] Sanity project created
- [ ] Schema types imported/configured (from cms-schema.md)
- [ ] Dataset created (production)
- [ ] Sanity studio deployed
- [ ] API token generated and stored securely
- [ ] GROQ query helpers created

**Payment Setup** (Day 3-4):
- [ ] Stripe account configured (test mode)
- [ ] Stripe test keys stored in .env.local
- [ ] Matara.pro API keys obtained and stored
- [ ] Payment webhook endpoints stubbed
- [ ] Database schema created (donations table)

**i18n Setup** (Day 4-5):
- [ ] next-intl library installed and configured
- [ ] Locale structure created (/he/, /en/)
- [ ] Translation files initialized (messages/he.json, messages/en.json)
- [ ] Language detection middleware configured
- [ ] Language switcher component created

**Deliverables**:
- ✅ Project runs locally without errors
- ✅ Vercel deployment working
- ✅ Sanity studio accessible
- ✅ Git history clean and organized

### Content Tasks (Content Lead)

- [ ] Content audit completed (gap analysis)
- [ ] Photography shoot scheduled (2-3 full days, week 2-3)
- [ ] Student story template created (for interviews)
- [ ] Interview schedule with students finalized
- [ ] CMS editorial guidelines documented

### Outputs (End of Week 1)
- ✅ Development environment ready
- ✅ Staging site deployed
- ✅ CMS instance ready
- ✅ Team trained on workflow

---

## WEEK 2: CORE PAGES & NAVIGATION

### Goal
Homepage, navigation, and core page templates ready

### Developer Tasks

**Layout & Navigation** (Day 1-2):
- [ ] Root layout component created (logo, nav, footer)
- [ ] Desktop navigation implemented (semantic HTML)
- [ ] Mobile hamburger menu implemented
- [ ] Sticky donation CTA on mobile
- [ ] Sticky header (scroll behavior)
- [ ] Language toggle in header
- [ ] Footer structure with links

**Homepage Framework** (Day 2-4):
- [ ] Homepage route created (/he/, /en/)
- [ ] Hero section component (image, headline, CTA)
- [ ] Section components created (generic structure)
- [ ] Content pulled from CMS (GROQ queries)
- [ ] Responsive grid system working
- [ ] Breadcrumbs component created

**Core Pages** (Day 4-5):
- [ ] /about page created
- [ ] /approach page created
- [ ] /history page created
- [ ] /contact page created
- [ ] All pages: SEO metadata, canonical tags, hreflang
- [ ] 404 page created with helpful navigation

**Styling** (Throughout):
- [ ] Design tokens from design-system.md implemented
- [ ] Typography (Hebrew + English) working
- [ ] Color palette applied
- [ ] Spacing scale consistent
- [ ] Dark mode fallbacks (if needed)

**Testing** (Day 5):
- [ ] Lighthouse run: Performance 80+, Accessibility 90+
- [ ] Mobile responsive test on 3 devices
- [ ] Navigation keyboard accessible
- [ ] Language toggle working

### Content Tasks

- [ ] Photography shoot (if scheduled)
- [ ] Student interviews conducted (2-3 students)
- [ ] Homepage copy written and approved
- [ ] About/Approach copy written
- [ ] Initial photos optimized and uploaded to Sanity

### Outputs (End of Week 2)
- ✅ Homepage framework complete
- ✅ Navigation fully functional
- ✅ Core pages structure in place
- ✅ CMS content flowing to pages

---

## WEEK 3: DONATION FUNNEL (STEPS 1-3)

### Goal
3-step donation funnel working (amount, location, details)

### Developer Tasks

**Step 1: Amount Selection** (Day 1-2):
- [ ] /donate route created (entry point)
- [ ] Hero section with emotional copy
- [ ] Amount tier cards component (4 suggested + custom)
- [ ] One-time vs. Monthly toggle
- [ ] Form validation (amount > 0)
- [ ] Next button (progress to Step 2)
- [ ] State management (form data persisted in session/localStorage)

**Step 2: Country & Currency** (Day 2-3):
- [ ] /donate/location route created
- [ ] Geolocation detection (JavaScript, with consent)
- [ ] Country dropdown with flags
- [ ] Currency auto-select based on country
- [ ] User can override country
- [ ] Localized messaging (tax info by country)
- [ ] Back/Next buttons

**Step 3: Donor Details** (Day 3-4):
- [ ] /donate/details route created
- [ ] Form fields: Name, Email, Phone, Country, Preferences
- [ ] Form validation (email format, required fields)
- [ ] Real-time error feedback
- [ ] Accessible form labels and error messages
- [ ] Back/Next buttons
- [ ] Data persisted

**Payments Integration** (Day 4-5):
- [ ] Payment route structure planned (/donate/payment)
- [ ] Payment processor logic (if ILS → Matara, else → Stripe)
- [ ] Stripe Elements embedded (test mode)
- [ ] Matara redirect flow stubbed
- [ ] Error handling for payment failures
- [ ] Success state ready for next week

**Testing**:
- [ ] Form validation tested
- [ ] Navigation between steps working
- [ ] Data preserved when going back
- [ ] Mobile responsive
- [ ] Accessibility check

### Content Tasks

- [ ] More student stories written (2-3)
- [ ] Testimonials collected and verified (3-5)
- [ ] Building project photos organized
- [ ] News articles drafted (5-10)

### Outputs (End of Week 3)
- ✅ 3-step funnel functional (Steps 1-3)
- ✅ Form validation working
- ✅ Geolocation detection working
- ✅ Ready for payment integration

---

## WEEK 4: PAYMENT & THANK YOU

### Goal
Full payment processing and thank you experience

### Developer Tasks

**Payment Processing** (Day 1-3):
- [ ] Stripe integration complete (payment_intent flow)
- [ ] Matara.pro integration complete (test credentials)
- [ ] Webhook endpoints implemented (Stripe + Matara)
- [ ] Database transaction storage working
- [ ] Error handling for payment failures
- [ ] Retry logic for transient failures
- [ ] Idempotency keys to prevent double-charging
- [ ] Payment success flow
- [ ] Payment failure flow

**Thank You Page** (Day 3-4):
- [ ] /donate/thank-you route created
- [ ] Donation summary displayed
- [ ] Social sharing buttons (WhatsApp, Facebook, Email, Copy)
- [ ] Customizable share message
- [ ] Newsletter signup option
- [ ] Call-to-action (return home, view building)
- [ ] Confetti/celebration animation (optional)

**Emails** (Day 4-5):
- [ ] SendGrid integration configured
- [ ] Donation confirmation email template (HTML)
- [ ] Receipt generation (transaction ID, amount, date)
- [ ] Tax info per region (ILS, USD, GBP)
- [ ] Email sent after payment success
- [ ] Admin notification email configured
- [ ] Contact form email responses

**Testing** (Throughout):
- [ ] Stripe test payments succeed/fail correctly
- [ ] Matara test credentials working
- [ ] Webhooks processed correctly
- [ ] Database records created
- [ ] Emails sent with correct data
- [ ] Thank you page displays correctly
- [ ] Share functionality works

### Content Tasks

- [ ] All student stories finalized (6-10)
- [ ] Building project narrative complete
- [ ] News articles finalized (10+)
- [ ] All photos optimized and in Sanity

### Outputs (End of Week 4)
- ✅ Full donation funnel end-to-end
- ✅ Payments processing (test mode)
- ✅ Confirmation emails sending
- ✅ Thank you experience complete
- ✅ Analytics events firing

---

## WEEK 5: CONTENT PAGES (STORIES, BUILDING, NEWS)

### Goal
All content pages displaying from CMS

### Developer Tasks

**Student Stories** (Day 1-2):
- [ ] /students route created
- [ ] Story grid component (responsive)
- [ ] Story card with image, name, excerpt
- [ ] /students/[slug] dynamic route
- [ ] Full story page with all content
- [ ] Related stories sidebar
- [ ] Share buttons on story
- [ ] SEO metadata per story

**Building Project** (Day 2-3):
- [ ] /building route created
- [ ] Building overview content
- [ ] Current vs. Future comparison (images)
- [ ] Timeline visualization
- [ ] /building/updates route
- [ ] Building update cards
- [ ] /building/updates/[slug] detail page
- [ ] Progress indicator (if available)

**News & Gallery** (Day 3-4):
- [ ] /news route created
- [ ] News article cards
- [ ] /news/[slug] detail page
- [ ] /gallery route
- [ ] Gallery grid with filtering (by category)
- [ ] Lightbox image viewer
- [ ] Image metadata display

**Leadership** (Day 4-5):
- [ ] /leadership route
- [ ] Leadership grid
- [ ] /leadership/[slug] profile pages
- [ ] Featured staff (rabbi, etc.)
- [ ] Contact cards

**All Content Pages**:
- [ ] CMS content pulling correctly
- [ ] Images optimized and responsive
- [ ] Alt text displayed correctly
- [ ] SEO metadata unique per page
- [ ] Schema markup (Article, Breadcrumb)
- [ ] Social sharing buttons
- [ ] Mobile responsive

### Content Tasks

- [ ] Final content reviews and approvals
- [ ] All CMS data entered (stories, news, gallery)
- [ ] Photo captions and alt text added
- [ ] All copy proofread

### Outputs (End of Week 5)
- ✅ All 30+ routes implemented
- ✅ Content displaying from CMS
- ✅ Images fully optimized
- ✅ SEO structure complete

---

## WEEK 6: OPTIMIZATION & TESTING

### Goal
Performance, security, accessibility verified

### Developer Tasks

**Performance Optimization** (Day 1-2):
- [ ] Image lazy loading working
- [ ] Font preloading configured
- [ ] Code splitting (dynamic imports where applicable)
- [ ] CSS minification and purge
- [ ] JavaScript bundle analysis and optimization
- [ ] Caching headers configured (Vercel)
- [ ] ISR (Incremental Static Regeneration) set up
- [ ] CDN cache behavior tuned

**Security** (Day 2-3):
- [ ] Security headers added (CSP, X-Frame-Options, etc.)
- [ ] Environment variables secured (no secrets in git)
- [ ] API endpoints protected (rate limiting)
- [ ] Webhook signatures verified
- [ ] CORS configured correctly
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] HTTPS enforced

**Accessibility** (Day 3-4):
- [ ] Full axe DevTools scan (no critical issues)
- [ ] Keyboard navigation tested (Tab through all pages)
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Focus states visible on all elements
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] Form labels connected
- [ ] Skip nav link working
- [ ] Lighthouse accessibility 95+

**Analytics & Monitoring** (Day 4-5):
- [ ] Google Analytics 4 events verified
- [ ] Conversion funnel tracking working
- [ ] UTM parameters preserved
- [ ] Dashboards created and tested
- [ ] Error tracking (Sentry) configured
- [ ] Uptime monitoring configured
- [ ] Performance monitoring dashboard active

**Final Testing** (Throughout):
- [ ] Full browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Donation funnel end-to-end
- [ ] Payment processing (test mode)
- [ ] All forms working
- [ ] Email sending
- [ ] Lighthouse: Performance 90+, Accessibility 95+, SEO 95+
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Content Tasks

- [ ] All remaining approvals obtained
- [ ] Final content checks
- [ ] Any last-minute corrections made

### Outputs (End of Week 6)
- ✅ Lighthouse scores: All 90+
- ✅ Security audit passed
- ✅ Accessibility WCAG 2.2 AA verified
- ✅ All critical bugs fixed
- ✅ Ready for launch

---

## WEEK 7: LAUNCH PREPARATION

### Goal
Go/No-Go decision and launch day execution

### Developer Tasks (Day 1-3)

**Final Verification**:
- [ ] All 120 items in definition-of-done.md checked
- [ ] No critical bugs open
- [ ] No security issues
- [ ] Performance targets met
- [ ] Team trained on support process
- [ ] Deployment runbook documented
- [ ] Rollback plan tested

**Domain & DNS** (Day 2):
- [ ] DNS records pointed to Vercel
- [ ] SSL certificate active
- [ ] Redirects from old site working (301s)
- [ ] robots.txt correct
- [ ] sitemap.xml submitted to Google

**Monitoring Setup** (Day 2-3):
- [ ] Error tracking alerts configured
- [ ] Performance alerts configured
- [ ] Uptime monitoring active
- [ ] Team on-call schedule established
- [ ] Escalation contacts documented

**Launch Day** (Day 4):
- [ ] Pre-launch checklist run (1 hour before)
- [ ] Final smoke tests on production
- [ ] Database backups taken
- [ ] Team standby (error monitoring)
- [ ] Launch communication ready
- [ ] Post-launch monitoring setup

**Post-Launch** (Day 5-7):
- [ ] 24-hour monitoring (error rate, performance)
- [ ] User feedback collection
- [ ] Any critical bugs fixed immediately
- [ ] Weekly report generated
- [ ] Team retrospective scheduled

### Content/QA Tasks

- [ ] Final content review
- [ ] QA checklist completion
- [ ] User acceptance testing (if stakeholders available)

### Outputs (End of Week 7)
- ✅ Live website
- ✅ All systems operational
- ✅ Monitoring active
- ✅ Team trained and ready
- ✅ Success criteria met

---

## PARALLEL: CONTENT WORKSTREAM (Weeks 1-7)

### Week 1-2: Asset Collection
- Photography shoot (2-3 days)
- Student interviews (2-3)
- Copy writing begins

### Week 2-4: Content Creation
- Student stories written and approved (6-10)
- Testimonials collected and verified
- Building project narrative finalized
- News articles drafted
- All photos optimized and uploaded to Sanity

### Week 4-6: CMS Data Entry
- All content entered into Sanity
- Photos with alt text and captions
- Approvals documented
- Final reviews and corrections

### Week 6-7: Final Polish
- All content approved by leadership
- Any last corrections
- Archive old content if needed

---

## DEPENDENCIES & GO/NO-GO GATES

### Pre-Development (Before Week 1)

**MUST HAVE**:
- ✅ All P0 decisions answered (phase-2-open-questions.md)
- ✅ Budget and timeline approved
- ✅ Team assigned and committed
- ✅ Matara.pro API credentials obtained
- ✅ Stripe account created

### Between Weeks

**Week 2→3**: 
- ✅ Photography shoot complete OR scheduled
- ✅ Student stories started

**Week 4→5**: 
- ✅ Payment integration tested (test mode)
- ✅ 6+ student stories ready

**Week 6→7**: 
- ✅ All Lighthouse scores 90+
- ✅ No security issues found
- ✅ All critical bugs fixed

### Launch Gate (Week 7)

**GO if**:
- ✅ All 120 definition-of-done items verified
- ✅ Lighthouse: Performance 90+, Accessibility 95+, SEO 95+
- ✅ Core Web Vitals: All in "Good" range
- ✅ Payment processing tested and working
- ✅ No critical/high security issues
- ✅ Team trained and ready
- ✅ Monitoring configured
- ✅ Stakeholder approval obtained

**NO-GO if**:
- ❌ Critical bugs unfixed
- ❌ Security vulnerabilities found
- ❌ Performance targets not met
- ❌ Content incomplete
- ❌ Team not ready

---

## TEAM STRUCTURE

### Development Team (2-3 people)

**Developer 1 (Lead)**: 
- Architecture decisions
- Payment integration
- Infrastructure (Vercel, databases)
- Security and performance
- ~40 hrs/week

**Developer 2**:
- Pages and components
- CMS integration
- Testing and quality
- ~40 hrs/week

**Developer 3 (Optional, QA focus)**:
- Testing and verification
- Accessibility checks
- Documentation
- ~30 hrs/week

### Content Team (1 person)

**Content Lead**:
- Photography coordination
- Story collection and writing
- CMS data entry
- Approvals and compliance
- ~35 hrs/week

### Project Management (Shared)

**Project Manager** (0.5 FTE):
- Sprint planning
- Risk management
- Stakeholder communication
- Schedule tracking

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| P0 decisions delayed | High | Critical | Schedule decision meeting week 1 |
| Content not ready | Medium | High | Start collection week 1 |
| Payment API issues | Low | High | Maintain fallback (bank transfer) |
| Performance targets missed | Medium | Medium | Optimization built into week 6 |
| Security issues found | Low | Critical | Security audit built into week 6 |
| Team member unavailable | Low | Medium | Cross-train all developers |

---

## COMMUNICATION PLAN

**Daily**: Standups (15 min)

**Weekly**: 
- Sprint review (Friday, 30 min)
- Retrospective (Friday, 30 min)
- Stakeholder sync (Wednesday, 30 min)

**Bi-weekly**: 
- Project status report to leadership
- Content review meeting

**As needed**: 
- Risk escalation
- Emergency fixes

---

## SUCCESS METRICS

**By End of Week 7**:

✅ Website live at orchotchaim.co.il

✅ Lighthouse: Performance 90+, Accessibility 95+, SEO 95+

✅ Core Web Vitals: All "Good"

✅ Payment processing working (Matara + Stripe)

✅ 50+ content items live (stories, news, etc.)

✅ Donation funnel: 90% success rate

✅ Team trained and ready for support

✅ Monitoring and alerts active

✅ Zero critical security issues

---

**STATUS**: READY TO EXECUTE

Once P0 decisions are made, this 7-week roadmap can begin immediately.
