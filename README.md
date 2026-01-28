# Rubber Armstrong Website

Official website for Rubber Armstrong Burning Man camp.

## Version 1.0 Baseline

**Released:** 28 January 2026

This marks the stable v1.0 release of the Rubber Armstrong website, ready for the 2026 season.

## Live Sites

- **Main Site**: https://rubberarmstrong.com
- **Statement of Intent Form**: https://soi.rubberarmstrong.com

## Project Status

✅ **Version 1.0 Complete** - Baseline release (28 January 2026)
- Main site deployed on Cloudflare Pages
- SOI form live and collecting submissions
- Google Sheets database operational
- Google Contacts auto-sync configured
- Google Analytics 4 tracking installed
- SEO optimised (sitemaps, robots.txt, meta tags)
- Extensionless URLs with proper redirects
- Custom 404 page
- Consistent navigation across all pages
- Content cleanup complete

## Quick Links

- **Phase 2 Checklist**: [`PHASE_2_CHECKLIST.md`](PHASE_2_CHECKLIST.md) - Pre-Stewards Sale tasks
- **Phase 3 Checklist**: [`PHASE_3_CHECKLIST.md`](PHASE_3_CHECKLIST.md) - Pre-event tasks
- **Documentation**: [`docs/README.md`](docs/README.md) - Complete documentation index

## Project Structure

```
├── main-site/           # Main website (rubberarmstrong.com)
├── soi-site/            # Statement of Intent form (soi.rubberarmstrong.com)
├── scripts/             # Google Apps Scripts for automation
├── docs/                # Documentation
├── shared/              # Shared assets and design tokens
└── camp_assets/         # Original assets and reference materials
```

## Technology Stack

- **Hosting**: Cloudflare Pages (automatic deployment from GitHub)
- **Analytics**: Google Analytics 4 + Cloudflare Web Analytics
- **Backend**: Google Apps Script (form handling, contacts sync, analytics reporting)
- **Database**: Google Sheets
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Version Control**: Git + GitHub

## Key Features

### Main Site
- Responsive design (mobile, tablet, desktop)
- Optimized images with responsive srcsets
- Custom Rubber Armstrong font
- Accessible navigation
- SEO optimized
- All pages fully functional
- **Interactive calendar** (`/dates`) with event details modal

### SOI Form
- Real-time validation
- Duplicate detection
- Country selection with phone code integration
- Burn history tracking (2010-2025)
- Automatic Google Sheets integration
- Spam protection (honeypot field)

### Automation
- **Google Contacts Sync**: Approved applicants automatically added with "2026 Rubbers" label
- **Analytics Reporting**: Weekly email reports (Mondays 9 AM PT) to rubberarmstrongcamp@gmail.com
- **Burns Count Display**: Automatic calculation of burn counts from year lists

## Development

### Local Testing

Main site:
```bash
cd main-site
python -m http.server 8000
# Visit http://localhost:8000
```

SOI form (requires backend configuration):
```bash
cd soi-site
python -m http.server 8001
# Visit http://localhost:8001
```

### Deployment

Automatic deployment via Cloudflare Pages:
1. Push to `main` branch
2. Cloudflare automatically builds and deploys
3. Changes live in 1-2 minutes

## Version 1.0 Release Notes (28 January 2026)

### Content & Navigation
- Removed Contact page (returns 404)
- Removed Roles from navigation (page still accessible, being migrated to separate project)
- Standardised navigation: About, Camp Life, Tickets, Join, Dates
- "Named in cosmic tribute..." text only on Home page
- "Working Camp, Not a Hotel" messaging only on Camp Life page
- Added "Timing and Tickets" section to Join page
- Removed duplicate content from Ticketing page

### Technical
- Extensionless URLs enforced via `_redirects`
- 301 redirects from `.html` versions to clean URLs
- Custom 404 page with consistent branding
- Canonical non-www host configured
- Updated sitemap.xml with extensionless URLs
- Gold 2px borders on content cards

### Archived
- Roles content preserved in `docs/roles.md` for migration

See [`docs/CHANGELOG.md`](docs/CHANGELOG.md) for full history.

## Documentation

See [`docs/README.md`](docs/README.md) for complete documentation including:
- Setup guides
- Google Apps Script configuration
- Analytics automation
- Troubleshooting
- Migration history

## Contact

**Email**: rubberarmstrongcamp@gmail.com  
**Established**: 2015  
**Location**: Black Rock City, Nevada

---

**Version**: 1.0 ✅  
**Next Milestone**: Stewards Sale (March 2026)  
**Last Updated**: 28 January 2026
