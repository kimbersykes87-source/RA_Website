# 🚀 Phase 3 Checklist - Post-Stewards Sale / Pre-Event

**Timeline:** After Stewards Sale, before event  
**Estimated Total Time:** 10-15 hours  
**Last Updated:** January 4, 2026

---

## 📋 Overview

Phase 3 focuses on operational tools and resources for confirmed campmates as you approach the event. These features help manage logistics, coordinate transportation, and organize camp operations.

---

## Tasks (In Priority Order)

### 1. Hitch-Hiking Page 🚗
**Effort:** Medium | **Timeline:** 2-3 hours

Create a dedicated page for coordinating rides to/from Burning Man.

#### Purpose
- Help campmates find rides
- Coordinate carpooling
- Reduce solo driving
- Build community before the event

#### Tasks
- [ ] Create `main-site/hitch-hiking.html`
- [ ] Design page layout
- [ ] Add ride-sharing coordination system
- [ ] Add to navigation (or link from Join/Camp Life pages)
- [ ] Mobile responsive design
- [ ] SEO meta tags

#### Content to Include

**Introduction:**
- Why carpool to Burning Man?
- Benefits of ride-sharing
- RA's ride coordination approach

**How It Works:**
1. Drivers post available seats
2. Riders request rides
3. Coordinate via contact info
4. Meet up and head to playa!

**Ride Board Options:**

**Option A: Simple List (Easiest)**
- Embed Google Sheet as iframe
- Campmates add themselves to sheet
- Columns: Name, Leaving From, Date/Time, Seats Available, Contact

**Option B: Form + Sheet**
- Create form for drivers to post rides
- Create form for riders to request rides
- Display results from Google Sheet
- Auto-matching (optional)

**Option C: Interactive Board**
- Build custom ride board interface
- Filter by location, date, seats
- Direct messaging between users
- Real-time updates

**Safety & Guidelines:**
- Meet in public places
- Share trip details with someone
- Verify identity before sharing contact info
- Camp is not liable for ride-sharing arrangements
- Suggested contribution for gas

**Additional Features:**
- [ ] Map showing departure cities
- [ ] Calendar view of departure dates
- [ ] Carpool matching suggestions
- [ ] Group ride coordination (multiple cars)
- [ ] Return trip coordination

---

### 2. Roster Page 👥
**Effort:** Medium | **Timeline:** 2-3 hours

Create a campmate roster for confirmed 2026 members.

#### Purpose
- See who's camping with RA in 2026
- Connect with campmates before the event
- Build community
- Reference during planning

#### Tasks
- [ ] Create `main-site/roster.html`
- [ ] Design roster layout
- [ ] Add campmate information
- [ ] Add search/filter functionality
- [ ] Mobile responsive design
- [ ] Privacy controls

#### Content to Include

**Roster Information:**
- Name (first name + last initial OR playa name)
- Photo (optional)
- Location (city/state)
- Burns with RA (count)
- Total burns (count)
- Skills/offerings
- Contact preference (email/social)

**Display Options:**

**Option A: Simple List**
- Alphabetical list of names
- Basic info for each person
- Static HTML or embedded Google Sheet

**Option B: Card Grid**
- Card-based layout
- Photo + name + key info
- Responsive grid (3-4 columns desktop, 1-2 mobile)

**Option C: Interactive Directory**
- Searchable/filterable roster
- Click for full profile
- Contact buttons
- Skills tags

**Privacy Considerations:**
- [ ] Password-protect the page (campmates only)
- [ ] Allow opt-out from roster
- [ ] Let campmates choose what info to share
- [ ] No sensitive information (addresses, phone numbers)
- [ ] Use playa names if preferred

**Data Source:**
- Pull from Join form submissions
- Or create separate roster form
- Or manually curate from approved SOI + Join submissions

**Optional Features:**
- [ ] Profile photos
- [ ] Social media links
- [ ] "About me" section
- [ ] Skills/interests tags
- [ ] Veteran vs. first-timer badges
- [ ] Shift assignments
- [ ] Accommodation info (RV vs. tent)

---

### 3. Persians (Shift Schedule) 📅
**Effort:** Medium-High | **Timeline:** 3-4 hours

Create a shift scheduling system for camp operations.

#### Purpose
- Organize camp shifts (bar, kitchen, recycling, art car, etc.)
- Ensure fair distribution of responsibilities
- Let campmates sign up for preferred shifts
- Track who's working when

#### Tasks
- [ ] Create `main-site/persians.html` (or `shifts.html`)
- [ ] Design shift schedule interface
- [ ] Add shift signup system
- [ ] Display current assignments
- [ ] Mobile responsive design
- [ ] Admin interface for managing shifts

#### Shift Types to Include

**Common RA Shifts:**
1. **Bar Shifts** - Serving at Mezcal bar
2. **Kitchen Shifts** - Meal prep and cleanup
3. **Recycling Shifts** - Sorting and managing waste
4. **Art Car Shifts** - Driving SS Mezcal
5. **Setup/Strike** - Build week and tear-down
6. **Greeter Shifts** - Welcoming visitors
7. **MOOP Sweeps** - Daily camp cleanup

**Shift Information:**
- Shift name
- Date and time
- Duration (e.g., 2 hours)
- Number of people needed
- Current signups
- Requirements/notes

#### Implementation Options

**Option A: Google Sheets Embed (Easiest)**
- Create shift schedule in Google Sheets
- Campmates add their names to slots
- Embed sheet on page
- Simple and functional

**Option B: Form + Display**
- Create shift signup form
- Store in Google Sheets
- Display schedule on page
- Auto-update from sheet

**Option C: Interactive Scheduler**
- Build custom shift interface
- Click to sign up for shifts
- Real-time updates
- Conflict detection
- Reminder system

**Schedule Format:**

**Weekly View:**
```
Monday, Aug 25
├─ 10am-12pm: Bar (2 needed) - Jane, John
├─ 12pm-2pm: Kitchen (3 needed) - Sarah, Mike, [1 open]
├─ 2pm-4pm: Recycling (1 needed) - [open]
└─ 8pm-10pm: Bar (2 needed) - Lisa, Tom

Tuesday, Aug 26
...
```

**Shift Card View:**
```
┌─────────────────────────┐
│ Bar Shift               │
│ Mon, Aug 25, 10am-12pm  │
│ 2 people needed         │
│ Signed up: Jane, John   │
│ [FULL]                  │
└─────────────────────────┘
```

#### Features to Include

**Basic:**
- [ ] View all shifts
- [ ] See who's signed up
- [ ] Identify open slots
- [ ] Filter by date/type

**Intermediate:**
- [ ] Sign up for shifts (form or click)
- [ ] Drop shifts (with notice)
- [ ] Swap shifts with others
- [ ] Export to calendar (iCal)

**Advanced:**
- [ ] Automatic shift assignments
- [ ] Conflict detection (double-booking)
- [ ] Email reminders before shifts
- [ ] Shift completion tracking
- [ ] Points/credits system
- [ ] Mobile app integration

#### Admin Features
- [ ] Add/edit/delete shifts
- [ ] Assign people to shifts
- [ ] View coverage gaps
- [ ] Send shift reminders
- [ ] Track shift completion
- [ ] Generate reports

#### Integration
- Pull campmate names from Roster
- Link to Join form (shift preferences)
- Sync with Google Calendar
- Send email/SMS reminders

---

### 4. RA Phone Lock Screen 📱
**Effort:** Low | **Timeline:** 15-30 minutes

Create and provide RA-branded phone lock screen image for campmates.

#### Purpose
- Branded camp identity on campmates' devices
- Easy identification at events
- Community building
- Professional presentation

#### Tasks
- [ ] Locate or create RA Phone Lock Screen PNG
- [ ] Ensure proper dimensions for various phone sizes:
  - iPhone: 1170×2532px (6.7"), 1125×2436px (6.5"), 750×1334px (SE)
  - Android: 1080×2340px (standard), 1440×3200px (high-res)
- [ ] Optimize file size (< 500KB recommended)
- [ ] Add to shared assets folder (`camp_assets/` or `shared/assets/`)
- [ ] Create download link/page or share via camp communications
- [ ] Document location and usage instructions

#### Content Guidelines
- Include Rubber Armstrong logo/branding
- Use camp colors (reference `design-tokens.css`)
- Keep text minimal (optional: "Rubber Armstrong", year)
- Ensure readability at lock screen size
- Dark/light mode consideration (or provide both versions)

#### File Specifications
- **Format:** PNG (transparency if needed) or JPG
- **Dimensions:** Multiple sizes or single high-res (min 1080×2340px)
- **File Size:** < 500KB per image
- **Naming:** `RA-LockScreen-2026.png` or `RA-LockScreen-Phone-[size].png`

#### Distribution Options
- [ ] Add download section to campmate portal/roster page
- [ ] Share via email/camp communications
- [ ] Host on camp website (password-protected section)
- [ ] Provide in multiple sizes (iPhone, Android, universal)

---

## 📊 Progress Tracking

| Task | Status | Time Estimate | Actual Time |
|------|--------|---------------|-------------|
| 1. Hitch-Hiking Page | ⏳ Not Started | 2-3 hours | - |
| 2. Roster Page | ⏳ Not Started | 2-3 hours | - |
| 3. Persians (Shifts) | ⏳ Not Started | 3-4 hours | - |
| 4. RA Phone Lock Screen | ⏳ Not Started | 15-30 min | - |
| **TOTAL** | **0% Complete** | **7.25-10.5 hours** | **-** |

---

## 🎯 Recommended Timeline

**6 weeks before event:**
- Create RA Phone Lock Screen (task 4) - 15-30 min
- Share with campmates
- Build Roster page (task 2) - 2-3 hours
- Populate with confirmed campmates

**4 weeks before event:**
- Build Hitch-Hiking page (task 1) - 2-3 hours
- Start coordinating rides

**2-3 weeks before event:**
- Build Persians/Shift schedule (task 3) - 3-4 hours
- Let campmates sign up for shifts

**1 week before event:**
- Finalize all shifts
- Confirm ride-shares
- Send reminders

---

## 📝 Notes

### Access Control
All Phase 3 pages should be **campmates-only**:
- Password-protected pages
- Or unique URLs (not linked from public site)
- Or login system (more complex)

### Data Privacy
- Don't expose personal contact info publicly
- Let campmates opt-in to sharing
- Use playa names when possible
- Clear privacy policy

### Mobile-First
These tools will be used on playa:
- Ensure mobile responsive
- Consider offline functionality (PWA)
- Large touch targets
- Simple, clear interface

### Integration
Phase 3 builds on Phase 2:
- Pull data from Join form
- Link to Roster from Hitch-Hiking
- Reference Roster in Persians
- Consistent navigation across all pages

---

## 🔧 Technical Considerations

### Backend Options
1. **Google Sheets** (easiest) - Embed or pull data via API
2. **Google Apps Script** - Custom web apps
3. **Airtable** - More powerful database
4. **Firebase** - Real-time updates
5. **Static HTML** - Manual updates

**Recommendation:** Start with Google Sheets for simplicity

### Authentication Options
1. **Simple Password** - One password for all campmates
2. **Individual Logins** - Email + password per person
3. **Link-Based** - Unique URL per campmate
4. **Google OAuth** - Sign in with Google account

**Recommendation:** Simple password or link-based for Phase 3

---

## 🎨 Design Consistency

Maintain visual consistency with main site:
- Use same design tokens (`design-tokens.css`)
- Same header/footer
- Same navigation style
- Same color scheme
- Same typography

---

## ✅ When Complete

After finishing Phase 3:
- [ ] Test all pages on mobile
- [ ] Verify access controls working
- [ ] Test with sample data
- [ ] Get feedback from campmates
- [ ] Update PROJECT_STATUS.md
- [ ] Announce new tools to camp

---

## 🔗 Related Documentation

- [PHASE_2_CHECKLIST.md](./PHASE_2_CHECKLIST.md) - Previous phase
- [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) - Complete setup and deployment guide
- [GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Project overview and current status
- [APPS_SCRIPT_GUIDE.md](./docs/APPS_SCRIPT_GUIDE.md) - Google Apps Script technical reference

---

## 💡 Future Enhancements (Phase 4?)

Ideas for later:
- Real-time chat/messaging
- Photo sharing gallery
- Event calendar
- Meal planning tool
- Equipment inventory tracker
- Budget/expense tracker
- Post-event survey
- Alumni directory

---

**Ready for Phase 3!** 🚀

These tools will help coordinate logistics and build community as you approach the event.

Come back to this checklist after completing Phase 2 and as the event gets closer.

