# About Page Background Images

## Export Workflow (Single Run!)

### One Script, All 9 Images Exported

1. **Open Photoshop** (no need to open any files first)
2. **Run the script:** `File → Scripts → Browse → ExportAboutImages.jsx`
3. **Follow the 3 prompts:**
   - Prompt 1: Select your **HERO** image (camp overview/iconic moment)
   - Prompt 2: Select your **SUSTAINABILITY** image (solar/infrastructure)
   - Prompt 3: Select your **COMMUNITY** image (people/Radiance Hour)
4. ✅ **Done!** All 9 files exported automatically

### What the Script Does:
- Opens each image you select
- Resizes to 2400×1200 if needed
- Exports 3 responsive sizes (mobile/tablet/desktop) as WebP
- Closes the file without saving
- Repeats for all 3 images
- Shows success report

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

