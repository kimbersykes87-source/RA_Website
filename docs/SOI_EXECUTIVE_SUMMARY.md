# Statement of Intent (SOI) — Executive summary

**Production URL:** [https://soi.rubberarmstrong.com](https://soi.rubberarmstrong.com)  
**Purpose:** Single-page **Statement of Intent** form for prospective Rubber Armstrong campmates (Burning Man). Collects personal, contact, referral, Burn history, and contribution text; submits to **Google Apps Script**, which writes to **Google Sheets**. Static hosting on **Cloudflare Pages**; no application server in this repository.

**Note on naming:** The camp domain is **rubberarmstrong.com** (not “rubbersarmstrong”).

---

## Executive snapshot

| Area | What we use |
|------|-------------|
| **Frontend** | `soi-site/index.html`, vanilla JS modules (`js/form.js` et al.), CSS under `soi-site/css/` |
| **Hosting** | Cloudflare Pages — project root **`soi-site`**, no build step, deploy from `main` |
| **“Database”** | **Google Sheets** (spreadsheet tabs: staging / approved / rejected / archive). Not SQL; no separate DB password in the app. |
| **Backend** | **Google Apps Script** Web App (`doPost`), deployed with access **Anyone**; URL in `soi-site/js/config.js` |
| **Secrets / passwords** | No DB credentials in the static site. Access is: **Google account** that owns the Sheet + Script, **Cloudflare** dashboard for DNS/Pages, optional **Cloudflare Web Analytics** token. Apps Script execution uses the deployer’s Google identity (and OAuth), not a shared password stored in the repo. |

This matches the **same operational model** as the rest of the Rubber Armstrong web properties: static Pages + Sheets + Apps Script, not a hosted database with connection strings.

---

## Brand assets and file locations

### Logos (bundled with SOI)

| Asset | Path (repo) | Usage |
|-------|----------------|--------|
| Logomark (default) | `soi-site/assets/logomark.svg` | Favicon, header link to main site, secondary header mark |
| Logomark (white variant) | `soi-site/assets/logomark-white.svg` | Available for dark-on-dark contexts if needed |

**HTML references:** `index.html` uses `assets/logomark.svg` for `<link rel="icon">`, the header home link, and an inline header image (`?v=2` cache-bust on one instance).

### Social / Open Graph image (hosted on main site)

Open Graph and Twitter cards point at a **hero image on the main domain**, not under `soi-site/`:

- `https://rubberarmstrong.com/images/home/Home-Hero-desktop.jpg`

### Brand font (custom wordmark)

- `soi-site/css/design-tokens.css` declares `@font-face` for **RubberArmstrong** from `../fonts/RubberArmstrong.otf` (i.e. **`soi-site/fonts/RubberArmstrong.otf`** relative to the CSS file).
- Canonical reference copy may live under **`shared/fonts/RubberArmstrong.otf`** per `shared/BRAND_ASSETS_GUIDE.md`; ensure the font file exists at the path your CSS expects when building a similar page, or fall back to the stack `Impact, 'Arial Black', sans-serif`.

---

## Hosting and deployment workflow

1. **Repository:** Same Git repo as the main site; SOI is a **separate Cloudflare Pages project** with **Build output directory / root = `soi-site`** (no build command).
2. **Custom domain:** `soi.rubberarmstrong.com` — DNS and SSL via Cloudflare (automatic HTTPS).
3. **Deploy:** Push to `main` (typical) triggers Pages deploy of static files.
4. **Headers:** `soi-site/_headers` sets `Content-Type: text/html; charset=utf-8` for `/` and `/index.html`.
5. **Local preview:** `cd soi-site && python -m http.server 8001` — form still **POSTs to the deployed** Apps Script URL unless you change `js/config.js`.

**Deeper detail:** [SETUP_GUIDE.md](SETUP_GUIDE.md), [SOI.md](SOI.md) (technical reference), [soi-site/README.md](../soi-site/README.md).

---

## Data and “passwords” setup (same model as production)

To replicate this stack for a similar form **without** introducing SQL or app-specific passwords:

1. **Google Sheet** — Holds submissions (tabs such as `SOI_Staging`, etc.). Access controlled by **Google Workspace / Google account** permissions, not a connection string in code.
2. **Google Apps Script** — Bound or opened by spreadsheet ID; **Deploy → Web app** with **Execute as** your account and **Who has access: Anyone** (required for anonymous form POSTs without consent HTML).
3. **Frontend** — Only stores the **public** web app URL in `soi-site/js/config.js` (`APPS_SCRIPT_ENDPOINT`). Treat redeploy URL changes as a config + Pages redeploy step.
4. **Cloudflare** — Pages project and optional Web Analytics token (replace placeholder in `index.html` when configuring).

Production script maintenance may live in the **RA_Emails** repository; this repo holds the form and reference scripts — see [AGENTS.md](../AGENTS.md).

---

## Full stylesheets (for a similar-looking page)

SOI loads **`css/styles.css`**, which **`@import`**s **`css/design-tokens.css`**. Together they define layout, form components, burns table, messages, and accessibility. Copy both files (and the font file path) to match the look.

### `design-tokens.css`

```css
/* 
 * Rubber Armstrong Design Tokens
 * Shared across all sites for consistent branding
 * Est. 2015 - Burning Man Camp
 */

:root {
  /* Colors - Minimalist Dark Theme */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #121212;
  --color-bg-elevated: #1a1a1a;
  
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #e0e0e0;
  --color-text-muted: #a0a0a0;
  
  /* Accent - Desert-inspired warm tone */
  --color-accent: #d4a574;
  --color-accent-hover: #e0b68a;
  --color-accent-active: #c89960;
  
  /* Interactive states */
  --color-interactive: #e0b68a;
  --color-interactive-hover: #f0c69a;
  
  /* Feedback colors */
  --color-success: #5a9d7e;
  --color-success-bg: #1a3d2e;
  --color-error: #d47474;
  --color-error-bg: #3d1a1a;
  --color-warning: #d4a574;
  --color-warning-bg: #3d2e1a;
  
  /* Typography Scale - Fluid responsive sizing */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-md: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --font-size-2xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
  --font-size-3xl: clamp(2.5rem, 2rem + 2.5vw, 3.5rem);
  
  /* Font families */
  --font-brand: 'RubberArmstrong', Impact, 'Arial Black', sans-serif;
  --font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
  
  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Spacing scale - Based on 8px grid */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 6rem;     /* 96px */
  --space-16: 8rem;     /* 128px */
  
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows - Subtle for dark theme */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-index layers */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  
  /* Breakpoints (for reference in media queries) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  
  /* Touch targets - Accessibility */
  --touch-target-min: 44px;
  
  /* Focus indicator */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-accent);
}

/* Rubber Armstrong Custom Brand Font */
@font-face {
  font-family: 'RubberArmstrong';
  src: url('../fonts/RubberArmstrong.otf') format('opentype');
  font-weight: normal;
  font-display: swap;
  font-style: normal;
}

/* Base reset and global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

/* Focus visible for accessibility */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Remove default button styles */
button {
  font-family: inherit;
  border: none;
  background: none;
  cursor: pointer;
}

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.skip-to-content {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: var(--radius-md);
  z-index: var(--z-tooltip);
  transform: translateY(-200%);
  transition: transform var(--transition-fast);
}

.skip-to-content:focus {
  transform: translateY(0);
}

/* Brand name styling - Uses custom Rubber Armstrong font */
.brand-name {
  font-family: var(--font-brand);
  font-weight: normal;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### `styles.css` (imports `design-tokens.css` — keep the `@import` line if you split files)

```css
/*
 * Rubber Armstrong - Statement of Intent Form Styles
 * Form-focused, consistent with main site, WCAG 2.1 AA compliant
 */

@import url('design-tokens.css');

/* ====================================
   Layout & Container
   ==================================== */

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: var(--container-md);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

/* ====================================
   Header
   ==================================== */

.site-header {
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-bg-elevated);
  padding: var(--space-5) 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: var(--space-3);
}

.site-logo {
  display: block;
  max-width: 60px;
  height: auto;
}

.site-logo img {
  width: 100%;
  height: auto;
  max-height: 50px;
  object-fit: contain;
}

.site-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.site-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ====================================
   Main Content
   ==================================== */

main {
  flex: 1;
  padding: var(--space-8) 0;
}

@media (min-width: 768px) {
  main {
    padding: var(--space-12) 0;
  }
}

/* ====================================
   Form Container
   ==================================== */

.form-intro {
  text-align: center;
  margin-bottom: var(--space-10);
}

.form-intro h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
}

.form-intro p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-4);
}

.form-notice {
  background-color: var(--color-bg-elevated);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent);
  margin: var(--space-6) auto var(--space-8);
  max-width: 600px;
}

.form-notice p {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* ====================================
   Form Sections
   ==================================== */

.form-section {
  margin-bottom: var(--space-10);
}

.form-section-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-accent);
}

.form-section-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

/* ====================================
   Form Fields
   ==================================== */

.form-group {
  margin-bottom: var(--space-6);
}

/* Form row - two columns on desktop */
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-row .form-group {
  margin-bottom: 0;
}

label {
  display: block;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
}

label .required {
  color: var(--color-accent);
  margin-left: var(--space-1);
}

label .optional {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-xs);
  margin-left: var(--space-2);
}

.field-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-2);
  line-height: var(--line-height-normal);
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
  border: 2px solid var(--color-bg-elevated);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

/* Number input specific styling */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
}

input[type="text"]:hover,
input[type="email"]:hover,
input[type="tel"]:hover,
input[type="number"]:hover,
textarea:hover,
select:hover {
  border-color: var(--color-accent);
}

textarea {
  min-height: 120px;
  resize: vertical;
  line-height: var(--line-height-relaxed);
}

textarea.large {
  min-height: 180px;
}

/* Select dropdown styling */
select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23a0a0a0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-8);
}

/* Phone input group */
.phone-input-group {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-3);
}

@media (min-width: 640px) {
  .phone-input-group {
    grid-template-columns: 140px 1fr;
  }
}

.phone-input-group select {
  padding-right: var(--space-6);
}

.phone-input-group input[type="tel"] {
  flex: 1;
}

/* Radio buttons and checkboxes */
.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.radio-option:hover,
.checkbox-option:hover {
  background-color: var(--color-bg-elevated);
}

.radio-option input[type="radio"],
.checkbox-option input[type="checkbox"] {
  margin-top: 2px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--color-accent);
}

.radio-option label,
.checkbox-option label {
  margin: 0;
  cursor: pointer;
  font-weight: var(--font-weight-normal);
  flex: 1;
}

/* Checkbox grid for burns history */
.checkbox-group-label {
  display: block;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  font-size: var(--font-size-sm);
}

.checkbox-group-label .optional {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-xs);
  margin-left: var(--space-2);
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-bg-elevated);
}

@media (min-width: 640px) {
  .checkbox-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.checkbox-grid .checkbox-option {
  padding: var(--space-2);
  margin: 0;
  background-color: transparent;
}

.checkbox-grid .checkbox-option:hover {
  background-color: var(--color-bg-elevated);
}

.checkbox-grid .checkbox-option label {
  font-size: var(--font-size-sm);
}

/* Burns history table layout */
.burns-table {
  background-color: var(--color-bg-secondary);
  border: 2px solid var(--color-bg-elevated);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.burns-table-header {
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  background-color: var(--color-bg-elevated);
  padding: var(--space-3) var(--space-4);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  text-align: center;
  border-bottom: 2px solid var(--color-bg-primary);
}

.burns-year-column {
  text-align: left;
}

.burns-checkbox-column {
  text-align: center;
}

.burns-table-row {
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-bg-elevated);
  align-items: center;
}

.burns-table-row:last-child {
  border-bottom: none;
}

.burns-table-row:hover {
  background-color: var(--color-bg-elevated);
}

.burns-covid-note {
  background-color: rgba(212, 165, 116, 0.05);
}

.burns-year-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.burns-checkbox-cell {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.burns-checkbox-cell input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--color-accent);
  margin: 0;
}

@media (max-width: 640px) {
  .burns-table-header,
  .burns-table-row {
    grid-template-columns: 1fr 80px 80px;
  }
  
  .burns-table-header {
    font-size: var(--font-size-xs);
  }
  
  .burns-checkbox-cell input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
}

/* ====================================
   Validation & Error States
   ==================================== */

.field-error {
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--space-2);
  display: none;
}

.form-group.has-error input,
.form-group.has-error textarea,
.form-group.has-error select {
  border-color: var(--color-error);
}

.form-group.has-error .field-error {
  display: block;
}

/* ====================================
   Messages
   ==================================== */

.message {
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
  display: none;
  align-items: start;
  gap: var(--space-3);
  animation: slideDown 0.3s ease-out;
}

.message.show {
  display: flex;
}

.message-success {
  background-color: var(--color-success-bg);
  border-left: 4px solid var(--color-success);
  color: var(--color-success);
}

.message-error {
  background-color: var(--color-error-bg);
  border-left: 4px solid var(--color-error);
  color: var(--color-error);
}

.message-warning {
  background-color: var(--color-warning-bg);
  border-left: 4px solid var(--color-warning);
  color: var(--color-warning);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====================================
   Submit Button
   ==================================== */

.form-actions {
  margin-top: var(--space-10);
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-bg-primary);
  background-color: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  min-height: var(--touch-target-min);
  width: 100%;
  max-width: 400px;
}

.btn:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn:active {
  background-color: var(--color-accent-active);
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn:disabled:hover {
  background-color: var(--color-accent);
  box-shadow: none;
}

/* Loading state */
.btn.loading {
  position: relative;
  color: transparent;
}

.btn.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin-left: -10px;
  margin-top: -10px;
  border: 2px solid var(--color-bg-primary);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ====================================
   Footer
   ==================================== */

.site-footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-bg-elevated);
  padding: var(--space-6) 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-align: center;
}

.footer-content a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-content a:hover {
  color: var(--color-accent-hover);
}

@media (min-width: 640px) {
  .footer-content {
    flex-direction: row;
    justify-content: center;
  }
}

/* ====================================
   Honeypot (spam protection)
   ==================================== */

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  tabindex: -1;
}

/* ====================================
   Accessibility
   ==================================== */

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-accent: #f0c69a;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="number"],
  textarea,
  select {
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print styles */
@media print {
  .site-header,
  .site-footer,
  .btn {
    display: none;
  }
  
  body {
    background-color: white;
    color: black;
  }
  
  input,
  textarea,
  select {
    border: 1px solid black;
  }
}

/* ====================================
   Responsive Adjustments
   ==================================== */

@media (max-width: 640px) {
  .form-intro h1 {
    font-size: var(--font-size-xl);
  }
  
  .form-section-title {
    font-size: var(--font-size-lg);
  }
}
```

---

## Related documentation

- [SOI.md](SOI.md) — Architecture, payload, Sheets columns, Apps Script behaviour  
- [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md) — Script structure and sheet schema  
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — Form submission and Sheets issues  

---

*This summary reflects the `soi-site/` implementation in the RA_Website repository. Stylesheets are duplicated here for portability; the source of truth remains `soi-site/css/`.*
