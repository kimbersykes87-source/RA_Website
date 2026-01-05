# Apps Script Rebuild Guide

## 📋 Overview

This guide walks you through rebuilding your Google Apps Script project with the new consolidated structure.

### What's New

✅ **Single configuration file** - All settings in one place  
✅ **Header-based column mapping** - No more hardcoded positions  
✅ **Better organization** - 4 focused files instead of 6  
✅ **Easier maintenance** - Change column names in one place  
✅ **Future-proof** - Easy to add new features

---

## 🗂️ New File Structure

### Before (6 files)
```
appsscript.json
SetupCode.gs          (23 columns, hardcoded positions)
GoogleSyncContacts.gs (24 columns, hardcoded positions, separate CONFIG)
testLabel.gs          (separate test file)
FixBurnDisplay.gs     (one-time fix, should be removed)
GoogleAnalytics.gs    (ANALYTICS_CONFIG to avoid conflicts)
```

### After (5 files)
```
appsscript.json       (unchanged - dependencies)
Config.gs             (unified configuration, 26 columns)
FormHandler.gs        (setup + form submission)
ContactsSync.gs       (Google Contacts integration)
Analytics.gs          (weekly analytics reporting)
```

---

## 🔧 Key Improvements

### 1. Unified Configuration (`Config.gs`)

**Before:**
- `SetupCode.gs` had hardcoded column positions
- `GoogleSyncContacts.gs` had its own `CONFIG` with different column numbers
- Column count mismatch (23 vs 24 vs 26)

**After:**
- Single `CONFIG` object with all settings
- Helper functions: `getColumnIndex()`, `getColumnLetter()`, `getSheetHeaders()`
- All scripts reference the same configuration

### 2. Header-Based Column Mapping

**Before:**
```javascript
const firstName = row[1];  // Hardcoded position
const lastName = row[2];   // Breaks if columns reorder
```

**After:**
```javascript
const headers = getSheetHeaders(sheet);
const firstNameIndex = headers.indexOf('First');
const firstName = row[firstNameIndex];  // Dynamic lookup
```

### 3. Correct Column Count

**Old scripts said 23 columns, but you actually have 26:**

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
12. **Burns (RA)** ← Text format, comma-separated years
13. **Burns (RA) Count** ← Auto-calculated
14. **Burns (Other)** ← Text format, comma-separated years
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
26. **Synced to Contacts** ← Added for Google Contacts sync

---

## 🚀 Migration Steps

### Step 1: Backup Everything

1. **Export your current spreadsheet**
   - File → Download → Microsoft Excel (.xlsx)
   - Save to a safe location

2. **Save your current Apps Script code**
   - In Apps Script editor: File → Download project
   - Or copy/paste each file to local text files

3. **Note your deployment URL**
   - Deploy → Manage deployments
   - Copy the Web App URL (you'll need this for the form)

### Step 2: Create New Apps Script Project

**Option A: Fresh Start (Recommended)**

1. Open your Google Sheet
2. Extensions → Apps Script
3. Delete all existing `.gs` files
4. Create new files in this order:
   - `Config.gs`
   - `FormHandler.gs`
   - `ContactsSync.gs`
   - `Analytics.gs`
5. Copy the contents from `scripts/apps-script-consolidated/` folder
6. Update `appsscript.json` (replace entire contents)

**Option B: Update Existing Project**

1. Open your Apps Script project
2. Rename existing files (add `.old` suffix)
3. Create new files with new contents
4. Test thoroughly
5. Delete `.old` files once confirmed working

### Step 3: Configure Settings

1. **Open `Config.gs`**

2. **Verify sheet names match yours:**
   ```javascript
   SHEETS: {
     STAGING: 'SOI_Staging',      // ← Check these match
     APPROVED: 'SOI_Approved',
     REJECTED: 'SOI_Rejected',
     ARCHIVE: 'SOI_2026'
   }
   ```

3. **Verify column headers match exactly:**
   ```javascript
   HEADERS: [
     'Timestamp',
     'First',
     'Last',
     // ... all 26 columns
   ]
   ```

4. **Update analytics settings (if different):**
   ```javascript
   ANALYTICS_CONFIG: {
     propertyId: 'properties/518391310',  // ← Your GA4 property
     emailRecipient: 'rubberarmstrongcamp@gmail.com'
   }
   ```

### Step 4: Run Setup Functions

Run these functions in order (from Apps Script editor):

1. **`setupAllTabs()`**
   - Creates/updates all sheet tabs
   - Sets correct headers (26 columns)
   - Formats Burns columns as TEXT
   - **Check:** All 4 tabs have 26 columns with correct headers

2. **`setupDataValidation()`**
   - Adds dropdown validations
   - **Check:** Status, Sex, Likelihood, etc. have dropdowns

3. **`setupConditionalFormatting()`**
   - Adds color coding to SOI_Staging
   - **Check:** Rows change color based on Status

4. **`testFormSubmission()`**
   - Tests form submission with sample data
   - **Check:** New row appears in SOI_Staging with correct data

5. **`setupContactsSync()`**
   - Enables automatic sync on status change
   - **Check:** Trigger appears in Triggers panel

6. **`setupWeeklyAnalytics()`**
   - Enables weekly analytics emails
   - **Check:** Trigger appears in Triggers panel

### Step 5: Test Everything

#### Test Form Submission
1. Run `testFormSubmission()`
2. Check SOI_Staging for new row
3. Verify:
   - Burns (RA): "2014, 2015, 2016"
   - Burns (RA) Count: 3
   - Burns (Other): "2022, 2023"
   - Burns (Other) Count: 2

#### Test Google Contacts Sync
1. Create a test entry in SOI_Staging
2. Change Status to "Approved"
3. Check:
   - Contact appears in Google Contacts
   - Has "2026 Rubbers" label
   - "Synced to Contacts" column shows "Yes"

#### Test Analytics
1. Run `testAnalyticsReportWithSampleData()`
2. Check email for report
3. Verify format looks correct

### Step 6: Redeploy Web App

1. **Deploy → New deployment**
2. Type: Web app
3. Description: "Consolidated v2.0"
4. Execute as: Me
5. Who has access: Anyone
6. Click **Deploy**
7. **Copy the new Web App URL**

### Step 7: Update Form URL

1. Open `soi-site/js/form-handler.js`
2. Update the `SCRIPT_URL` constant:
   ```javascript
   const SCRIPT_URL = 'YOUR_NEW_WEB_APP_URL_HERE';
   ```
3. Test form submission from the live site

---

## 📊 Spreadsheet Structure

### Required Sheets

Your spreadsheet must have these 4 sheets:

1. **SOI_Staging** - New submissions land here
2. **SOI_Approved** - Move approved applicants here
3. **SOI_Rejected** - Move rejected applicants here
4. **SOI_2026** - Archive for 2026 season

### Column Layout (26 columns)

| # | Column Name | Type | Notes |
|---|-------------|------|-------|
| 1 | Timestamp | Date/Time | Auto-generated |
| 2 | First | Text | Required |
| 3 | Last | Text | Required |
| 4 | Sex | Dropdown | Male/Female/Non-binary/Other |
| 5 | Birth Year | Number | Required |
| 6 | Country (Birth) | Text | Required |
| 7 | Country (Res) | Text | Required |
| 8 | Email | Email | Required |
| 9 | Phone Code | Text | e.g., "+1" |
| 10 | Phone | Text | Required |
| 11 | Ref. Campmate | Text | Required |
| 12 | Burns (RA) | **Text** | "2014, 2015, 2016" |
| 13 | Burns (RA) Count | Number | Auto-calculated: 3 |
| 14 | Burns (Other) | **Text** | "2022, 2023" |
| 15 | Burns (Other) Count | Number | Auto-calculated: 2 |
| 16 | First Burn? | Dropdown | Yes/No |
| 17 | Likelihood | Dropdown | Hell yeah!/Probably/Keep me in the loop |
| 18 | Steward Ticket? | Dropdown | Yes/No |
| 19 | What Offer | Text | Required |
| 20 | Notes | Text | Optional |
| 21 | Status | Dropdown | Pending/Approved/Rejected |
| 22 | Reviewed By | Text | Manual |
| 23 | Reviewed At | Date/Time | Manual |
| 24 | Internal Notes | Text | Manual |
| 25 | Form | Text | "Statement of Intent 2026" |
| 26 | Synced to Contacts | Text | Auto: "Yes" or blank |

### Important: Burns Columns

**Columns 12 & 14 MUST be formatted as TEXT:**
- This prevents Google Sheets from converting "2014,2015,2016" to scientific notation
- The setup script does this automatically
- Format: `@STRING@`

---

## 🔍 Troubleshooting

### Problem: "Column not found" error

**Solution:**
1. Run `validateAllHeaders()` to check headers
2. Run `setupAllTabs()` to fix headers
3. Make sure no extra spaces in header names

### Problem: Burns data shows as scientific notation

**Solution:**
1. The new setup script formats Burns columns as TEXT automatically
2. For existing data, manually:
   - Select columns L & N (Burns RA & Other)
   - Format → Number → Plain text
   - Re-enter the data

### Problem: Form submissions go to wrong columns

**Solution:**
1. Check that sheet headers match `CONFIG.HEADERS` exactly
2. Run `validateAllHeaders()` to diagnose
3. Check execution log for errors

### Problem: Contacts not syncing

**Solution:**
1. Check that "Synced to Contacts" column exists (column 26)
2. Run `testContactSync()` to test with one entry
3. Check execution log for errors
4. Verify People API is enabled in Google Cloud Console

### Problem: Analytics report not sending

**Solution:**
1. Check `ANALYTICS_CONFIG.propertyId` is correct
2. Run `testAnalyticsReportWithSampleData()` to test email
3. Verify Analytics Data API is enabled
4. Check trigger is set up: `setupWeeklyAnalytics()`

---

## 📚 Available Functions

### Setup Functions (Run Once)

| Function | Purpose | When to Run |
|----------|---------|-------------|
| `setupAllTabs()` | Create/update all sheets | First, or after column changes |
| `setupDataValidation()` | Add dropdown validations | After setupAllTabs |
| `setupConditionalFormatting()` | Add color coding | After setupDataValidation |
| `runCompleteSetup()` | Run all 3 above | First time setup |
| `setupContactsSync()` | Enable auto-sync to Contacts | After setup complete |
| `setupWeeklyAnalytics()` | Enable weekly email reports | After setup complete |

### Test Functions

| Function | Purpose | What It Tests |
|----------|---------|---------------|
| `testFormSubmission()` | Test form handler | Form → Sheet data flow |
| `testContactSync()` | Test single contact sync | Sheet → Google Contacts |
| `testAnalyticsReport()` | Test with real GA4 data | GA4 API → Email |
| `testAnalyticsReportWithSampleData()` | Test with fake data | Email formatting |

### Utility Functions

| Function | Purpose | Use Case |
|----------|---------|----------|
| `validateAllHeaders()` | Check headers match config | Troubleshooting |
| `syncAllApprovedContacts()` | Manually sync all approved | Bulk sync |
| `clearSyncStatus()` | Clear "Synced to Contacts" | Re-sync all |
| `listContactGroups()` | List all contact labels | Debugging |
| `viewAnalyticsConfig()` | Show current config | Verify settings |

---

## 🎯 Key Differences from Old System

### Column Mapping

**Old:**
```javascript
const row = [
  new Date(),        // Column 1
  data.firstName,    // Column 2
  data.lastName,     // Column 3
  // ... hardcoded positions
];
```

**New:**
```javascript
const headers = getSheetHeaders(sheet);
const columnData = {
  'Timestamp': new Date(),
  'First': data.firstName,
  'Last': data.lastName
};
const row = headers.map(header => columnData[header] || '');
```

### Google Contacts Sync

**Old:**
```javascript
const firstName = row[CONFIG.COLUMNS.FIRST_NAME - 1];  // Hardcoded: column 2
```

**New:**
```javascript
const headers = getSheetHeaders(sheet);
const firstNameIndex = headers.indexOf('First');
const firstName = row[firstNameIndex];  // Dynamic lookup
```

### Configuration

**Old:**
- Multiple `CONFIG` objects in different files
- Column positions hardcoded
- Easy to get out of sync

**New:**
- Single `CONFIG` in `Config.gs`
- All scripts reference same config
- Helper functions for column lookup

---

## ✅ Post-Migration Checklist

- [ ] All 4 sheets have 26 columns
- [ ] Headers match `CONFIG.HEADERS` exactly
- [ ] Burns columns formatted as TEXT
- [ ] Data validation dropdowns work
- [ ] Conditional formatting shows colors
- [ ] Test form submission works
- [ ] Test contact sync works
- [ ] Test analytics report works
- [ ] Web app redeployed
- [ ] Form URL updated
- [ ] Live form submission tested
- [ ] Triggers set up (Contacts + Analytics)
- [ ] Old code backed up
- [ ] Old files deleted

---

## 🔮 Future Enhancements

With this new structure, it's easy to:

### Add New Columns

1. Add to `CONFIG.HEADERS` in `Config.gs`
2. Add to `columnData` mapping in `FormHandler.gs`
3. Run `setupAllTabs()`
4. Update form to collect new data

### Change Column Names

1. Update in `CONFIG.HEADERS` in `Config.gs`
2. Run `setupAllTabs()`
3. All scripts automatically adapt

### Add New Sheets

1. Add to `CONFIG.SHEETS` in `Config.gs`
2. Add to `getAllSheetNames()` if needed
3. Run `setupAllTabs()`

---

## 📞 Support

If you encounter issues:

1. **Check execution log**: View → Executions
2. **Run validation**: `validateAllHeaders()`
3. **Test individually**: Use test functions for each module
4. **Check triggers**: Edit → Current project's triggers

---

**Last Updated**: January 2026  
**Script Version**: 2.0 (Consolidated, Header-Based)  
**Files**: `scripts/apps-script-consolidated/`

