# Statement of Intent (SOI) Subdomain

The Statement of Intent form for Rubber Armstrong 2026, deployed at `soi.rubberarmstrong.com`.

## Overview

This subdomain hosts a single-page form where prospective campmates submit their Statement of Intent. The form is values-focused, reflective, and qualitative — no logistics, no tickets, no financials.

## Tech Stack

- **Frontend**: Plain HTML, CSS, Vanilla JavaScript
- **Backend**: Google Apps Script web app
- **Data Store**: Google Sheets
- **Hosting**: Cloudflare Pages
- **Analytics**: Cloudflare Web Analytics (privacy-focused)

## Structure

```
soi-site/
├── index.html          # SOI form page
├── css/
│   └── styles.css      # Form-specific styling
├── js/
│   ├── config.js       # Configuration (endpoint URL, settings)
│   └── form.js         # Form logic and submission
└── README.md (this file)
```

## Setup Instructions

### 1. Google Apps Script Web App

Create a Google Apps Script that receives form data and writes to Google Sheets.

**Script pseudocode**:
```javascript
function doPost(e) {
  // Parse JSON from request
  const data = JSON.parse(e.postData.contents);
  
  // Write to SOI_Staging sheet with Status = "Pending"
  // Return success response
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**Deployment**:
1. Go to Extensions → Apps Script in your Google Sheet
2. Paste your script
3. Deploy → New Deployment → Web App
4. Set "Execute as" to your account
5. Set "Who has access" to "Anyone"
6. Deploy and copy the URL

### 2. Update Configuration

Edit `js/config.js` and replace:
```javascript
APPS_SCRIPT_ENDPOINT: 'YOUR_ACTUAL_SCRIPT_URL_HERE'
```

### 3. Google Sheets Setup

Create a Google Sheet with these tabs:

#### SOI_Staging
Columns (in order):
1. Timestamp
2. Full Name
3. Preferred Name
4. Email
5. WhatsApp Number
6. Country
7. Closest City
8. Pronouns
9. [Additional form fields as specified]
10. Status (default: "Pending")
11. Reviewed By
12. Reviewed At
13. Internal Notes

#### SOI_Approved
Same columns as SOI_Staging. Approved entries are manually copied here.

#### SOI_Rejected
Same columns as SOI_Staging. Rejected entries are manually copied here.

#### SOI_2026
Archive of all 2026 submissions (end of season).

### 4. Deploy to Cloudflare Pages

1. Connect repository to Cloudflare Pages
2. Create new project
3. Set build configuration:
   - **Build command**: (none)
   - **Build output directory**: `soi-site`
   - **Root directory**: (leave as root)
4. Add custom domain: `soi.rubberarmstrong.com`
5. Configure DNS in Cloudflare
6. SSL will be automatic

### 5. Test the Form

1. Submit a test entry
2. Verify it appears in SOI_Staging with Status = "Pending"
3. Test duplicate email warning (submit same email twice)
4. Test success redirect to main site
5. Test error handling (turn off script temporarily)

## Form Behavior

### Spam Protection
- **Honeypot field**: Hidden field that bots fill but humans don't
- If honeypot is filled, submission is rejected client-side

### Duplicate Detection
- Uses localStorage to check if email has been submitted before
- Shows warning message but allows resubmission
- Warning: "This email has already been submitted. You can submit again to update your information."

### Success Flow
1. Form data collected and validated
2. POST to Google Apps Script endpoint
3. On success (200 response):
   - Store email in localStorage
   - Redirect to: `https://rubberarmstrong.com/?submission=success`
4. Main site detects query parameter and shows success message

### Error Handling
- Network errors: Show inline error message, keep form data
- Validation errors: Show field-specific errors
- All errors logged to browser console

## Cloudflare Web Analytics

Analytics token should be added to `index.html`:
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_CLOUDFLARE_TOKEN"}'></script>
```

Get token from: Cloudflare Dashboard → Web Analytics → Settings

## Accessibility

Form is WCAG 2.1 AA compliant:
- Semantic HTML5 elements
- Proper label associations
- Required field indicators
- Clear error messages
- Keyboard navigation
- Focus indicators
- ARIA attributes where needed
- Screen reader tested

## Local Development

```bash
# Navigate to soi-site
cd soi-site

# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Updating Form Fields

To add/modify form fields:

1. Update `index.html` with new field HTML
2. Update `js/config.js` with field configuration
3. Update `js/form.js` to collect new field data
4. Update Google Apps Script to handle new fields
5. Add new columns to Google Sheets
6. Test thoroughly
7. Update this README

## Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify Apps Script endpoint URL in `config.js`
- Test Apps Script directly in browser
- Check Apps Script execution logs

### Submissions not appearing in sheet
- Verify Apps Script permissions
- Check sheet tab names match exactly (case-sensitive)
- Check Apps Script logs for errors
- Verify "Who has access" is set to "Anyone"

### Success redirect doesn't work
- Check REDIRECT_URL in `config.js`
- Verify main site is deployed
- Check browser console for errors

### Duplicate warning not showing
- Check browser localStorage
- Try different browser/incognito mode
- Verify form.js localStorage code

## Security Notes

- No sensitive data in client-side code
- Apps Script endpoint is public but validates on server-side
- Honeypot catches most bot submissions
- Manual review catches remaining spam
- HTTPS enforced by Cloudflare
- No cookies or tracking (except Cloudflare Analytics)

## Form Field Specifications

**Note**: Exact form fields should be specified by camp leadership. This implementation uses a flexible structure that can be easily modified.

Conceptual structure:
- Section 1: Who You Are (contact info)
- Section 2: Values Alignment (reflective questions)
- Section 3: What Draws You to RA (qualitative)
- Section 4: What You Could Bring (values-focused)
- Section 5: Access & Support Needs (optional)

## Maintenance

### Yearly Updates
- Update FORM_NAME in `config.js` (e.g., "Statement of Intent 2027")
- Create new archive tab in Google Sheets (e.g., SOI_2027)
- Review and refresh form questions if needed
- Test end-to-end before opening submissions

### Monitoring
- Check SOI_Staging regularly for new submissions
- Monitor for spam/bot patterns
- Review error logs in Apps Script
- Check Cloudflare Analytics for traffic patterns

## Support

For questions or issues:
1. Check this README
2. Review browser console errors
3. Check Google Apps Script logs
4. Contact RA technical team

