# Fix Burns Scientific Notation Issue

**Problem:** Burns columns show scientific notation like `2.01520162017201E+35` instead of years

**Root Cause:** Google Sheets is treating the comma-separated years as a NUMBER instead of TEXT

---

## 🚨 **The Issue**

When years are entered like `2015,2016,2017,2018,2019,2020,2021,2022,2023`:
- Google Sheets sees it as a number: `201520162017201820192020202120222023`
- Converts to scientific notation: `2.01520162017201E+35`
- Data becomes unreadable

---

## ✅ **Complete Fix (Recommended)**

Run this script to fix EVERYTHING at once:

### **Steps:**

1. **Open Apps Script:**
   - Go to your Google Sheet
   - Click **Extensions** → **Apps Script**

2. **Update your fix script:**
   - Open the `FixBurnsDisplay` file (or create it)
   - Replace with the updated version from `scripts/fix-burns-count-display.js`
   - Click **Save**

3. **Run the complete fix:**
   - Select `fixEverything` from dropdown
   - Click **Run**
   - Authorize if needed
   - Click OK to confirm

### **What It Does:**

1. ✅ **Fixes existing corrupted data** (attempts to recover years)
2. ✅ **Formats columns as TEXT** (prevents future issues)
3. ✅ **Adds count columns** (shows "9" instead of year list)

---

## 🔧 **Manual Fix (If You Prefer)**

### **Step 1: Format Columns as Text**

1. **Select the Burns (RA) column** (Column L)
2. **Format → Number → Plain text**
3. **Repeat for Burns (Other)** (Column M)

### **Step 2: Fix Your Corrupted Entry**

Your entry showing `2.01520162017201E+35`:
1. Click on the cell
2. Delete the corrupted value
3. Type the years as text: `2015,2016,2017,2018,2019,2020,2021,2022,2023`
4. Press Enter

**Important:** Make sure the column is formatted as TEXT first!

### **Step 3: Add Count Columns**

Run `addBurnsCountColumns` function to add helper columns that show counts.

---

## 🛡️ **Prevent Future Issues**

### **Option A: Pre-format the Sheet (Recommended)**

Before any new submissions:
1. Select columns L and M (Burns columns)
2. Format → Number → **Plain text**
3. This ensures all future entries are stored as text

### **Option B: Update the Apps Script**

In your form handler (`apps-script-complete.js`), ensure burns data is sent as strings:

```javascript
// In the doPost function, when preparing the row:
data.burnsWithRA || '',      // Already a string
data.burnsWithoutRA || '',   // Already a string
```

The form already sends these as strings, but the sheet needs to be formatted as TEXT to receive them correctly.

---

## 📊 **What You Should See**

### **Before Fix:**
| Burns (RA) | Burns (Other) |
|------------|---------------|
| 2.01520162017201E+35 | ... |

### **After Fix:**
| Burns (RA) | Burns (Other) | Burns (RA) Count | Burns (Other) Count |
|------------|---------------|------------------|---------------------|
| 2015,2016,2017,2018,2019,2020,2021,2022,2023 | 2010,2011,2012 | 9 | 3 |

---

## ⚠️ **Important Notes**

1. **Corrupted data may not be fully recoverable** - You might need to manually re-enter years for affected rows

2. **Format BEFORE entering data** - Once data is corrupted, it's hard to recover the exact years

3. **The fix script will mark corrupted cells** as `[Data corrupted - please re-enter years]`

4. **Future entries will work correctly** after formatting columns as TEXT

---

## 🎯 **Quick Fix Checklist**

- [ ] Run `fixEverything` function in Apps Script
- [ ] Check that corrupted entries are marked
- [ ] Manually re-enter years for corrupted rows
- [ ] Verify new entries store correctly as text
- [ ] Use count columns for easy viewing

---

## 🔍 **Testing**

After fixing:
1. Add a test entry with years: `2015,2016,2017`
2. Check it displays as text (not scientific notation)
3. Check the count column shows `3`
4. If it works, you're all set!

---

**Run `fixEverything` to fix all issues at once!**

