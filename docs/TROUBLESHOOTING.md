# Troubleshooting Guide - Rubber Armstrong 2026

Common issues and their solutions for the Rubber Armstrong website and backend systems.

---

## Table of Contents

1. [Form Submission Problems](#form-submission-problems)
2. [Burns Data Issues](#burns-data-issues)
3. [Google Sheets Issues](#google-sheets-issues)
4. [Auto-Move Problems](#auto-move-problems)
5. [Google Contacts Sync Issues](#google-contacts-sync-issues)
6. [Analytics Issues](#analytics-issues)
7. [Deployment Issues](#deployment-issues)
8. [Apps Script Errors](#apps-script-errors)

---

## Form Submission Problems

### Issue: Form submissions not appearing in Google Sheets

**Symptoms:**
- Form submits successfully
- Success message shows
- No new row in SOI_Staging

**Check:**
1. Apps Script → Executions (clock icon)
2. Look for recent doPost executions
3. Check for error messages

**Solutions:**

**Solution A: Test the handler**
```javascript
// In Apps Script, run:
testFormSubmission()
```
- If test works: Web app deployment issue
- If test fails: Sheet structure issue

**Solution B: Redeploy web app**
1. Deploy → Manage deployments
2. Click pencil icon → New version
3. Deploy
4. URL stays the same

**Solution C: Check sheet tabs**
1. Verify tabs exist: SOI_Staging, SOI_Approved, SOI_Rejected, SOI_2026
2. Verify tab names match exactly (case-sensitive)
3. Run `validateAllHeaders()` to check structure

---

### Issue: "CORS error" in browser console

**Symptoms:**
- Form submit button clicked
- Error in browser console: "CORS policy"
- No data submitted

**Solution:**
Form should use `Content-Type: text/plain` to avoid CORS preflight:

```javascript
// In soi-site/js/form.js
fetch(SCRIPT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
  },
  body: JSON.stringify(data)
})
```

---

### Issue: Duplicate email warning not working

**Symptoms:**
- Can submit same email multiple times
- No warning message

**Solution:**
Clear localStorage and test again:

```javascript
// In browser console (F12):
localStorage.removeItem('ra_soi_submissions')
```

Then submit test with same email twice.

---

## Burns Data Issues

### Issue: Burns data shows as scientific notation

**Symptoms:**
- Burns (RA) shows: `2.01520162017201E+35`
- Burns (Other) shows: `2.02220232024E+12`
- Impossible to read actual years

**Root Cause:**
Google Sheets treating comma-separated years as a number instead of text.

**Solution A: Format columns as Plain Text**

For each tab (Staging, Approved, Rejected, 2026):

1. Select column L (Burns RA)
2. Format → Number → **Plain text**
3. Select column N (Burns Other)
4. Format → Number → **Plain text**
5. Select column I (Phone Code)
6. Format → Number → **Plain text**

**Solution B: Run setup function**

```javascript
// In Apps Script:
setupAllTabs()  // Formats columns automatically
```

**Solution C: Fix existing corrupted data**

For rows already showing scientific notation:
1. Format columns as Plain Text first (Solution A)
2. Click on corrupted cell
3. Delete the value
4. Re-enter years manually: `2015, 2016, 2017`
5. Or mark as `[Data corrupted - please re-enter years]`

**Prevention:**
Always format Burns columns as Plain Text BEFORE submitting data.

---

### Issue: Burns count columns show 0 or blank

**Symptoms:**
- Burns (RA) has years: "2015, 2016, 2017"
- Burns (RA) Count is: 0 or blank

**Cause:**
Missing count columns or old script version

**Solution:**

1. Check columns exist:
   - Column M: Burns (RA) Count
   - Column O: Burns (Other) Count

2. If missing, run:
```javascript
setupAllTabs()  // Adds missing columns
```

3. For existing data, add formula in column M row 2:
```
=IF(ISBLANK(L2), 0, IF(L2="", 0, LEN(L2)-LEN(SUBSTITUTE(L2,",",""))+1))
```

4. Copy formula down to all rows
5. Repeat for column O (Burns Other Count)

---

### Issue: Burns data format inconsistent

**Symptoms:**
- Some rows: "2015,2016,2017" (no spaces)
- Some rows: "2015, 2016, 2017" (with spaces)

**Cause:**
Different form versions or manual entry

**Solution:**
Both formats work. The count formula handles both. No action needed unless you want consistency for visual purposes.

**To standardize:**
1. Select Burns columns
2. Find & Replace: `,` → `, ` (comma-space)
3. Find & Replace: `, ,` → `,` (fix double spaces)

---

## Google Sheets Issues

### Issue: Data appears in wrong columns

**Symptoms:**
- Email in Phone column
- Name in Email column
- All data shifted

**Cause:**
Column headers don't match CONFIG.HEADERS

**Solution:**

1. Check headers match exactly:
```javascript
// Run in Apps Script:
validateAllHeaders()
```

2. If mismatched, run:
```javascript
setupAllTabs()  // Resets all headers
```

3. Verify with test submission:
```javascript
testFormSubmission()
```

---

### Issue: Validation dropdowns not working

**Symptoms:**
- Status column: No dropdown
- Sex column: Can type anything
- Likelihood column: No options

**Cause:**
Data validation not set up

**Solution:**

```javascript
// Run in Apps Script:
setupDataValidation()
```

This adds dropdowns to:
- Status: Pending/Approved/Rejected
- Sex: Male/Female/Non-binary/Other
- First Burn?: Yes/No
- Likelihood: Hell yeah!/Probably/Keep me in the loop
- Steward Ticket?: Yes/No

---

### Issue: Conditional formatting (colors) not working

**Symptoms:**
- All rows same color
- No yellow/green/red backgrounds
- Status changes don't change color

**Cause:**
Conditional formatting rules not set up

**Solution:**

```javascript
// Run in Apps Script:
setupConditionalFormatting()
```

Expected colors in SOI_Staging:
- Pending = Yellow background
- Approved = Green background
- Rejected = Red background

---

## Auto-Move Problems

### Issue: Changing Status doesn't move row

**Symptoms:**
- Change Status to "Approved"
- Row stays in SOI_Staging
- Doesn't move to SOI_Approved

**Cause:**
onEdit trigger not working or missing

**Check:**
1. Apps Script → Triggers (clock icon)
2. Look for onEdit trigger
3. Check Executions log for errors

**Solution A: Check onEdit function exists**

FormHandler.gs should have:
```javascript
function onEdit(e) {
  // Auto-move logic
}
```

If missing, code was deleted. Restore from backup or repo.

**Solution B: Test manually**

1. Change Status to "Approved"
2. Check Executions log
3. Look for onEdit execution and any errors

**Solution C: Manual bulk move**

```javascript
// Run in Apps Script:
moveApprovedAndRejectedRows()
```

This moves all marked rows in one batch.

---

### Issue: Row moves but data is missing

**Symptoms:**
- Row moves to SOI_Approved
- Some columns are empty
- Data was in SOI_Staging

**Cause:**
Column count mismatch between tabs

**Solution:**

1. Check all tabs have 26 columns:
```javascript
validateAllHeaders()
```

2. If mismatched, run:
```javascript
setupAllTabs()
```

3. Manually copy missing data from SOI_Staging to correct location

---

## Google Contacts Sync Issues

### Issue: Contacts not syncing

**Symptoms:**
- Change Status to "Approved"
- Contact doesn't appear in Google Contacts
- "Synced to Contacts" column stays blank

**Check:**
1. Apps Script → Executions
2. Look for ContactsSync errors
3. Check API is enabled

**Solution A: Enable People API**

1. Apps Script → Services (+ icon)
2. Search: "People API"
3. Click Add

**Solution B: Check trigger exists**

1. Apps Script → Triggers
2. Should see onEdit trigger
3. If missing, run:
```javascript
setupAutomaticSync()
```

**Solution C: Test manually**

```javascript
// Run in Apps Script:
testContactSync()
```

Check execution log for specific error messages.

**Solution D: Check permissions**

First time running, you need to authorize:
1. Click "Review permissions"
2. Choose Google account
3. Click "Advanced" → "Go to [project]"
4. Click "Allow"

---

### Issue: Duplicate contacts created

**Symptoms:**
- Same person has 2+ contacts in Google Contacts
- All have "2026 Rubbers" label

**Cause:**
Email mismatch or sync ran multiple times

**Solution:**

1. Check if emails match exactly (including case)
2. Manually merge duplicates in Google Contacts:
   - Select duplicates → More → Merge
3. Clear sync status and re-sync:
```javascript
// In Apps Script:
clearSyncStatus()  // Clears "Synced to Contacts" column
syncApprovedToContacts()  // Re-syncs (skips existing by email)
```

---

### Issue: "2026 Rubbers" label not appearing

**Symptoms:**
- Contact exists in Google Contacts
- No "2026 Rubbers" label

**Cause:**
Label creation failed or permissions issue

**Solution:**

```javascript
// Check if label exists:
listContactGroups()

// If missing, re-run sync:
syncApprovedToContacts()
```

---

## Analytics Issues

### Issue: Weekly analytics email not received

**Symptoms:**
- It's Monday after 9 AM Pacific
- No email received
- Expected weekly report

**Check:**
1. Apps Script → Triggers
2. Look for weekly Monday trigger
3. Apps Script → Executions
4. Look for recent sendWeeklyAnalyticsReport executions

**Solution A: Check trigger exists**

```javascript
// Run in Apps Script:
setupWeeklyAnalytics()
```

**Solution B: Verify configuration**

In Config.gs:
```javascript
ANALYTICS_CONFIG: {
  propertyId: 'properties/518391310',  // Numbers only
  emailRecipient: 'your-email@example.com'  // Correct email?
}
```

**Solution C: Test manually**

```javascript
// Run in Apps Script:
testAnalyticsReportWithSampleData()
```

Check email (including spam folder).

---

### Issue: "Analytics Data API not enabled" error

**Cause:**
Google Analytics Data API not added to project

**Solution:**

1. Apps Script → Services (+ icon)
2. Search: "Google Analytics Data API"
3. Click Add
4. Test again

---

### Issue: "No data" in analytics report

**Symptoms:**
- Email received
- All numbers show 0
- "No data available"

**Causes:**
- Site has no traffic yet (wait 24-48 hours)
- Wrong Property ID
- Analytics not installed on site

**Solution A: Wait for data**

GA4 takes 24-48 hours to populate. Check:
1. https://analytics.google.com/
2. Reports → Realtime
3. Should show activity if people visited recently

**Solution B: Verify Property ID**

1. GA4 → Admin → Property Settings
2. Copy Property ID (just numbers: e.g., 518391310)
3. Update in Config.gs:
```javascript
propertyId: 'properties/518391310'  // Must include 'properties/' prefix
```

**Solution C: Check GA4 installed**

View page source of rubberarmstrong.com:
- Should see GA4 tag with your Measurement ID
- Or Cloudflare Web Analytics (different system)

---

## Deployment Issues

### Issue: Site not updating after push to GitHub

**Symptoms:**
- Git push successful
- 10+ minutes passed
- Site still shows old content

**Check:**
1. Cloudflare Dashboard → Pages
2. Select your project
3. View deployments
4. Look for recent deployment

**Solution A: Check deployment status**

If deployment failed:
1. Click on failed deployment
2. Read error message
3. Fix error in code
4. Push again

**Solution B: Manual redeploy**

1. Cloudflare Pages → Your project
2. Deployments tab
3. Click "Retry deployment"

**Solution C: Clear cache**

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private window
4. Check on different device/network

---

### Issue: Images not loading (404 errors)

**Symptoms:**
- Page loads but images broken
- Browser console shows 404 errors
- "Failed to load resource"

**Cause:**
Incorrect image paths after deployment

**Solution:**

Check image path format:
```html
<!-- CORRECT -->
<img src="images/logo.svg">
<img src="../shared/images/logo.svg">

<!-- WRONG -->
<img src="/images/logo.svg">  <!-- Absolute path -->
<img src="~/images/logo.svg"> <!-- Tilde not supported -->
```

Use relative paths. Cloudflare Pages serves from root directory specified in build settings.

---

### Issue: "This site can't be reached" error

**Symptoms:**
- DNS_PROBE_FINISHED_NXDOMAIN
- Site doesn't load at all
- Custom domain doesn't work

**Cause:**
DNS not configured or not propagated

**Solution:**

1. Check DNS propagation:
   - Visit https://dnschecker.org
   - Enter: rubberarmstrong.com
   - Should show CNAME to `.pages.dev`

2. If not propagated:
   - Wait up to 48 hours
   - Check Cloudflare DNS settings
   - Verify domain registrar settings

3. If still not working:
   - Use `.pages.dev` URL temporarily
   - Contact Cloudflare support

---

## Apps Script Errors

### Issue: "ReferenceError: CONFIG is not defined"

**Cause:**
Config.gs file missing or not saved

**Solution:**

1. Check Config.gs file exists
2. Click Save (💾 icon)
3. Refresh browser
4. Try again

---

### Issue: "Cannot read properties of undefined"

**Symptoms:**
- Error in execution log
- "Cannot read property 'xxx' of undefined"

**Cause:**
Trying to access data that doesn't exist

**Common causes:**
- Form sent incomplete data
- Expected array but got string
- Expected object but got null

**Solution:**

Add null checks:
```javascript
// BEFORE
const firstName = data.firstName;

// AFTER
const firstName = data.firstName || '';
const burnsCount = Array.isArray(data.burnsWithRA) ? data.burnsWithRA.length : 0;
```

---

### Issue: "Execution timeout" - script runs too long

**Symptoms:**
- Script stops after 6 minutes
- "Exceeded maximum execution time"

**Cause:**
Apps Script has 6-minute limit

**Solution:**

For large operations:
1. Break into smaller batches
2. Process 100 rows at a time
3. Use triggers to continue

For setup functions:
- Normal for large sheets
- Check if it completed anyway
- Re-run if necessary

---

### Issue: Permission denied errors

**Symptoms:**
- "You do not have permission to call..."
- Auth errors

**Solution:**

1. Re-authorize the script:
   - Run function again
   - Click "Review permissions"
   - Allow access

2. Check web app settings:
   - Execute as: **Me** (your account)
   - Who has access: **Anyone**

3. Check sheet permissions:
   - You must have edit access
   - Sheet not in read-only mode

---

## Still Having Issues?

### Check These Common Mistakes

- [ ] Column headers spelled exactly as in CONFIG.HEADERS
- [ ] Header row is row 1 (not moved or deleted)
- [ ] All tabs have same 26 columns
- [ ] Burns columns formatted as Plain Text
- [ ] Apps Script web app deployed and active
- [ ] Form config has correct web app URL
- [ ] APIs enabled (People, Analytics Data)
- [ ] Triggers exist (check Triggers panel)

### Get More Help

1. **Check execution logs:**
   - Apps Script → Executions (clock icon)
   - Look for specific error messages

2. **Read documentation:**
   - [GETTING_STARTED.md](GETTING_STARTED.md) - Basic workflow
   - [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup
   - [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md) - Technical reference

3. **Test systematically:**
   - Run test functions
   - Check one component at a time
   - Isolate the problem

4. **Check git history:**
   - When did it stop working?
   - What changed?
   - Can you revert?

---

**Most issues can be solved by:**
1. Running `setupAllTabs()`
2. Redeploying web app
3. Formatting Burns columns as Plain Text
4. Checking execution logs for specific errors

Good luck! 🎪🔥

