# Test Email Setup Guide

Quick guide to send 3 test emails before launching the full campaign.

---

## 🧪 Test Recipients

The system will send to:
1. **kimber@kimbersykes.com**
2. **rubberarmstrongcamp@gmail.com**
3. **kimbersykes87@gmail.com**

Each email will have:
- ✅ Full tracking (pixel + click)
- ✅ Professional design
- ✅ Working SOI button
- ✅ Logo signature
- 🔴 Red "TEST EMAIL" banner at top

---

## 📋 Setup Instructions (One-Time)

### Step 1: Add Tracking URLs Script

1. Open your **Google Sheet**: "Rubber Armstrong 2026 - SOI Submissions"
2. Go to **Extensions → Apps Script**
3. Click **+ (Add File) → Script**
4. Name it: `AddTrackingUrls`
5. Open: `email_tracking/scripts/add-tracking-urls.gs`
6. **Copy ALL the code**
7. **Paste** into the new Apps Script file
8. Click **💾 Save**

### Step 2: Run Tracking URL Generator

1. Select function: **`addTrackingUrls`** (dropdown at top)
2. Click **▶️ Run**
3. **First time:** Click "Review Permissions" → Your account → "Advanced" → "Allow"
4. Wait 10-20 seconds
5. See: **"✓ Generated tracking URLs for 290 contacts"**

### Step 3: Add Email Campaign Script

1. Still in Apps Script, click **+ (Add File) → Script**
2. Name it: `EmailCampaign`
3. Open: `email_tracking/scripts/gmail-automation.gs`
4. **Copy ALL the code**
5. **Paste** into the new Apps Script file
6. Click **💾 Save**
7. **Close Apps Script**

### Step 4: Reload Sheet

1. **Refresh your Google Sheet** (press F5)
2. You'll see a new menu appear: **📧 Email Campaign**
3. ✅ Setup complete!

---

## 🚀 Sending Test Emails

### Step 1: Send Test Emails

1. Click **📧 Email Campaign → 🧪 Send 3 Test Emails**
2. Click "OK" if prompted for permissions
3. Wait 5-10 seconds
4. You'll see:
```
🧪 TEST EMAILS SENT

✓ Sent to kimber@kimbersykes.com
✓ Sent to rubberarmstrongcamp@gmail.com
✓ Sent to kimbersykes87@gmail.com

✅ Next Steps:
1. Check your 3 inboxes
2. Open each email
3. Click the "Complete Statement of Intent" button
4. Wait 30 seconds
5. Run "📊 Verify Test Tracking" to check results
```

### Step 2: Check Your Inboxes

1. **Open email** in each account
2. **Verify:**
   - Red "TEST EMAIL" banner visible ✓
   - Design looks good ✓
   - Logo appears ✓
   - Text is readable ✓
   - Button is centered ✓

3. **Click** the "Complete Statement of Intent" button
4. Verify it redirects to: `https://soi.rubberarmstrong.com`

### Step 3: Verify Tracking Works

1. **Wait 30 seconds** (for tracking to update)
2. Click **📧 Email Campaign → 📊 Verify Test Tracking**
3. You should see:

```
📊 TEST EMAIL TRACKING STATUS

✉️  kimber@kimbersykes.com
    Opened: ✓ YES
    Clicked: ✓ YES

✉️  rubberarmstrongcamp@gmail.com
    Opened: ✓ YES
    Clicked: ✓ YES

✉️  kimbersykes87@gmail.com
    Opened: ✓ YES
    Clicked: ✓ YES
```

### Step 4: Manual Verification (Optional)

Open your **Email_Campaign_2026** tab and find the 3 test email addresses:

Check these columns for each test email:
- **AA (Email Sent)**: Should say "Yes" (if you sent via main campaign)
- **AC (Email Opened)**: Should say "Yes" ✓
- **AD (First Open At)**: Should show timestamp ✓
- **AE (Open Count)**: Should be "1" or higher ✓
- **AF (Link Clicked)**: Should say "Yes" ✓
- **AG (First Click At)**: Should show timestamp ✓

---

## ✅ Success Checklist

Before sending to all 290 contacts, verify:

- [ ] All 3 test emails received
- [ ] Email design looks professional
- [ ] Logo displays correctly
- [ ] SOI button works and redirects properly
- [ ] Tracking shows all 3 opens
- [ ] Tracking shows all 3 clicks
- [ ] Timestamps are recent
- [ ] No emails went to spam
- [ ] Unsubscribe link works

---

## 🚨 Troubleshooting

### Test emails not received
- Check spam folders
- Wait 2-3 minutes (Gmail can be slow)
- Check Apps Script execution log for errors:
  - **Extensions → Apps Script → Executions** (clock icon)

### Tracking not updating
- Wait 60 seconds and check again
- Verify worker is running:
  - Visit: https://email-tracking-worker.kimbersykes87.workers.dev/
  - Should show JSON response
- Check browser console for errors (F12)
- Verify test emails exist in Email_Campaign_2026 tab

### Email went to spam
- This is normal for test emails
- Add sender to contacts
- Mark as "Not Spam"
- Real campaign emails less likely to go to spam

### Logo not showing
- Logo is hosted on GitHub for better email client compatibility
- URL: https://raw.githubusercontent.com/kimbersykes87-source/RA_Website/main/camp_assets/logos/RA-Full-Logo-Black-on-Clear.png
- Should load the logo
- If broken, verify GitHub repo is public

---

## 🎯 After Testing

Once all 3 test emails work perfectly:

1. **Remove the TEST banner** from the template:
   - Open `EmailCampaign.gs` in Apps Script
   - Find the red banner div in `getEmailTemplate()`
   - Delete it (or comment out)
   - Save

2. **Ready to send to 290 contacts!**
   - See: `GMAIL_AUTOMATION_SETUP.md`
   - Use: **📧 Email Campaign → 🚀 Send Batch**

---

## 📊 Expected Timeline

- **Setup:** 10 minutes
- **Send test emails:** 10 seconds
- **Check inboxes:** 2 minutes
- **Verify tracking:** 1 minute
- **Total:** ~15 minutes

---

## 💡 Tips

1. **Test across devices:** Check email on phone and desktop
2. **Test different email clients:** Gmail, Apple Mail, Outlook
3. **Check dark mode:** Some clients use dark backgrounds
4. **Test the unsubscribe link:** Make sure it works
5. **Forward test:** Forward to a friend to see how it looks

---

## Ready to Test?

Just follow the 4 setup steps above, then click:

**📧 Email Campaign → 🧪 Send 3 Test Emails**

Good luck! 🚀

