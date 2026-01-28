# Changelog - Rubber Armstrong Website

All notable changes to the project are documented in this file.

---

## [1.0.0] - 28 January 2026 - Baseline Release

### Summary
This is the stable v1.0 baseline release, marking the site as ready for the 2026 Burning Man season.

### Content Changes
- **Removed Contact page** - `/contact` now returns 404
- **Removed Roles from navigation** - Page still accessible but hidden from nav (being migrated)
- **Navigation standardised** - All pages now show: About, Camp Life, Tickets, Join, Dates
- **"Named in cosmic tribute..."** - Now appears only on Home page, removed from About
- **"Working Camp, Not a Hotel"** - Now appears only on Camp Life page, removed from Home
- **Home page CTAs removed** - Removed "Learn About Our Values" and "Explore Camp Life" buttons
- **Ticketing page cleanup** - Removed duplicate "Tickets" heading and intro paragraph
- **Join page updated** - Added "Timing and Tickets (Read This Carefully)" section
- **Bullet characters fixed** - Removed literal "• " from list items in Camp Life
- **British English** - Changed "license" to "licence"

### Technical Changes
- **Extensionless URLs** - Added `_redirects` file for Cloudflare Pages
- **301 redirects** - All `.html` URLs redirect to extensionless versions
- **Custom 404 page** - Created `404.html` with consistent branding and navigation
- **Canonical host** - Non-www preferred (www redirects to non-www)
- **Sitemap updated** - All URLs now extensionless, removed gallery from sitemap
- **Content card styling** - Gold 2px borders (was grey 1px)

### Files Created
- `main-site/_redirects` - Cloudflare Pages redirect rules
- `main-site/404.html` - Custom 404 error page
- `docs/roles.md` - Archived roles content for future migration

### Files Modified
- `main-site/index.html` - Removed "Working Camp" section and CTAs
- `main-site/about.html` - Removed "Named in cosmic tribute" from Our Story
- `main-site/ticketing.html` - Removed duplicate heading, fixed navigation
- `main-site/join.html` - Added Timing and Tickets section
- `main-site/camp-life.html` - Fixed bullet characters, British spelling
- `main-site/gallery.html` - Fixed navigation (removed Gallery and Roles links)
- `main-site/roles.html` - Fixed navigation (removed Roles link)
- `main-site/sitemap.xml` - Extensionless URLs, updated dates
- `main-site/css/styles.css` - Gold content card borders

---

## [January 2026] - Calendar/Dates Page Complete

### ✅ Added
- **Interactive Calendar Page** (`/dates`) - New page showing important dates and events for Rubber Armstrong 2026
- **CSV-Based Event Management** - Events managed via `main-site/data/dates.csv` with columns: start_date, end_date, title, color, Title, Crew, Notes
- **Event Details Modal** - Click any event to view detailed information (Title, Crew, Notes) in a centered, responsive modal
- **Multi-Day Event Spanning** - Events seamlessly span across multiple days with visual continuity
- **Responsive Design** - Fully responsive calendar with no horizontal or vertical scrollbars
- **Month Header Customization** - Custom row spans for July (row 2), August (rows 3-6), and September (rows 7-8)
- **Navigation Integration** - Added "Dates" link to all page navigation menus (desktop and mobile)

### ✅ Features
- Calendar displays July 27 - September 13, 2026
- Weeks start on Monday, end on Sunday
- Events can span multiple days with seamless visual connection
- Event text uses charcoal color (#36454F) for readability
- Vertical centering of event titles
- Accessible (keyboard navigation, ARIA labels, focus states)
- Mobile-optimized with reduced event box heights

### 📝 Files Created
- `main-site/dates.html` - Calendar page with standard site structure
- `main-site/css/calendar.css` - Complete calendar styling (responsive, dark theme)
- `main-site/js/calendar.js` - Calendar rendering logic, CSV parsing, event modal
- `main-site/data/dates.csv` - Event data source (easily updatable)

### 📝 Files Modified
- `main-site/index.html` - Added "Dates" to navigation
- `main-site/about.html` - Added "Dates" to navigation
- `main-site/camp-life.html` - Added "Dates" to navigation
- `main-site/ticketing.html` - Added "Dates" to navigation
- `main-site/join.html` - Added "Dates" to navigation
- `main-site/gallery.html` - Added "Dates" to navigation
- `main-site/roles.html` - Added "Dates" to navigation

---

## [January 9, 2026] - Ticketing Page Complete Update

### ✅ Added
- **Hero Background Image** - Applied `ticketing-hero-background` to hero section with responsive images (mobile, tablet, desktop)
- **Complete 2026 Ticket Sales Information** - Updated with all official Burning Man ticket sale dates:
  - **Sunrise Sale**: Registration January 26 - February 3, 2026; Sale February 4, 2026
  - **Stewards Sale**: Form submission February 20-27, 2026; Purchase period March 4-11, 2026
  - **Main Sale**: Registration April 20-28, 2026; Sale April 29, 2026
  - **Other Programs**: Ticket Aid, Resilience Program, and STEP dates
- **Updated Background Images** - Exported and deployed new Ticketing-Hero and Ticketing-Steward images for all responsive sizes

### ✅ Updated
- **Stewards Sale Description** - Changed to "Indicate in the Statement of Intent form if you are interested in a Steward Sale ticket"
- **Reference Link** - Updated to official Burning Man ticketing information page URL
- **Removed Outdated Note** - Removed "information coming soon" message from hero section

### ✅ Removed
- **Sunrise Sale Contact Note** - Removed request to contact camp before purchasing Sunrise Sale tickets

### 📝 Files Modified
- `main-site/ticketing.html` - Complete update with hero background, full ticket sales info, updated text
- `main-site/images/ticketing/Ticketing-Hero-*.jpg` - Updated hero background images (mobile, tablet, desktop)
- `main-site/images/ticketing/Ticketing-Steward-*.jpg` - Updated steward background images (mobile, tablet, desktop)

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

