# Phase 2 Checklist - Pre-Stewards Sale

**Timeline:** Complete before end of Stewards Sale Tickets  
**Last Updated:** 28 January 2026

---

## Completed Tasks

### Custom Icons ✅
- [x] Custom favicon (SVG + PNG versions)
- [x] Apple Touch Icon
- [x] PWA icons
- [x] Added to all pages

### Calendar/Dates Page ✅
- [x] Interactive calendar page (`/dates`)
- [x] CSV-based event data
- [x] Event modal with details
- [x] Responsive design
- [x] Navigation integration

### Content & Copy ✅
- [x] Ticketing page - 2026 dates added
- [x] Join page - "Timing and Tickets" section added
- [x] Camp Life page - cleaned up
- [x] Home page - content refined
- [x] About page - content refined
- [x] Consistent tone across all pages

### v1.0 Baseline ✅
- [x] Navigation standardised (About, Camp Life, Tickets, Join, Dates)
- [x] Extensionless URLs with redirects
- [x] Custom 404 page
- [x] Content cleanup complete
- [x] Gold content card borders

---

## Remaining Tasks

### 1. Build Join Page (join.rubberarmstrong.com)
**Effort:** High | **Timeline:** 4-6 hours

The confirmed camper intake form for approved SOI applicants.

#### Steps:
- [ ] Plan form fields and validation rules
- [ ] Create `join-site/` directory (copy from `soi-site/`)
- [ ] Build form HTML with all fields
- [ ] Add validation JavaScript
- [ ] Style to match existing site
- [ ] Update Google Apps Script for Join submissions
- [ ] Create `Camp_Confirmed_2026` sheet tab
- [ ] Deploy to Cloudflare Pages
- [ ] Add custom domain `join.rubberarmstrong.com`
- [ ] Test end-to-end

#### Form Fields:
**Personal Info:**
- Name, Email, Phone (pre-fill from SOI if possible)
- Playa name

**Ticket Status:**
- Ticket status (Have ticket / Need ticket / Steward sale / DGS)
- Ticket type

**Dates & Logistics:**
- Arrival date/time
- Departure date/time
- Early arrival (build week)
- Late departure (strike week)

**Accommodation:**
- Type (RA tent / Own RV / Own tent)
- RV dimensions and power needs (if applicable)
- Number in party
- Special needs

**Power Needs:**
- Estimated usage (watts)
- Devices requiring power
- AC needed

**Shifts & Participation:**
- Preferred shifts
- Shift availability
- Special skills
- Radiance Hour interest

**Emergency:**
- Emergency contact (name, phone, relationship)
- Medical conditions/allergies
- Medications
- Dietary restrictions

---

### 2. Steward Sale Ticket Tracker
**Effort:** Medium | **Timeline:** 3-4 hours

Tool to track Steward Sale ticket allocation and distribution.

#### Steps:
- [ ] Create tracker page (password-protected or unique URL)
- [ ] Connect to Google Sheets backend
- [ ] Display ticket counts (allocated, distributed, remaining)
- [ ] Show campmate assignments
- [ ] Mobile responsive

#### Data to Track:
- Total steward tickets allocated to RA
- Tickets assigned to campmates
- Tickets remaining
- Campmate names and ticket status
- Payment/contribution status
- Notes

---

## Progress

| Task | Status |
|------|--------|
| Custom Icons | ✅ Complete |
| Calendar/Dates Page | ✅ Complete |
| Content & Copy | ✅ Complete |
| v1.0 Baseline | ✅ Complete |
| Join Page | ⏳ To Do |
| Steward Tracker | ⏳ To Do |

---

## Notes

- Join form should only be accessible to approved SOI applicants
- Consider password protection or unique links
- Pre-fill data from SOI where possible
- Make Join form shorter than SOI (they're already approved)
- Add deadline to Join form

---

## Related Documentation

- [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) - Setup and deployment
- [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Project overview
- [docs/APPS_SCRIPT_GUIDE.md](./docs/APPS_SCRIPT_GUIDE.md) - Apps Script reference
- [PHASE_3_CHECKLIST.md](./PHASE_3_CHECKLIST.md) - Next phase

---

## When Complete

- [ ] Test entire user journey (SOI → approval → Join)
- [ ] Verify all analytics tracking
- [ ] Check mobile experience
- [ ] Announce Join form to approved applicants
