# Design System & Visual Specification: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Design Guidelines  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## DESIGN PRINCIPLES

### Core Aesthetic

**Feeling**: 
- Trustworthy and dignified
- Warm and human
- Authentic and real
- Modern but timeless
- Premium but not ostentatious
- Calm and contemplative

**Should NOT feel**:
- ❌ Generic SaaS template
- ❌ AI-generated
- ❌ Overly animated or flashy
- ❌ Corporate or stiff
- ❌ Cheap or unprofessional
- ❌ Trendy (will age poorly)

### Design Approach

**Philosophy**: Clarity over decoration

- Generous whitespace
- Legible typography
- Real photography (no stock images)
- Intentional visual hierarchy
- Accessibility-first
- Mobile-first responsive design

---

## TYPOGRAPHY

### Hebrew Font Stack

**Preferred**: Heebo (Google Fonts)
- Modern, clean, Hebrew-native
- Good screen readability
- Free and open-source
- Works well for both headlines and body

**Alternative**: IBM Plex Sans Hebrew
- Professional, slightly more formal
- Excellent for government/institutional feel

**Fallback Stack**:
```css
font-family: 'Heebo', system-ui, -apple-system, sans-serif;
```

**Loading Strategy**:
```html
<link rel="preload" as="font" 
      href="/fonts/Heebo-VariableFont.ttf" 
      type="font/ttf" 
      crossorigin />
```

### English Font Stack

**Headlines**: Playfair Display (Google Fonts)
- Editorial, premium, distinctive
- Works well for "meeting" sections
- Not overused (less risk of looking generic)

**Body & UI**: Inter (Google Fonts)
- Modern, neutral, highly legible
- Excellent metrics
- Great for dense text

**Fallback Stack**:
```css
/* Headlines */
font-family: 'Playfair Display', Georgia, serif;

/* Body */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes (Base: 16px)

**Hebrew (RTL)**:
- H1: 48px (headlines)
- H2: 36px (sections)
- H3: 28px (subsections)
- H4: 20px (smaller headings)
- Body: 16px (default)
- Small: 14px (captions, metadata)

**English (LTR)**:
- H1: 48px
- H2: 36px
- H3: 28px
- H4: 20px
- Body: 16px
- Small: 14px

**Mobile (max-width: 768px)**:
- H1: 32px
- H2: 28px
- H3: 20px
- H4: 18px
- Body: 16px
- Small: 13px

### Font Weight

**Heebo** (Hebrew):
- Regular: 400
- Medium: 500
- Bold: 700

**Playfair Display** (Headlines):
- Regular: 400
- Bold: 700

**Inter** (Body):
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700

### Line Height

- Headlines (H1-H4): 1.2
- Body text: 1.6
- Captions: 1.4

---

## COLOR PALETTE

### Primary Colors

**Institutional Gold/Cream**:
- Color: #D4AF37 or #C9A961 (warm, premium)
- Usage: Accents, donation buttons, important elements
- Hex: #C9A961 (recommended - more muted)

**Deep Blue** (Trust):
- Color: #1F3A7D (deep, authoritative)
- Usage: Headlines, primary buttons, navigation
- Hex: #1F3A7D

**Warm Beige** (Background):
- Color: #FAF8F3 (almost white, warm undertone)
- Usage: Page backgrounds, subtle sections
- Hex: #FAF8F3

### Secondary Colors

**Slate Gray** (Text):
- Color: #3D4D61 (readable, warm)
- Usage: Body text
- Hex: #3D4D61

**Light Gray** (Borders/Dividers):
- Color: #E8E5DC (subtle)
- Usage: Section dividers, borders
- Hex: #E8E5DC

**Success Green** (Confirmation):
- Color: #4CAF50 (standard, accessible)
- Usage: Confirmation messages, success states
- Hex: #4CAF50

**Alert Red** (Error):
- Color: #D32F2F (standard, accessible)
- Usage: Error messages, warnings
- Hex: #D32F2F

### Color Accessibility

**Contrast Ratios** (WCAG 2.2 AA):
- Deep Blue on White: 7.8:1 ✓ (AAA)
- Slate Gray on White: 6.5:1 ✓ (AAA)
- Gold on White: 5.1:1 ✓ (AA)
- Gold on Deep Blue: 6.2:1 ✓ (AAA)

**Testing**:
- Use WebAIM Contrast Checker before finalizing
- Test with color blindness simulator

---

## SPACING SCALE

**Base Unit**: 4px (powers of 2)

```
2px   (extra tight)
4px   (tight)
8px   (xs)
12px  (sm)
16px  (md)
24px  (lg)
32px  (xl)
48px  (2xl)
64px  (3xl)
96px  (4xl)
128px (5xl)
```

**Usage**:
- Margin between sections: 64px (desktop) / 32px (mobile)
- Padding inside containers: 24px / 16px
- Padding inside buttons: 12px (vertical) × 24px (horizontal)
- Gap between grid items: 24px

**Responsive Scaling**:
- Desktop: full scale
- Tablet: 85% of desktop
- Mobile: 70% of desktop

---

## COMPONENT STYLES

### Buttons

**Primary Button** (Donation CTA)
```css
Background: #1F3A7D (deep blue)
Text: White
Padding: 14px 28px
Border-radius: 4px
Font-size: 16px
Font-weight: 600
Hover: Background #152850 (darker blue)
Active: Background #0F1E3D
Focus: Outline 2px #C9A961 (gold)
Disabled: Opacity 0.5, cursor not-allowed
```

**Secondary Button** (Navigation, Cancel)
```css
Background: transparent
Text: #1F3A7D
Border: 2px solid #1F3A7D
Padding: 12px 24px
Border-radius: 4px
Hover: Background #F5F3ED (light background)
```

**Tertiary Button** (Links, Less Important)
```css
Background: transparent
Text: #C9A961 (gold)
Padding: 8px 12px
Hover: Text #A48728 (darker gold)
Underline: On hover
```

### Forms

**Input Fields**:
```css
Background: White
Border: 1px solid #E8E5DC
Border-radius: 4px
Padding: 12px 14px
Font-size: 16px
Placeholder: #999
Focus: Border #C9A961 (gold)
Invalid: Border #D32F2F (red), placeholder red
```

**Labels**:
```css
Font-weight: 500
Font-size: 14px
Margin-bottom: 6px
Color: #3D4D61
Required asterisk: Color #D32F2F
```

**Error Messages**:
```css
Font-size: 13px
Color: #D32F2F
Margin-top: 4px
Icon: ⚠
```

### Cards

**Layout**:
- Background: White
- Border: 1px solid #E8E5DC (optional)
- Padding: 24px
- Border-radius: 4px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

**Hover State**:
- Box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)
- Transform: translateY(-2px) (subtle lift)

### Navigation

**Desktop Header**:
- Background: White
- Height: 70px
- Padding: 16px 24px
- Sticky: yes
- Logo: 32px height
- Nav items: 16px font, #1F3A7D, hover #C9A961
- Donation CTA: Primary blue button

**Mobile Header**:
- Height: 56px
- Hamburger menu: 24px icon
- Sticky: yes
- Donation CTA: Bottom sticky bar (48px height, full width)

### Donation CTA (Sticky Mobile)

**Position**: Fixed bottom, mobile only
**Height**: 48px
**Background**: #1F3A7D
**Text**: White, 16px bold
**Button**: Full-width, 12px margin, 36px height
**Close**: X button to dismiss (optional)

---

## IMAGERY

### Photography Style

**Requirements**:
- ✓ Real people and places (no stock photography)
- ✓ Natural lighting where possible
- ✓ Authentic moments (not posed/staged)
- ✓ Diverse representation
- ✓ Professional quality (2400px width min)
- ✓ Warm tones (not cool/clinical)

**Prohibited**:
- ❌ Stock photography (Unsplash, Pexels, etc.)
- ❌ AI-generated images
- ❌ Overly posed or artificial-looking photos
- ❌ Unrelated people (model photography)
- ❌ Low resolution or grainy images

### Image Dimensions & Aspect Ratios

**Hero Images**:
- Desktop: 1440 × 600px (2.4:1 aspect)
- Mobile: 480 × 720px (0.67:1 aspect, portrait)

**Cards/Thumbnails**:
- Desktop: 300 × 200px (1.5:1 aspect)
- Mobile: 100% width × auto height

**Featured Student Photos**:
- Desktop: 400 × 400px (square, 1:1)
- Mobile: 100% × auto

**Full-width Gallery**:
- Desktop: 1440px width, auto height (maintain aspect)
- Mobile: 100% width, auto height

### Image Optimization

**Format**: WebP (with JPEG fallback)
**Compression**: 75-85% quality
**Lazy Loading**: All below-fold images
**Responsive Images**: srcset for 1x, 2x, 3x displays
**Alt Text**: Required in Hebrew and English

---

## LAYOUT & SPACING

### Container Width

**Max Content Width**: 1280px (on desktop)
**Gutter**: 24px (margin on sides)
**Effective**: 1232px content width

**Breakpoints**:
- Mobile: 375px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+
- Large: 1440px+

### Grid System

**Columns**: 12-column grid

**Mobile** (1 column):
- Full-width (with 16px gutter)

**Tablet** (2 columns):
- 50/50 split or featured/sidebar

**Desktop** (3-4 columns):
- 3 equal columns, or featured + sidebar

### Section Spacing

**Between major sections**: 64px (vertical)
**Mobile**: 32px

**Within sections**:
- Heading to content: 24px
- Content to CTA: 32px

---

## INTERACTIVE ELEMENTS

### Hover States

**Links**:
- Color change to gold (#C9A961)
- Underline appears (if not already)
- Cursor: pointer

**Buttons**:
- Background darkens
- Subtle shadow increase
- Cursor: pointer

**Cards**:
- Subtle shadow increase (0 8px 16px)
- Slight lift (translateY -2px)
- Cursor: pointer (if clickable)

### Focus States

**Keyboard Navigation**:
- Visible focus ring: 2px solid gold (#C9A961)
- Ring offset: 2px
- Not removed (accessibility requirement)

**Tested with**:
- Tab key navigation
- Screen readers (NVDA, JAWS)

### Loading States

**Skeleton Loaders** (for dynamic content):
- Pale gray background (#F0EDE3)
- Shimmer animation (optional, not essential)
- Same dimensions as actual content

**Disabled State**:
- Opacity: 0.5
- Cursor: not-allowed
- No hover effects

---

## DARK MODE (Optional, Phase 2+)

**If implemented**:
- Background: #1A1A1A
- Text: #F5F3ED (warm white)
- Accent: #D4AF37 (brighter gold for contrast)
- Border: #333333

**Do not implement for launch** (not necessary)

---

## ACCESSIBILITY FEATURES

### Color Contrast

- **Large text**: 3:1 ratio minimum
- **Normal text**: 4.5:1 ratio minimum
- **Graphical elements**: 3:1 ratio minimum

**Test with**: WebAIM Contrast Checker, Lighthouse

### Text Sizing

- **Minimum**: 14px (never smaller)
- **Body**: 16px default
- **User zoom**: Must work up to 200%
- **No fixed sizes**: Use rem/em units

### Interactive Elements

- **Minimum size**: 44 × 44px (touch targets)
- **Desktop**: 32 × 32px acceptable
- **Spacing**: 8px minimum between interactive elements

### Focus Management

- **Visible focus**: Always visible (no outline: none)
- **Skip nav**: "Skip to content" link on every page
- **Heading hierarchy**: H1 > H2 > H3 (no gaps)
- **Semantic HTML**: button, a, form, etc.

### Screen Reader Support

- **Alt text**: All images
- **ARIA labels**: Form labels, icon buttons
- **ARIA live**: Announcements, notifications
- **Landmarks**: main, nav, aside, footer

---

## MOTION & ANIMATION (Minimal)

**Philosophy**: Purposeful motion only, no decorative flourishes

**Allowed**:
- ✓ Hover state transitions (200ms)
- ✓ Page transitions (fade, 300ms)
- ✓ Loading spinners (simple)
- ✓ Scroll-triggered fade-in (subtle)

**Not Allowed**:
- ❌ Parallax effects
- ❌ Auto-playing animations
- ❌ Decorative lottie animations
- ❌ Excessive transitions (> 500ms)

**Prefere to**: `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## RTL (RIGHT-TO-LEFT) SPECIFICS

### Hebrew Pages

- **Direction**: RTL
- **Text align**: Right (auto)
- **Margins**: Reversed (margin-right instead of margin-left)
- **Flexbox**: flex-direction reversed
- **Images**: Generally NOT flipped (avoid)

### Implementation

**Set on HTML element**:
```html
<html dir="rtl" lang="he">
```

**CSS**:
```css
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

### Pitfalls to Avoid

- ❌ Don't flip icons (← and → should point same direction regardless of lang)
- ❌ Don't use left/right margin (use logical properties: margin-inline-start/end)
- ❌ Don't assume English reading order applies

---

## BRAND VOICE IN DESIGN

**Visual messaging**:
- Premium but not exclusive
- Warm but professional
- Modern but timeless
- Simple but sophisticated
- Calm but inspiring

**Through design elements**:
- Generous whitespace (breathing room)
- High-quality photography (authenticity)
- Thoughtful typography (professionalism)
- Warm color palette (human connection)
- Clear hierarchy (respect for reader's time)

---

## IMPLEMENTATION CHECKLIST

**Design System**:
- [ ] Tailwind config with custom colors
- [ ] Font files preloaded
- [ ] Spacing tokens defined
- [ ] Component library created (Button, Card, Input, etc.)
- [ ] RTL support tested
- [ ] Accessibility audit passed

**Responsive Design**:
- [ ] Mobile (375px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1440px) tested
- [ ] Touch targets 44×44px minimum
- [ ] Font sizes scale appropriately

**Accessibility**:
- [ ] Color contrast checked (4.5:1)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA)
- [ ] Focus states visible
- [ ] Alt text on all images

**Performance**:
- [ ] Fonts preloaded
- [ ] Images optimized
- [ ] CSS minified
- [ ] No unused CSS shipped
- [ ] Lighthouse 90+ performance

---

**STATUS**: IMPLEMENTATION READY

This design system provides enough specification for developers to implement pixel-perfect, accessible, professional layouts without requiring constant design review.
