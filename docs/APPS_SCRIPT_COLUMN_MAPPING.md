# Apps Script Column Mapping - Header-Based System

## Overview

The SOI form handler now uses **column headers** instead of column positions to map form data to Google Sheets. This makes the system more robust and easier to maintain.

## How It Works

### Old System (Column Position)
```javascript
const row = [
  new Date(),           // Column 1
  data.firstName,       // Column 2
  data.lastName,        // Column 3
  // ... etc
];
```

**Problem**: If you add/remove/reorder columns, the script breaks.

### New System (Column Header)
```javascript
// Get headers from sheet
const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

// Map form data to column names
const columnData = {
  'Timestamp': new Date(),
  'First': data.firstName,
  'Last': data.lastName,
  // ... etc
};

// Build row based on actual header order
const row = headers.map(header => columnData[header] || '');
```

**Benefit**: Columns can be reordered without breaking the script.

## Column Mapping Reference

### Complete Column List (26 columns)

| Column Header | Form Field | Notes |
|--------------|------------|-------|
| `Timestamp` | Auto-generated | Current date/time |
| `First` | `firstName` | Required |
| `Last` | `lastName` | Required |
| `Sex` | `sex` | Required |
| `Birth Year` | `birthYear` | Required |
| `Country (Birth)` | `countryOfBirth` | Required |
| `Country (Res)` | `countryOfResidence` | Required |
| `Email` | `email` | Required |
| `Phone Code` | `phoneCountryCode` | Required |
| `Phone` | `phoneNumber` | Required |
| `Ref. Campmate` | `referringCampmate` | Required |
| `Burns (RA)` | `burnsWithRA` | Array → "2014, 2015, 2016" |
| `Burns (RA) Count` | Auto-calculated | Count of years (e.g., 3) |
| `Burns (Other)` | `burnsWithoutRA` | Array → "2022, 2023" |
| `Burns (Other) Count` | Auto-calculated | Count of years (e.g., 2) |
| `First Burn?` | `firstBurn` | Yes/No |
| `Likelihood` | `likelihoodOfAttending` | Required |
| `Steward Ticket?` | `stewardTicketInterest` | Yes/No |
| `What Offer` | `whatYouOffer` | Required |
| `Notes` | `notes` | Optional |
| `Status` | Auto-set | Default: "Pending" |
| `Reviewed By` | Manual | Empty on submission |
| `Reviewed At` | Manual | Empty on submission |
| `Internal Notes` | Manual | Empty on submission |
| `Form` | `formName` | Default: "Statement of Intent 2026" |
| `Synced to Contacts` | Auto-updated | Empty on submission |

## Burns Data Format

### How Burns Are Stored

The form sends burn years as an array, which the script converts to a comma-separated string and calculates the count.

**Example:**

**Form sends:**
```javascript
{
  burnsWithRA: ['2014', '2015', '2016'],
  burnsWithoutRA: ['2022', '2023']
}
```

**Stored in sheet:**
- `Burns (RA)`: `2014, 2015, 2016`
- `Burns (RA) Count`: `3`
- `Burns (Other)`: `2022, 2023`
- `Burns (Other) Count`: `2`

### Format Handling

The script handles both formats:
1. **Array format** (from form): `['2014', '2015', '2016']` → Joins with ", " and counts length
2. **String format** (manual entry): `"2014,2015,2016"` → Splits by comma and counts

### First Burn Checkbox

If "This is my first Burn" is checked:
- `First Burn?`: `Yes`
- `Burns (RA)`: Empty
- `Burns (RA) Count`: `0`
- `Burns (Other)`: Empty
- `Burns (Other) Count`: `0`

## Setup Requirements

### 1. Header Row Must Match Exactly

The first row of each sheet must have these exact column headers (case-sensitive):

```
Timestamp | First | Last | Sex | Birth Year | Country (Birth) | Country (Res) | Email | Phone Code | Phone | Ref. Campmate | Burns (RA) | Burns (RA) Count | Burns (Other) | Burns (Other) Count | First Burn? | Likelihood | Steward Ticket? | What Offer | Notes | Status | Reviewed By | Reviewed At | Internal Notes | Form | Synced to Contacts
```

### 2. Run Setup Functions

If you're setting up a new sheet or updating an existing one:

1. **Run `setupAllTabs()`** - Creates/updates all sheets with correct headers
2. **Run `setupDataValidation()`** - Adds dropdown validations
3. **Run `setupConditionalFormatting()`** - Adds color coding for Status column

## Adding New Columns

To add a new column:

1. **Update the header list** in `setupAllTabs()`:
   ```javascript
   const headers = [
     // ... existing headers ...
     'New Column Name'
   ];
   ```

2. **Add to column mapping** in `doPost()`:
   ```javascript
   const columnData = {
     // ... existing mappings ...
     'New Column Name': data.newFieldName || ''
   };
   ```

3. **Re-run `setupAllTabs()`** to update all sheets

4. **Update the form** to collect the new data

## Reordering Columns

You can reorder columns in Google Sheets without updating the script:

1. Select the column you want to move
2. Right-click → Cut
3. Right-click on the destination → Insert cut cells

The script will automatically adapt because it reads the header row.

## Important Notes

### ⚠️ Do Not Change Header Names

If you change a header name in the sheet, you must also update it in the script's `columnData` mapping, otherwise that column will be empty for new submissions.

### ✅ Safe Operations
- Reordering columns
- Adding new columns (after updating script)
- Hiding columns
- Changing column widths
- Changing formatting

### ❌ Unsafe Operations
- Renaming headers without updating script
- Deleting required headers
- Moving the header row from row 1

## Testing

After making changes, test with:

```javascript
function testFormSubmission() {
  // This function simulates a form submission
  // Check the execution log to verify data is mapped correctly
}
```

## Troubleshooting

### Problem: Data appears in wrong columns

**Solution**: 
1. Check that header names match exactly (case-sensitive)
2. Run `setupAllTabs()` to reset headers
3. Check the execution log for errors

### Problem: New column is empty

**Solution**:
1. Verify the column header is in `setupAllTabs()` headers array
2. Verify the mapping is in `doPost()` columnData object
3. Check that the form is sending the data with the correct field name

### Problem: Script says "column not found"

**Solution**:
1. Make sure the header row (row 1) has not been deleted
2. Run `setupAllTabs()` to recreate headers
3. Check for extra spaces or typos in header names

## Migration from Old System

If you're upgrading from the old column-position system:

1. **Backup your data** - Export sheets to CSV
2. **Update the script** - Replace `doPost()` function with new version
3. **Run `setupAllTabs()`** - Ensures headers are correct
4. **Test** - Submit a test form entry
5. **Verify** - Check that data appears in correct columns

---

**Last Updated**: January 2026  
**Script Version**: 2.0 (Header-based)  
**Related Files**: `scripts/apps-script-complete.js`

