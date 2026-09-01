# Donation Integration Specification: Yeshivat Orchot Chaim

**Document**: PHASE 2 Specification — Payment Processing Architecture  
**Status**: Implementation-Ready  
**Date**: September 1, 2026

---

## OVERVIEW

This document specifies how donations are processed, stored, and confirmed.

**Key Principle**: External payment processors handle all sensitive data (no card data touches our servers).

---

## PAYMENT PROCESSOR SELECTION BY REGION

### ISRAEL (ILS)

**Primary**: Matara.pro
- **Type**: Israeli payment gateway
- **Existing**: Currently in use on website
- **Status**: Verified and active
- **Contact**: [TBD - verify current Matara contact]

**Fallback**: Stripe
- **Type**: International payment gateway
- **Status**: Configured as backup
- **Reason**: If Matara unavailable

**Bank Transfer** (Optional):
- **Bank**: Bank Leumi
- **Branch**: 902
- **Account**: 59990014
- **Note**: For large donors or donors without cards

### INTERNATIONAL (USD/GBP/EUR)

**Primary**: Stripe
- **Type**: Global payment processor
- **Supports**: Credit cards, digital wallets
- **Currencies**: USD, GBP, EUR (and more)
- **Status**: Configured

**Secondary**: PayPal
- **Type**: Digital wallet
- **Supports**: PayPal accounts, credit cards
- **Status**: Optional, Phase 2

---

## PAYMENT FLOW ARCHITECTURE

```
┌─────────────────────────────────────────┐
│  User at /donate/payment page           │
│  (Donor has selected amount, location)  │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  Payment Form (Embedded, external)      │
│  - Matara.pro for Israel (ILS)         │
│  - Stripe Elements for International    │
│  - No card data on our servers          │
└──────────────┬──────────────────────────┘
               │
         [User enters card]
               │
               ↓
┌─────────────────────────────────────────┐
│  Payment Processor (External)           │
│  - Authorizes card                      │
│  - Processes transaction                │
│  - Returns success/failure              │
└──────────────┬──────────────────────────┘
               │
               ↓
         [Success/Failure?]
           /         \
          /           \
         ↓             ↓
    SUCCESS        FAILURE
      │               │
      ↓               ↓
  Webhook      Error Message
  Received     to User
      │
      ↓
  Create transaction
  in database
      │
      ↓
  Send confirmation
  email
      │
      ↓
  Redirect to
  /donate/thank-you
```

---

## MATARA.PRO INTEGRATION (ISRAEL)

### API Connection

**Environment**: Production API
- **Endpoint**: [TBD - Matara endpoint]
- **API Key**: Stored in environment variable `MATARA_API_KEY`
- **Auth**: API key in request header

**Credentials**: Currently held by institution, to be transferred to development team

### Integration Points

**Step 1: Create Payment Link**

**When**: User reaches `/donate/payment` with ILS currency

**Request**:
```json
{
  "amount": 18000, // amount in agorot (cents)
  "currency": "ILS",
  "customer_name": "David Levi",
  "customer_email": "david@example.com",
  "customer_phone": "0541234567",
  "order_id": "donation_[UNIQUE_ID]",
  "return_url": "https://orchotchaim.co.il/he/donate/payment-return",
  "webhook_url": "https://orchotchaim.co.il/api/webhooks/matara"
}
```

**Response**: Payment token / payment URL

**Redirect**: User to Matara payment page

**Step 2: User Completes Payment**

**At**: Matara.pro payment form

**User enters**: Card details, expiration, CVV

**Matara handles**: All PCI compliance

**Step 3: Webhook Callback**

**Matara calls**: `https://orchotchaim.co.il/api/webhooks/matara`

**Payload**:
```json
{
  "order_id": "donation_[UNIQUE_ID]",
  "status": "success" | "failed" | "pending",
  "amount": 18000,
  "currency": "ILS",
  "transaction_id": "[MATARA_TRANSACTION_ID]",
  "timestamp": "2026-09-01T10:30:00Z"
}
```

**Webhook handling**:
1. Verify signature (authenticity)
2. Find donation record by order_id
3. Update status in database
4. Send confirmation email
5. Return 200 OK to Matara

**Step 4: Return URL**

**After payment**: Matara redirects to `https://orchotchaim.co.il/he/donate/payment-return?order_id=[ID]`

**Handler**:
1. Query database for donation record
2. If successful: Redirect to `/donate/thank-you`
3. If failed: Redirect to `/donate/payment` with error message

---

## STRIPE INTEGRATION (INTERNATIONAL & FALLBACK)

### API Connection

**Environment**: Production API
- **Public Key**: `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` (safe to expose)
- **Secret Key**: `STRIPE_SECRET_KEY` (server-only, never expose)
- **Webhook Signing Secret**: `STRIPE_WEBHOOK_SECRET` (server-only)

### Integration Points

**Step 1: Create Payment Intent**

**When**: User reaches `/donate/payment` (USD/GBP/EUR or Matara fallback)

**Server-side** (Next.js API route):
```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 18000, // amount in cents
  currency: 'usd',
  customer_email: 'donor@example.com',
  metadata: {
    order_id: 'donation_[UNIQUE_ID]',
    donor_name: 'David Levi',
    frequency: 'one-time' | 'monthly'
  }
});

// Return client secret to frontend
return { clientSecret: paymentIntent.client_secret };
```

**Step 2: Render Stripe Payment Element**

**Client-side** (React component):
```typescript
<Elements
  stripe={stripePromise}
  options={{ clientSecret }}
>
  <PaymentForm />
</Elements>
```

**User enters**: Card details in Stripe element (not our form)

**Stripe handles**: Tokenization, PCI compliance

**Step 3: Submit Payment**

**Client-side**:
```typescript
const { paymentIntent } = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: 'https://orchotchaim.co.il/he/donate/payment-return'
  }
});
```

**Step 4: Webhook Callback**

**Stripe calls**: `https://orchotchaim.co.il/api/webhooks/stripe`

**Event Types**:
- `payment_intent.succeeded` → Payment successful
- `payment_intent.payment_failed` → Payment failed
- `charge.refunded` → Refund processed

**Webhook handling**:
```typescript
const signature = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(body, signature, secret);

switch (event.type) {
  case 'payment_intent.succeeded':
    // Update donation record
    // Send confirmation email
    break;
  case 'payment_intent.payment_failed':
    // Update donation record with failure
    break;
}
```

**Step 5: Return URL**

**After payment**: Stripe redirects to `https://orchotchaim.co.il/he/donate/payment-return`

**Handler**:
1. Call Stripe to get payment intent status
2. If successful: Redirect to `/donate/thank-you`
3. If pending: Show "processing" message
4. If failed: Redirect to `/donate/payment` with error

---

## DONATION STORAGE

### Database Structure

**Donations Table**:
```typescript
{
  id: UUID (primary key)
  order_id: string (e.g., "donation_abc123")
  
  // Donor Info
  donor_name: string
  donor_email: string
  donor_phone: string (optional)
  donor_country: string (ISO code)
  
  // Donation Details
  amount: number (in cents: 18000 = 180)
  currency: string ('ILS', 'USD', 'GBP', 'EUR')
  frequency: 'one-time' | 'monthly'
  recurring_until: date (optional, if monthly)
  
  // Payment Info
  processor: 'matara' | 'stripe'
  transaction_id: string (from processor)
  payment_method: 'credit_card' | 'bank_transfer' | 'digital_wallet'
  
  // Status
  status: 'pending' | 'succeeded' | 'failed'
  error_message: string (if failed)
  
  // Metadata
  campaign_id: string (optional, which campaign?)
  utm_params: JSON (traffic source)
  ip_address: string (for fraud detection)
  
  // Timestamps
  created_at: datetime
  updated_at: datetime
  payment_processed_at: datetime
  
  // Flags
  is_recurring: boolean
  is_tax_deductible: boolean
  receipt_sent: boolean
}
```

### No Card Storage

**CRITICAL**: Cards are NEVER stored in our database

**Instead**:
- Matara stores cards on their secure servers
- Stripe stores cards on their secure servers
- We only store transaction ID from processor
- No PCI compliance burden on us

---

## RECURRING DONATIONS (MONTHLY)

### One-Time vs. Monthly Toggle

**At donation step**: User selects frequency

**If Monthly**:
1. Store `is_recurring: true`
2. Store `recurring_until: date` (until when?)
3. Process initial charge immediately
4. Schedule recurring charges (monthly)

### Recurring Payment Processing

**Option 1: Processor-Managed Subscriptions** (Recommended)

**Stripe**:
```typescript
const subscription = await stripe.subscriptions.create({
  customer: stripeCustomerId,
  items: [
    {
      price: stripePriceId, // recurring price object
    }
  ],
  billing_cycle_anchor: nextBillingDate
});

// Store subscription_id in database
donation.stripe_subscription_id = subscription.id;
```

**Benefits**:
- ✓ Processor retries failed charges
- ✓ Automatic renewal
- ✓ Easy to pause/cancel

**Option 2: Scheduled Webhooks** (Manual)

**If using Matara** (which may not support subscriptions):
1. Store donation record with `is_recurring: true`
2. Create scheduled job (cron) to process monthly charges
3. On each renewal: Call Matara API to process charge
4. Record result in database

### Cancellation

**User cancels**: From account/dashboard (Phase 2+)

**Action**:
1. Set `recurring_until: today`
2. Cancel subscription in processor
3. Send confirmation email

---

## SECURITY REQUIREMENTS

### PCI Compliance

**RULE**: Never store card numbers

**Our responsibility**:
- ✓ HTTPS only (enforced by Vercel)
- ✓ Secure API keys (environment variables)
- ✓ Secure webhooks (verify signatures)
- ✓ Don't log sensitive data

**Processor responsibility**:
- ✓ PCI DSS Level 1 compliance (Stripe, Matara)
- ✓ Secure card storage
- ✓ Encryption

### Webhook Signature Verification

**CRITICAL**: Always verify webhook authenticity

**Matara**:
```typescript
const signature = req.headers['x-matara-signature'];
const isValid = verifyMataraSig(body, signature, secret);
if (!isValid) return 403; // Reject
```

**Stripe**:
```typescript
const signature = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(body, signature, secret);
```

### Rate Limiting

**Protect payment endpoints**:
- Max 10 requests per minute per IP (payment form)
- Max 5 retry attempts per donation
- Cooldown: 30 seconds between retries

---

## ERROR HANDLING

### User-Facing Errors

**Generic messages** (don't expose internals):
- ❌ "Invalid card number: incorrect length"
- ✓ "Payment declined. Please check your card and try again."
- ✓ "We encountered a technical issue. Please try again in a few moments."

**Specific errors**:
- Card declined → "Your bank declined this charge. Please contact your bank."
- Expired card → "Your card has expired. Please use a different card."
- Timeout → "This is taking longer than expected. Your donation may still process. Check your email."

### Retry Logic

**Automatic retries** (for transient failures):
1. First retry: After 5 seconds
2. Second retry: After 30 seconds
3. Third retry: After 2 minutes
4. Give up, mark as failed

**Manual retries** (user can try again):
- Show button: "Try Again"
- Clear error message on new attempt
- Don't charge twice (idempotent keys)

---

## RECEIPTING & TAX DEDUCTION

### Donation Receipt Email

**Sent after**: Successful payment + webhook received

**Template** (customized per region):

**ISRAEL**:
```
Subject: תודה על תרומתך לישיבת ארחות חיים

Dear [Donor Name],

Thank you for your donation of ₪180 to Yeshivat Orchot Chaim on September 1, 2026.

Transaction ID: MATARA_TXN_123

We are a registered nonprofit in Israel. Your donation may be tax-deductible.
Please consult your accountant for details.

Best regards,
Yeshivat Orchot Chaim
```

**USA** (via Keren Yehoshua V'Yisroel):
```
Subject: Tax-Deductible Donation Receipt

Dear [Donor Name],

Thank you for your donation of $36 to support Yeshivat Orchot Chaim (Keren Yehoshua V'Yisroel).

Tax ID: 22-3209160
Deductible Amount: $36 (100% - no goods/services received)
Date: September 1, 2026
Transaction ID: STRIPE_TXN_456

Your donation is tax-deductible to the extent permitted by law.

Best regards,
Yeshivat Orchot Chaim
```

**UK** (via Tiferet Baruch):
```
Subject: Charitable Donation Receipt

Dear [Donor Name],

Thank you for your donation of £30 to support Yeshivat Orchot Chaim (Tiferet Baruch).

Charity Registration: [NUMBER]
Gift Aid Eligible: Yes (if you're a UK taxpayer)
Date: September 1, 2026
Transaction ID: STRIPE_TXN_789

To claim Gift Aid, please...

Best regards,
Yeshivat Orchot Chaim
```

### Tax Form Integration (Phase 2)

**Future**: Automatic tax form generation
- Annual summary for donors
- Attachment: IRS form 1098-T (USA) or equivalent
- Sent in January of following year

---

## REFUND POLICY

### Refund Eligibility

**Refunds available for**:
- Accidental double-charge (within 30 days)
- Fraudulent charge (disputed with processor)
- User request within 7 days of donation

**Refunds not available for**:
- Change of mind (after 7 days)
- Recurring donations (contact directly)

### Refund Process

**User request**: Contact email with donation details

**Staff action**:
1. Verify donation in database
2. Check refund eligibility
3. Process refund via processor
4. Send confirmation email

**Processor**:
- Matara: Call refund API
- Stripe: Create refund via dashboard

**Database**: Mark donation as `status: 'refunded'`

---

## RECURRING DONATION MANAGEMENT

### Monthly Processing

**Scheduled job** (cron, nightly):
```
- Find all donations with is_recurring=true AND recurring_until >= today
- For each: Call processor to charge
- Record result (succeeded/failed)
- If failed: Retry next day (up to 5 attempts)
- If succeeded after 5 attempts: Mark as failed, send notification
```

### Pause / Resume (Phase 2)

**User dashboard** (future feature):
- View active subscriptions
- Pause temporarily
- Resume
- Modify amount
- Extend end date

---

## MONITORING & ALERTS

### Key Metrics to Track

**Daily**:
- Donations received (count + total)
- Payment success rate (should be 90%+)
- Failed donations (count)
- Refunds processed (count + total)

**Weekly**:
- Matara vs. Stripe volume
- One-time vs. recurring ratio
- Average donation amount
- Donor retention (repeat donors)

**Alerts**:
- Payment success rate drops below 85%
- Failed donation count > 10 in a day
- Webhook errors (processor can't reach us)
- Processor API errors

---

## TESTING CHECKLIST

**Pre-Launch**:
- [ ] Matara integration tested with test credentials
- [ ] Stripe integration tested with test API keys
- [ ] One-time donations working (ILS)
- [ ] Monthly donations working (ILS)
- [ ] One-time donations working (USD)
- [ ] Webhook handling working (Matara)
- [ ] Webhook handling working (Stripe)
- [ ] Payment confirmation emails sent
- [ ] Failed payment handling working
- [ ] Refund process tested
- [ ] Receipt emails contain correct tax info
- [ ] International tax info correct (USA, UK)
- [ ] Donation data stored correctly
- [ ] No card numbers logged anywhere

---

**STATUS**: IMPLEMENTATION READY

This donation specification provides a secure, compliant payment processing architecture using industry-standard external processors.
