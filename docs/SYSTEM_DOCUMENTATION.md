# Rubber Armstrong SOI System - Complete Documentation

**Status:** ✅ Production Ready  
**Last Updated:** January 5, 2026  
**Version:** 1.0 - Fully Operational

---

## 🎯 System Overview

The Statement of Intent (SOI) system is a complete form-to-sheet workflow for managing Rubber Armstrong camp membership applications.

### Components
1. **Custom Web Form** - https://soi.rubberarmstrong.com/
2. **Google Apps Script** - Backend processor and automation
3. **Google Sheets** - Data storage and review interface
4. **Cloudflare Pages** - Hosting (auto-deploys from GitHub)

---

## 📊 Data Flow

```
User fills form → soi.rubberarmstrong.com
    ↓
Form validates & normalizes data
    ↓
POST to Google Apps Script web app
    ↓
Apps Script writes to SOI_Staging (Status: Pending)
    ↓
Admin reviews in Google Sheets
    ↓
Admin changes Status to Approved/Rejected
    ↓
onEdit() trigger fires
    ↓
Row auto-moves to SOI_Approved or SOI_Rejected
```

---

## 📋 Sheet Structure

### All 4 Tabs Have 26 Columns:

1. Timestamp
2. First
3. Last
4. Sex
5. Birth Year
6. Country (Birth)
7. Country (Res)
8. Email
9. Phone Code
10. Phone
11. Ref. Campmate
12. **Burns (RA)** ← Formatted as TEXT
13. **Burns (RA) Count** ← Auto-calculated
14. **Burns (Other)** ← Formatted as TEXT
15. **Burns (Other) Count** ← Auto-calculated
16. First Burn?
17. Likelihood
18. Steward Ticket?
19. What Offer
20. Notes
21. Status
22. Reviewed By
23. Reviewed At
24. Internal Notes
25. Form
26. Synced to Contacts

### Tab Purposes

**SOI_Staging** - Active review queue
- All new submissions land here
- Status: Pending (yellow background)
- Admin reviews and changes Status

**SOI_Approved** - Approved archive
- Rows auto-move here when Status → Approved
- Your confirmed roster for the year

**SOI_Rejected** - Rejected archive
- Rows auto-move here when Status → Rejected
- Historical record of declined applications

**SOI_2026** - Year-end archive
- Empty during season
- At end of year: Copy all data from 3 working tabs
- Permanent historical record

---

## 🔧 Apps Script Configuration

### Files

**Config.gs**
- Single source of truth for all settings
- 26-column headers
- Validation options
- Color schemes

**FormHandler.gs**
- `doGet()` - Handles GET requests (CORS)
- `doPost()` - Processes form submissions
- `setupAllTabs()` - Creates/updates all tabs
- `setupDataValidation()` - Adds dropdown menus
- `setupConditionalFormatting()` - Adds color coding
- `testFormSubmission()` - Test function

**AutoMove.gs** ⭐ NEW
- `onEdit()` - Automatic trigger on cell edit
- `moveRowToSheet()` - Moves row between tabs
- `moveApprovedAndRejectedRows()` - Bulk move function

**Analytics.gs** (Optional)
- GA4 integration
- Weekly email reports

**ContactsSync.gs** (Optional)
- Sync to Google Contacts
- Auto-sync on approval

### Key Functions

| Function | When to Run | What It Does |
|----------|-------------|--------------|
| `setupAllTabs()` | Once (initial setup) | Creates all tabs with 26 columns, text formatting |
| `setupDataValidation()` | Once (after setupAllTabs) | Adds dropdown menus to all tabs |
| `setupConditionalFormatting()` | Once (after validation) | Adds color coding to SOI_Staging |
| `testFormSubmission()` | Anytime | Tests form handler with sample data |
| `validateAllHeaders()` | Anytime | Checks if all tabs have correct headers |
| `moveApprovedAndRejectedRows()` | Anytime | Bulk-moves all marked rows |

---

## 🌐 Web Form Configuration

### Form Files

**index.html**
- Complete HTML form with 5 sections
- Accessibility compliant (WCAG 2.1 AA)
- Responsive design

**js/config.js**
- Apps Script endpoint URL
- Form metadata

**js/form.js**
- Form validation logic
- Data normalization functions
- Submission handling
- Duplicate detection (localStorage)

**js/validation.js**
- Field validation helpers
- Phone number validation
- Birth year validation

**js/countries.js**
- Country list with dial codes
- Populates country dropdowns

### Data Normalization

Form automatically normalizes values:
```javascript
// Sex values
male → Male
female → Female
non-binary → Non-binary
other → Other

// Likelihood values
hell-yeah → Hell yeah!
probably → Probably
keep-me-in-loop → Keep me in the loop

// Yes/No values
yes → Yes
no → No

// Burns data
Sent as arrays: ['2015','2016','2017']
Backend joins to: "2015, 2016, 2017"
Backend counts: 3
```

---

## 🚀 Deployment

### Web Form (Cloudflare Pages)

**Auto-deploys from GitHub main branch**

Repository: `kimbersykes87-source/RA_Website`  
Build directory: `soi-site`  
Custom domain: `soi.rubberarmstrong.com`

**To deploy changes:**
```bash
git add soi-site/
git commit -m "Update form"
git push
```
Cloudflare deploys automatically in ~1-2 minutes.

### Apps Script Web App

**Current deployment:**
```
URL: https://script.google.com/macros/s/AKfycbwKLPTsbsw2WeIdZ_qdlz7Njj4uOodgSxDa_X47-_8tda5Uk4FltSZYPBYT3yZq8eVXpg/exec
Execute as: Your account
Who has access: Anyone
```

**To update deployment:**
1. Edit code in Apps Script editor
2. Save all files
3. Deploy → Manage deployments
4. Edit (pencil icon) → New version → Deploy
5. URL stays the same, new code goes live

---

## 🎯 Daily Workflow

### For Admins Reviewing Submissions

1. **Open Google Sheet**
2. **Go to SOI_Staging tab**
3. **Review pending submissions** (yellow rows)
4. **For each row:**
   - Read applicant information
   - Make decision
   - **Change Status dropdown to:**
     - "Approved" → Row auto-moves to SOI_Approved ✅
     - "Rejected" → Row auto-moves to SOI_Rejected ❌
     - Leave "Pending" → Row stays for later review

**That's it!** The system handles the rest automatically.

---

## 🔍 Troubleshooting

### Issue: Form submissions not appearing

**Check:**
1. Go to Apps Script → Executions (clock icon)
2. Look for recent doPost executions
3. Check for errors

**Fix:**
1. Run `testFormSubmission()` in Apps Script
2. If test works but live doesn't: Redeploy web app
3. If test fails: Check sheet tabs exist with correct names

### Issue: Auto-move not working

**Check:**
1. Verify AutoMove.gs file exists in Apps Script
2. Change a Status dropdown manually - does it move?
3. Check Executions log for onEdit errors

**Fix:**
1. Re-add AutoMove.gs from `scripts/apps-script-consolidated/AutoMove.gs`
2. Save and test again

### Issue: Data in wrong columns

**Check:**
1. Run `validateAllHeaders()` - do all tabs match?
2. Check Burns columns are formatted as @STRING@

**Fix:**
1. Redeploy latest web app version
2. Run `setupAllTabs()` to reset headers
3. Test with fresh submission

### Issue: Burns data shows huge numbers

**Cause:** Columns formatted as numbers instead of text

**Fix:**
1. Select Burns (RA) column → Format → Number → Plain text
2. Select Burns (Other) column → Format → Number → Plain text
3. Select Phone Code column → Format → Number → Plain text
4. Delete old test data
5. Submit fresh test

### Issue: Duplicate email warning

**To clear for testing:**
```javascript
// Open https://soi.rubberarmstrong.com/
// Press F12 → Console → Run:
localStorage.removeItem('ra_soi_submissions')
```

---

## 🔐 Security & Privacy

### Form Level
- Honeypot spam protection
- Client-side validation
- HTTPS enforced by Cloudflare
- No sensitive data stored in browser (except localStorage email list)

### Apps Script Level
- Web app requires authentication (runs as your account)
- Public access for submissions only
- Sensitive operations require editor permissions
- All submissions logged

### Sheet Level
- Google account permissions required
- Sheet is private by default
- Can add specific collaborators
- Audit trail via edit history

---

## 📈 Analytics & Reporting

### Built-in Analytics (Optional)

If enabled, Analytics.gs provides:
- Weekly email reports
- Submission trends
- Approval rates
- Demographic breakdowns

**To enable:**
1. Configure GA4 property ID in Config.gs
2. Run `setupWeeklyAnalytics()` in Apps Script

### Manual Analysis

Export tabs as CSV for:
- Pivot tables
- Data visualization
- Year-over-year comparison
- Custom reports

---

## 🔄 Year-End Process

**At end of 2026 season:**

1. **Archive all data:**
   - Open SOI_2026 tab
   - Copy all rows from SOI_Staging, SOI_Approved, SOI_Rejected
   - Paste into SOI_2026

2. **Clean for next year:**
   - Delete all data rows (keep headers) in:
     - SOI_Staging
     - SOI_Approved
     - SOI_Rejected

3. **Prepare for 2027:**
   - Create new tab: SOI_2027
   - Update form title to "Statement of Intent 2027"
   - Update Config.gs: `ARCHIVE: 'SOI_2027'`
   - Redeploy web app

---

## 📞 Support Contacts

**For technical issues:**
- Check this documentation first
- Review SETUP_PROGRESS_NOTES.md for detailed history
- Check GitHub repository for latest code

**For form changes:**
- Update HTML in soi-site/index.html
- Update form.js if adding new fields
- Test locally before pushing to GitHub

**For Apps Script changes:**
- Update code in Apps Script editor
- Always run test functions before deploying
- Keep backups of working versions

---

## 📚 Additional Documentation

- `SETUP_PROGRESS_NOTES.md` - Complete setup history
- `APPS_SCRIPT_COLUMN_MAPPING.md` - Column structure details
- `APPS_SCRIPT_REBUILD_GUIDE.md` - Full rebuild instructions
- `QUICK_START_SUMMARY.md` - Project overview
- `soi-site/README.md` - Form-specific docs
- `main-site/README.md` - Main website docs

---

## ✅ System Health Checklist

Run these checks periodically:

- [ ] Submit test form - does it land in SOI_Staging?
- [ ] Burns data shows as "2015, 2016" not "20152016"?
- [ ] Burns count columns populated?
- [ ] Phone code shows "+1" not "1"?
- [ ] Change Status to Approved - does row move?
- [ ] Change Status to Rejected - does row move?
- [ ] All 26 columns present in all tabs?
- [ ] Dropdown validations working?
- [ ] Color coding working in SOI_Staging?

**If all checkboxes ✅ → System is healthy!**

---

**System Status:** Production Ready ✅  
**Last Verified:** January 5, 2026  
**Next Review:** Start of 2027 season

