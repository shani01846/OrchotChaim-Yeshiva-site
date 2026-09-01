# Redirect Map: Old Site URLs to New Architecture

**Document**: PHASE 1 Discovery — URL Migration Strategy  
**Status**: For Review  
**Date**: September 1, 2026

---

## EXECUTIVE SUMMARY

This document maps all existing URLs from the current WordPress site to new URL structures in the redesigned site.

**Goals**:
1. Preserve domain authority (avoid link decay)
2. Provide user-friendly redirects
3. Maintain search engine rankings
4. Avoid broken links and 404 errors
5. Create a clean new information architecture

**Implementation**: 301 (permanent) HTTP redirects via Next.js `next.config.js`

---

## CURRENT SITE STRUCTURE

Based on analysis of https://orchotchaim.co.il/, the current site has:

### Existing URLs

| URL | Title | Purpose |
|-----|-------|---------|
| `/` | Homepage | Home |
| `/תרומות/` | Donations | Donation page |
| `/sample-page/` | Sample Page | WordPress default (should remove) |
| `/?page_id=2` | Sample Page | WordPress default (should remove) |

**Note**: Very minimal current structure. Most pages are not discoverable from navigation.

### Current URL Encoding

URLs use Hebrew characters encoded:
- `/תרומות/` → `/\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA/`
- Redirects should handle both formats

---

## NEW SITE STRUCTURE

The redesigned site uses:

```
/he/               (Hebrew homepage)
  /                (homepage)
  /about           (About the yeshiva)
  /approach        (Learning approach)
  /students/       (Students overview)
  /students/[slug] (Individual stories)
  /building/       (Building project)
  /building/updates/
  /building/updates/[slug]
  /gallery/        (Photo gallery)
  /news/           (News/updates)
  /news/[slug]     (Individual articles)
  /donate/         (Donation page)
  /campaign/[slug]/ (Campaigns)
  /contact         (Contact)

/en/               (English homepage)
  /                (homepage)
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

---

## URL REDIRECT MAPPING

### 1. HOMEPAGE

| Old URL | New URL | Type | Reason |
|---------|---------|------|--------|
| `/` | `/he/` | 301 | Default to Hebrew |
| `/index.php` | `/he/` | 301 | Old WordPress index |

---

### 2. DONATION PAGE

**Current**: The only actively used content page

| Old URL | New URL | Type | Reason |
|---------|---------|------|--------|
| `/תרומות/` | `/he/donate` | 301 | Main Hebrew donation page |
| `/\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA/` | `/he/donate` | 301 | Encoded version of above |
| `/donate` | `/en/donate` | 301 | English donation page |
| `/donations` | `/en/donate` | 301 | Common variant |

---

### 3. WORDPRESS DEFAULT PAGES

**Remove these — they're WordPress templates**:

| Old URL | Action | Reason |
|---------|--------|--------|
| `/sample-page/` | 410 Gone | Not real content |
| `/?page_id=2` | 410 Gone | WordPress internal |

---

### 4. POTENTIAL HIDDEN CONTENT

The specification mentions content that might exist but wasn't visible:

| Potential Old URL | New URL | Type | Status |
|-------------------|---------|------|--------|
| `/\u05D4\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4/` (history) | `/he/history` | 301 | If exists, redirect |
| `/\u05D9\u05D7\u05E1-\u05D0\u05D9\u05E9\u05D9/` (personal) | `/he/approach` | 301 | If exists, redirect |
| `/\u05D2\u05DC\u05E8\u05D9\u05D4/` (gallery) | `/he/gallery` | 301 | If exists, redirect |
| `/\u05E6\u05D5\u05D4\u05E8\u05D9\u05DD/` (photos) | `/he/gallery` | 301 | If exists, redirect |
| `/\u05D1\u05E0\u05D9\u05D9\u05DF/` (building) | `/he/building` | 301 | If exists, redirect |
| `/\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD/` (students) | `/he/students` | 301 | If exists, redirect |
| `/\u05D0\u05D8\u05E8\u05D0\u05E7\u05E6\u05D9\u05D4/` (events) | `/he/news` | 301 | If exists, redirect |

---

### 5. COMMON VARIANT PATTERNS

These patterns account for how users might type URLs:

| Old Pattern | New URL | Type | Note |
|------------|---------|------|------|
| `/index.html` | `/he/` | 301 | Old static HTML |
| `/donate/` | `/he/donate` | 301 | Trailing slash variant |
| `/donation` | `/he/donate` | 301 | Common misspelling |
| `/?lang=en` | `/en/` | 301 | Old language parameter |
| `/?lang=he` | `/he/` | 301 | Old language parameter |

---

## NEXT.JS REDIRECT CONFIGURATION

### Implementation in `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    // Homepage
    {
      source: '/',
      destination: '/he/',
      permanent: true,
    },
    {
      source: '/index.php',
      destination: '/he/',
      permanent: true,
    },
    
    // Donation page - Hebrew
    {
      source: '/תרומות/',
      destination: '/he/donate',
      permanent: true,
    },
    {
      source: '/תרומות',
      destination: '/he/donate',
      permanent: true,
    },
    
    // Donation page - English variants
    {
      source: '/donate/',
      destination: '/en/donate',
      permanent: true,
    },
    {
      source: '/donate',
      destination: '/en/donate',
      permanent: true,
    },
    {
      source: '/donation',
      destination: '/en/donate',
      permanent: true,
    },
    {
      source: '/donations',
      destination: '/en/donate',
      permanent: true,
    },
    
    // Language parameter redirects
    {
      source: '/:path*\\?lang=en',
      destination: '/en/:path*',
      permanent: true,
    },
    {
      source: '/:path*\\?lang=he',
      destination: '/he/:path*',
      permanent: true,
    },
    
    // Remove WordPress defaults (send to homepage)
    {
      source: '/sample-page',
      destination: '/he/',
      permanent: true,
    },
    {
      source: '/wp-admin/:path*',
      destination: '/he/',
      permanent: true,
    },
    {
      source: '/wp-includes/:path*',
      destination: '/he/',
      permanent: true,
    },
    
    // Potential old pages (if they exist)
    {
      source: '/history',
      destination: '/he/history',
      permanent: true,
    },
    {
      source: '/about',
      destination: '/he/about',
      permanent: true,
    },
    {
      source: '/gallery',
      destination: '/he/gallery',
      permanent: true,
    },
    {
      source: '/photos',
      destination: '/he/gallery',
      permanent: true,
    },
    {
      source: '/building',
      destination: '/he/building',
      permanent: true,
    },
    {
      source: '/news',
      destination: '/he/news',
      permanent: true,
    },
    {
      source: '/contact',
      destination: '/he/contact',
      permanent: true,
    },
    {
      source: '/students',
      destination: '/he/students',
      permanent: true,
    },
    
    // Alternative language paths
    // (if anyone tries to access old /en path directly)
    {
      source: '/en/:path*',
      destination: '/en/:path*',
      permanent: false, // These already exist
    },
  ],
  
  // Handle 404s gracefully
  notFound: true,
};

export default nextConfig;
```

---

## HTTP STATUS CODES STRATEGY

### 301 (Moved Permanently)

**Use for**:
- Pages that moved to a new URL
- Real content that exists in new location

**Example**: `/תרומות/` → `/he/donate`

**Effect**: Search engines update their index, links pass authority

### 410 (Gone)

**Use for**:
- Pages that should no longer exist
- WordPress default pages
- Outdated content that won't return

**Example**: `/sample-page/` → 410

**Effect**: Search engines remove from index, don't try to redirect

### 404 (Not Found)

**Use for**:
- Broken internal links
- Truly unknown URLs

**Effect**: Search engines eventually remove, try again later

---

## MONITORING REDIRECTS

### Google Search Console Tasks

After launch:

1. **Submit new sitemap**
   - File: `/sitemap.xml`
   - Or separate: `/sitemap-he.xml`, `/sitemap-en.xml`

2. **Monitor Coverage**
   - Check for errors
   - Verify all pages indexed

3. **Monitor Removals**
   - Expect old URLs to disappear
   - Ensure new URLs appear

4. **Check for Redirect Chains**
   - A → B → C (bad)
   - A → C (good)

### Analytics Monitoring

1. **Verify traffic carries over**
   - Old sessions should continue
   - New URLs should show in GA4

2. **Check for 404s**
   - Monitor 404 rate
   - Fix any broken internal links

3. **Ranking recovery**
   - Some rankings may drop temporarily
   - Should recover after 2-4 weeks
   - New URLs should rank

---

## CONTENT MIGRATION STRATEGY

### Step 1: Export Old Content

From WordPress:

```
- Homepage text and imagery
- Donation page copy
- All contact information
- Existing images/photos
- Testimonials (if any)
```

### Step 2: Map to New Structure

```
Old donation page copy
  ↓
Splits into:
- `/he/donate` (main form)
- `/he/building` (building narrative)
- `/campaign/building` (campaign data)
```

### Step 3: Import to New CMS

- Use Sanity.io or Payload CMS
- Create content objects
- Add Hebrew/English translations
- Set publish status

### Step 4: Test Redirects

```bash
# Test each redirect
curl -I https://orchotchaim.co.il/תרומות/
# Should return 301 with Location: /he/donate
```

### Step 5: Deploy & Verify

- Deploy Next.js app
- Verify all redirects working
- Submit sitemap to GSC
- Monitor Search Console

---

## SPECIAL CASES

### Trailing Slashes

**Next.js default**: Treats `/path/` and `/path` as different

**Solution**: Configure redirects to normalize

```javascript
// Redirect `/donate/` to `/he/donate` (no trailing slash)
{
  source: '/donate/',
  destination: '/he/donate',
  permanent: true,
},
```

### URL Parameters

**Old site might have**: `/?page_id=2`, `/?lang=en`

**New site**: No query parameters for navigation

```javascript
// Handle old language parameter
{
  source: '/\\?lang=en&:path*',
  destination: '/en/:path*',
  permanent: true,
},
```

### Encoded URLs

**Hebrew in URLs encodes as**: `%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA`

**Browser and Next.js handle this automatically**, but test thoroughly.

---

## TESTING CHECKLIST

- [ ] Test homepage redirect (/ → /he/)
- [ ] Test donation page redirect (/תרומות/ → /he/donate)
- [ ] Test English donation (/donate → /en/donate)
- [ ] Test old page parameters (/?page_id=2)
- [ ] Test language parameters (/?lang=en)
- [ ] Test trailing slashes (/donate/ → /he/donate)
- [ ] Test 404 on `/sample-page/`
- [ ] Verify search console shows new URLs
- [ ] Check analytics sees traffic on new URLs
- [ ] Verify no redirect chains (A → B → C)

---

## COMMON PITFALLS TO AVOID

❌ **DON'T**:
- Redirect to homepage generically (loses context)
- Use 302 instead of 301 (search engines don't update)
- Create redirect chains (A → B → C)
- Forget about uppercase URLs (/DONATE vs /donate)
- Forget about encoded URLs (/תרומות vs %D7%AA...)
- Remove old URLs without redirects (breaks links, loses SEO)
- Redirect too aggressively (block legitimate old links)

✓ **DO**:
- Redirect old URLs to relevant new pages
- Use 301 for permanent changes
- Test all redirects before going live
- Monitor in Google Search Console
- Check analytics for traffic continuity
- Allow time for search engines to update (2-4 weeks)

---

## QUESTIONS FOR STAKEHOLDER REVIEW

1. **Other Pages**: Are there other pages on the current site we should know about?
2. **Backlinks**: Are there external links to any specific old pages?
3. **Old Analytics**: What URLs get the most traffic in GA?
4. **Emails**: Are there any URLs mentioned in donation emails we should redirect?
5. **Social**: Are there social media posts linking to specific pages?
6. **Marketing Materials**: Any print materials with URLs?

---

## ADDITIONAL RESOURCES

### Redirect Testing Tools
- Redirect Checker: www.redirect-checker.org
- HTTP Status Code Checker: www.httpstatus.io
- Screaming Frog SEO Spider: www.screamingfrog.co.uk

### Documentation
- MDN Web Docs (HTTP): https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301
- Next.js Redirects: https://nextjs.org/docs/pages/api-reference/next-config-js/redirects
- Google Search Central: https://developers.google.com/search/docs/beginner/remove-information

---

## NEXT STEPS

1. **Audit current site**: Identify ALL existing URLs
2. **Complete redirect map**: Add any missing URLs
3. **Implement redirects**: Add to `next.config.js`
4. **Test thoroughly**: Use testing tools
5. **Deploy**: Launch with redirects active
6. **Monitor**: Check GSC and analytics weekly for first month
7. **Iterate**: Fix any issues that arise

---

*Proper redirects preserve SEO authority and prevent broken links.*  
*They're critical for a successful site migration.*

**Status**: Ready for stakeholder review and implementation.
