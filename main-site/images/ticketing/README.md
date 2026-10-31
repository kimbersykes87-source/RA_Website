# Ticketing Page Background Images

## Fully Automated Export Workflow

### One Click, All 6 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/Ticketing-Hero.jpg`
- `camp_assets/images/Ticketing-Steward.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportTicketingImages.jsx`
3. ✅ **Done!** Script automatically processes both images

**No prompts. No manual selection. Fully automated.**

### What the Script Does:
- Automatically opens each JPG from `camp_assets/images/`
- Resizes to 2400×1200 (preserving aspect ratio)
- Exports 3 responsive sizes per image:
  - Mobile: 800×600
  - Tablet: 1400×800
  - Desktop: 2400×1200
- Saves as high-quality JPG (quality: 10/12)
- Cloudflare automatically converts JPG→WebP on delivery for optimal performance
- Closes files without saving
- Exports to `main-site/images/ticketing/`
- Shows completion report

---

## Final File List (6 files total)

When complete, this folder should contain:

```
✅ Ticketing-Hero-mobile.jpg (800×600)
✅ Ticketing-Hero-tablet.jpg (1400×800)
✅ Ticketing-Hero-desktop.jpg (2400×1200)

✅ Ticketing-Steward-mobile.jpg (800×600)
✅ Ticketing-Steward-tablet.jpg (1400×800)
✅ Ticketing-Steward-desktop.jpg (2400×1200)
```

---

## Where These Images Appear

- **Ticketing-Hero**: Hero section at top of Ticketing page
- **Ticketing-Steward**: "Rubber Armstrong Steward Sale Tickets" section

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background images lazy load with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

