# Apps Script Structure Diagram

## 🏗️ System Architecture

### Current System (Legacy)

```
┌─────────────────────────────────────────────────────────────┐
│                    Google Apps Script                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  appsscript.json                                             │
│  ├─ People API (v1)                                          │
│  └─ Analytics Data API (v1beta)                              │
│                                                               │
│  SetupCode.gs (23 columns ⚠️)                                │
│  ├─ setupAllTabs()                                           │
│  ├─ setupDataValidation()                                    │
│  ├─ setupConditionalFormatting()                             │
│  ├─ doPost() - Form handler                                  │
│  └─ Hardcoded column positions [1], [2], [3]...             │
│                                                               │
│  GoogleSyncContacts.gs (24 columns ⚠️)                       │
│  ├─ CONFIG.COLUMNS (different from SetupCode!)              │
│  ├─ syncContactToGoogle()                                    │
│  ├─ onStatusChange() trigger                                 │
│  └─ Hardcoded: FIRST_NAME: 2, LAST_NAME: 3...               │
│                                                               │
│  testLabel.gs                                                │
│  └─ Separate test functions                                  │
│                                                               │
│  FixBurnDisplay.gs                                           │
│  └─ One-time fix for scientific notation                     │
│                                                               │
│  GoogleAnalytics.gs                                          │
│  ├─ CONFIG (conflicts with GoogleSyncContacts! ⚠️)          │
│  └─ sendWeeklyAnalyticsReport()                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    [Problems]          [Problems]          [Problems]
 Column mismatch    Hardcoded positions   Naming conflicts
```

---

### New System (Consolidated)

```
┌─────────────────────────────────────────────────────────────┐
│                    Google Apps Script                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  appsscript.json                                             │
│  ├─ People API (v1)                                          │
│  └─ Analytics Data API (v1beta)                              │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Config.gs - SINGLE SOURCE OF TRUTH ✅                 │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ CONFIG                                                 │  │
│  │ ├─ SHEETS: { STAGING, APPROVED, REJECTED, ARCHIVE }  │  │
│  │ ├─ HEADERS: [26 columns] ✅                          │  │
│  │ ├─ VALIDATION: { SEX, LIKELIHOOD, STATUS, etc. }     │  │
│  │ ├─ CONTACTS: { LABEL: '2026 Rubbers' }               │  │
│  │ └─ COLORS: { PENDING, APPROVED, REJECTED }           │  │
│  │                                                        │  │
│  │ ANALYTICS_CONFIG (no conflicts ✅)                    │  │
│  │ ├─ propertyId: 'properties/518391310'                │  │
│  │ ├─ emailRecipient: 'rubberarmstrongcamp@gmail.com'   │  │
│  │ └─ schedule: { MONDAY, 9 AM, LA time }               │  │
│  │                                                        │  │
│  │ Helper Functions                                       │  │
│  │ ├─ getColumnIndex(headerName) → number               │  │
│  │ ├─ getColumnLetter(headerName) → 'A', 'B', etc.     │  │
│  │ ├─ getSheetHeaders(sheet) → [headers]                │  │
│  │ └─ validateHeaders(sheet) → {valid, missing, extra}  │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│                   (All scripts use this)                      │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ FormHandler.gs                                         │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Setup Functions                                        │  │
│  │ ├─ setupAllTabs() - Uses CONFIG.HEADERS              │  │
│  │ ├─ setupDataValidation() - Uses CONFIG.VALIDATION    │  │
│  │ ├─ setupConditionalFormatting() - Uses CONFIG.COLORS │  │
│  │ └─ runCompleteSetup() - Runs all 3                   │  │
│  │                                                        │  │
│  │ Form Submission (Header-Based ✅)                     │  │
│  │ ├─ doGet() - CORS handler                            │  │
│  │ ├─ doPost() - Form submission                         │  │
│  │ │   ├─ Gets headers from sheet                       │  │
│  │ │   ├─ Maps data to column names                     │  │
│  │ │   ├─ Processes burns: "2014, 2015, 2016" → count 3│  │
│  │ │   └─ Builds row based on header order              │  │
│  │ └─ testFormSubmission() - Test with sample data      │  │
│  │                                                        │  │
│  │ Utility Functions                                      │  │
│  │ └─ validateAllHeaders() - Check sheet structure      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ContactsSync.gs                                        │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Auto-Sync (Header-Based ✅)                           │  │
│  │ ├─ setupContactsSync() - Enable auto-sync            │  │
│  │ ├─ onStatusChange(e) - Trigger on Status→"Approved"  │  │
│  │ │   ├─ Gets headers dynamically                      │  │
│  │ │   ├─ Finds Status column by name                   │  │
│  │ │   └─ Syncs if Status = "Approved"                  │  │
│  │ └─ syncContactToGoogle(row, sheet, rowNum, headers)  │  │
│  │     ├─ Checks if contact exists by email             │  │
│  │     ├─ Existing: Add label only (no overwrite) ✅    │  │
│  │     └─ New: Create full contact + label              │  │
│  │                                                        │  │
│  │ Manual Sync                                            │  │
│  │ └─ syncAllApprovedContacts() - Bulk sync             │  │
│  │                                                        │  │
│  │ Helpers                                                │  │
│  │ ├─ buildContactNotes(row, headers)                   │  │
│  │ ├─ buildUserDefinedFields(row, headers)              │  │
│  │ └─ addToContactGroup(resourceName)                    │  │
│  │                                                        │  │
│  │ Test & Utility                                         │  │
│  │ ├─ testContactSync() - Test with one entry           │  │
│  │ ├─ clearSyncStatus() - Reset for re-sync             │  │
│  │ └─ listContactGroups() - Debug labels                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Analytics.gs                                           │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Setup                                                  │  │
│  │ └─ setupWeeklyAnalytics() - Create trigger           │  │
│  │                                                        │  │
│  │ Weekly Report (Uses ANALYTICS_CONFIG ✅)             │  │
│  │ ├─ sendWeeklyAnalyticsReport() - Main function       │  │
│  │ ├─ getAnalyticsData() - Fetch from GA4               │  │
│  │ ├─ parseAnalyticsResponse(response) - Parse data     │  │
│  │ ├─ formatEmailReport(data) - Format email            │  │
│  │ └─ sendEmail(body) - Send via MailApp                │  │
│  │                                                        │  │
│  │ Test Functions                                         │  │
│  │ ├─ testAnalyticsReport() - Test with real GA4 data   │  │
│  │ ├─ testAnalyticsReportWithSampleData() - Test email  │  │
│  │ └─ viewAnalyticsConfig() - Show current config       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    [Benefits]          [Benefits]          [Benefits]
 Single config      Header-based         No conflicts
 26 columns ✅      Flexible ✅          Clean code ✅
```

---

## 📊 Data Flow Diagrams

### Form Submission Flow

```
┌──────────────┐
│  SOI Form    │
│ (soi-site)   │
└──────┬───────┘
       │ POST JSON
       │ {firstName, lastName, burnsWithRA: ['2014','2015','2016'], ...}
       ↓
┌──────────────────────────────────────────────────────────┐
│ FormHandler.gs → doPost(e)                               │
├──────────────────────────────────────────────────────────┤
│ 1. Parse JSON data                                       │
│ 2. Get headers from sheet: getSheetHeaders(sheet)       │
│ 3. Process burns:                                        │
│    - Array → "2014, 2015, 2016" (comma-separated text)  │
│    - Count → 3 (number)                                  │
│ 4. Map data to column names:                            │
│    columnData = {                                        │
│      'First': data.firstName,                           │
│      'Burns (RA)': "2014, 2015, 2016",                  │
│      'Burns (RA) Count': 3,                             │
│      ...                                                 │
│    }                                                     │
│ 5. Build row: headers.map(h => columnData[h] || '')     │
│ 6. Append to SOI_Staging sheet                          │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────┐
│ Google Sheet │
│ SOI_Staging  │
│ [New row]    │
└──────────────┘
```

### Contact Sync Flow

```
┌──────────────┐
│ Google Sheet │
│ SOI_Staging  │
└──────┬───────┘
       │ User changes Status to "Approved"
       ↓
┌──────────────────────────────────────────────────────────┐
│ ContactsSync.gs → onStatusChange(e)                      │
├──────────────────────────────────────────────────────────┤
│ 1. Check if Status column was edited                    │
│ 2. Check if new value = "Approved"                      │
│ 3. Get headers: getSheetHeaders(sheet)                  │
│ 4. Find Status column: headers.indexOf('Status')        │
│ 5. Get row data                                          │
│ 6. Check if already synced                              │
│ 7. Call syncContactToGoogle(row, sheet, rowNum, headers)│
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│ syncContactToGoogle()                                    │
├──────────────────────────────────────────────────────────┤
│ 1. Extract data using header indices:                   │
│    firstNameIndex = headers.indexOf('First')            │
│    firstName = row[firstNameIndex]                      │
│ 2. Search for existing contact by email                 │
│ 3. IF EXISTS:                                            │
│    - Add "2026 Rubbers" label only                      │
│    - Mark as synced                                      │
│    - Exit (no data overwrite ✅)                        │
│ 4. IF NEW:                                               │
│    - Build contact data                                  │
│    - Create contact                                      │
│    - Add to "2026 Rubbers" label                        │
│    - Mark as synced                                      │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────┐
│    Google    │
│   Contacts   │
│ [New/Updated]│
└──────────────┘
```

### Analytics Report Flow

```
┌──────────────┐
│   Trigger    │
│ Monday 9 AM  │
└──────┬───────┘
       │ Weekly
       ↓
┌──────────────────────────────────────────────────────────┐
│ Analytics.gs → sendWeeklyAnalyticsReport()               │
├──────────────────────────────────────────────────────────┤
│ 1. Call getAnalyticsData()                              │
│    ├─ Build request (7daysAgo → yesterday)              │
│    ├─ Call GA4 API: AnalyticsData.Properties.runReport()│
│    └─ Parse response                                     │
│ 2. Call formatEmailReport(data)                         │
│    ├─ Format summary (users, sessions, pageviews)       │
│    └─ Format country breakdown                          │
│ 3. Call sendEmail(body)                                 │
│    └─ MailApp.sendEmail()                               │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────┐
│    Email     │
│ rubberarmstr │
│ ongcamp@     │
│ gmail.com    │
└──────────────┘
```

---

## 🔄 Configuration Inheritance

```
┌─────────────────────────────────────────────────────────┐
│                      Config.gs                          │
│                 SINGLE SOURCE OF TRUTH                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  CONFIG                                                 │
│  ├─ SHEETS                                              │
│  ├─ HEADERS [26 columns]                               │
│  ├─ VALIDATION                                          │
│  ├─ CONTACTS                                            │
│  └─ COLORS                                              │
│                                                          │
│  ANALYTICS_CONFIG                                       │
│  ├─ propertyId                                          │
│  ├─ emailRecipient                                      │
│  └─ schedule                                            │
│                                                          │
│  Helper Functions                                        │
│  ├─ getColumnIndex()                                    │
│  ├─ getColumnLetter()                                   │
│  ├─ getSheetHeaders()                                   │
│  └─ validateHeaders()                                   │
│                                                          │
└────────────┬────────────────┬────────────────┬──────────┘
             │                │                │
             ↓                ↓                ↓
    ┌────────────────┐ ┌─────────────┐ ┌──────────────┐
    │ FormHandler.gs │ │ContactsSync │ │Analytics.gs  │
    ├────────────────┤ ├─────────────┤ ├──────────────┤
    │ Uses:          │ │ Uses:       │ │ Uses:        │
    │ • CONFIG       │ │ • CONFIG    │ │ • ANALYTICS_ │
    │ • getColumn    │ │ • getSheet  │ │   CONFIG     │
    │   Index()      │ │   Headers() │ │              │
    │ • getColumn    │ │ • getColumn │ │              │
    │   Letter()     │ │   Index()   │ │              │
    │ • getSheet     │ │             │ │              │
    │   Headers()    │ │             │ │              │
    │ • validate     │ │             │ │              │
    │   Headers()    │ │             │ │              │
    └────────────────┘ └─────────────┘ └──────────────┘
```

---

## 📋 Column Structure (26 Columns)

```
┌────┬──────────────────┬──────────┬─────────────────────────┐
│ #  │ Column Name      │ Type     │ Notes                   │
├────┼──────────────────┼──────────┼─────────────────────────┤
│ 1  │ Timestamp        │ DateTime │ Auto-generated          │
│ 2  │ First            │ Text     │ Required                │
│ 3  │ Last             │ Text     │ Required                │
│ 4  │ Sex              │ Dropdown │ Male/Female/Non-binary  │
│ 5  │ Birth Year       │ Number   │ Required                │
│ 6  │ Country (Birth)  │ Text     │ Required                │
│ 7  │ Country (Res)    │ Text     │ Required                │
│ 8  │ Email            │ Email    │ Required                │
│ 9  │ Phone Code       │ Text     │ e.g., "+1"              │
│ 10 │ Phone            │ Text     │ Required                │
│ 11 │ Ref. Campmate    │ Text     │ Required                │
│ 12 │ Burns (RA)       │ TEXT ⭐  │ "2014, 2015, 2016"      │
│ 13 │ Burns (RA) Count │ Number   │ Auto: 3                 │
│ 14 │ Burns (Other)    │ TEXT ⭐  │ "2022, 2023"            │
│ 15 │ Burns (Other)    │ Number   │ Auto: 2                 │
│    │ Count            │          │                         │
│ 16 │ First Burn?      │ Dropdown │ Yes/No                  │
│ 17 │ Likelihood       │ Dropdown │ Hell yeah!/Probably/... │
│ 18 │ Steward Ticket?  │ Dropdown │ Yes/No                  │
│ 19 │ What Offer       │ Text     │ Required                │
│ 20 │ Notes            │ Text     │ Optional                │
│ 21 │ Status           │ Dropdown │ Pending/Approved/...    │
│ 22 │ Reviewed By      │ Text     │ Manual                  │
│ 23 │ Reviewed At      │ DateTime │ Manual                  │
│ 24 │ Internal Notes   │ Text     │ Manual                  │
│ 25 │ Form             │ Text     │ "Statement of Intent.." │
│ 26 │ Synced to        │ Text     │ Auto: "Yes" or blank    │
│    │ Contacts         │          │                         │
└────┴──────────────────┴──────────┴─────────────────────────┘

⭐ Columns 12 & 14 MUST be formatted as TEXT (@STRING@)
   to prevent scientific notation
```

---

## 🔀 Comparison: Old vs New

### Column Lookup

**Old (Hardcoded):**
```javascript
const firstName = row[1];  // ⚠️ Breaks if columns reorder
const lastName = row[2];
const email = row[7];
```

**New (Header-Based):**
```javascript
const headers = getSheetHeaders(sheet);
const firstName = row[headers.indexOf('First')];  // ✅ Flexible
const lastName = row[headers.indexOf('Last')];
const email = row[headers.indexOf('Email')];
```

### Configuration

**Old (Multiple Sources):**
```javascript
// SetupCode.gs
const headers = ['Timestamp', 'First', ...];  // 23 columns

// GoogleSyncContacts.gs
const CONFIG = {
  COLUMNS: { FIRST_NAME: 2, ... }  // Different!
};

// GoogleAnalytics.gs
const CONFIG = { ... };  // Conflicts!
```

**New (Single Source):**
```javascript
// Config.gs
const CONFIG = {
  HEADERS: ['Timestamp', 'First', ...],  // 26 columns
  // ... all settings here
};

const ANALYTICS_CONFIG = { ... };  // No conflicts

// All other files use these
```

---

**Last Updated**: January 2026  
**Version**: 2.0 (Consolidated)  
**Related Docs**: `APPS_SCRIPT_REBUILD_GUIDE.md`, `APPS_SCRIPT_COMPARISON.md`

