# Documentation - Rubber Armstrong 2026

Complete documentation for the Rubber Armstrong website project.

**Project Status:** Phase 1 Complete ✅ | Pre-Launch Audit Complete ✅  
**Last Updated:** January 2026

---

## Quick Start

**New to the project?** Start here:

1. **[GETTING_STARTED.md](GETTING_STARTED.md)** - Project overview, what's working, daily workflow
2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions (if starting fresh)
3. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions to common problems

---

## Documentation Files

### Core Documentation

| File | Purpose | When to Use |
|------|---------|-------------|
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | Project overview and daily workflow | First thing to read; reference for common tasks |
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Complete setup instructions | Setting up from scratch or adding new features |
| **[APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md)** | Apps Script technical reference | Working with backend code or customizing system |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues and solutions | When something isn't working right |
| **[content-manifesto-reference.md](content-manifesto-reference.md)** | Writing guidelines and brand voice | Creating or editing website content |
| **[CHANGELOG.md](CHANGELOG.md)** | Project changelog and version history | See what changed and when |

### Archive

Historical documentation (completed tasks, audits, fixes):
- [archive/PRE_LAUNCH_AUDIT_AND_FIXES.md](archive/PRE_LAUNCH_AUDIT_AND_FIXES.md) - Pre-launch audit findings and all fixes applied (January 2026)
- [archive/EMAIL_TRACKING_SETUP_AND_FIXES.md](archive/EMAIL_TRACKING_SETUP_AND_FIXES.md) - Email tracking system audit and fixes
- [archive/COMPLETED_TASKS.md](archive/COMPLETED_TASKS.md) - Phase 1 completion summary (January 2026)
- [archive/COPY_CHANGES_REVIEW.md](archive/COPY_CHANGES_REVIEW.md) - All copy changes with before/after

---

## By Topic

### Getting Started
- **Project overview** → [GETTING_STARTED.md](GETTING_STARTED.md)
- **What's working** → [GETTING_STARTED.md](GETTING_STARTED.md#whats-live-and-working)
- **Quick reference (URLs, credentials)** → [GETTING_STARTED.md](GETTING_STARTED.md#quick-reference)
- **How to review submissions** → [GETTING_STARTED.md](GETTING_STARTED.md#how-to-review-soi-submissions)
- **How to update content** → [GETTING_STARTED.md](GETTING_STARTED.md#how-to-update-content)

### Setup & Configuration
- **Initial setup** → [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Cloudflare deployment** → [SETUP_GUIDE.md](SETUP_GUIDE.md#cloudflare-pages-deployment)
- **Google Sheets setup** → [SETUP_GUIDE.md](SETUP_GUIDE.md#google-sheets-setup)
- **Apps Script setup** → [SETUP_GUIDE.md](SETUP_GUIDE.md#google-apps-script-setup)
- **Google Contacts sync** → [SETUP_GUIDE.md](SETUP_GUIDE.md#google-contacts-sync-optional)
- **Analytics setup** → [SETUP_GUIDE.md](SETUP_GUIDE.md#analytics-setup-optional)

### Apps Script Technical Details
- **System overview** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#overview)
- **File structure** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#file-structure)
- **Configuration** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#configuration)
- **Functions reference** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#key-functions)
- **Column mapping** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#column-mapping-system)
- **Adding/changing columns** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#addingchanging-columns)
- **Deployment** → [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md#deployment)

### Troubleshooting
- **Form submission problems** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#form-submission-problems)
- **Burns data issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#burns-data-issues)
- **Google Sheets issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#google-sheets-issues)
- **Auto-move problems** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#auto-move-problems)
- **Contacts sync issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#google-contacts-sync-issues)
- **Analytics issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#analytics-issues)
- **Deployment issues** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#deployment-issues)
- **Apps Script errors** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md#apps-script-errors)

### Content & Design
- **Writing guidelines** → [content-manifesto-reference.md](content-manifesto-reference.md)
- **Brand voice** → [content-manifesto-reference.md](content-manifesto-reference.md)
- **Manifesto content** → [content-manifesto-reference.md](content-manifesto-reference.md)

---

## Key Information

### Live Sites
- **Main Site:** https://rubberarmstrong.com
- **SOI Form:** https://soi.rubberarmstrong.com

### Google Analytics
- **Measurement ID:** G-1GN0CT0WN9
- **Property ID:** 518391310
- **Reports:** Weekly Mondays 9 AM PT to rubberarmstrongcamp@gmail.com

### Cloudflare
- **Main Site Project:** Connected to GitHub main branch
- **SOI Site Project:** Connected to GitHub main branch
- **Auto-deploy:** 1-2 minutes after push

### Google Apps Script
- **Project:** SOI Form Handler
- **Scripts:** Form handler, Contacts sync, Analytics reporting
- **Triggers:** Form submit, Status change, Weekly Monday 9 AM PT

---

## Project Structure

```
RubberArmstrongWebsite/
├── main-site/              # Main website (rubberarmstrong.com)
│   ├── index.html
│   ├── about.html
│   ├── camp-life.html
│   ├── gallery.html
│   ├── ticketing.html
│   ├── join.html
│   └── images/
├── soi-site/               # SOI form (soi.rubberarmstrong.com)
│   ├── index.html
│   └── js/
├── shared/                 # Shared assets (CSS, fonts, images)
│   ├── css/
│   ├── fonts/
│   └── images/
├── scripts/                # Backend scripts
│   ├── apps-script-consolidated/  # Recommended
│   │   ├── Config.gs
│   │   ├── FormHandler.gs
│   │   ├── ContactsSync.gs
│   │   ├── Analytics.gs
│   │   └── appsscript.json
│   └── [legacy scripts]
├── docs/                   # Documentation (you are here)
│   ├── README.md           # This file
│   ├── GETTING_STARTED.md
│   ├── SETUP_GUIDE.md
│   ├── APPS_SCRIPT_GUIDE.md
│   ├── TROUBLESHOOTING.md
│   ├── content-manifesto-reference.md
│   └── archive/            # Historical docs
└── camp_assets/            # Original assets from camp
```

---

## Common Tasks

### View Analytics
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → Select your project
3. Metrics tab

### Review SOI Submissions
1. Open Google Sheet: "RA 2026 SOI Submissions"
2. Go to SOI_Staging tab
3. Review entries with Status = "Pending"
4. Change Status to "Approved" or "Rejected"
5. Row auto-moves to appropriate tab

### Update Website Content
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
2. Update `main-site/gallery.html`
3. Commit and push

### Backup Data
1. Open Google Sheet
2. File → Download → Microsoft Excel (.xlsx)
3. Save with date stamp

---

## Getting Help

### By Problem Type

**Something's broken?**  
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) first

**Need to set something up?**  
→ See [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Want to understand how it works?**  
→ Read [APPS_SCRIPT_GUIDE.md](APPS_SCRIPT_GUIDE.md)

**Need daily workflow help?**  
→ See [GETTING_STARTED.md](GETTING_STARTED.md)

**Creating content?**  
→ Follow [content-manifesto-reference.md](content-manifesto-reference.md)

### Quick Troubleshooting

**Form not working?** → [Form submission problems](TROUBLESHOOTING.md#form-submission-problems)  
**Burns data wrong?** → [Burns data issues](TROUBLESHOOTING.md#burns-data-issues)  
**Auto-move not working?** → [Auto-move problems](TROUBLESHOOTING.md#auto-move-problems)  
**Site not deploying?** → [Deployment issues](TROUBLESHOOTING.md#deployment-issues)

---

## What Makes This Project Work

### Technology Stack
- **Static Sites** - HTML/CSS/JavaScript, no server needed
- **Google Apps Script** - Free backend for form processing
- **Cloudflare Pages** - Free hosting with auto-deploy from GitHub
- **Google Sheets** - Free database with powerful review interface
- **Zero Monthly Costs** - Everything uses free tiers

### Design Principles
- **Custom Rubber Armstrong branding** - Unique font and logo
- **Dark theme** - Easy on the eyes for playa dust
- **Mobile-first** - Works on any device
- **Accessibility** - WCAG 2.1 AA compliant
- **Fast** - Optimized images, minimal JS, blazing fast load times

---

## Next Steps

### Now (January 2026)
- ✅ Share SOI form with potential campers
- ✅ Review submissions as they come in
- Optional: Deploy Google Contacts sync
- Optional: Enable weekly analytics emails

### Before Stewards Sale (mid-March)
- Add custom icons/favicon
- Complete 2022 gallery images
- Refine copy and voice
- Add packing list page
- Add FAQ page
- Build join.rubberarmstrong.com

### After Stewards Sale
- Launch Join form for confirmed campers
- Continue reviewing and approving applicants

---

## Documentation History

### Latest Changes (January 2026)
- ✅ **Pre-Launch Audit Complete** - All critical issues fixed, ready for email campaign
- ✅ **Steward Sale Process Clarified** - Added disclaimers across all pages and emails
- ✅ **Timeline Expectations Set** - Clear "4-8 weeks" and "by late March" messaging
- ✅ **Email Templates Updated** - Contact info, SOI explanations, Steward disclaimers added
- ✅ **Approval Language Improved** - Clearer about what approval means and requires
- ✅ **Documentation Organized** - Root folder cleaned, redundant docs merged and archived
- ✅ **Phase 1 Complete** - All Phase 1 documentation archived

### Previous Documentation
Historical documentation preserved in [archive/](archive/) folder.

---

**The system is fully operational and ready to accept SOI submissions!** 🎪🔥

For questions or issues, start with [GETTING_STARTED.md](GETTING_STARTED.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
