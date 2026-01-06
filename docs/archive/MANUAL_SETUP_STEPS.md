# Manual Setup Steps - After Code Fixes

All code fixes have been applied. Follow these steps to complete the setup.

---

## ✅ What Was Fixed Automatically

1. ✅ Fixed typo `EMAIL_EMAIL_CONFIG` → `EMAIL_CONFIG`
2. ✅ Added LockService to prevent duplicate sends
3. ✅ Added plain text email version
4. ✅ Added quota check before each send
5. ✅ Added tracking URL validation
6. ✅ Fixed column index calculations (header-based)
7. ✅ Added bot detection to worker
8. ✅ Made sheet tab name configurable
9. ✅ Added email validation
10. ✅ Added retry logic with exponential backoff
11. ✅ Added timeout handling for Sheets API
12. ✅ Improved email lookup (trim whitespace)
13. ✅ Added null checks
14. ✅ Added email hash format validation

---

## 📋 MANUAL STEPS REQUIRED

### Step 1: Update Apps Script in Google Sheet (5 minutes)

1. **Open your Google Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1fI4j4cbBUOZrqtPA_vm24YHdKfVAX5alz6LSDUC9BuA/edit

2. **Open Apps Script**
   - Extensions → Apps Script

3. **Update gmail-automation.gs**
   - Find the file `gmail-automation.gs` (or create it if missing)
   - **Delete all existing code**
   - Copy the entire contents of: `email_tracking/scripts/gmail-automation.gs`
   - Paste into Apps Script
   - Click **Save** (💾 icon)

4. **Verify Configuration**
   - Check line 21: `SHEET_NAME: 'Email_Campaign_2026'` (or change to your tab name)
   - Check line 34-39: Column numbers match your sheet structure

5. **Reload Sheet**
   - Close Apps Script
   - Refresh the Google Sheet (F5)
   - You should see menu: **📧 Email Campaign**

---

### Step 2: Set Cloudflare Worker Secret for Sheet Tab Name (2 minutes)

**If you're using `Email_Campaign_2026` tab instead of `SOI_Staging`:**

```bash
cd email_tracking/cloudflare-worker
wrangler secret put SHEET_TAB_NAME
# When prompted, enter: Email_Campaign_2026
```

**If using `SOI_Staging` tab (default):**
- No action needed (defaults to 'SOI_Staging')

**Verify secret is set:**
```bash
wrangler secret list
# Should show: SHEET_TAB_NAME
```

---

### Step 3: Redeploy Cloudflare Worker (3 minutes)

```bash
cd email_tracking/cloudflare-worker
wrangler deploy
```

**Expected output:**
```
✨ Built successfully
⛅️ Deployed email-tracking-worker
   https://email-tracking-worker.kimbersykes87.workers.dev
```

**Test worker is working:**
```bash
curl https://email-tracking-worker.kimbersykes87.workers.dev/
# Should return JSON with service info
```

---

### Step 4: Verify Google Sheet Structure (5 minutes)

1. **Open your Google Sheet**
2. **Check which tab you're using:**
   - `SOI_Staging` (default)
   - OR `Email_Campaign_2026`

3. **Verify columns exist (must be exact):**
   - Column H (8): `Email`
   - Column AA (27): `Email Sent`
   - Column AB (28): `Email Sent At`
   - Column AC (29): `Email Opened`
   - Column AD (30): `First Open At`
   - Column AE (31): `Open Count`
   - Column AF (32): `Link Clicked`
   - Column AG (33): `First Click At`

4. **If columns are missing:**
   - Run Apps Script function: `setupAllTabs()` (from Config.gs)
   - Or manually add headers in row 1

5. **Verify email addresses are in column H**
   - Check a few rows to confirm

---

### Step 5: Test the System (10 minutes)

#### 5.1: Test Apps Script

1. **In Google Sheet → Apps Script**
2. **Run function:** `testSendEmail`
3. **Authorize permissions** if prompted
4. **Check your inbox** for test email
5. **Verify:**
   - Email has HTML formatting
   - Email has plain text (view source or use plain text client)
   - Tracking pixel URL is present
   - Click URL is present

#### 5.2: Test Tracking

1. **Open the test email** you just received
2. **Wait 10 seconds**
3. **Check Google Sheet:**
   - Column AC (Email Opened) should be "Yes"
   - Column AD (First Open At) should have timestamp
   - Column AE (Open Count) should be "1"

4. **Click the "Complete Statement of Intent" button**
5. **Wait 10 seconds**
6. **Check Google Sheet:**
   - Column AF (Link Clicked) should be "Yes"
   - Column AG (First Click At) should have timestamp

#### 5.3: Test Worker Logs

```bash
cd email_tracking/cloudflare-worker
wrangler tail
```

**Open the test email again** - you should see logs like:
```
Updated open tracking for: your@email.com
```

**Click the link again** - you should see:
```
Updated click tracking for: your@email.com
```

**Press Ctrl+C to stop tail**

---

### Step 6: Verify Bot Detection (Optional - 5 minutes)

1. **Open Google Sheet in browser**
2. **Scroll through rows** (don't click tracking URLs)
3. **Wait 1 minute**
4. **Check if any new tracking appeared** for unsent emails
5. **Expected:** No new tracking (bot detection working!)

**If you see false tracking:**
- Bot detection may need tuning
- Check worker logs: `wrangler tail`
- Look for "Bot ignored" messages

---

### Step 7: Prepare Recipient List (10 minutes)

1. **Open your Google Sheet**
2. **Go to the tab you're using** (`SOI_Staging` or `Email_Campaign_2026`)

3. **Verify recipient data:**
   - Column H has valid email addresses
   - Column B has first names (optional but recommended)
   - No duplicate emails

4. **Set initial values for all recipients:**
   - Column AA (Email Sent): `No` (or blank)
   - Column AB (Email Sent At): blank
   - Column AC (Email Opened): blank
   - Column AD (First Open At): blank
   - Column AE (Open Count): `0`
   - Column AF (Link Clicked): blank
   - Column AG (First Click At): blank

5. **Generate tracking URLs** (if not already done):
   - In Apps Script, run: `addTrackingUrls()` (from add-tracking-urls.gs)
   - OR use the script: `email_tracking/scripts/generate-tracking-urls.js`

6. **Verify tracking URLs exist:**
   - Column AH (34): Should have pixel URLs ending in `.gif`
   - Column AI (35): Should have click URLs with `/c/`

---

### Step 8: Final Pre-Send Checklist

Before sending to all 299 recipients:

- [ ] Apps Script code updated (gmail-automation.gs)
- [ ] Cloudflare Worker redeployed
- [ ] SHEET_TAB_NAME secret set (if using Email_Campaign_2026)
- [ ] Test email sent to yourself
- [ ] Tracking verified working (open + click)
- [ ] Worker logs show no errors
- [ ] Sheet columns verified (AA-AG exist)
- [ ] Recipient list prepared (299 valid emails)
- [ ] Tracking URLs generated (columns AH/AI)
- [ ] Initial values set (Email Sent = No, etc.)
- [ ] Bot detection tested (optional)

---

## 🚀 READY TO SEND

Once all checklist items are complete:

1. **Send test to 2-3 trusted recipients first**
   - Use menu: **📧 Email Campaign → 🧪 Send 3 Test Emails**
   - Wait 24 hours
   - Verify tracking works for all 3

2. **Then send full campaign:**
   - Use menu: **📧 Email Campaign → 📤 Send Small Batch (20 emails)** for careful sending
   - OR use: **📧 Email Campaign → 🚀 Send Batch (50 emails)** for standard batches
   - Monitor worker logs: `wrangler tail`
   - Check sheet updates in real-time
   - Send in batches: 20-50 per batch, 100-150 per day over 2-3 days

---

## 🔧 TROUBLESHOOTING

### Apps Script Error: "EMAIL_CONFIG is not defined"
- **Fix:** Make sure you copied the ENTIRE file, including the `EMAIL_CONFIG` object at the top

### Worker Error: "Sheet tab not found"
- **Fix:** Set `SHEET_TAB_NAME` secret: `wrangler secret put SHEET_TAB_NAME`
- Enter your exact tab name (case-sensitive)

### Tracking Not Updating
- **Check:** Worker logs: `wrangler tail`
- **Check:** Service account has Editor access to sheet
- **Check:** Sheet ID in secrets matches your sheet URL
- **Check:** Email addresses match exactly (case-insensitive, but check for typos)

### Duplicate Sends
- **Should not happen** (LockService prevents this)
- **If it does:** Check Apps Script execution log for errors
- **Manual fix:** Filter sheet for duplicates, mark extras as "No" in Email Sent column

### Bot Detection Too Aggressive
- **If real opens are being blocked:**
  - Check worker logs for "Bot ignored" messages
  - Review `isBot()` function in worker.js
  - Adjust bot patterns if needed

---

## 📞 SUPPORT

If you encounter issues:
1. Check `EMAIL_TRACKING_AUDIT_REPORT.md` for detailed explanations
2. Review worker logs: `wrangler tail`
3. Check Apps Script execution log
4. Verify all manual steps completed

---

## ✅ COMPLETION

Once all manual steps are done and tests pass:
- ✅ System is production-ready
- ✅ Safe to send to 299 recipients
- ✅ All critical issues fixed
- ✅ Monitoring in place

**Good luck with your campaign! 🔥**

