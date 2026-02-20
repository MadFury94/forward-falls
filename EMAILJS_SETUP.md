# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred provider)
4. Connect your Gmail account: **webdeveloperbrian@gmail.com**
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Forward Falls Initiative Contact Form
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcXYZ123_456`)

## Step 5: Add Credentials to Your App

### Option A: Environment Variables (Recommended for Production)
1. Create `.env.local` file in the root of `forward-falls-web/`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update `contact/page.tsx` to use env variables:
```typescript
const result = await emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    formRef.current!,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

### Option B: Direct in Code (Quick Testing)
Replace the placeholders in `app/contact/page.tsx`:
```typescript
const result = await emailjs.sendForm(
    'service_abc123',      // Your Service ID
    'template_xyz789',     // Your Template ID
    formRef.current!,
    'abcXYZ123_456'       // Your Public Key
);
```

## Step 6: Test the Form
1. Run your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check **webdeveloperbrian@gmail.com** for the email

## Important Notes
- Free tier: 200 emails/month
- Form field names must match template variables:
  - `user_name` → {{user_name}}
  - `user_email` → {{user_email}}
  - `subject` → {{subject}}
  - `message` → {{message}}
- Public key is safe to expose in client-side code
- For production, always use environment variables

## Troubleshooting
- **403 Error**: Check your public key is correct
- **No email received**: Verify template ID and service ID
- **Spam folder**: Check spam/junk folder for test emails
- **Rate limit**: Free tier has 200 emails/month limit

## Next Steps for Production
1. Add `.env.local` to `.gitignore` (already done in Next.js)
2. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
3. Consider upgrading EmailJS plan if you expect >200 submissions/month
