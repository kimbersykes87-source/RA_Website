# About Page Background Images

## Fully Automated Export Workflow

### One Click, All 9 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/AboutUs-WhoWeAre.jpg`
- `camp_assets/images/AboutUs-Sustainability.jpg`
- `camp_assets/images/AboutUs-Community.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportAboutImages.jsx`
3. ✅ **Done!** Script automatically processes all 3 images

**No prompts. No manual selection. Fully automated.**

### What the Script Does:
- Automatically opens each JPG from `camp_assets/images/`
- Resizes to 2400×1200 (preserving aspect ratio)
- Exports 3 responsive sizes per image:
  - Mobile: 800×600
  - Tablet: 1400×800
  - Desktop: 2400×1200
- Saves as optimized WebP (80% quality)
- Closes files without saving
- Exports to `main-site/images/about/`
- Shows completion report

---

## Final File List (9 files total)

When complete, this folder should contain:

```
✅ AboutUs-WhoWeAre-mobile.webp (800×600)
✅ AboutUs-WhoWeAre-tablet.webp (1400×800)
✅ AboutUs-WhoWeAre-desktop.webp (2400×1200)

✅ AboutUs-Sustainability-mobile.webp (800×600)
✅ AboutUs-Sustainability-tablet.webp (1400×800)
✅ AboutUs-Sustainability-desktop.webp (2400×1200)

✅ AboutUs-Community-mobile.webp (800×600)
✅ AboutUs-Community-tablet.webp (1400×800)
✅ AboutUs-Community-desktop.webp (2400×1200)
```

---

## Where These Images Appear

- **AboutUs-WhoWeAre**: Hero section at top of About page
- **AboutUs-Sustainability**: "Sustainability & Infrastructure" section
- **AboutUs-Community**: "How We Operate" section (ethos/philosophy)

---

## Technical Details

- **Format:** WebP (30% smaller than JPG)
- **Quality:** 80 (excellent quality/size balance)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background images lazy load with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image

