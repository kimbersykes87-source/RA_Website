# Getting Started - Rubber Armstrong 2026

**Version:** 1.0 ✅  
**Released:** 28 January 2026

---

## What's Live and Working

### Live Sites
- **Main Site:** https://rubberarmstrong.com  
  ✅ 6 pages in navigation (Home, About, Camp Life, Tickets, Join, Dates)
  ✅ Gallery and Roles pages accessible but not in main navigation
- **SOI Form:** https://soi.rubberarmstrong.com  
  ✅ 15-field operational intake form with validation

### Working Features
- ✅ Form submissions → Google Sheets backend
- ✅ Google Sheets with 4 tabs (Staging, Approved, Rejected, Archive)
- ✅ Cloudflare Web Analytics on both sites
- ✅ Responsive design (desktop + mobile)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ SEO optimization (sitemap, robots.txt, meta tags)
- ✅ Google Contacts auto-sync (ready to deploy)
- ✅ Weekly analytics reporting (ready to deploy)
- ✅ **Interactive Calendar** (`/dates`) - CSV-based event management with modal details

---

## Quick Reference

### URLs
- Main site: https://rubberarmstrong.com
- SOI form: https://soi.rubberarmstrong.com

### Google Analytics
- Measurement ID: G-1GN0CT0WN9
- Property ID: 518391310
- Reports: Weekly Mondays 9 AM PT to rubberarmstrongcamp@gmail.com

### Cloudflare
- Main site project: Connected to GitHub main branch
- SOI site project: Connected to GitHub main branch
- Auto-deploy: 1-2 minutes after push

### Google Apps Script
- Project: SOI Form Handler
- Web App URL: [Your deployed URL]
- Scripts: Form handler, Google Contacts sync, Analytics reporting

---

## How to Review SOI Submissions

### Daily Workflow

1. **Open Google Sheet:** "RA 2026 SOI Submissions"
2. **Go to SOI_Staging tab**
3. **Review entries with Status = "Pending"**
4. **For each submission:**
   - Read all responses carefully
   - Make decision: Approve or Reject
   - Change Status dropdown to "Approved" or "Rejected"
   - Row auto-moves to SOI_Approved or SOI_Rejected tab
   - Add "Reviewed By" and "Reviewed At" (optional)
   - Add "Internal Notes" if needed

### Auto-Move Functionality
When you change Status:
- **Status → "Approved"** = Row moves to SOI_Approved ✅
- **Status → "Rejected"** = Row moves to SOI_Rejected ❌
- **Status = "Pending"** = Row stays in SOI_Staging for review

---

## How to Update Content

### Update Website Pages

```bash
# 1. Edit HTML files in main-site/ or soi-site/
# 2. Commit and push:
git add .
git commit -m "Update content"
git push
# 3. Cloudflare auto-deploys in 1-2 minutes
```

### Add Gallery Images

1. Add images to `main-site/images/gallery/YEAR/`
2. Update `main-site/gallery.html` with new image tags
3. Commit and push (see above)

---

## Next Steps

### Now (January 2026)
- ✅ **Pre-launch audit complete** - All critical issues fixed
- ✅ **Email templates ready** - All templates updated with clarifications
- ✅ **Website content updated** - Steward Sale, timelines, approval process clarified
- ✅ Share SOI form link with potential campers
- ✅ Review submissions as they come in
- ✅ **Ready for email campaign launch**
- Optional: Deploy Google Contacts sync (see [SETUP_GUIDE.md](SETUP_GUIDE.md))
- Optional: Enable weekly analytics emails (see [SETUP_GUIDE.md](SETUP_GUIDE.md))

### Before Stewards Sale (typically mid-March)
- Add custom icons/favicon
- Complete 2022 gallery images
- Refine copy and voice
- Add packing list page
- Add FAQ page
- Build join.rubberarmstrong.com
- Add Rubber Armstrong Express page
- Add Steward Sale ticket tracker

### After Stewards Sale
- Launch Join form for confirmed campers
- Continue reviewing and approving applicants

---

## Project Structure

### Site Files
- `main-site/` - Main website (rubberarmstrong.com)
- `soi-site/` - SOI form (soi.rubberarmstrong.com)
- `shared/` - Shared assets (CSS, fonts, images)
- `camp_assets/` - Original assets from camp

### Scripts
- `scripts/google-analytics-daily-report.js` - Weekly analytics email
- `scripts/google-contacts-sync.js` - Auto-sync to Google Contacts
- `scripts/fix-burns-count-display.js` - Fix burn count display (run once)

**Note:** Apps Script (form handler, contacts sync, email campaigns, analytics) lives in the RA_Emails repository.

### Documentation
- `docs/GETTING_STARTED.md` - This file
- `docs/SETUP_GUIDE.md` - Complete setup instructions
- `docs/APPS_SCRIPT_GUIDE.md` - Apps Script reference
- `docs/TROUBLESHOOTING.md` - Common issues and fixes
- `docs/content-manifesto-reference.md` - Writing guidelines
- `docs/archive/` - Historical documentation

---

## Common Tasks

### View Analytics
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click Workers & Pages → Select your project
3. Click Metrics tab
4. View page views, visitors, referrers, devices

### Test Form Submissions
1. Go to https://soi.rubberarmstrong.com/
2. Fill out form with test data
3. Submit
4. Check Google Sheets SOI_Staging tab for new row
5. Verify all data appears correctly

### Backup Data
1. Open Google Sheet
2. File → Download → Microsoft Excel (.xlsx)
3. Save with date stamp
4. Store backup safely

---

## Getting Help

### Documentation
- **Setup issues:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Apps Script issues:** See [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md)
- **Problems/errors:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Content guidelines:** See [content-manifesto-reference.md](content-manifesto-reference.md)

### Common Issues Quick Links

**Form submissions not working?**
→ See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#form-submission-problems)

**Burns data showing scientific notation?**
→ See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#burns-data-issues)

**Analytics not working?**
→ See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#analytics-issues)

**Site not deploying?**
→ See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#deployment-issues)

---

## Success Metrics

The site is considered working correctly when:
- ✅ Form submissions land in SOI_Staging with all fields correct
- ✅ Burns data shows as "2015, 2016, 2017" not scientific notation
- ✅ Burns count columns show numbers (e.g., 3)
- ✅ Phone code shows "+1" not "1"
- ✅ Status change to Approved/Rejected auto-moves row
- ✅ All data preserved during move (26 columns)

**Current Status:** All metrics confirmed ✅

---

## What Makes This Project Special

### Technical
- **Static sites** - No server needed, just HTML/CSS/JS
- **Google Apps Script** - Free backend for form processing
- **Cloudflare Pages** - Free hosting with auto-deploy from GitHub
- **Google Sheets** - Free database with powerful review interface
- **Zero monthly costs** - Everything uses free tiers

### Design
- **Custom Rubber Armstrong branding** - Unique font and logo
- **Dark theme** - Easy on the eyes for playa dust
- **Mobile-first** - Works on any device
- **Accessibility** - WCAG 2.1 AA compliant for everyone
- **Fast** - Optimized images, minimal JS, blazing fast load times

---

**Ready to go!** The system is fully operational and ready to accept SOI submissions. 🎪🔥

### Version 1.0 Release (28 January 2026)
- ✅ Baseline release complete
- ✅ Navigation standardised (About, Camp Life, Tickets, Join, Dates)
- ✅ Extensionless URLs with proper redirects
- ✅ Custom 404 page
- ✅ Content cleanup complete
- ✅ Roles content archived for migration

See [CHANGELOG.md](CHANGELOG.md) for full release notes.

