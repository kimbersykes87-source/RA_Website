# Documentation Index

Complete documentation for the Rubber Armstrong website project.

## Quick Start

**New to the project?** Start here:
1. [Project Status](PROJECT_STATUS.md) - Current state and completed work
2. [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Deployment verification
3. [Quick Start Summary](QUICK_START_SUMMARY.md) - Essential information

## Setup Guides

### Google Apps Script Automation
- **[Apps Script Rebuild Guide](APPS_SCRIPT_REBUILD_GUIDE.md)** ⭐ - **NEW** Consolidated, improved Apps Script setup
- **[Apps Script Comparison](APPS_SCRIPT_COMPARISON.md)** - Old vs new system comparison
- **[Add Analytics to Apps Script](ADD_ANALYTICS_TO_APPS_SCRIPT.md)** - Add weekly analytics reports to existing project
- **[Analytics Automation Setup](ANALYTICS_AUTOMATION_SETUP.md)** - Detailed GA4 automation guide
- **[Google Contacts Sync](GOOGLE_CONTACTS_SYNC.md)** - Auto-sync approved applicants
- **[Google Sheets Setup](GOOGLE_SHEETS_SETUP.md)** - Database configuration
- **[Apps Script Column Mapping](APPS_SCRIPT_COLUMN_MAPPING.md)** - Header-based column system

### Data Management
- **[Fix Burns Display](FIX_BURNS_DISPLAY.md)** - Fix burn count display and scientific notation
- **[Fix Burns Scientific Notation](FIX_BURNS_SCIENTIFIC_NOTATION.md)** - Prevent data corruption

## Content & Design

- **[Content Manifesto Reference](content-manifesto-reference.md)** - Writing guidelines and brand voice
- **[Tone of Voice Refactor](TONE_OF_VOICE_REFACTOR.md)** - January 2026 site-wide refactor details

## Migration & History

- **[Adobe to Cloudflare Migration](ADOBE_TO_CLOUDFLARE_MIGRATION.md)** - Migration from Adobe Portfolio
- **[HTML Encoding Fix](HTML_ENCODING_FIX.md)** - Semicolon issue resolution (Jan 5, 2026)
- **[Testing Results](TESTING_RESULTS.md)** - Cross-browser and accessibility testing

## Project Management

### Active Checklists
- **[Phase 2 Checklist](../PHASE_2_CHECKLIST.md)** - Pre-Stewards Sale tasks (root folder)
- **[Phase 3 Checklist](../PHASE_3_CHECKLIST.md)** - Pre-event tasks (root folder)

### Archived Documentation
See [`docs/archive/`](archive/) for:
- Completed task summaries
- Historical migration notes
- Deprecated guides

## By Topic

### Analytics & Reporting
- [Add Analytics to Apps Script](ADD_ANALYTICS_TO_APPS_SCRIPT.md)
- [Analytics Automation Setup](ANALYTICS_AUTOMATION_SETUP.md)

### Form & Database
- [Google Sheets Setup](GOOGLE_SHEETS_SETUP.md)
- [Google Contacts Sync](GOOGLE_CONTACTS_SYNC.md)
- [Fix Burns Display](FIX_BURNS_DISPLAY.md)

### Troubleshooting & Fixes
- [HTML Encoding Fix](HTML_ENCODING_FIX.md) - Resolved semicolon issues (Jan 5, 2026)

### Content & Voice
- [Content Manifesto Reference](content-manifesto-reference.md)
- [Tone of Voice Refactor](TONE_OF_VOICE_REFACTOR.md)

### Deployment & Testing
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [Testing Results](TESTING_RESULTS.md)
- [Adobe to Cloudflare Migration](ADOBE_TO_CLOUDFLARE_MIGRATION.md)

## Key Information

### Live Sites
- **Main Site**: https://rubberarmstrong.com
- **SOI Form**: https://soi.rubberarmstrong.com

### Google Analytics
- **Measurement ID**: G-1GN0CT0WN9
- **Property ID**: 518391310
- **Reports**: Weekly Mondays 9 AM PT to rubberarmstrongcamp@gmail.com

### Cloudflare
- **Main Site Project**: Connected to GitHub main branch
- **SOI Site Project**: Connected to GitHub main branch
- **Auto-deploy**: 1-2 minutes after push

### Google Apps Script
- **Project**: SOI Form Handler
- **Scripts**: Form handler, Google Contacts sync, Analytics reporting
- **Triggers**: Form submit, Status change, Weekly Monday 9 AM PT

## File Locations

### Scripts
All automation scripts are in [`../scripts/`](../scripts/):

**Consolidated (Recommended):**
- `apps-script-consolidated/Config.gs` - Unified configuration
- `apps-script-consolidated/FormHandler.gs` - Setup + form submission
- `apps-script-consolidated/ContactsSync.gs` - Google Contacts integration
- `apps-script-consolidated/Analytics.gs` - Weekly analytics reporting
- `apps-script-consolidated/appsscript.json` - Dependencies

**Legacy (Current):**
- `google-analytics-daily-report.js` - Weekly analytics email
- `google-contacts-sync.js` - Auto-sync to Google Contacts
- `fix-burns-count-display.js` - Fix burn count display (run once)
- `apps-script-complete.js` - Complete SOI form handler

### Site Files
- **Main Site**: [`../main-site/`](../main-site/)
- **SOI Form**: [`../soi-site/`](../soi-site/)
- **Shared Assets**: [`../shared/`](../shared/)
- **Original Assets**: [`../camp_assets/`](../camp_assets/)

## Getting Help

### Common Issues

**Analytics not working?**
- Check [Analytics Automation Setup](ANALYTICS_AUTOMATION_SETUP.md) troubleshooting section
- Verify Property ID: 518391310
- Ensure Google Analytics Data API is enabled

**Form submissions not syncing?**
- Check [Google Contacts Sync](GOOGLE_CONTACTS_SYNC.md) troubleshooting
- Verify trigger is set up in Apps Script
- Check execution logs for errors

**Burns count showing scientific notation?**
- Run the script in [Fix Burns Display](FIX_BURNS_DISPLAY.md)
- Ensures future entries are collected as text

**Site not deploying?**
- Check Cloudflare Pages dashboard for build errors
- Verify GitHub connection
- Check [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

## Contributing

When adding new documentation:
1. Add file to appropriate location (`docs/` or `docs/archive/`)
2. Update this index
3. Use clear, descriptive titles
4. Include troubleshooting sections
5. Add cross-references to related docs

---

**Last Updated**: January 5, 2026  
**Project Phase**: Phase 1 Complete ✅  
**Next Milestone**: Stewards Sale (typically mid-March)


**Legacy (Current):**
- `google-analytics-daily-report.js` - Weekly analytics email
- `google-contacts-sync.js` - Auto-sync to Google Contacts
- `fix-burns-count-display.js` - Fix burn count display (run once)
- `apps-script-complete.js` - Complete SOI form handler

### Site Files
- **Main Site**: [`../main-site/`](../main-site/)
- **SOI Form**: [`../soi-site/`](../soi-site/)
- **Shared Assets**: [`../shared/`](../shared/)
- **Original Assets**: [`../camp_assets/`](../camp_assets/)

## Getting Help

### Common Issues

**Analytics not working?**
- Check [Analytics Automation Setup](ANALYTICS_AUTOMATION_SETUP.md) troubleshooting section
- Verify Property ID: 518391310
- Ensure Google Analytics Data API is enabled

**Form submissions not syncing?**
- Check [Google Contacts Sync](GOOGLE_CONTACTS_SYNC.md) troubleshooting
- Verify trigger is set up in Apps Script
- Check execution logs for errors

**Burns count showing scientific notation?**
- Run the script in [Fix Burns Display](FIX_BURNS_DISPLAY.md)
- Ensures future entries are collected as text

**Site not deploying?**
- Check Cloudflare Pages dashboard for build errors
- Verify GitHub connection
- Check [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

## Contributing

When adding new documentation:
1. Add file to appropriate location (`docs/` or `docs/archive/`)
2. Update this index
3. Use clear, descriptive titles
4. Include troubleshooting sections
5. Add cross-references to related docs

---

**Last Updated**: January 5, 2026  
**Project Phase**: Phase 1 Complete ✅  
**Next Milestone**: Stewards Sale (typically mid-March)


**Legacy (Current):**
- `google-analytics-daily-report.js` - Weekly analytics email
- `google-contacts-sync.js` - Auto-sync to Google Contacts
- `fix-burns-count-display.js` - Fix burn count display (run once)
- `apps-script-complete.js` - Complete SOI form handler

### Site Files
- **Main Site**: [`../main-site/`](../main-site/)
- **SOI Form**: [`../soi-site/`](../soi-site/)
- **Shared Assets**: [`../shared/`](../shared/)
- **Original Assets**: [`../camp_assets/`](../camp_assets/)

## Getting Help

### Common Issues

**Analytics not working?**
- Check [Analytics Automation Setup](ANALYTICS_AUTOMATION_SETUP.md) troubleshooting section
- Verify Property ID: 518391310
- Ensure Google Analytics Data API is enabled

**Form submissions not syncing?**
- Check [Google Contacts Sync](GOOGLE_CONTACTS_SYNC.md) troubleshooting
- Verify trigger is set up in Apps Script
- Check execution logs for errors

**Burns count showing scientific notation?**
- Run the script in [Fix Burns Display](FIX_BURNS_DISPLAY.md)
- Ensures future entries are collected as text

**Site not deploying?**
- Check Cloudflare Pages dashboard for build errors
- Verify GitHub connection
- Check [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

## Contributing

When adding new documentation:
1. Add file to appropriate location (`docs/` or `docs/archive/`)
2. Update this index
3. Use clear, descriptive titles
4. Include troubleshooting sections
5. Add cross-references to related docs

---

**Last Updated**: January 5, 2026  
**Project Phase**: Phase 1 Complete ✅  
**Next Milestone**: Stewards Sale (typically mid-March)
