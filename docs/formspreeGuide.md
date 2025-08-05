# Setting up Formspree for Your Contact Form

The contact form in your portfolio uses [Formspree](https://formspree.io/), a free service that allows you to receive form submissions directly to your email without requiring any backend code.

## Steps to Set Up:

1. **Create a Formspree Account:**
   - Go to [formspree.io](https://formspree.io/) and sign up for a free account.
   - The free tier allows for up to 50 submissions per month.

2. **Create a New Form:**
   - Click on "New Form" and give it a name (e.g., "Portfolio Contact Form").
   - Select your preferred notification settings.
   - Choose the email where you want to receive form submissions.

3. **Get Your Form Endpoint:**
   - After creating the form, you'll be given a unique endpoint URL like: `https://formspree.io/f/xrgdkqbr`.
   - Copy this endpoint.

4. **Update Your Contact Form Component:**
   - Open `/src/sections/Contact.tsx`.
   - Locate the line: `const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT', {`
   - Replace `YOUR_FORMSPREE_ENDPOINT` with your actual form ID from step 3 (only the part after the last `/`).
   - For example, change it to: `const response = await fetch('https://formspree.io/f/xrgdkqbr', {`

5. **Test Your Form:**
   - Run your Next.js app locally using `npm run dev`.
   - Navigate to the contact section and submit a test message.
   - Check if you received the email notification.

## Additional Features:

- **Spam Filtering:** Formspree includes built-in spam filtering.
- **File Uploads:** You can add file upload capabilities (premium feature).
- **Custom Thank You Page:** Configure a custom redirect after form submission.
- **Form Integrations:** Connect with services like Slack, Discord, or Zapier.

## Troubleshooting:

- If you're not receiving emails, check your spam folder.
- Verify that your form endpoint is correctly specified in the code.
- Make sure your Formspree account is verified.
- For local testing, Formspree may ask you to confirm your email the first time.

For more information, visit the [Formspree documentation](https://formspree.io/docs/). 