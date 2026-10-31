---
name: rubberarmstrong-cloudflare-deploy
description: >-
  Deploy and manage Rubber Armstrong web properties on Cloudflare.
  Covers Cloudflare Pages (static site deploys), Workers (edge functions/APIs),
  DNS records and custom domain binding for rubberarmstrong.com subdomains,
  Pages _redirects/_headers conventions, and CI/CD via GitHub Actions.
  Use when the user mentions rubberarmstrong.com, join.rubberarmstrong.com,
  Cloudflare, Wrangler, Pages, Workers, pages deploy, DNS, CNAME, SSL/TLS,
  GitHub Actions deploy, or CLOUDFLARE_API_TOKEN.
---

# Rubber Armstrong — Cloudflare Deploy

All Rubber Armstrong web properties are hosted on Cloudflare under the
account **Kimbersykes87@gmail.com** in the zone **rubberarmstrong.com**.

- **Account ID**: `503a8a2ff4270cb830d68d08e3705e92`
- **Zone**: `rubberarmstrong.com`

**Important**: The owner also has a separate **Wonder/work** Cloudflare account
(`kimber.sykes@wearewonder.com`). Always run `npx wrangler whoami` before
deploying and confirm the active account is `Kimbersykes87@gmail.com`. If it
shows the Wonder account, run `npx wrangler login` and sign in with the
personal account.

## Properties registry

| Repo | Type | CF Project / Worker | Subdomain | Output dir | Status |
|------|------|---------------------|-----------|------------|--------|
| `RA_Website` | Pages | *(check dashboard)* | `rubberarmstrong.com` (apex) | `main-site/` | Deployed |
| `RA_Website` | Pages | *(check dashboard)* | `soi.rubberarmstrong.com` | `soi-site/` | Deployed |
| `RA_Join` | Pages | `ra-join` | `join.rubberarmstrong.com` | `join-site/` | Not yet deployed |
| `RA_Emails` | Worker | `email-tracking-worker` | `track.rubberarmstrong.com` (planned) | `cloudflare-worker/` | Deployed to workers.dev |
| `RA_Emails_v2` | Worker | `ra-email-tracking-v2` | `track.rubberarmstrong.com` (planned) | `cloudflare-worker/` | In development |
| `RA_Build` | Vercel | -- | `build.rubberarmstrong.com` | -- | Not on Cloudflare |
| `RA_Portal` | Vercel | -- | *(TBD)* | -- | Not on Cloudflare |
| `RA_ArtCarTracker` | Local | -- | -- | -- | Not a web deploy |
| `RA_Orchestra` | Local | -- | -- | -- | Not a web deploy |
| `RA_Orchestra_v2` | Local | -- | -- | -- | Not a web deploy |

### Naming convention

Cloudflare project names use the prefix `ra-` followed by the property name
in lowercase (e.g. `ra-join`, `ra-email-tracking-v2`). Worker names in
`wrangler.toml` follow the same pattern.

## Non-negotiables (security)

- **Never** commit Cloudflare secrets (API tokens, account IDs, passwords) to git.
- For local/manual work, prefer interactive OAuth: `npx wrangler login`.
- For CI (GitHub Actions), store secrets as **repository secrets** — never inline.
- Always verify `npx wrangler whoami` shows the correct account before deploying.

## Decision tree

```
What are you deploying?
├─ Static site (HTML/CSS/JS folder)  → Cloudflare Pages  (see "Pages workflow")
├─ Serverless function / API         → Cloudflare Workers (see "Workers workflow")
└─ DNS-only change (new subdomain)   → See "DNS + custom domains"
```

## Repo discovery

Before deploying, check the repo for existing config:

1. **`DEPLOY.md`** or **`CLOUDFLARE_PAGES.md`** — treat as source of truth for
   project name, output directory, custom domain, and any redirects/headers.
2. **`wrangler.toml`** — read `name`, `main`, and `pages_build_output_dir`.
3. If neither exists, derive the config from the repo structure and create
   a `wrangler.toml` or deploy command accordingly.

## Install / run Wrangler

Use npx (no global install required):

```bash
npx wrangler --version
```

## Authentication

### Local (interactive)

```bash
npx wrangler login
```

Opens a browser for Cloudflare sign-in. Tokens are cached locally by Wrangler.

### CI / non-interactive

Set these as GitHub Actions **repository secrets**:

| Secret                   | Required | Notes                         |
|--------------------------|----------|-------------------------------|
| `CLOUDFLARE_API_TOKEN`   | Yes      | Scoped to Pages/Workers/DNS   |
| `CLOUDFLARE_ACCOUNT_ID`  | Optional | Speeds up project resolution  |

## Pages workflow (static site)

### Deploy

```bash
npx wrangler pages deploy <output-dir> --project-name <project-name>
```

- If the Pages project does not exist yet, Wrangler creates it on first deploy.
- Production branch defaults to `main`. Override with `--branch`.

### SPA fallback (`_redirects`)

For single-page apps, create a `_redirects` file in the output directory:

```
/* /index.html 200
```

### Security headers (`_headers`)

Create a `_headers` file in the output directory:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Add a Content-Security-Policy header when the site's external resource needs
are known. Start permissive and tighten over time.

### Bind custom domain

After first deploy, bind a custom domain in the Cloudflare dashboard or CLI:

1. Go to **Pages > project > Custom domains > Set up a custom domain**.
2. Enter the subdomain (e.g. `join.rubberarmstrong.com`).
3. Cloudflare auto-creates a CNAME and provisions an SSL certificate.

Verify with:

```bash
npx wrangler pages project list
```

## Workers workflow

### Local dev

```bash
npx wrangler dev
```

### Deploy

```bash
npx wrangler deploy
```

### Secrets

Set runtime secrets without putting them in code:

```bash
npx wrangler secret put MY_SECRET
```

### Bind custom domain (Workers)

In `wrangler.toml`:

```toml
routes = [
  { pattern = "api.rubberarmstrong.com/*", zone_name = "rubberarmstrong.com" }
]
```

Or bind via the Cloudflare dashboard under **Workers > Triggers > Custom Domains**.

## DNS + custom domains

All DNS is managed in the **rubberarmstrong.com** zone.

### Checklist for a new subdomain

1. Decide record type:
   - **Pages custom domain** — Cloudflare creates CNAME automatically.
   - **Workers custom domain** — Cloudflare creates AAAA automatically.
   - **External target** — create CNAME or A record manually.
2. Confirm **Proxy status** is enabled (orange cloud) for Cloudflare benefits.
3. Confirm **SSL/TLS** mode is **Full (strict)** at zone level.
4. After binding, verify certificate status under **SSL/TLS > Edge Certificates**.

### Add a DNS record via Wrangler / API

For manual records, use the Cloudflare dashboard or API. Wrangler does not
manage arbitrary DNS records directly; custom domain binding for Pages/Workers
handles it automatically.

## CI/CD — GitHub Actions

### Pages deploy workflow

```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: <site-dir>
        if: hashFiles('<site-dir>/package-lock.json') != ''
      - run: npx wrangler pages deploy <output-dir> --project-name <project-name>
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Workers deploy workflow

```yaml
name: Deploy Cloudflare Worker
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Setting GitHub repository secrets

```bash
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Authentication error` | Run `npx wrangler login` (local) or check `CLOUDFLARE_API_TOKEN` scope (CI). |
| Deploy succeeds but custom domain 404s | Confirm custom domain is bound in Pages/Workers settings and DNS CNAME exists. |
| `_redirects` / `_headers` ignored | Ensure files are in the **output directory root**, not the project root. |
| SSL certificate pending | Wait up to 15 minutes; verify SSL/TLS mode is Full (strict). |

## Additional resources

- For concrete deploy examples, see [examples.md](examples.md).
