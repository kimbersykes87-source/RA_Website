# Join Page Background Images

## Fully Automated Export Workflow

### One Click, All 9 Images Exported! 🚀

**Source Images:**
- `camp_assets/images/Join-Hero.jpg`
- `camp_assets/images/Join-Review.jpg`
- `camp_assets/images/Join-Welcome.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportJoinImages.jsx`
3. ✅ **Done!** Script automatically processes all 3 images

**No prompts. No manual selection. Fully automated.**

### What the Script Does:
- Automatically opens each JPG from `camp_assets/images/`
- Resizes to 2400×1200 (preserving aspect ratio)
- Exports 3 responsive sizes per image (9 files total):
  - Mobile: 800×600
  - Tablet: 1400×800
  - Desktop: 2400×1200
- Saves as high-quality JPG (quality: 10/12)
- Cloudflare automatically converts JPG→WebP on delivery for optimal performance
- Closes files without saving
- Exports to `main-site/images/join/`
- Shows completion report

---

## Final File List (9 files total)

When complete, this folder should contain:

```
✅ Join-Hero-mobile.jpg (800×600)
✅ Join-Hero-tablet.jpg (1400×800)
✅ Join-Hero-desktop.jpg (2400×1200)

✅ Join-Review-mobile.jpg (800×600)
✅ Join-Review-tablet.jpg (1400×800)
✅ Join-Review-desktop.jpg (2400×1200)

✅ Join-Welcome-mobile.jpg (800×600)
✅ Join-Welcome-tablet.jpg (1400×800)
✅ Join-Welcome-desktop.jpg (2400×1200)
```

---

## Where These Images Appear

- **Join-Hero**: Hero section at top of Join page behind the main title and intro
- **Join-Review**: "Stage 2: Review Period" section background
- **Join-Welcome**: "Ready to Start?" CTA section background

---

## Image Recommendations

### Join-Hero
**Concept:** Camp community/gathering shot
- Shows campers working together or at camp
- Conveys: community, reliability, shared purpose
- Landscape 2400×1200

**Alternative concepts:**
- Camp meeting moment
- Radiance Hour gathering
- Build crew working together
- Campmates around camp setup

### Join-Review
**Concept:** Camp leadership/team meeting/planning
- Shows the human side of the review process
- Could be: Camp organizers planning, Monday morning meeting, team huddle
- Conveys: "We care about who joins our community"
- Landscape 2400×1200

**Alternative concepts:**
- Leadership team discussion
- Planning/whiteboard moment
- Reviewing or organizing
- Decision-making in action

### Join-Welcome
**Concept:** Welcoming/invitation moment
- New campers arriving, welcome moment, camp entrance
- Someone being greeted or integrated into camp
- Conveys: "Come join us"
- Landscape 2400×1200

**Alternative concepts:**
- First day at camp
- Greeting/handshake moment
- Gate arrival
- Integration into community

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background image lazy loads with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

