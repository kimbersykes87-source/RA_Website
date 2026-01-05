# Rubber Armstrong Website

Official website for Rubber Armstrong Burning Man camp.

## Live Sites

- **Main Site**: https://rubberarmstrong.com
- **Statement of Intent Form**: https://soi.rubberarmstrong.com

## Project Status

✅ **Phase 1 Complete** - Initial launch (January 2026)
- Main site deployed on Cloudflare Pages
- SOI form live and collecting submissions
- Google Sheets database operational
- Google Contacts auto-sync configured
- Google Analytics 4 tracking installed
- SEO optimized (sitemaps, robots.txt, meta tags)
- Site-wide tone-of-voice refactor complete
- **HTML encoding issues fixed (January 5, 2026)**

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

## Recent Updates

### January 5, 2026
- ✅ Fixed HTML encoding issues (semicolons → hyphens) in index.html, about.html, camp-life.html
- ✅ Fixed all CSS class names and variable references
- ✅ Fixed logo and asset paths
- ✅ Removed duplicate content from about.html and camp-life.html
- ✅ Removed Monday meeting references
- ✅ All pages now displaying correctly with proper headers, navigation, and styling

### January 4, 2026
- ✅ Resolved CORS issue with SOI form
- ✅ Deployed main site to Cloudflare Pages
- ✅ Site-wide tone-of-voice refactor
- ✅ Google Analytics and Contacts sync configured

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

**Current Phase**: Phase 1 Complete ✅  
**Next Milestone**: Stewards Sale (typically mid-March)  
**Last Updated**: January 5, 2026
