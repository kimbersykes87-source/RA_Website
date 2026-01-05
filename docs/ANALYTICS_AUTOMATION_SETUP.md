# Analytics Automation Setup

## Overview

Automated daily email reports with visitor counts and country breakdown.

## Option 1: Google Analytics 4 + Apps Script (Recommended)

### Why GA4?
- Provides API access for automated reporting
- More detailed data than Cloudflare Web Analytics
- Can run alongside Cloudflare Analytics (use both)
- Free for standard usage

### Setup Steps

#### 1. Add Google Analytics 4 to Your Sites

**Main Site (`main-site/index.html`):**

Add before closing `</head>` tag:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**SOI Site (`soi-site/index.html`):**

Add the same code with your GA4 Measurement ID.

#### 2. Get Your GA4 Property ID

1. Go to https://analytics.google.com/
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Property Settings**
4. Note your **Property ID** (format: `123456789`)

#### 3. Enable Google Analytics Data API

1. Go to https://console.cloud.google.com/
2. Select your project (or create one)
3. Go to **APIs & Services** → **Library**
4. Search for "Google Analytics Data API"
5. Click **Enable**

#### 4. Set Up Apps Script

1. Go to https://script.google.com/
2. Click **New Project**
3. Name it "RA Analytics Daily Report"
4. Copy the contents of `scripts/google-analytics-daily-report.js`
5. Paste into the script editor

#### 5. Configure the Script

Update the `CONFIG` object:

```javascript
const CONFIG = {
  propertyId: 'properties/YOUR_GA4_PROPERTY_ID', // e.g., 'properties/123456789'
  emailRecipient: 'your-email@example.com',
  startDate: 'yesterday',
  endDate: 'yesterday'
};
```

#### 6. Enable Analytics Data API Service

In Apps Script:
1. Click **Services** (+ icon on left sidebar)
2. Search for "Google Analytics Data API"
3. Add it

#### 7. Test the Script

1. Run the `testReport()` function
2. Authorize the script when prompted
3. Check your email for the test report

#### 8. Set Up Daily Trigger

1. Run the `setupDailyTrigger()` function once
2. This creates an automatic trigger that runs every day at 9 AM
3. You can change the time in the script if needed

### Email Report Format

```
Rubber Armstrong Website Analytics
Report for: Monday, January 04, 2026
============================================================

SUMMARY
------------------------------------------------------------
Unique Visitors: 42
Total Sessions: 58
Total Page Views: 127

VISITORS BY COUNTRY
------------------------------------------------------------
1. United States: 15 visitors
2. United Kingdom: 8 visitors
3. Australia: 7 visitors
4. Canada: 5 visitors
5. Germany: 4 visitors
6. Netherlands: 3 visitors

------------------------------------------------------------
View full analytics: https://analytics.google.com/
```

## Option 2: Cloudflare Analytics Manual Check

Since Cloudflare Web Analytics doesn't provide an API, you can:

1. Go to https://dash.cloudflare.com/
2. Navigate to **Analytics & Logs** → **Web Analytics**
3. Select your site
4. View:
   - Unique visitors
   - Page views
   - Top countries
   - Referrers
   - Devices

**Pros:**
- Privacy-focused (no cookies)
- Lightweight
- Simple setup (already done)

**Cons:**
- No automated reporting
- No API access
- Manual checking required

## Option 3: Hybrid Approach (Best of Both)

Use both:
- **Cloudflare Web Analytics**: Privacy-focused, lightweight, no cookies
- **Google Analytics 4**: Detailed data, automated reporting, API access

This gives you:
- Privacy-friendly analytics for visitors
- Detailed reporting for you
- Automated daily emails
- Ability to verify data across two sources

## Customizing the Report

### Change Report Frequency

In `setupDailyTrigger()`, modify:

```javascript
// Weekly (every Monday at 9 AM)
ScriptApp.newTrigger('sendDailyAnalyticsReport')
  .timeBased()
  .onWeekDay(ScriptApp.WeekDay.MONDAY)
  .atHour(9)
  .create();

// Every 12 hours
ScriptApp.newTrigger('sendDailyAnalyticsReport')
  .timeBased()
  .everyHours(12)
  .create();
```

### Add More Metrics

In `getAnalyticsData()`, add to metrics array:

```javascript
metrics: [
  { name: 'activeUsers' },
  { name: 'sessions' },
  { name: 'screenPageViews' },
  { name: 'averageSessionDuration' },
  { name: 'bounceRate' },
  { name: 'newUsers' }
]
```

### Add Page-Level Breakdown

Add to dimensions array:

```javascript
dimensions: [
  { name: 'country' },
  { name: 'pagePath' }  // Add this
]
```

## Troubleshooting

### "Analytics Data API not enabled"
- Go to Google Cloud Console
- Enable the API for your project

### "Insufficient permissions"
- Make sure you're the owner of the GA4 property
- Re-authorize the script

### No data in report
- Check that GA4 is properly installed on your site
- Wait 24-48 hours for data to populate
- Verify your Property ID is correct

### Email not sending
- Check your Gmail sending limits (500/day)
- Verify the email address in CONFIG
- Check Apps Script execution logs

## Next Steps

1. Set up GA4 on both sites
2. Deploy the Apps Script
3. Run test report
4. Set up daily trigger
5. Receive automated emails every morning

## Files

- `scripts/google-analytics-daily-report.js` - Apps Script code
- This document - Setup instructions

---

**Note**: GA4 data typically has a 24-48 hour delay for full accuracy. Real-time data is available in the GA4 dashboard but not via the API.

