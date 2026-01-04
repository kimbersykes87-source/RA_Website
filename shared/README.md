# Shared Assets

This directory contains resources shared across all Rubber Armstrong sites (main site, SOI subdomain, Join subdomain).

## Structure

```
shared/
├── design-tokens.css    # CSS custom properties for consistent design
├── assets/              # Logos, favicon, icons
│   └── logo.svg
├── fonts/               # Self-hosted custom fonts
└── README.md (this file)
```

## Design Tokens

The `design-tokens.css` file defines all design system values:

- **Colors**: Background, text, accent, feedback colors
- **Typography**: Font sizes (fluid), families, weights, line heights
- **Spacing**: 8px-based spacing scale
- **Layout**: Container widths, breakpoints
- **Effects**: Border radius, shadows, transitions
- **Z-index**: Layering system
- **Accessibility**: Touch targets, focus indicators

### Usage

Import design tokens at the top of each site's stylesheet:

```css
@import url('../shared/design-tokens.css');
```

Then use CSS custom properties:

```css
.button {
  background-color: var(--color-accent);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base);
}
```

## Assets

### Logo

- `assets/logo.svg` - Main Rubber Armstrong logo
- Used in site headers and favicons
- Currently a placeholder - replace with actual logo

### Favicon

Generate favicon from logo.svg using a favicon generator tool.

## Fonts

Custom heading font files go in the `fonts/` directory:

- `custom-heading.woff2` (primary)
- `custom-heading.woff` (fallback)

Body text uses system font stack for best performance.

## Color Palette

Minimalist dark theme with desert-inspired accents:

- **Primary Background**: Near-black (#0a0a0a, #121212)
- **Text**: Off-white (#f5f5f5, #e0e0e0)
- **Accent**: Warm desert tone (#d4a574)
- **Success**: Muted green (#5a9d7e)
- **Error**: Muted red (#d47474)

## Accessibility

All design tokens support WCAG 2.1 AA compliance:

- Color contrast: 4.5:1 minimum for text
- Touch targets: 44px minimum
- Focus indicators: 2px outline with offset
- Keyboard navigation support

## Updating Design System

To update the design system:

1. Edit `design-tokens.css`
2. Test changes in all three sites
3. Verify accessibility compliance
4. Document changes in this README
5. Update all sites simultaneously to maintain consistency

