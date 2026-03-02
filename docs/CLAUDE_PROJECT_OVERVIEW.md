# Rubber Armstrong – Project Overview for Claude

**Purpose:** Single reference for AI assistants working on this codebase: what the app is, what's implemented, and what remains to do.

**Last updated:** 28 February 2026

---

## 1. Project overview

The Rubber Armstrong website is the official site for the Rubber Armstrong Burning Man camp. It serves prospective and confirmed campers with information about the camp, ticketing, how to join, and key dates. A separate Statement of Intent (SOI) form collects applications; approved applicants are later invited to complete a Join form (planned). The audience is potential and current Rubber Armstrong campers and the broader Burning Man community.

**Main features / modules**

- **Main site** – Informational pages (About, Camp Life, Tickets, Join, Dates, Gallery, Roles) with responsive design, custom branding, and SEO.
- **SOI form** – 15-field Statement of Intent with validation, duplicate detection, burn history, and Steward ticket interest; submits to Google Sheets via Apps Script.
- **Interactive calendar** – `/dates` page with CSV-driven events and a details modal.
- **Automation (external)** – Google Contacts sync and weekly analytics reports; implementation lives in the **RA_Emails** repository, not this repo.
- **Design system** – Shared design tokens (`shared/design-tokens.css`), custom Rubber Armstrong font, dark theme, WCAG 2.1 AA–oriented styling.

**Production and hosting**

- **Main site:** https://rubberarmstrong.com (Cloudflare Pages, root = `main-site/`).
- **SOI form:** https://soi.rubberarmstrong.com (Cloudflare Pages, root = `soi-site/`).
- **Backend:** Google Apps Script (form handler, contacts sync, analytics) – see **RA_Emails** repo; this repo only holds the Apps Script reference in `docs/APPS_SCRIPT_GUIDE.md` and the SOI form's endpoint in `soi-site/js/config.js`.
- **Data:** Google Sheets ("RA 2026 SOI Submissions") with tabs for staging, approved, rejected, archive.

**Repo layout**

| Folder | Contents |
|--------|----------|
| `main-site/` | Main website HTML, CSS, JS, images, `data/dates.csv`, `data/roles.csv`; `_redirects`, `404.html`, `sitemap.xml`, `robots.txt` |
| `soi-site/` | SOI form (single-page app): HTML, CSS, JS (form, validation, config), assets |
| `shared/` | Shared CSS (design tokens), fonts, images; `BRAND_ASSETS_GUIDE.md` |
| `scripts/` | Reference scripts: `apps-script-complete.js`, `google-analytics-daily-report.js`, `google-contacts-sync.js`, `fix-burns-count-display.js` (Apps Script/automation code lives in RA_Emails) |
| `docs/` | All project documentation (getting started, setup, Apps Script guide, troubleshooting, content manifesto, changelog, archive) |
| `camp_assets/` | Original camp assets, logos, icons (reference/source) |
| `roles-app/` | Separate roles app (React/JSX) used by `main-site/roles.html` |

---

## 2. Tech stack & architecture

- **Frontend:** HTML5, CSS3, vanilla JavaScript. No React/Vue/etc. on main or SOI sites; extensionless URLs via Cloudflare `_redirects`.
- **Styling:** Shared design tokens in `shared/design-tokens.css` (colors, typography, spacing, focus); main-site and soi-site each have their own `styles.css` and may use local `design-tokens.css`.
- **State:** No global state library; form state is local (SOI form JS).
- **Backend:** Google Apps Script (in RA_Emails repo) – Web App `doPost` receives SOI submissions, writes to Sheets, triggers auto-move and optional Contacts/Analytics.
- **Database:** Google Sheets only (no SQL). Four tabs: SOI_Staging, SOI_Approved, SOI_Rejected, SOI_2026 (archive). Column schema and 26-column layout documented in `docs/APPS_SCRIPT_GUIDE.md` and `docs/SETUP_GUIDE.md`.
- **Auth:** No user auth in this repo. SOI is public submit; Join (planned) and Phase 3 tools (roster, hitch-hiking, shifts) are intended to be campmates-only (password or link-based, TBD).
- **Patterns:** Static sites; design tokens for consistency; Apps Script as single serverless backend; CORS avoided by sending `Content-Type: text/plain` from SOI form.

---

## 3. Main app routes & modules

| Route / path | Module / area | Description |
|--------------|----------------|-------------|
| `/` | Main site | Home page |
| `/about` | Main site | About the camp |
| `/camp-life` | Main site | Camp life and culture |
| `/ticketing` | Main site | 2026 ticket sales (Sunrise, Stewards, Main, etc.) |
| `/join` | Main site | How to join; links to SOI and timing/tickets |
| `/dates` | Main site | Interactive calendar (CSV-driven, event modal) |
| `/gallery` | Main site | Photo gallery (not in sitemap; in nav on some pages) |
| `/roles` | Main site | Roles page (accessible but not in main nav; content migration planned) |
| `/contact` | Main site | 404 (intentionally removed) |
| (any unknown path) | Main site | Custom `404.html` |
| `https://soi.rubberarmstrong.com/` | SOI site | Statement of Intent form (single page) |

Subdomains: `soi.rubberarmstrong.com` (SOI form). Planned: `join.rubberarmstrong.com` (Join form), per Phase 2.

---

## 4. Database / data layer

- **Google Sheets** – Single "database": spreadsheet "RA 2026 SOI Submissions" with four tabs. Schema is defined by Apps Script `CONFIG.HEADERS` (26 columns); see `docs/APPS_SCRIPT_GUIDE.md` (Config.gs, column mapping) and `docs/SETUP_GUIDE.md` (column structure).
- **Auth / identity:** None in this repo; Sheets is accessed by Apps Script with script-owned credentials.
- **Core domain:** SOI submissions (personal info, burn history, Steward interest, status, review metadata). Column list and validation options are in APPS_SCRIPT_GUIDE.
- **Other data in repo:** `main-site/data/dates.csv` (calendar events), `main-site/data/roles.csv` (roles content). No schema/types in code; CSV columns documented in CHANGELOG and README.

---

## 5. What's done

- Main site v1.0: all primary pages (Home, About, Camp Life, Ticketing, Join, Dates), extensionless URLs, 301 redirects from `.html`, custom 404, canonical non-www, sitemap, robots.txt.
- SOI form live: 15 fields, validation, duplicate detection, country/phone code, burn years, Steward interest; posts to Apps Script; success/error handling.
- Google Sheets backend: 4-tab structure, 26 columns, status-driven auto-move (Pending → Approved/Rejected), documented in APPS_SCRIPT_GUIDE (Apps Script code in RA_Emails).
- Interactive calendar: `/dates`, CSV-driven, multi-day events, modal details, responsive.
- Design: shared design tokens, Rubber Armstrong font, dark theme, gold card borders, responsive images, WCAG 2.1 AA–oriented.
- Custom favicon/PWA icons (Phase 2 done).
- Content: 2026 ticket dates, "Timing and Tickets" on Join, Steward disclaimers, British English, tone alignment.
- SEO: sitemap, meta tags, no Contact in index.
- Docs: GETTING_STARTED, SETUP_GUIDE, APPS_SCRIPT_GUIDE, TROUBLESHOOTING, content-manifesto-reference, CHANGELOG, docs/README index, phase checklists.
- Roles content archived in `docs/roles.md` for future migration; Roles page still present but out of main nav.

---

## 6. What still has to do

**Critical / high priority**

- **Join form (join.rubberarmstrong.com)** – Phase 2: build `join-site/` (or similar), form fields for confirmed campers (personal, ticket status, dates, accommodation, power, shifts, emergency), validation, Apps Script endpoint and `Camp_Confirmed_2026` sheet tab, Cloudflare project and custom domain, access control (approved applicants only; password or unique links). See `PHASE_2_CHECKLIST.md`.
- **Steward Sale ticket tracker** – Phase 2: page (password or unique URL) to track allocations and assignments; Sheets-backed; mobile-friendly. See `PHASE_2_CHECKLIST.md`.

**Medium / lower priority**

- **Phase 3 (pre-event):** Hitch-hiking/ride-share page, Roster page (campmates-only), Persians/shift schedule, RA phone lock screen asset. All campmates-only; see `PHASE_3_CHECKLIST.md`.
- **Content and UX:** Custom favicon/icons refinement, complete 2022 gallery images, packing list page, FAQ page, Rubber Armstrong Express page, copy/voice polish.
- **Tech / quality:** No automated tests in repo; add if desired. A11y audit beyond current WCAG-oriented styling. Centralised logging/monitoring not documented.
- **Roles:** Migrate roles to separate project; Roles page currently accessible but not in nav.

**From docs**

- **docs/README.md "Next steps":** Add packing list, FAQ, build join.rubberarmstrong.com; post–Stewards Sale: launch Join form.
- **docs/archive/NEXT_STEPS.md:** Refers to email tracking/worker setup that moved to RA_Emails; can be ignored for this repo.
- **docs/archive/AUDIT_SUMMARY.md (TODOs):** LockService, configurable sheet tab name, plain-text email, error handling, etc. – apply in RA_Emails if still relevant.

**Before production (for new features)**

- For Join: test full flow SOI → approval → Join; verify analytics; check mobile.
- For Phase 3: access control, privacy (opt-out, playa names), mobile-first.

---

## 7. Recommended fix / next steps order

1. **Join form** – Implement join.rubberarmstrong.com and backend (Sheets + Apps Script in RA_Emails), then add access control and test SOI → approval → Join.
2. **Steward tracker** – Implement tracker page and Sheets integration; secure access.
3. **Regenerate / align Apps Script** – If column count or tabs change, update CONFIG in RA_Emails and ensure SOI form and any Join form stay in sync with sheet headers.
4. **Phase 3 tools** – After Phase 2, implement hitch-hiking, roster, shifts, lock screen in order given in PHASE_3_CHECKLIST.
5. **Content and polish** – Gallery 2022, FAQ, packing list, copy pass; a11y and tests if desired.

---

## 8. Documentation index

| Doc | Purpose |
|-----|--------|
| [docs/README.md](docs/README.md) | Documentation index and quick links |
| [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) | Overview, what's working, daily workflow, quick reference |
| [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md) | Full setup: repo, Cloudflare Pages, Google Sheets, Apps Script, Contacts, Analytics |
| [docs/APPS_SCRIPT_GUIDE.md](docs/APPS_SCRIPT_GUIDE.md) | Apps Script structure, config, column mapping, deployment (backend code in RA_Emails) |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Form, burns data, Sheets, auto-move, Contacts, analytics, deployment, Apps Script errors |
| [docs/content-manifesto-reference.md](docs/content-manifesto-reference.md) | Writing guidelines and brand voice |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Version and change history |
| [PHASE_2_CHECKLIST.md](PHASE_2_CHECKLIST.md) | Pre–Stewards Sale: Join form, Steward tracker |
| [PHASE_3_CHECKLIST.md](PHASE_3_CHECKLIST.md) | Post–Stewards Sale / pre-event: hitch-hiking, roster, shifts, lock screen |
| [README.md](README.md) | Project summary, live URLs, structure, tech stack, dev/deploy |
| [shared/BRAND_ASSETS_GUIDE.md](shared/BRAND_ASSETS_GUIDE.md) | Brand assets and usage |
| [main-site/README.md](main-site/README.md), [soi-site/README.md](soi-site/README.md), [scripts/README.md](scripts/README.md) | Per-module readmes |
| [docs/archive/](docs/archive/) | Historical docs (audits, fixes, completed tasks, next steps from old email tracking) |

---

## 9. Secrets & deploy

**Do not commit**

- `.env`, `.env.local`, `.env.*.local` (in `.gitignore`).
- API keys, tokens, and service-account JSON (`.gitignore` has `*.json` with exceptions for package.json, tsconfig).
- Apps Script deployment URL is currently in repo in `soi-site/js/config.js`; consider moving to env or build-time config if the URL must stay secret (deployed Apps Script web app is "Anyone" for execution).

**Deploy**

- **Sites:** No build step. Push to `main`; Cloudflare Pages builds from the same repo with root directory set per project (`main-site` or `soi-site`). Deploy is automatic (1–2 minutes). No `VERCEL_TOKEN` or similar; Cloudflare is connected to GitHub.
- **Canonical deploy:** `git push origin main` (after editing files in `main-site/` or `soi-site/`). Set custom domains and build settings in Cloudflare Dashboard (see SETUP_GUIDE).
- **Apps Script:** Deploy from the RA_Emails repository (or Google Apps Script UI). After deploy, copy the web app URL into `soi-site/js/config.js` → `APPS_SCRIPT_ENDPOINT` if needed.

---

## 10. Quick commands

```bash
# Local dev – main site
cd main-site
python -m http.server 8000
# → http://localhost:8000

# Local dev – SOI form (backend still uses deployed Apps Script)
cd soi-site
python -m http.server 8001
# → http://localhost:8001

# Deploy (no local build)
git add .
git commit -m "Your message"
git push origin main
# Cloudflare Pages auto-deploys main and SOI from same repo (1–2 min)

# Lint
# No npm lint script in repo; use editor/IDE or add ESLint if desired.

# One-off scripts (run from repo root or scripts/)
# scripts/fix-burns-count-display.js – run in Apps Script or as needed
# scripts/google-analytics-daily-report.js, scripts/google-contacts-sync.js – reference; actual automation in RA_Emails
```

No `npm run build` or `npm run deploy` in this repo; deployment is Git push to `main` with Cloudflare Pages.
