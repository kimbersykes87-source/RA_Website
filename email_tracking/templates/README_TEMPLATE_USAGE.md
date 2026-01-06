# Email Template Usage

## Active Templates

**`invitation-2026-final.html`** - This is the primary template used for the email campaign. It includes:
- Full logo and signature
- Tracking pixel and click URLs
- Unsubscribe link

**`invitation-2026.html`** - Alternative version with different structure. Currently maintained for reference but **not actively used** by the automation script.

**`gmail-automation.gs`** - The `getEmailTemplate()` function in this file is the **active template** used when sending emails via Google Apps Script. This function generates the HTML dynamically.

## Which Template to Edit?

- **For Gmail automation:** Edit `email_tracking/scripts/gmail-automation.gs` → `getEmailTemplate()` function
- **For standalone HTML template:** Edit `invitation-2026-final.html`
- **Do NOT edit `invitation-2026.html`** - it's maintained for reference only

## Last Updated

All templates were synchronized on January 2026 to include:
- Contact email address (rubberarmstrongcamp@gmail.com)
- Clear SOI explanation
- Steward Sale ticket disclaimers
- Process timeline information

