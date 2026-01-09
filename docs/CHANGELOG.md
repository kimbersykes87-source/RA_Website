# Changelog - Rubber Armstrong Website

All notable changes to the project are documented in this file.

---

## [January 9, 2026] - 2026 Ticket Sales Information Added

### ✅ Added
- **2026 Ticket Sales Section** - New section on Ticketing page with confirmed Burning Man 2026 ticket sale information:
  - **Sunrise Sale**: Registration opens 26 January 2026, Sale takes place 4 February 2026
  - Contact note for Sunrise Sale ticket holders to reach out before purchasing
  - **Steward Sale**: Placeholder with expected timing (March)
  - **Main Sale**: Placeholder with expected timing (April)
- Content is factual and restrained, does not imply guarantees or eligibility
- Funnels Sunrise Sale ticket holders to contact camp early via rubberarmstrongcamp@gmail.com

### 📝 Files Modified
- `main-site/ticketing.html` - Added "2026 Ticket Sales" section with Sunrise Sale dates and contact information

---

## [January 2026] - Pre-Launch Audit & Fixes

### ✅ Fixed - Critical Issues
- **Steward Sale Process Clarified** - Added clear disclaimers across all pages that expressing interest does NOT guarantee tickets. Final allocations determined by camp leadership.
- **Timeline Expectations Set** - Clarified review takes "4-8 weeks from submission" but "final decisions communicated after ticket sales conclude (mid-to-late March)".
- **Approval Language Improved** - Changed from vague "may be invited" to clear "will be invited (if approved)" with explicit ticket requirements.
- **Email Contact Method Added** - Changed "reach out to me directly" to "reach out to us at rubberarmstrongcamp@gmail.com" in all email templates.
- **False Urgency Removed** - Removed "Steward tickets are coming up soon" from follow-up email, replaced with accurate timeline information.
- **Process Description Fixed** - Changed "two-stage process" to "multi-stage process" to accurately reflect the actual flow.
- **SOI Form Context Added** - Updated Steward ticket interest field hint with clear disclaimers.
- **Duplicate HTML Removed** - Fixed file corruption in `join.html` and `ticketing.html` that had duplicate closing tags.

### ✅ Added
- **"What to Expect" Section** - New section on Join page explaining timeline, approval process, and what happens if not approved.
- **Ticket Requirements Section** - New callout on Ticketing page explaining when tickets are needed.
- **SOI Explanation in Emails** - Added clear explanation of what SOI is, timeline, and expectations in all email templates.
- **Form Submission Acknowledgment** - Enhanced SOI form submission acknowledgment with Steward ticket disclaimers.

### ✅ Improved
- **Tone & Clarity** - Changed "Read it properly" to "Please read this page carefully", "We prioritise" to "We look for", warmer rejection language.
- **Consistency** - Synchronized all email templates (HTML, text, and automation script) with same messaging.
- **Documentation** - Created comprehensive audit report, fixes summary, and copy changes review documents.

### 📝 Files Modified
- `main-site/join.html` - Process clarity, timeline, approval language
- `main-site/ticketing.html` - Steward Sale disclaimers, ticket requirements
- `soi-site/index.html` - Form hints, submission acknowledgment
- `email_tracking/templates/invitation-2026-final.html` - Contact info, SOI explanation
- `email_tracking/templates/invitation-2026.html` - Synchronized updates
- `email_tracking/templates/invitation-2026.txt` - Text version updated
- `email_tracking/templates/follow-up.html` - Removed false urgency
- `email_tracking/scripts/gmail-automation.gs` - Template function updated

### 📚 Documentation Added
- `PRE_LAUNCH_AUDIT_REPORT.md` - Complete audit findings
- `FIXES_SUMMARY.md` - Summary of all fixes applied
- `COPY_CHANGES_REVIEW.md` - All copy changes with before/after
- `email_tracking/templates/README_TEMPLATE_USAGE.md` - Template usage guide
- `docs/CHANGELOG.md` - This file

---

## [January 5, 2026] - HTML Encoding Fixes

### ✅ Fixed
- HTML encoding issues (semicolons → hyphens) in index.html, about.html, camp-life.html
- All CSS class names and variable references
- Logo and asset paths
- Removed duplicate content from about.html and camp-life.html
- Removed Monday meeting references
- All pages now displaying correctly with proper headers, navigation, and styling

---

## [January 4, 2026] - Initial Launch

### ✅ Completed
- Resolved CORS issue with SOI form
- Deployed main site to Cloudflare Pages
- Site-wide tone-of-voice refactor
- Google Analytics and Contacts sync configured
- Phase 1 complete - All core functionality operational

---

## [December 2025] - Project Setup

### ✅ Completed
- Project structure created
- Google Sheets database setup
- Google Apps Script integration
- Cloudflare Pages deployment configured
- Initial content migration

---

**For detailed information about any change, see the relevant documentation files or commit history.**

