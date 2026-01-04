# About Page Background Images

## Fully Automated Export Workflow

### One Click, All 9 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/AboutUs-WhoWeAre.jpg`
- `camp_assets/images/AboutUs-Sustainability.jpg`
- `camp_assets/images/AboutUs-Community.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportAboutImages-JPG.jsx`
3. ✅ **Done!** Script automatically processes all 3 images

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
- Exports to `main-site/images/about/`
- Shows completion report

---

## Final File List (9 files total)

When complete, this folder should contain:

```
✅ AboutUs-WhoWeAre-mobile.jpg (800×600)
✅ AboutUs-WhoWeAre-tablet.jpg (1400×800)
✅ AboutUs-WhoWeAre-desktop.jpg (2400×1200)

✅ AboutUs-Sustainability-mobile.jpg (800×600)
✅ AboutUs-Sustainability-tablet.jpg (1400×800)
✅ AboutUs-Sustainability-desktop.jpg (2400×1200)

✅ AboutUs-Community-mobile.jpg (800×600)
✅ AboutUs-Community-tablet.jpg (1400×800)
✅ AboutUs-Community-desktop.jpg (2400×1200)
```

---

## Where These Images Appear

- **AboutUs-WhoWeAre**: Hero section at top of About page
- **AboutUs-Sustainability**: "Sustainability & Infrastructure" section
- **AboutUs-Community**: "How We Operate" section (ethos/philosophy)

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background images lazy load with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

