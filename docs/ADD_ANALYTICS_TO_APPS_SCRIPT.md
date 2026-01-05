# Add Analytics Reporting to Existing Apps Script Project

## Quick Setup Guide

### Step 1: Open Your Existing Apps Script Project

1. Go to your Google Sheet: **Rubber Armstrong - SOI 2026**
2. Click **Extensions** → **Apps Script**
3. This opens your existing project with the SOI form handler and Google Contacts sync

### Step 2: Add the Analytics Script

1. In the Apps Script editor, click the **+** next to **Files**
2. Select **Script**
3. Name it: `AnalyticsReporting`
4. Copy the entire contents of `scripts/google-analytics-daily-report.js`
5. Paste it into the new file
6. Click **Save** (💾 icon)

### Step 3: Get Your GA4 Property ID

1. Go to https://analytics.google.com/
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Property Settings**
4. Copy your **Property ID** (it's just numbers, like `123456789`)

### Step 4: Update the Configuration

In the `AnalyticsReporting.gs` file, find the CONFIG section at the top and update:

```javascript
const CONFIG = {
  propertyId: 'properties/123456789',  // Replace with your Property ID
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  startDate: '7daysAgo',
  endDate: 'yesterday'
};
```

**Important**: Keep the `'properties/'` prefix, just replace the numbers.

### Step 5: Enable Google Analytics Data API

1. In Apps Script, click **Services** (+ icon on left sidebar)
2. Search for: **Google Analytics Data API**
3. Click **Add**
4. It will appear in your Services list

### Step 6: Test the Report

1. In the function dropdown at the top, select `testReport`
2. Click **Run** (▶️ icon)
3. First time: Click **Review permissions** → Select your Google account → Click **Advanced** → **Go to [Your Project Name]** → **Allow**
4. Check `rubberarmstrongcamp@gmail.com` for a test email

### Step 7: Set Up Weekly Trigger

1. In the function dropdown, select `setupWeeklyTrigger`
2. Click **Run** (▶️ icon)
3. Check the execution log - should say "Weekly trigger created successfully"

### Step 8: Verify the Trigger

1. In Apps Script, click **Triggers** (⏰ icon on left sidebar)
2. You should see:
   - **Function**: `sendWeeklyAnalyticsReport`
   - **Event**: Time-driven, Week timer, Every Monday, 9am-10am
   - **Timezone**: America/Los_Angeles

Done! You'll now receive weekly analytics emails every Monday at 9 AM LA time.

## What the Email Looks Like

```
Rubber Armstrong Website Analytics - Weekly Report
Period: Dec 30 - Jan 05, 2026
============================================================

SUMMARY
------------------------------------------------------------
Unique Visitors: 127
Total Sessions: 184
Total Page Views: 456

VISITORS BY COUNTRY
------------------------------------------------------------
1. United States: 58 visitors
2. United Kingdom: 22 visitors
3. Australia: 15 visitors
4. Canada: 12 visitors
5. Germany: 8 visitors
6. Netherlands: 5 visitors
7. France: 4 visitors
8. Spain: 3 visitors

------------------------------------------------------------
View full analytics: https://analytics.google.com/
```

## Troubleshooting

### "Analytics Data API not enabled"
- Go to https://console.cloud.google.com/
- Make sure you're in the same project as your Apps Script
- Go to **APIs & Services** → **Library**
- Search "Google Analytics Data API" and enable it

### "Insufficient permissions"
- Make sure you're the owner/admin of the GA4 property
- Try re-authorizing: Run `testReport` again and re-authorize

### No data showing
- Wait 24-48 hours after adding GA4 to your site
- Check that GA4 is working: https://analytics.google.com/ → **Reports** → **Realtime**
- Verify your Property ID is correct (just numbers, no quotes or spaces)

### Wrong timezone
- The trigger uses `America/Los_Angeles` (Pacific Time)
- If you need to change it, edit the timezone in `setupWeeklyTrigger()`

## Files in Your Apps Script Project

After setup, you should have:
- `Code.gs` - Your original SOI form handler
- `GoogleContactsSync.gs` - Your contacts sync script
- `AnalyticsReporting.gs` - Your new analytics reporting script (NEW)

All three work independently and won't interfere with each other.

## Changing the Schedule

If you want different timing, edit `setupWeeklyTrigger()`:

**Every Sunday instead:**
```javascript
.onWeekDay(ScriptApp.WeekDay.SUNDAY)
```

**Different time (e.g., 5 PM):**
```javascript
.atHour(17)
```

**Different timezone (e.g., Eastern):**
```javascript
.inTimezone('America/New_York')
```

Then run `setupWeeklyTrigger()` again to update.

---

**Email**: rubberarmstrongcamp@gmail.com  
**Schedule**: Every Monday at 9:00 AM Pacific Time  
**Report Period**: Previous 7 days (Monday-Sunday)


## Quick Setup Guide

### Step 1: Open Your Existing Apps Script Project

1. Go to your Google Sheet: **Rubber Armstrong - SOI 2026**
2. Click **Extensions** → **Apps Script**
3. This opens your existing project with the SOI form handler and Google Contacts sync

### Step 2: Add the Analytics Script

1. In the Apps Script editor, click the **+** next to **Files**
2. Select **Script**
3. Name it: `AnalyticsReporting`
4. Copy the entire contents of `scripts/google-analytics-daily-report.js`
5. Paste it into the new file
6. Click **Save** (💾 icon)

### Step 3: Get Your GA4 Property ID

1. Go to https://analytics.google.com/
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Property Settings**
4. Copy your **Property ID** (it's just numbers, like `123456789`)

### Step 4: Update the Configuration

In the `AnalyticsReporting.gs` file, find the CONFIG section at the top and update:

```javascript
const CONFIG = {
  propertyId: 'properties/123456789',  // Replace with your Property ID
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  startDate: '7daysAgo',
  endDate: 'yesterday'
};
```

**Important**: Keep the `'properties/'` prefix, just replace the numbers.

### Step 5: Enable Google Analytics Data API

1. In Apps Script, click **Services** (+ icon on left sidebar)
2. Search for: **Google Analytics Data API**
3. Click **Add**
4. It will appear in your Services list

### Step 6: Test the Report

1. In the function dropdown at the top, select `testReport`
2. Click **Run** (▶️ icon)
3. First time: Click **Review permissions** → Select your Google account → Click **Advanced** → **Go to [Your Project Name]** → **Allow**
4. Check `rubberarmstrongcamp@gmail.com` for a test email

### Step 7: Set Up Weekly Trigger

1. In the function dropdown, select `setupWeeklyTrigger`
2. Click **Run** (▶️ icon)
3. Check the execution log - should say "Weekly trigger created successfully"

### Step 8: Verify the Trigger

1. In Apps Script, click **Triggers** (⏰ icon on left sidebar)
2. You should see:
   - **Function**: `sendWeeklyAnalyticsReport`
   - **Event**: Time-driven, Week timer, Every Monday, 9am-10am
   - **Timezone**: America/Los_Angeles

Done! You'll now receive weekly analytics emails every Monday at 9 AM LA time.

## What the Email Looks Like

```
Rubber Armstrong Website Analytics - Weekly Report
Period: Dec 30 - Jan 05, 2026
============================================================

SUMMARY
------------------------------------------------------------
Unique Visitors: 127
Total Sessions: 184
Total Page Views: 456

VISITORS BY COUNTRY
------------------------------------------------------------
1. United States: 58 visitors
2. United Kingdom: 22 visitors
3. Australia: 15 visitors
4. Canada: 12 visitors
5. Germany: 8 visitors
6. Netherlands: 5 visitors
7. France: 4 visitors
8. Spain: 3 visitors

------------------------------------------------------------
View full analytics: https://analytics.google.com/
```

## Troubleshooting

### "Analytics Data API not enabled"
- Go to https://console.cloud.google.com/
- Make sure you're in the same project as your Apps Script
- Go to **APIs & Services** → **Library**
- Search "Google Analytics Data API" and enable it

### "Insufficient permissions"
- Make sure you're the owner/admin of the GA4 property
- Try re-authorizing: Run `testReport` again and re-authorize

### No data showing
- Wait 24-48 hours after adding GA4 to your site
- Check that GA4 is working: https://analytics.google.com/ → **Reports** → **Realtime**
- Verify your Property ID is correct (just numbers, no quotes or spaces)

### Wrong timezone
- The trigger uses `America/Los_Angeles` (Pacific Time)
- If you need to change it, edit the timezone in `setupWeeklyTrigger()`

## Files in Your Apps Script Project

After setup, you should have:
- `Code.gs` - Your original SOI form handler
- `GoogleContactsSync.gs` - Your contacts sync script
- `AnalyticsReporting.gs` - Your new analytics reporting script (NEW)

All three work independently and won't interfere with each other.

## Changing the Schedule

If you want different timing, edit `setupWeeklyTrigger()`:

**Every Sunday instead:**
```javascript
.onWeekDay(ScriptApp.WeekDay.SUNDAY)
```

**Different time (e.g., 5 PM):**
```javascript
.atHour(17)
```

**Different timezone (e.g., Eastern):**
```javascript
.inTimezone('America/New_York')
```

Then run `setupWeeklyTrigger()` again to update.

---

**Email**: rubberarmstrongcamp@gmail.com  
**Schedule**: Every Monday at 9:00 AM Pacific Time  
**Report Period**: Previous 7 days (Monday-Sunday)


## Quick Setup Guide

### Step 1: Open Your Existing Apps Script Project

1. Go to your Google Sheet: **Rubber Armstrong - SOI 2026**
2. Click **Extensions** → **Apps Script**
3. This opens your existing project with the SOI form handler and Google Contacts sync

### Step 2: Add the Analytics Script

1. In the Apps Script editor, click the **+** next to **Files**
2. Select **Script**
3. Name it: `AnalyticsReporting`
4. Copy the entire contents of `scripts/google-analytics-daily-report.js`
5. Paste it into the new file
6. Click **Save** (💾 icon)

### Step 3: Get Your GA4 Property ID

1. Go to https://analytics.google.com/
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Property Settings**
4. Copy your **Property ID** (it's just numbers, like `123456789`)

### Step 4: Update the Configuration

In the `AnalyticsReporting.gs` file, find the CONFIG section at the top and update:

```javascript
const CONFIG = {
  propertyId: 'properties/123456789',  // Replace with your Property ID
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  startDate: '7daysAgo',
  endDate: 'yesterday'
};
```

**Important**: Keep the `'properties/'` prefix, just replace the numbers.

### Step 5: Enable Google Analytics Data API

1. In Apps Script, click **Services** (+ icon on left sidebar)
2. Search for: **Google Analytics Data API**
3. Click **Add**
4. It will appear in your Services list

### Step 6: Test the Report

1. In the function dropdown at the top, select `testReport`
2. Click **Run** (▶️ icon)
3. First time: Click **Review permissions** → Select your Google account → Click **Advanced** → **Go to [Your Project Name]** → **Allow**
4. Check `rubberarmstrongcamp@gmail.com` for a test email

### Step 7: Set Up Weekly Trigger

1. In the function dropdown, select `setupWeeklyTrigger`
2. Click **Run** (▶️ icon)
3. Check the execution log - should say "Weekly trigger created successfully"

### Step 8: Verify the Trigger

1. In Apps Script, click **Triggers** (⏰ icon on left sidebar)
2. You should see:
   - **Function**: `sendWeeklyAnalyticsReport`
   - **Event**: Time-driven, Week timer, Every Monday, 9am-10am
   - **Timezone**: America/Los_Angeles

Done! You'll now receive weekly analytics emails every Monday at 9 AM LA time.

## What the Email Looks Like

```
Rubber Armstrong Website Analytics - Weekly Report
Period: Dec 30 - Jan 05, 2026
============================================================

SUMMARY
------------------------------------------------------------
Unique Visitors: 127
Total Sessions: 184
Total Page Views: 456

VISITORS BY COUNTRY
------------------------------------------------------------
1. United States: 58 visitors
2. United Kingdom: 22 visitors
3. Australia: 15 visitors
4. Canada: 12 visitors
5. Germany: 8 visitors
6. Netherlands: 5 visitors
7. France: 4 visitors
8. Spain: 3 visitors

------------------------------------------------------------
View full analytics: https://analytics.google.com/
```

## Troubleshooting

### "Analytics Data API not enabled"
- Go to https://console.cloud.google.com/
- Make sure you're in the same project as your Apps Script
- Go to **APIs & Services** → **Library**
- Search "Google Analytics Data API" and enable it

### "Insufficient permissions"
- Make sure you're the owner/admin of the GA4 property
- Try re-authorizing: Run `testReport` again and re-authorize

### No data showing
- Wait 24-48 hours after adding GA4 to your site
- Check that GA4 is working: https://analytics.google.com/ → **Reports** → **Realtime**
- Verify your Property ID is correct (just numbers, no quotes or spaces)

### Wrong timezone
- The trigger uses `America/Los_Angeles` (Pacific Time)
- If you need to change it, edit the timezone in `setupWeeklyTrigger()`

## Files in Your Apps Script Project

After setup, you should have:
- `Code.gs` - Your original SOI form handler
- `GoogleContactsSync.gs` - Your contacts sync script
- `AnalyticsReporting.gs` - Your new analytics reporting script (NEW)

All three work independently and won't interfere with each other.

## Changing the Schedule

If you want different timing, edit `setupWeeklyTrigger()`:

**Every Sunday instead:**
```javascript
.onWeekDay(ScriptApp.WeekDay.SUNDAY)
```

**Different time (e.g., 5 PM):**
```javascript
.atHour(17)
```

**Different timezone (e.g., Eastern):**
```javascript
.inTimezone('America/New_York')
```

Then run `setupWeeklyTrigger()` again to update.

---

**Email**: rubberarmstrongcamp@gmail.com  
**Schedule**: Every Monday at 9:00 AM Pacific Time  
**Report Period**: Previous 7 days (Monday-Sunday)

