# Rubber Armstrong 2026 - Official Website

A monorepo containing three static websites for the Rubber Armstrong Burning Man camp.

**Est. 2015** | Burning Man Camp | Black Rock City, Nevada

## Overview

This repository contains:

1. **Main Site** (`rubberarmstrong.com`) - Informational hub about the camp
2. **Statement of Intent** (`soi.rubberarmstrong.com`) - Values-focused alignment form
3. **Join Form** (`join.rubberarmstrong.com`) - Phase 2: Operational commitment form (post-ticket sales)

## Repository Structure

```
rubber-armstrong-2026/
├── main-site/           # Main informational website
├── soi-site/            # Statement of Intent form subdomain
├── shared/              # Shared assets, fonts, design tokens
├── content-manifesto-reference.md
└── README.md (this file)
```

## Phasing

### Phase 1 (Current - Next 2 Months)
- ✅ Main site with 6 pages
- ✅ SOI form subdomain
- ✅ Gallery with curated images
- ✅ Full WCAG 2.1 AA accessibility
- ✅ Cloudflare Web Analytics

### Phase 2 (After Ticket Sales)
- Join subdomain for confirmed camper intake

## Technology Stack

- **Hosting**: Cloudflare Pages
- **Frontend**: Plain HTML5, CSS3, Vanilla JavaScript
- **No Build Step**: Static files only
- **Analytics**: Cloudflare Web Analytics (privacy-focused)
- **Image Optimization**: Cloudflare automatic optimization (WebP, AVIF)
- **Form Backend**: Google Apps Script → Google Sheets

## Design Principles

- **Separation of intent vs commitment** - Deliberate workflow design
- **Minimal copy, strong tone** - No fluff, confident language
- **Calm and intentional** - Serene, purposeful pages
- **Values-driven** - Culture and alignment over logistics
- **No social media** - Private community, not broadcast platform
- **Accessibility first** - WCAG 2.1 AA compliance
- **Privacy-focused** - No tracking cookies

## Local Development

Each site can be developed independently:

```bash
# Main site
cd main-site
# Open index.html in browser or use local server

# SOI site
cd soi-site
# Open index.html in browser or use local server

# Recommended: Use Python's simple HTTP server
python -m http.server 8000
# Then navigate to http://localhost:8000/main-site/
```

## Deployment

### Main Site (rubberarmstrong.com)

1. Connect repository to Cloudflare Pages
2. Set build configuration:
   - **Build command**: (none)
   - **Build output directory**: `main-site`
   - **Root directory**: (leave as root)
3. Add custom domain: `rubberarmstrong.com`

### SOI Site (soi.rubberarmstrong.com)

1. Create new Cloudflare Pages project
2. Connect same repository
3. Set build configuration:
   - **Build command**: (none)
   - **Build output directory**: `soi-site`
   - **Root directory**: (leave as root)
4. Add custom domain: `soi.rubberarmstrong.com`
5. Configure `soi-site/js/config.js` with Google Apps Script endpoint URL

### Join Site (Phase 2)

Will be deployed similarly after Phase 2 development.

## Shared Assets

The `shared/` directory contains resources used across all sites:

- **design-tokens.css** - Color palette, spacing, typography
- **assets/** - Logo, favicon
- **fonts/** - Self-hosted custom fonts for headings

All sites import these shared resources to maintain consistent branding.

## Content Updates

### Main Site

Content is stored directly in HTML files. To update:

1. Edit the relevant HTML file in `main-site/`
2. Commit and push changes
3. Cloudflare Pages automatically redeploys

### Gallery Images

1. Add optimized JPG images to `main-site/images/gallery/[year]/`
2. Update `gallery.html` with new image references
3. Cloudflare automatically serves WebP/AVIF versions

### Ticketing Information

The `ticketing.html` page should be updated annually with:
- Current Burning Man ticket sale dates
- RA's directed group sale approach
- Any changes to membership/ticket relationship

## Google Sheets Integration

### Required Sheets Structure

Create a Google Sheet with these tabs:

1. **SOI_Staging** - All form submissions (Status: Pending)
2. **SOI_Approved** - Approved applicants
3. **SOI_Rejected** - Declined applicants
4. **SOI_2026** - End-of-season archive

### Column Structure

(See `soi-site/README.md` for detailed column definitions)

### Approval Workflow

1. Review entries in `SOI_Staging` with Status = "Pending"
2. Update Status to "Approved" or "Rejected"
3. Copy entire row to `SOI_Approved` or `SOI_Rejected` tab
4. Add "Reviewed By" (your name) and "Reviewed At" (timestamp)
5. Optionally add "Internal Notes"

## Analytics

Access Cloudflare Web Analytics through your Cloudflare dashboard:
- Navigate to Web Analytics
- View page views, referrers, device types
- Privacy-focused: no cookies, no personal data collection

## Support & Maintenance

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Performance Targets
- Lighthouse score: 90+ on all metrics
- First Contentful Paint: <2s
- Time to Interactive: <3s

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation supported
- Screen reader tested
- Proper ARIA landmarks and labels

## Project History

**2026** - New static site launches  
**2015** - Rubber Armstrong camp established

## License

© 2026 Rubber Armstrong. All rights reserved.

---

*"Named in cosmic tribute to humanity's giant leap, Rubber Armstrong honours a crew whose arms need barely twisting to launch spontaneously into journeys of wonder."*

