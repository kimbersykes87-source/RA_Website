# Camp Life Page Background Images

## Fully Automated Export Workflow

### One Click, All 12 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/CampLife-Hero.jpg`
- `camp_assets/images/CampLife-RadianceHour.jpg`
- `camp_assets/images/CampLife-ArtCar.jpg`
- `camp_assets/images/CampLife-Bar.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportCampLifeImages.jsx`
3. ✅ **Done!** Script automatically processes all 4 images

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
- Exports to `main-site/images/camp-life/`
- Shows completion report

---

## Final File List (12 files total)

When complete, this folder should contain:

```
✅ CampLife-Hero-mobile.jpg (800×600)
✅ CampLife-Hero-tablet.jpg (1400×800)
✅ CampLife-Hero-desktop.jpg (2400×1200)

✅ CampLife-RadianceHour-mobile.jpg (800×600)
✅ CampLife-RadianceHour-tablet.jpg (1400×800)
✅ CampLife-RadianceHour-desktop.jpg (2400×1200)

✅ CampLife-ArtCar-mobile.jpg (800×600)
✅ CampLife-ArtCar-tablet.jpg (1400×800)
✅ CampLife-ArtCar-desktop.jpg (2400×1200)

✅ CampLife-Bar-mobile.jpg (800×600)
✅ CampLife-Bar-tablet.jpg (1400×800)
✅ CampLife-Bar-desktop.jpg (2400×1200)
```

---

## Where These Images Appear

- **CampLife-Hero**: Hero section at top of Camp Life page
- **CampLife-RadianceHour**: "Radiance Hour" section
- **CampLife-ArtCar**: "SS Mezcal: Our Art Car" section
- **CampLife-Bar**: "The Mezcal Bar" section

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background images lazy load with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

