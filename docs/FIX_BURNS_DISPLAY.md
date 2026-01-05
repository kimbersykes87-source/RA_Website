# Fix Burns Count Display

**Issue:** Burns columns show comma-separated years (e.g., "2015,2016,2017") instead of a count (e.g., "3")

**Solution:** Add helper columns that show the count

---

## 🎯 **Recommended Solution: Add Count Columns**

This keeps the year data AND adds count columns.

### **Steps:**

1. **Open Apps Script:**
   - Go to your Google Sheet
   - Click **Extensions** → **Apps Script**

2. **Add the fix script:**
   - Click **+** next to Files
   - Choose **Script**
   - Name it: `FixBurnsDisplay`
   - Copy contents from `scripts/fix-burns-count-display.js`
   - Paste and **Save**

3. **Run the fix:**
   - Select `addBurnsCountColumns` from dropdown
   - Click **Run**
   - Wait for success message

### **Result:**

You'll get two new columns:
- **"Burns (RA) Count"** - Shows: 9
- **"Burns (Other) Count"** - Shows: 3

The original columns still show the years for reference.

---

## 🔄 **Alternative: Manual Formula**

If you prefer to add the columns manually:

1. **Add a new column** after "Burns (RA)"
2. **Name it:** "RA Count"
3. **Add this formula in row 2:**
   ```
   =IF(ISBLANK(L2), 0, IF(L2="", 0, LEN(L2)-LEN(SUBSTITUTE(L2,",",""))+1))
   ```
4. **Copy the formula down** to all rows
5. **Repeat** for "Burns (Other)" column

### **How it works:**
- Counts the commas in the year list
- Adds 1 (since "2015,2016" has 1 comma but 2 years)
- Returns 0 if empty

---

## ⚠️ **Not Recommended: Replace Years with Counts**

You can replace the year lists with counts, but **you'll lose the year data**.

If you want to do this anyway:
1. Run `convertBurnsToCountsInPlace` function
2. Confirm the warning
3. Years will be replaced with counts

**Warning:** This is permanent! You won't be able to see which specific years someone attended.

---

## 📊 **Example**

### **Before:**
| Burns (RA) | Burns (Other) |
|------------|---------------|
| 2015,2016,2017,2018,2019,2020,2021,2022,2023 | 2010,2011,2012 |

### **After (with count columns):**
| Burns (RA) | Burns (Other) | Burns (RA) Count | Burns (Other) Count |
|------------|---------------|------------------|---------------------|
| 2015,2016,2017,2018,2019,2020,2021,2022,2023 | 2010,2011,2012 | 9 | 3 |

---

## 🎨 **Bonus: Hide the Year Columns**

If you want to see only the counts:

1. Right-click on the "Burns (RA)" column header
2. Click **Hide column**
3. Repeat for "Burns (Other)"

The count columns will still work!

---

## ✅ **Recommended Approach**

1. **Run `addBurnsCountColumns`** - Adds count columns
2. **Optionally hide** the year columns if you don't need to see them
3. **Keep the year data** in case you need it later

This gives you the best of both worlds: easy-to-read counts AND detailed year data.

---

**Need help?** The script is in `scripts/fix-burns-count-display.js`

