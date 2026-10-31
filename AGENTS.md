# Agent guide — Rubber Armstrong Website

**Purpose:** Orient AI coding agents before they edit this repository. For full depth, read [`docs/CLAUDE_PROJECT_OVERVIEW.md`](docs/CLAUDE_PROJECT_OVERVIEW.md) next.

**Last updated:** March 2026

---

## What this repo is

Official static sites for **Rubber Armstrong**, a Burning Man camp:

| Site | URL | Source folder |
|------|-----|----------------|
| Main site | https://rubberarmstrong.com | `main-site/` |
| Statement of Intent (SOI) form | https://soi.rubberarmstrong.com | `soi-site/` |

Submissions go to **Google Sheets** via **Google Apps Script**. Live backend code, Contacts sync, and email automation live in the separate **RA_Emails** repository—not here.

---

## Repository layout

| Path | Role |
|------|------|
| `main-site/` | HTML, CSS, JS, images, `_redirects`, `404.html`, `sitemap.xml`, `robots.txt`, `data/dates.csv`, `data/roles.csv` |
| `soi-site/` | SOI single-page form; endpoint in `soi-site/js/config.js` (`APPS_SCRIPT_ENDPOINT`) |
| `shared/` | Shared design tokens, fonts, images; see `shared/BRAND_ASSETS_GUIDE.md` |
| `scripts/` | Reference copies of Apps Script / utilities; production scripts deploy from **RA_Emails** |
| `docs/` | Human and AI-oriented docs; start with [`docs/README.md`](docs/README.md) |
| `roles-app/` | React/JSX roles UI used by `main-site/roles.html` |
| `camp_assets/` | Reference/source assets (not the deployed site root) |

---

## Tech stack (constraints)

- **Frontend:** HTML5, CSS3, **vanilla JavaScript** on main and SOI sites (no React on those pages except the embedded roles bundle).
- **Hosting:** **Cloudflare Pages** — no build step; push to `main` deploys. Project roots are `main-site` and `soi-site` as separate Page projects.
- **Backend:** Google Apps Script + Google Sheets (see `docs/APPS_SCRIPT_GUIDE.md`; implement changes in **RA_Emails** unless only updating this repo’s reference script or form payload).
- **Styling:** Design tokens (`shared/design-tokens.css`); each site may duplicate or extend tokens locally—match existing patterns.

---

## Agent workflow

1. **Scope:** Confirm whether the change belongs in `main-site/`, `soi-site/`, `shared/`, or **RA_Emails** (server-side, sheet schema, contacts).
2. **Content voice:** Use [`docs/content-manifesto-reference.md`](docs/content-manifesto-reference.md) for copy; project uses **British English** where specified in docs.
3. **SOI submissions:** Field names and sheet columns must stay aligned with `docs/APPS_SCRIPT_GUIDE.md` / `docs/SETUP_GUIDE.md`. Changing columns requires coordinated updates in Apps Script (**RA_Emails**) and `soi-site/js/form.js`.
4. **Secrets:** Do not commit API keys, tokens, or private JSON. `soi-site/js/config.js` contains the public web app URL—treat as sensitive if locking down execution.
5. **Redirects / URLs:** Extensionless paths are handled via Cloudflare `main-site/_redirects`; keep sitemap and nav consistent.

---

## Quick local preview

```bash
# Main site
cd main-site && python -m http.server 8000

# SOI (still posts to deployed Apps Script)
cd soi-site && python -m http.server 8001
```

---

## Documentation map

| When you need… | Open |
|----------------|------|
| Full agent-oriented overview (routes, data model, backlog) | [`docs/CLAUDE_PROJECT_OVERVIEW.md`](docs/CLAUDE_PROJECT_OVERVIEW.md) |
| Doc index | [`docs/README.md`](docs/README.md) |
| Day-to-day ops / quick reference | [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) |
| Cloudflare, Sheets, Apps Script setup | [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md) |
| Apps Script structure & columns | [`docs/APPS_SCRIPT_GUIDE.md`](docs/APPS_SCRIPT_GUIDE.md) |
| Common failures | [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) |
| Phase backlogs | [`PHASE_2_CHECKLIST.md`](PHASE_2_CHECKLIST.md), [`PHASE_3_CHECKLIST.md`](PHASE_3_CHECKLIST.md) |
| Root project summary | [`README.md`](README.md) |

---

## Planned / out of scope in this repo

- **Join form** (`join.rubberarmstrong.com`), **Steward tracker**, and **Phase 3** tools (roster, rides, shifts) are planned; see phase checklists. Backend work belongs in **RA_Emails** + new site folders when built.
- **No root-level `npm run build`** for the static sites; `roles-app` may have its own toolchain—check `roles-app/package.json` if you touch the roles build.

When in doubt, read **`docs/CLAUDE_PROJECT_OVERVIEW.md`** — it is the long-form companion to this file.
