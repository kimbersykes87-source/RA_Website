# Setup Guide - Rubber Armstrong 2026

Complete setup instructions for the Rubber Armstrong website and backend systems.

---

## Table of Contents

1. [Initial Repository Setup](#initial-repository-setup)
2. [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
3. [Google Sheets Setup](#google-sheets-setup)
4. [Google Apps Script Setup](#google-apps-script-setup)
5. [Google Contacts Sync (Optional)](#google-contacts-sync-optional)
6. [Analytics Setup (Optional)](#analytics-setup-optional)
7. [Post-Deployment Testing](#post-deployment-testing)

---

## Initial Repository Setup

### 1. Clone or Create Repository

```bash
git clone YOUR_REPO_URL
cd RubberArmstrongWebsite
```

### 2. Push to GitHub

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## Cloudflare Pages Deployment

### Main Site (rubberarmstrong.com)

**1. Create Cloudflare Pages Project**
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
- Click "Create a project" → "Connect to Git"
- Select your GitHub repository

**2. Configure Build Settings**
```
Project name: rubber-armstrong-main
Production branch: main
Build command: (leave empty)
Build output directory: /
Root directory: main-site
```

**3. Deploy**
- Click "Save and Deploy"
- Wait for deployment to complete
- Note the `.pages.dev` URL

**4. Add Custom Domain**
- In Pages project → Custom domains tab
- Add: `rubberarmstrong.com`
- Add: `www.rubberarmstrong.com`
- Follow DNS configuration instructions from Cloudflare

### SOI Site (soi.rubberarmstrong.com)

**1. Create Second Pages Project**
- Same GitHub repository
- Project name: `rubber-armstrong-soi`

**2. Configure Build Settings**
```
Project name: rubber-armstrong-soi
Production branch: main
Build command: (leave empty)
Build output directory: /
Root directory: soi-site
```

**3. Add Custom Domain**
- Add: `soi.rubberarmstrong.com`

### Enable Cloudflare Web Analytics

**For both sites:**
1. Cloudflare Dashboard → Web Analytics
2. Cloudflare Pages auto-injects analytics (already configured)
3. Analytics will start tracking after deployment

---

## Google Sheets Setup

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new sheet named: "RA 2026 SOI Submissions"
3. Share with your Google account (owner permissions)

### 2. Create Sheet Tabs

Create these 4 tabs:
- `SOI_Staging` - New submissions (Status: Pending)
- `SOI_Approved` - Approved applicants
- `SOI_Rejected` - Rejected applicants
- `SOI_2026` - End-of-season archive

### 3. Column Structure (26 columns)

All tabs should have these exact headers in row 1:

```
Timestamp | First | Last | Sex | Birth Year | Country (Birth) | Country (Res) | 
Email | Phone Code | Phone | Ref. Campmate | Burns (RA) | Burns (RA) Count | 
Burns (Other) | Burns (Other) Count | First Burn? | Likelihood | Steward Ticket? | 
What Offer | Notes | Status | Reviewed By | Reviewed At | Internal Notes | 
Form | Synced to Contacts
```

### 4. Format Burns Columns as TEXT

**Important:** Prevents scientific notation

For each tab (Staging, Approved, Rejected, 2026):
1. Select column L (Burns RA)
2. Format → Number → Plain text
3. Select column N (Burns Other)
4. Format → Number → Plain text
5. Select column I (Phone Code)
6. Format → Number → Plain text

---

## Google Apps Script Setup

### Option A: Use Consolidated Scripts (Recommended)

**1. Open Apps Script**
- In your Google Sheet: Extensions → Apps Script

**2. Create Files**
- Delete existing `Code.gs`
- Create these files from `scripts/apps-script-consolidated/`:
  - `Config.gs`
  - `FormHandler.gs`
  - `ContactsSync.gs` (optional)
  - `Analytics.gs` (optional)
- Replace `appsscript.json` contents

**3. Configure Settings**

In `Config.gs`, update:
```javascript
ANALYTICS_CONFIG: {
  propertyId: 'properties/YOUR_PROPERTY_ID',
  emailRecipient: 'your-email@example.com'
}
```

**4. Run Setup Functions**

Run these in order:
1. `setupAllTabs()` - Creates/updates all sheet tabs
2. `setupDataValidation()` - Adds dropdown validations
3. `setupConditionalFormatting()` - Adds color coding
4. `testFormSubmission()` - Test with sample data

**5. Deploy Web App**
- Deploy → New deployment
- Type: Web app
- Description: "SOI Form Handler v1.0"
- Execute as: Me
- Who has access: Anyone
- Click Deploy
- **Copy the Web App URL**

**6. Update Form Config**

In `soi-site/js/config.js`:
```javascript
const SCRIPT_URL = 'YOUR_WEB_APP_URL';
```

Commit and push to trigger Cloudflare deployment.

### Option B: Use Legacy Scripts

Use existing scripts in `scripts/` folder:
- `apps-script-complete.js` - Form handler
- `google-contacts-sync.js` - Contacts sync
- `google-analytics-daily-report.js` - Analytics

Follow similar deployment process as Option A.

---

## Google Contacts Sync (Optional)

Auto-sync approved SOI submissions to Google Contacts.

### Setup (10-15 minutes)

**1. Enable People API**
- In Apps Script: Services (+ icon) → Add People API

**2. Run Setup Functions**
```javascript
// Run these in Apps Script:
setupContactsSync()     // Initial setup
setupAutomaticSync()    // Enable auto-sync
testSingleSync()        // Test with one contact
```

**3. Verify Trigger**
- Apps Script → Triggers (clock icon)
- Should see `onEdit` trigger for automatic sync

### How It Works

**When you approve a submission:**
1. Change Status to "Approved" in Google Sheets
2. Contact automatically syncs to Google Contacts
3. Tagged with "2026 Rubbers" label
4. "Synced to Contacts" column marked "Yes"

**For existing contacts:**
- Only adds "2026 Rubbers" label (preserves your data)

**For new contacts:**
- Creates full contact with all SOI data
- Adds detailed notes (burns history, likelihood, what they offer)

### Manual Sync

To sync all approved contacts at once:
```javascript
syncApprovedToContacts()  // Run in Apps Script
```

---

## Analytics Setup (Optional)

Get weekly analytics emails every Monday at 9 AM Pacific.

### Requirements

- Google Analytics 4 property
- Analytics Data API enabled
- Property ID (numbers only, e.g., 518391310)

### Setup (15-20 minutes)

**1. Get GA4 Property ID**
- Go to https://analytics.google.com/
- Admin → Property Settings
- Copy Property ID (just the numbers)

**2. Enable Analytics Data API**
- In Apps Script: Services (+ icon)
- Add: Google Analytics Data API

**3. Configure**

In `Config.gs` (or `Analytics.gs` for legacy):
```javascript
ANALYTICS_CONFIG: {
  propertyId: 'properties/518391310',  // Your Property ID
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  schedule: {
    dayOfWeek: ScriptApp.WeekDay.MONDAY,
    hour: 9,
    timezone: 'America/Los_Angeles'
  }
}
```

**4. Run Setup**
```javascript
setupWeeklyAnalytics()  // Creates trigger
testAnalyticsReportWithSampleData()  // Test email
```

**5. Verify Trigger**
- Apps Script → Triggers
- Should see weekly Monday 9 AM trigger

### What You'll Receive

Weekly email with:
- Unique visitors
- Total sessions
- Total page views
- Visitors by country (top 10)
- Date range (previous 7 days)

---

## Post-Deployment Testing

### Main Site Testing

- [ ] Visit https://rubberarmstrong.com
- [ ] Check all 6 pages load correctly
- [ ] Test desktop navigation
- [ ] Test mobile navigation (bottom bar)
- [ ] Verify gallery images display
- [ ] Test links to SOI form
- [ ] Check on mobile device

### SOI Form Testing

- [ ] Visit https://soi.rubberarmstrong.com
- [ ] Fill out form with test data
- [ ] Verify validation works
- [ ] Submit form
- [ ] Check success message
- [ ] Verify redirect to main site

### Backend Testing

- [ ] Check SOI_Staging tab for new submission
- [ ] Verify all 26 columns populated
- [ ] Check Burns data: "2015, 2016, 2017" (not scientific notation)
- [ ] Check Burns counts: 3, 2 (numbers)
- [ ] Check Phone Code: "+1" (not 1)
- [ ] Change Status to "Approved"
- [ ] Verify row moves to SOI_Approved
- [ ] Check "Synced to Contacts" if enabled

### Analytics Testing

- [ ] Wait 24-48 hours for data
- [ ] Check Cloudflare Analytics dashboard
- [ ] If GA4 enabled: Run `testAnalyticsReport()`
- [ ] Verify email received

---

## Troubleshooting

### Form Submissions Not Appearing

**Check:**
1. Apps Script → Executions (clock icon)
2. Look for recent doPost errors
3. Verify sheet tab names match exactly
4. Check web app deployment is active

**Fix:**
1. Run `testFormSubmission()` in Apps Script
2. If test works: Redeploy web app
3. If test fails: Check sheet structure

### Burns Data Shows Scientific Notation

**Cause:** Columns formatted as numbers

**Fix:**
1. Select Burns columns (L, N)
2. Format → Number → Plain text
3. Delete old test data
4. Submit fresh test

### Auto-Move Not Working

**Check:**
1. Verify AutoMove.gs file exists
2. Test: Change Status dropdown manually
3. Check Executions log for errors

**Fix:**
1. Re-add AutoMove.gs code
2. Save and test again

### Analytics Not Working

**Check:**
1. Property ID correct (numbers only)
2. Analytics Data API enabled
3. Wait 24-48 hours for data

**Fix:**
1. Run `testAnalyticsReportWithSampleData()`
2. Check execution log for errors
3. Verify email recipient correct

### Contacts Sync Not Working

**Check:**
1. People API enabled
2. Trigger exists (Triggers panel)
3. Check execution log

**Fix:**
1. Re-run `setupAutomaticSync()`
2. Test: Change Status to "Approved"
3. Check execution log for errors

---

## Maintenance

### Weekly
- Review new Pending submissions
- Process approved/rejected entries
- Check for issues or questions

### Monthly
- Generate statistics report
- Review approval rates
- Backup Google Sheet (File → Download)

### End of Season
1. Copy all data to SOI_2026 archive tab
2. Generate final statistics
3. Clean SOI_Staging, SOI_Approved, SOI_Rejected for next year
4. Update year references (2027)

---

## Security & Privacy

### Access Control
- Limit Google Sheet access to camp leadership only
- Never share sheet publicly
- Use "View only" for non-editors

### Data Privacy
- Treat all submissions as confidential
- Internal Notes should be respectful
- Don't share rejection reasons publicly
- Use BCC when emailing multiple applicants

### Best Practices
- Keep data for current season + 1 year
- Archive old years to separate sheets
- Delete very old data (3+ years) if not needed
- Regular backups

---

## Next Steps

After completing setup:

1. **Test Everything** - Run through all testing checklists
2. **Deploy Optional Features** - Contacts sync, analytics
3. **Share SOI Form** - Start accepting submissions
4. **Monitor** - Watch for errors first few days
5. **Review Submissions** - Process as they arrive

See [GETTING_STARTED.md](GETTING_STARTED.md) for daily workflow and [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md) for technical reference.

---

**Setup complete!** Your Rubber Armstrong website is ready to accept SOI submissions. 🎪🔥

