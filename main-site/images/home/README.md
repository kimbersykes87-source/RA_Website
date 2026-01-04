# Home Page Background Images

## Fully Automated Export Workflow

### One Click, All 6 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/Home-Hero.jpg`
- `camp_assets/images/Home-Infrastructure.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportHomeImages.jsx`
3. ✅ **Done!** Script automatically processes both images

**No prompts. No manual selection. Fully automated.**

### What the Script Does:
- Automatically opens each JPG from `camp_assets/images/`
- Resizes to 2400×1200 (preserving aspect ratio)
- Exports 3 responsive sizes per image (6 files total):
  - Mobile: 800×600
  - Tablet: 1400×800
  - Desktop: 2400×1200
- Saves as high-quality JPG (quality: 10/12)
- Cloudflare automatically converts JPG→WebP on delivery for optimal performance
- Closes files without saving
- Exports to `main-site/images/home/`
- Shows completion report

---

## Final File List (6 files total)

When complete, this folder should contain:

```
✅ Home-Hero-mobile.jpg (800×600)
✅ Home-Hero-tablet.jpg (1400×800)
✅ Home-Hero-desktop.jpg (2400×1200)

✅ Home-Infrastructure-mobile.jpg (800×600)
✅ Home-Infrastructure-tablet.jpg (1400×800)
✅ Home-Infrastructure-desktop.jpg (2400×1200)
```

---

## Where These Images Appear

- **Home-Hero**: Hero section at top of homepage behind logomark, EST. 2015, and title
- **Home-Infrastructure**: "What We Bring to the Playa" section background

---

## Image Recommendations

### Home-Hero
**Concept:** Camp overview/aerial/wide establishing shot
- Shows the full camp setup on playa
- Conveys scale and infrastructure
- Sets the tone: "This is Rubber Armstrong"
- Landscape 2400×1200

**Alternative concepts:**
- Aerial/drone shot of camp
- Wide camp overview at sunset
- Full camp structure and layout
- Establishing shot showing placement

### Home-Infrastructure
**Concept:** Infrastructure/systems in action
- Shows physical gifts: solar panels, shade structures, camp life in action
- Conveys: "This is what we build"
- Reinforces section content about infrastructure, solar, bar, art car
- Landscape 2400×1200

**Alternative concepts:**
- Solar panel arrays
- Shade structure details
- Art car at camp
- Bar/communal space
- Sustainable systems in action

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background images lazy load with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

