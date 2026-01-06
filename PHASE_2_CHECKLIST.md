# 🚀 Phase 2 Checklist - Pre-Stewards Sale

**Timeline:** Complete before end of Stewards Sale Tickets  
**Estimated Total Time:** 12-15 hours  
**Last Updated:** January 4, 2026

---

## 📋 Tasks (In Priority Order)

### 1. Custom Icons for Website 🎨
**Effort:** Low | **Timeline:** 1-2 hours

- [ ] Design/source custom favicon (SVG + PNG versions)
- [ ] Create Apple Touch Icon (180x180)
- [ ] Create PWA icons (192x192, 512x512)
- [ ] Add favicon to all pages (main-site + soi-site)
- [ ] Test icons display correctly across browsers
- [ ] Update Open Graph images if needed

**Files to update:**
- `main-site/assets/favicon.svg` (currently placeholder)
- `main-site/index.html` and all other pages
- `soi-site/index.html`

---

### 2. Complete Gallery 🖼️
**Effort:** Low | **Timeline:** 1-2 hours

- [ ] Source 5-10 images from 2022 camp
- [ ] Optimize images (resize, compress)
- [ ] Add to `main-site/images/gallery/2022/`
- [ ] Update `main-site/gallery.html` with real images
- [ ] Remove "2022 images coming soon" placeholder
- [ ] Add descriptive alt text to all images
- [ ] Consider adding captions/stories to images

**Optional enhancements:**
- [ ] Add lightbox for full-screen viewing
- [ ] Organize by categories (build, camp life, art car)
- [ ] Add year navigation

---

### 3. Refine Copy & Voice 📝
**Effort:** Medium | **Timeline:** 2-3 hours

- [ ] Review Home page - make it sound more like you
- [ ] Review About page - inject personality
- [x] Review Camp Life page - removed Monday meeting references (Jan 5, 2026)
- [ ] Review Ticketing page - update with 2026 dates
- [ ] Review Join page - clarify process
- [ ] Review Gallery captions
- [ ] Ensure consistent tone across all pages
- [ ] Remove any overly formal language
- [ ] Add humor/personality where appropriate

**Pages to review:**
- `main-site/index.html`
- `main-site/about.html`
- `main-site/camp-life.html`
- `main-site/ticketing.html`
- `main-site/join.html`

---

### 4. Add Packing List 📦
**Effort:** Medium | **Timeline:** 2-3 hours

**Option A: New Page**
- [ ] Create `main-site/packing-list.html`
- [ ] Design packing list layout
- [ ] Add categories (essentials, camp gear, personal items, etc.)
- [ ] Include RA-specific items (what camp provides vs. what to bring)
- [ ] Add tips for first-timers
- [ ] Link from navigation and Join page

**Option B: Section on Camp Life Page**
- [ ] Add packing list section to `camp-life.html`
- [ ] Keep it concise and scannable
- [ ] Link to external resources if needed

**Content to include:**
- What RA provides (tents, power, water, etc.)
- What campers must bring
- Recommended items
- Playa-specific gear
- First-timer tips
- What NOT to bring

---

### 5. Add FAQ 🙋
**Effort:** Medium | **Timeline:** 2-3 hours

**Option A: New Page**
- [ ] Create `main-site/faq.html`
- [ ] Design FAQ layout (accordion or simple Q&A)
- [ ] Write 10-15 common questions
- [ ] Add to navigation

**Option B: Sections on Existing Pages**
- [ ] Add FAQ section to Join page (joining process questions)
- [ ] Add FAQ section to Ticketing page (ticket questions)
- [ ] Add FAQ section to Camp Life page (camp logistics)

**FAQ Topics to Cover:**
- How do I join RA?
- What's the difference between SOI and Join forms?
- Do I need a ticket to submit SOI?
- What does RA provide vs. what do I bring?
- What are the shift requirements?
- Can I bring guests/partners?
- What if I don't have a ticket?
- When will I hear back about my SOI?
- What's the camp vibe/culture?
- Is this my first Burn - can I join?
- RV vs. tent camping options
- Power availability and limits
- Arrival/departure logistics

---

### 6. Build Join Page (join.rubberarmstrong.com) 🎫
**Effort:** High | **Timeline:** 4-6 hours

This is the big one - the confirmed camper intake form.

---

### 7. Add Rubber Armstrong Express Page 🚌
**Effort:** Medium | **Timeline:** 2-3 hours

Create a dedicated page for the Rubber Armstrong Express - the camp's transportation service.

#### Tasks:
- [ ] Create `main-site/rubber-armstrong-express.html`
- [ ] Design page layout (hero, info sections, booking/contact)
- [ ] Add content about the service:
  - What is RA Express?
  - Routes and schedule
  - Pricing/contribution
  - How to book
  - What's included
  - Rules and guidelines
- [ ] Add to main navigation
- [ ] Add images (if available)
- [ ] Mobile responsive design
- [ ] SEO meta tags

**Content to Include:**
- Service description
- Pick-up/drop-off locations
- Schedule (pre-event, during, post-event)
- Capacity and booking process
- What to bring vs. what's provided
- Contact information
- FAQ section

**Optional Enhancements:**
- [ ] Booking form integration
- [ ] Real-time availability tracker
- [ ] Map with routes
- [ ] Photo gallery from previous years

---

### 8. Add Steward Sale Ticket Tracker 🎫
**Effort:** Medium-High | **Timeline:** 3-4 hours

Create a tool to track Steward Sale ticket allocation and distribution.

#### Option A: Simple Tracker (Recommended)
- [ ] Create `main-site/steward-tracker.html` (password-protected page)
- [ ] Embed Google Sheets as iframe OR
- [ ] Build simple dashboard showing:
  - Total steward tickets allocated
  - Tickets distributed
  - Tickets remaining
  - Campmate assignments
- [ ] Admin-only access (password or link-based)

#### Option B: Advanced Dashboard
- [ ] Create interactive dashboard with:
  - Real-time ticket counts
  - Campmate list with ticket status
  - Assignment interface
  - Export functionality
- [ ] Connect to Google Sheets backend
- [ ] Add filtering and search
- [ ] Mobile responsive

**Data to Track:**
- Total steward tickets allocated to RA
- Tickets assigned to campmates
- Tickets still available
- Campmate names and ticket status
- Payment/contribution status (if applicable)
- Notes/special cases

**Backend Options:**
1. **Google Sheets** (easiest) - Embed or link to sheet
2. **Apps Script Dashboard** - Build custom interface
3. **Simple HTML Table** - Manual updates

**Security:**
- Password protect the page
- Or use unique URL (don't link from main site)
- Or restrict to approved campmates only

---

#### Step 1: Plan the Form (30 min)
- [ ] Review SOI form structure for consistency
- [ ] Define all required fields
- [ ] Plan validation rules
- [ ] Design multi-step form if needed

#### Step 2: Create Join Site Structure (1 hour)
- [ ] Create `join-site/` directory
- [ ] Copy structure from `soi-site/` as template
- [ ] Set up HTML, CSS, JS files
- [ ] Add shared assets (fonts, logos, design tokens)

#### Step 3: Build the Form (2-3 hours)
- [ ] Create form HTML with all fields
- [ ] Add validation JavaScript
- [ ] Style form to match SOI form
- [ ] Add progress indicator if multi-step
- [ ] Test all validation rules

#### Step 4: Backend Integration (1 hour)
- [ ] Update Google Apps Script to handle Join submissions
- [ ] Create `Camp_Confirmed_2026` sheet tab
- [ ] Set up column structure
- [ ] Test form submissions
- [ ] Verify data appears correctly in sheet

#### Step 5: Deploy (30 min)
- [ ] Create new Cloudflare Pages project
- [ ] Configure build settings (root: `join-site`)
- [ ] Add custom domain `join.rubberarmstrong.com`
- [ ] Enable Web Analytics
- [ ] Test live deployment

**Form Fields to Include:**

**Personal Info (from SOI):**
- Name (pre-filled from SOI if possible)
- Email (pre-filled)
- Phone (pre-filled)
- Playa name

**Ticket Status:**
- [ ] Ticket status dropdown (Have ticket / Need ticket / Steward sale / DGS)
- [ ] Ticket type (if applicable)
- [ ] Willing to help others get tickets?

**Dates & Logistics:**
- [ ] Arrival date/time
- [ ] Departure date/time
- [ ] Early arrival needed? (build week)
- [ ] Late departure needed? (strike week)

**Accommodation:**
- [ ] Accommodation type (RA tent / Own RV / Own tent)
- [ ] If RV: dimensions, power needs
- [ ] Number of people in your party
- [ ] Special accommodation needs

**Power Needs:**
- [ ] Estimated power usage (watts)
- [ ] Devices requiring power
- [ ] AC needed? (if in RA tent)

**Shifts & Participation:**
- [ ] Preferred shifts (bar, kitchen, recycling, art car, etc.)
- [ ] Shift availability (days/times)
- [ ] Special skills to contribute
- [ ] Interested in Radiance Hour presentation?

**Emergency Contacts:**
- [ ] Emergency contact name
- [ ] Emergency contact phone
- [ ] Emergency contact relationship
- [ ] Medical conditions/allergies
- [ ] Medications

**Additional:**
- [ ] Dietary restrictions
- [ ] Anything else we should know?
- [ ] How did you hear about RA? (if not from SOI)

---

## 📊 Progress Tracking

| Task | Status | Time Estimate | Actual Time |
|------|--------|---------------|-------------|
| 1. Custom Icons | ⏳ Not Started | 1-2 hours | - |
| 2. Complete Gallery | ⏳ Not Started | 1-2 hours | - |
| 3. Refine Copy | ⏳ Not Started | 2-3 hours | - |
| 4. Packing List | ⏳ Not Started | 2-3 hours | - |
| 5. FAQ | ⏳ Not Started | 2-3 hours | - |
| 6. Join Page | ⏳ Not Started | 4-6 hours | - |
| 7. RA Express Page | ⏳ Not Started | 2-3 hours | - |
| 8. Steward Tracker | ⏳ Not Started | 3-4 hours | - |
| **TOTAL** | **0% Complete** | **18-26 hours** | **-** |

---

## 🎯 Recommended Timeline

**4 weeks before Stewards Sale ends:**
- Complete tasks 1-3 (icons, gallery, copy) - 5-7 hours

**3 weeks before:**
- Complete tasks 4-5 (packing list, FAQ) - 4-6 hours
- Add RA Express page (task 7) - 2-3 hours

**2 weeks before:**
- Build Join page (task 6) - 4-6 hours
- Build Steward Tracker (task 8) - 3-4 hours

**1 week before:**
- Test everything thoroughly
- Fix any bugs
- Prepare to launch Join form and tracker

---

## 📝 Notes

- **Join form should only be accessible to approved SOI applicants** - consider adding password protection or unique links
- **Pre-fill data from SOI** where possible to reduce friction
- **Make Join form shorter than SOI** - they've already been approved, just need logistics
- **Consider multi-step form** for Join page to reduce overwhelm
- **Add deadline** to Join form (e.g., "Complete by [date]")

---

## 🔗 Related Documentation

- [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) - Complete setup and deployment guide
- [GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Project overview and current status
- [APPS_SCRIPT_GUIDE.md](./docs/APPS_SCRIPT_GUIDE.md) - Google Apps Script technical reference
- [PHASE_3_CHECKLIST.md](./PHASE_3_CHECKLIST.md) - Next phase

---

## ✅ When Complete

After finishing all tasks:
- [ ] Update PROJECT_STATUS.md
- [ ] Test entire user journey (SOI → approval → Join)
- [ ] Verify all analytics tracking
- [ ] Check mobile experience
- [ ] Announce Join form to approved applicants

---

**Ready to tackle Phase 2!** 🚀

Come back to this checklist when you're ready to prepare for the Stewards Sale.

