# Rubber Armstrong Brand Assets Guide

## Logo Files

Located in: `shared/assets/`

- **`logo.png`** - White logo on transparent background (primary for dark theme)
- **`logo-black.svg`** - Black logo SVG (for light backgrounds if needed)

### Usage in HTML
```html
<img src="../shared/assets/logo.png" alt="Rubber Armstrong logo">
```

## Custom Font - RubberArmstrong

Located in: `shared/fonts/RubberArmstrong.otf`

This custom font is **only** used for the "RUBBER ARMSTRONG" brand name in titles and headings.

### Font Integration

The font is loaded in `shared/design-tokens.css`:
```css
@font-face {
  font-family: 'RubberArmstrong';
  src: url('../shared/fonts/RubberArmstrong.otf') format('opentype');
  font-weight: normal;
  font-display: swap;
  font-style: normal;
}
```

### Using the Brand Font

Apply the `.brand-name` class to any element containing "RUBBER ARMSTRONG":

```html
<h1 class="brand-name">Rubber Armstrong</h1>
<span class="brand-name">Rubber Armstrong</span>
```

The class automatically applies:
- Custom RubberArmstrong font
- Proper letter spacing (0.05em)
- Text transform to uppercase
- Falls back to Impact, Arial Black if font fails to load

### CSS Variable
```css
--font-brand: 'RubberArmstrong', Impact, 'Arial Black', sans-serif;
```

## Brand Font Best Practices

### DO ✅
- Use for "RUBBER ARMSTRONG" in page titles
- Use for "RUBBER ARMSTRONG" in the hero section
- Use for the camp name in headers and key branding moments
- Ensure proper fallback fonts are specified

### DON'T ❌
- Use for body text
- Use for long paragraphs
- Use for navigation links
- Use for form labels or inputs
- Overuse throughout the site (reserve for key brand moments)

## Other Fonts

### Headings (h2, h3, etc.)
System font stack:
```css
--font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Body Text
System font stack:
```css
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

## Logo Display Guidelines

### Size Recommendations
- **Header Logo**: Max height 50-60px on desktop, 40px on mobile
- **Hero Section**: Can be larger if logo is featured prominently

### Spacing
Always provide adequate whitespace around the logo:
- Minimum padding: `var(--space-4)` (16px)
- Recommended: `var(--space-5)` to `var(--space-6)` (24-32px)

### Accessibility
Always include meaningful alt text:
```html
<img src="../shared/assets/logo.png" alt="Rubber Armstrong logo">
```

## Color Usage with Logo

The white logo (`logo.png`) works best on:
- Dark backgrounds: `--color-bg-primary` (#0a0a0a)
- Medium dark: `--color-bg-secondary` (#121212)
- Elevated surfaces: `--color-bg-elevated` (#1a1a1a)

If you need a logo for light backgrounds, use `logo-black.svg`.

## Source Files

Original source files (AI, EPS) are available in:
`camp_assets/logos/`

These should NOT be included in the deployed site to keep file sizes small.

## File Structure Reference

```
shared/
├── assets/
│   ├── logo.png (White logo - PRIMARY)
│   └── logo-black.svg (Black logo - alternative)
├── fonts/
│   └── RubberArmstrong.otf (Brand font)
└── design-tokens.css (Font definitions and .brand-name class)
```

## Questions or Updates?

To update brand assets:
1. Replace files in `shared/assets/` or `shared/fonts/`
2. Ensure file names remain the same (or update all HTML references)
3. Test on all pages before deploying
4. Commit changes to Git and push to deploy

---

**Est. 2015** | For internal camp use only

