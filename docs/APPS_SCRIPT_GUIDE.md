# Apps Script Guide - Rubber Armstrong SOI System

Complete reference for the Google Apps Script backend that powers the Statement of Intent form submissions.

**Last Updated:** January 2026  
**Script Version:** 2.0 (Consolidated, Header-Based)

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Configuration](#configuration)
4. [Key Functions](#key-functions)
5. [Column Mapping System](#column-mapping-system)
6. [Data Flow](#data-flow)
7. [Adding/Changing Columns](#addingchanging-columns)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Migration from Old System](#migration-from-old-system)

---

## Overview

The SOI system uses Google Apps Script as a free backend to:
- Receive form submissions via HTTP POST
- Write data to Google Sheets
- Validate and format data
- Auto-move rows based on status changes
- Sync to Google Contacts (optional)
- Send weekly analytics reports (optional)

### Components

1. **Web App Endpoint** - Receives POST requests from the form
2. **Google Sheets** - 4-tab database (Staging, Approved, Rejected, Archive)
3. **Triggers** - Automatic actions (onEdit, timeBased)
4. **APIs** - People API (Contacts), Analytics Data API (optional)

---

## File Structure

### Consolidated System (Recommended)

Located in `scripts/apps-script-consolidated/`:

```
appsscript.json       - Dependencies and permissions
Config.gs             - Single source of truth for all settings
FormHandler.gs        - Form submission handler and setup functions
ContactsSync.gs       - Google Contacts integration (optional)
Analytics.gs          - Weekly analytics reporting (optional)
```

### Key Improvements Over Legacy

✅ **Single configuration** - All settings in Config.gs  
✅ **Header-based column mapping** - No hardcoded positions  
✅ **Accurate column count** - 26 columns everywhere  
✅ **No duplication** - DRY principle  
✅ **Future-proof** - Easy to add/reorder columns

---

## Configuration

### Config.gs Structure

```javascript
const CONFIG = {
  // Sheet names
  SHEETS: {
    STAGING: 'SOI_Staging',
    APPROVED: 'SOI_Approved',
    REJECTED: 'SOI_Rejected',
    ARCHIVE: 'SOI_2026'
  },
  
  // Column headers (26 columns)
  HEADERS: [
    'Timestamp', 'First', 'Last', 'Sex', 'Birth Year',
    'Country (Birth)', 'Country (Res)', 'Email', 'Phone Code', 'Phone',
    'Ref. Campmate', 'Burns (RA)', 'Burns (RA) Count',
    'Burns (Other)', 'Burns (Other) Count', 'First Burn?',
    'Likelihood', 'Steward Ticket?', 'What Offer', 'Notes',
    'Status', 'Reviewed By', 'Reviewed At', 'Internal Notes',
    'Form', 'Synced to Contacts'
  ],
  
  // Dropdown options
  VALIDATION: {
    SEX: ['Male', 'Female', 'Non-binary', 'Other'],
    FIRST_BURN: ['Yes', 'No'],
    LIKELIHOOD: ['Hell yeah!', 'Probably', 'Keep me in the loop'],
    STEWARD_TICKET: ['Yes', 'No'],
    STATUS: ['Pending', 'Approved', 'Rejected']
  },
  
  // Color scheme
  COLORS: {
    HEADER: '#f3f3f3',
    PENDING: '#fff3cd',
    APPROVED: '#d4edda',
    REJECTED: '#f8d7da'
  }
};

const ANALYTICS_CONFIG = {
  propertyId: 'properties/518391310',
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  schedule: {
    dayOfWeek: ScriptApp.WeekDay.MONDAY,
    hour: 9,
    timezone: 'America/Los_Angeles'
  }
};
```

### Helper Functions

```javascript
// Get column index by header name
function getColumnIndex(headerName) {
  return CONFIG.HEADERS.indexOf(headerName) + 1;
}

// Get column letter by header name
function getColumnLetter(headerName) {
  const index = getColumnIndex(headerName);
  return String.fromCharCode(64 + index);
}

// Get headers from a sheet
function getSheetHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}
```

---

## Key Functions

### Setup Functions (Run Once)

| Function | Purpose | When to Run |
|----------|---------|-------------|
| `setupAllTabs()` | Creates/updates all sheet tabs with correct headers and formatting | First time, or after column changes |
| `setupDataValidation()` | Adds dropdown validations to all tabs | After setupAllTabs |
| `setupConditionalFormatting()` | Adds color coding to SOI_Staging | After setupDataValidation |
| `runCompleteSetup()` | Runs all 3 setup functions in order | First time setup |

### Form Handler Functions

| Function | Purpose | When Called |
|----------|---------|-------------|
| `doGet(e)` | Handles GET requests (returns info message) | When someone visits web app URL |
| `doPost(e)` | Processes form submissions | When form submits data |

### Auto-Move Functions

| Function | Purpose | When Called |
|----------|---------|-------------|
| `onEdit(e)` | Automatic trigger on any cell edit | Every time sheet is edited |
| `moveRowToSheet()` | Moves row between tabs based on status | Called by onEdit |

### Test Functions

| Function | Purpose | Use Case |
|----------|---------|----------|
| `testFormSubmission()` | Submits sample data | Test form → sheet flow |
| `validateAllHeaders()` | Checks all tabs have correct headers | Troubleshooting |

### Optional Features

**Google Contacts Sync:**
- `setupContactsSync()` - Initial setup
- `setupAutomaticSync()` - Enable auto-sync trigger
- `syncApprovedToContacts()` - Manual bulk sync
- `testContactSync()` - Test with one contact

**Weekly Analytics:**
- `setupWeeklyAnalytics()` - Create weekly trigger
- `sendWeeklyAnalyticsReport()` - Generate and email report
- `testAnalyticsReportWithSampleData()` - Test email with fake data

---

## Column Mapping System

### Header-Based Mapping (New System)

Instead of hardcoded positions, the system reads the actual header row:

```javascript
// Get headers from sheet
const headers = getSheetHeaders(sheet);

// Map form data to column names
const columnData = {
  'Timestamp': new Date(),
  'First': data.firstName,
  'Last': data.lastName,
  'Sex': data.sex,
  // ... etc
};

// Build row based on actual header order
const row = headers.map(header => columnData[header] || '');
```

### Benefits

✅ **Reorder columns freely** - System adapts automatically  
✅ **Add columns easily** - Just update CONFIG.HEADERS  
✅ **Self-documenting** - Uses column names, not numbers  
✅ **No off-by-one errors** - Dynamic lookup

### Complete Column Reference

| # | Column Header | Form Field | Type | Notes |
|---|--------------|------------|------|-------|
| 1 | Timestamp | Auto-generated | DateTime | Form submission time |
| 2 | First | `firstName` | Text | Auto-capitalized |
| 3 | Last | `lastName` | Text | Auto-capitalized |
| 4 | Sex | `sex` | Dropdown | Male/Female/Non-binary/Other |
| 5 | Birth Year | `birthYear` | Number | 1940-2010 range |
| 6 | Country (Birth) | `countryOfBirth` | Text | Full country name |
| 7 | Country (Res) | `countryOfResidence` | Text | Full country name |
| 8 | Email | `email` | Email | Lowercase |
| 9 | Phone Code | `phoneCountryCode` | Text | e.g., "+1" |
| 10 | Phone | `phoneNumber` | Text | Without leading zeros |
| 11 | Ref. Campmate | `referringCampmate` | Text | Required |
| 12 | Burns (RA) | `burnsWithRA` | Text | "2014, 2015, 2016" |
| 13 | Burns (RA) Count | Auto-calculated | Number | 3 |
| 14 | Burns (Other) | `burnsWithoutRA` | Text | "2022, 2023" |
| 15 | Burns (Other) Count | Auto-calculated | Number | 2 |
| 16 | First Burn? | `firstBurn` | Dropdown | Yes/No |
| 17 | Likelihood | `likelihoodOfAttending` | Dropdown | Hell yeah!/Probably/Keep me in the loop |
| 18 | Steward Ticket? | `stewardTicketInterest` | Dropdown | Yes/No |
| 19 | What Offer | `whatYouOffer` | Long Text | Required |
| 20 | Notes | `notes` | Long Text | Optional |
| 21 | Status | Auto-set | Dropdown | Pending/Approved/Rejected |
| 22 | Reviewed By | Manual | Text | Empty on submission |
| 23 | Reviewed At | Manual | DateTime | Empty on submission |
| 24 | Internal Notes | Manual | Long Text | Empty on submission |
| 25 | Form | `formName` | Text | "Statement of Intent 2026" |
| 26 | Synced to Contacts | Auto-updated | Text | Yes/blank |

### Burns Data Handling

**Form sends:**
```javascript
{
  burnsWithRA: ['2014', '2015', '2016'],
  burnsWithoutRA: ['2022', '2023']
}
```

**Script processes:**
```javascript
// Join array to comma-separated string
const burnsWithRA = Array.isArray(data.burnsWithRA) 
  ? data.burnsWithRA.join(', ')  // "2014, 2015, 2016"
  : (data.burnsWithRA || '');

// Calculate count
const burnsWithRACount = Array.isArray(data.burnsWithRA) 
  ? data.burnsWithRA.length      // 3
  : 0;
```

**Stored in sheet:**
- Burns (RA): `2014, 2015, 2016` (text format)
- Burns (RA) Count: `3` (number)

**Important:** Burns columns MUST be formatted as Plain Text in Google Sheets to prevent scientific notation.

---

## Data Flow

### Form Submission Flow

```
1. User fills form → soi.rubberarmstrong.com
2. Form validates data client-side
3. Form POSTs to Apps Script web app
4. doPost(e) receives request
5. Parse JSON data
6. Map to column headers
7. Build row array
8. Append to SOI_Staging sheet
9. Return success/error response
```

### Auto-Move Flow

```
1. Admin changes Status in SOI_Staging
2. onEdit(e) trigger fires
3. Check if Status column was edited
4. Get new status value
5. If "Approved": Move to SOI_Approved
6. If "Rejected": Move to SOI_Rejected
7. Delete original row from SOI_Staging
8. Update "Synced to Contacts" if applicable
```

### Contacts Sync Flow (Optional)

```
1. Row moves to SOI_Approved
2. onEdit trigger or manual function
3. Check "Synced to Contacts" column
4. If already synced: Skip
5. Search for existing contact by email
6. If exists: Add "2026 Rubbers" label only
7. If new: Create full contact with data
8. Mark "Synced to Contacts" = "Yes"
```

---

## Adding/Changing Columns

### To Add a New Column

**1. Update Config.gs**
```javascript
HEADERS: [
  // ... existing headers ...
  'New Column Name'
]
```

**2. Update FormHandler.gs → doPost()**
```javascript
const columnData = {
  // ... existing mappings ...
  'New Column Name': data.newFieldName || ''
};
```

**3. Update Form (if needed)**
- Add new field to `soi-site/index.html`
- Update `soi-site/js/form.js` to collect data

**4. Re-run Setup**
```javascript
setupAllTabs()  // Updates all sheets with new column
```

### To Reorder Columns

**Option A: In Config (Recommended)**
1. Reorder headers in `CONFIG.HEADERS`
2. Run `setupAllTabs()`
3. All sheets updated automatically

**Option B: Manually in Sheet**
1. Select column → Cut
2. Insert cut cells at new position
3. System adapts automatically (header-based)

**Note:** Don't change header names without updating Config.gs

---

## Deployment

### Initial Deployment

**1. Create Apps Script Project**
- In Google Sheet: Extensions → Apps Script
- Delete default `Code.gs`

**2. Add Files**
- Create: `Config.gs`, `FormHandler.gs`
- Optional: `ContactsSync.gs`, `Analytics.gs`
- Replace `appsscript.json`

**3. Configure**
- Update `CONFIG` in Config.gs
- Update `ANALYTICS_CONFIG` if using analytics

**4. Enable APIs**
- Services → Add People API (for Contacts)
- Services → Add Google Analytics Data API (for Analytics)

**5. Run Setup**
```javascript
runCompleteSetup()  // Or run each function individually
```

**6. Deploy Web App**
- Deploy → New deployment
- Type: Web app
- Execute as: Me
- Who has access: Anyone
- Copy web app URL

**7. Update Form Config**
```javascript
// In soi-site/js/config.js
const SCRIPT_URL = 'YOUR_WEB_APP_URL';
```

### Updating Existing Deployment

**To update code:**
1. Edit files in Apps Script
2. Save all changes
3. Deploy → Manage deployments
4. Click pencil icon → New version
5. Deploy

**URL stays the same** - no need to update form config

---

## Testing

### Test Form Handler

```javascript
function testFormSubmission() {
  // Simulates form submission with sample data
  // Check SOI_Staging tab for new row
  // Verify all fields populated correctly
}
```

**Expected result:**
- New row in SOI_Staging
- All 26 columns filled
- Burns data: "2014, 2015, 2016" (not scientific notation)
- Burns counts: 3, 2
- Phone code: "+1" (not 1)
- Status: "Pending"

### Test Auto-Move

1. Find test row in SOI_Staging
2. Change Status to "Approved"
3. Row should move to SOI_Approved immediately
4. Original row deleted from SOI_Staging

### Test Contacts Sync (if enabled)

```javascript
function testContactSync() {
  // Tests sync with first approved contact
  // Check Google Contacts for new contact
  // Should have "2026 Rubbers" label
}
```

### Validation Check

```javascript
function validateAllHeaders() {
  // Checks all tabs have correct 26 columns
  // Logs any mismatches
}
```

---

## Migration from Old System

### Why Migrate?

**Old system problems:**
- Column count mismatch (23 vs 24 vs 26)
- Hardcoded positions break when reordering
- Duplicate configurations get out of sync
- Burns data shows as scientific notation
- Missing columns (Burns Count, Synced to Contacts)

**New system benefits:**
- Single source of truth (Config.gs)
- Header-based (reorder/add columns freely)
- Accurate (26 columns everywhere)
- No scientific notation (proper formatting)
- Well-organized (related functions grouped)

### Migration Steps

**1. Backup Current System**
- Export Google Sheet as Excel
- Download Apps Script project
- Note current web app URL

**2. Install New Code**
- Delete old `.gs` files
- Copy new files from `scripts/apps-script-consolidated/`
- Update `appsscript.json`

**3. Configure**
- Update `CONFIG` with your sheet names
- Update `ANALYTICS_CONFIG` if using

**4. Run Setup**
```javascript
setupAllTabs()              // Updates headers
setupDataValidation()       // Adds dropdowns
setupConditionalFormatting() // Adds colors
```

**5. Test**
```javascript
testFormSubmission()  // Verify data flows correctly
validateAllHeaders()  // Check all tabs match
```

**6. Redeploy**
- Deploy → New deployment
- Update form config with new URL (or reuse old URL)

**7. Verify**
- Submit test form
- Check data lands correctly
- Test auto-move
- Test contacts sync if enabled

---

## Troubleshooting

### Common Issues

**"Column not found" error**
- Run `validateAllHeaders()` to check
- Run `setupAllTabs()` to fix
- Check for extra spaces in header names

**Burns data shows scientific notation**
- Format columns as Plain Text (see SETUP_GUIDE.md)
- Run `setupAllTabs()` which formats automatically
- Delete old test data and submit fresh

**Auto-move not working**
- Verify FormHandler.gs has `onEdit()` function
- Check Executions log for errors
- Test manually by changing Status

**Form submissions not appearing**
- Check Executions log (clock icon)
- Verify sheet tab names match CONFIG.SHEETS
- Test with `testFormSubmission()`
- Check web app deployment is active

**For more troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

---

## Best Practices

### Code Organization
- Keep all configuration in Config.gs
- Use helper functions for repeated logic
- Add comments for complex sections
- Test after every change

### Sheet Management
- Never rename header columns without updating Config
- Don't move header row from row 1
- Keep backups before major changes
- Test changes with sample data first

### Deployment
- Always test locally before deploying
- Use version descriptions that are meaningful
- Keep old deployment as backup initially
- Monitor Executions log after deployment

### Security
- Only share sheet with necessary people
- Keep web app URL private
- Review execution logs regularly
- Use "Execute as: Me" for web app

---

## Additional Resources

- **Setup Instructions:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Daily Usage:** See [GETTING_STARTED.md](GETTING_STARTED.md)
- **Common Problems:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Content Guidelines:** See [content-manifesto-reference.md](content-manifesto-reference.md)

---

**Script Status:** Production Ready ✅  
**Last Verified:** January 5, 2026  
**Next Review:** Start of 2027 season

