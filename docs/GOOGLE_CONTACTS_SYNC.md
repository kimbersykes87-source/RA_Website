# Google Contacts Auto-Sync Setup Guide

**Feature:** Automatically sync approved SOI submissions to Google Contacts  
**Status:** Ready to deploy  
**Estimated Setup Time:** 10-15 minutes

---

## 🎯 What This Does

When you approve an SOI submission, this script automatically:
- ✅ **For existing contacts:** Adds "2026 Rubbers" label only (preserves your data)
- ✅ **For new contacts:** Creates full contact with all SOI data
- ✅ Adds detailed notes (burns history, likelihood, what they offer)
- ✅ Includes phone number and email
- ✅ Prevents duplicates
- ⏱️ Takes 2-5 seconds

---

## 📋 Setup Instructions

### Step 1: Open Your Google Sheet

1. Go to your "RA 2026 SOI Submissions" Google Sheet
2. Click **Extensions** → **Apps Script**
3. You should see your existing `doPost` and `doGet` functions

### Step 2: Add the Sync Script

1. In Apps Script, click the **+** next to "Files"
2. Choose **Script**
3. Name it: `ContactsSync`
4. Copy the entire contents of `scripts/google-contacts-sync.js`
5. Paste it into the new file
6. Click **Save** (💾 icon)

### Step 3: Enable People API

1. In Apps Script, click **Services** (+ icon on left sidebar)
2. Find **People API**
3. Click **Add**
4. Leave version as `v1`
5. Click **Add**

### Step 4: Run Initial Setup

1. In Apps Script, select `setupContactsSync` from the function dropdown
2. Click **Run** (▶️ icon)
3. **First time:** You'll need to authorize the script
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Your Project] (unsafe)"
   - Click "Allow"
4. Wait for "Execution completed" message
5. You should see a success alert

### Step 5: Enable Automatic Sync

1. Select `setupAutomaticSync` from the function dropdown
2. Click **Run** (▶️ icon)
3. Wait for "Execution completed"
4. You should see a success alert

### Step 6: Test It!

1. Select `testSingleSync` from the function dropdown
2. Click **Run** (▶️ icon)
3. Check your Google Contacts for the test contact
4. Look for the "2026 Rubbers" label

---

## 🚀 How to Use

### Automatic Sync (Recommended)

Once set up, contacts sync automatically when:
1. You change Status to "Approved" in `SOI_Staging` sheet
2. You copy a row to `SOI_Approved` sheet

**No manual action needed!**

### Manual Sync

To sync all approved contacts at once:
1. Go to Apps Script
2. Select `syncApprovedToContacts` from dropdown
3. Click **Run**
4. Wait for completion message

**Note:** For existing contacts, this only adds the "2026 Rubbers" label without updating their data.

---

## 📊 What Gets Synced

### Contact Fields

| Field | Source | Notes |
|-------|--------|-------|
| Name | First + Last Name | Full name |
| Email | Email field | Primary email |
| Phone | Phone Code + Number | Mobile number |
| Notes | Multiple fields | Detailed info (see below) |
| Label | Auto-added | "2026 Rubbers" |

### Contact Notes Format

```
🎪 RUBBER ARMSTRONG 2026

🔥 Burns with RA: 2023,2024
🔥 Other Burns: 2015,2016

📊 Likelihood: Hell yeah!
🎫 Steward Interest: Yes
👥 Referred by: Jane Doe

💡 What they offer:
[Their response here]

📝 Notes:
[Their additional notes]

---
Synced from SOI form: 1/4/2026
```

### Custom Fields

The script also adds custom fields (visible in Google Contacts):
- **Camp:** Rubber Armstrong
- **Year:** 2026
- **Likelihood:** [Their response]
- **First Burn:** Yes/No
- **Steward Interest:** Yes/No

---

## 🔍 Tracking Synced Contacts

The script adds a new column: **"Synced to Contacts"**

- **Yes** = Contact has been synced
- **Empty** = Not yet synced

This prevents duplicate syncing and lets you track what's been processed.

---

## 🛠️ Available Functions

### Setup Functions

| Function | Purpose | When to Run |
|----------|---------|-------------|
| `setupContactsSync` | Initial setup, adds columns | Once (first time) |
| `setupAutomaticSync` | Enable automatic triggers | Once (first time) |

### Sync Functions

| Function | Purpose | When to Run |
|----------|---------|-------------|
| `syncApprovedToContacts` | Sync all approved contacts | Anytime (manual) |
| `testSingleSync` | Test with one contact | For testing |

### Utility Functions

| Function | Purpose | When to Run |
|----------|---------|-------------|
| `removeAllSyncedContacts` | Delete all synced contacts | For testing only ⚠️ |

---

## 🔧 Configuration

You can customize the script by editing the `CONFIG` object:

```javascript
const CONFIG = {
  // Contact label/group name
  CONTACT_LABEL: '2026 Rubbers',  // Change this if you want a different label
  
  // Sheet names
  APPROVED_SHEET: 'SOI_Approved',
  STAGING_SHEET: 'SOI_Staging',
  
  // Column indices (adjust if your columns are different)
  COLUMNS: {
    FIRST_NAME: 2,
    LAST_NAME: 3,
    EMAIL: 8,
    // ... etc
  }
};
```

---

## ⚠️ Troubleshooting

### "People API not found"
- **Solution:** Go to Services → Add People API (see Step 3)

### "Authorization required"
- **Solution:** Run the function again and follow authorization prompts

### "Contact group not found"
- **Solution:** The script creates it automatically. Run `syncApprovedToContacts` once.

### Contacts not syncing automatically
- **Solution:** 
  1. Check that `setupAutomaticSync` was run
  2. Go to Apps Script → Triggers (clock icon)
  3. Verify `onStatusChange` trigger exists

### Duplicate contacts created
- **Solution:** 
  1. The script checks for existing contacts by email
  2. If duplicates occur, check that emails match exactly
  3. Use `removeAllSyncedContacts` to clean up (⚠️ deletes all)

### "Synced to Contacts" column not appearing
- **Solution:** Run `setupContactsSync` again

---

## 📱 Viewing Synced Contacts

### On Desktop
1. Go to [contacts.google.com](https://contacts.google.com)
2. Click "Labels" in left sidebar
3. Click "2026 Rubbers"
4. See all synced contacts

### On Mobile
1. Open Google Contacts app
2. Tap menu (☰)
3. Tap "Labels"
4. Tap "2026 Rubbers"

---

## 🔒 Privacy & Security

- **Data stays in your Google account** - No third-party access
- **You control permissions** - You authorize the script
- **No external API calls** - Uses Google's internal APIs only
- **Audit trail** - Check Apps Script logs anytime

---

## 🎨 Customization Ideas

### Change the Notes Format

Edit the `buildContactNotes()` function to customize what appears in contact notes.

### Add More Custom Fields

Add to the `userDefined` array in `syncContactToGoogle()`:

```javascript
userDefined: [
  { key: 'Camp', value: 'Rubber Armstrong' },
  { key: 'Year', value: '2026' },
  { key: 'Custom Field', value: 'Custom Value' }
]
```

### Change the Label Name

Edit `CONFIG.CONTACT_LABEL` to use a different group name.

### Sync to Different Sheet

Edit `CONFIG.APPROVED_SHEET` to sync from a different tab.

---

## 📊 Monitoring

### Check Sync Status

1. Go to Apps Script
2. Click **Executions** (clock icon with arrow)
3. See all sync operations and their status

### View Logs

1. Go to Apps Script
2. Click **Executions** → Select an execution
3. Click **View logs**
4. See detailed sync information

---

## 🚨 Important Notes

1. **Rate Limits:** Google has rate limits on API calls. The script includes delays to prevent hitting limits.

2. **Existing Contacts:** If a contact with the same email exists, it will be **updated**, not duplicated.

3. **Manual Edits:** If you manually edit a contact in Google Contacts, the next sync will overwrite your changes.

4. **Deletion:** Deleting a contact from Google Contacts does NOT delete it from the sheet.

5. **Triggers:** The automatic trigger runs on ANY edit to the sheet. It only processes Status column changes.

---

## ✅ Success Checklist

After setup, verify:
- [ ] People API is enabled in Services
- [ ] `setupContactsSync` ran successfully
- [ ] `setupAutomaticSync` ran successfully
- [ ] "Synced to Contacts" column appears in sheets
- [ ] Test sync created a contact in Google Contacts
- [ ] "2026 Rubbers" label exists in Google Contacts
- [ ] Trigger appears in Triggers panel

---

## 🎉 You're Done!

Approved SOI submissions will now automatically sync to your Google Contacts!

**Next Steps:**
1. Approve some SOI submissions
2. Watch them automatically appear in Google Contacts
3. Check the "2026 Rubbers" label to see all camp members

---

## 📞 Support

If you run into issues:
1. Check the Troubleshooting section above
2. View execution logs in Apps Script
3. Check that all setup steps were completed
4. Verify column indices match your sheet structure

---

**Happy syncing!** 🎪🔥

