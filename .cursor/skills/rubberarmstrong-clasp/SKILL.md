---
name: rubberarmstrong-clasp
description: >-
  Deploy and manage Rubber Armstrong Google Apps Script projects using clasp.
  Standardizes CI deployments via GitHub Actions authenticated as
  rubberarmstrongcamp@gmail.com, handles .clasp.json/appsscript.json conventions,
  web app deployments, and safe secret handling. Use when the user mentions
  clasp, Apps Script, script.google.com, doPost, web app deploy, .clasp.json,
  appsscript.json, or any Rubber Armstrong email/sheets automation scripts.
---

# Rubber Armstrong — clasp (Google Apps Script)

All Rubber Armstrong Apps Script projects are managed under the Google account:
`rubberarmstrongcamp@gmail.com`.

## Non-negotiables (security)

- **Never** commit OAuth tokens. In particular:
  - `~/.clasprc.json` must never be committed.
  - `.clasp.json` **is allowed** to be committed (it only contains `scriptId`).
- For CI, store the clasp OAuth token JSON as a **GitHub Actions secret** and
  write it to `~/.clasprc.json` at runtime.
- Treat sheet IDs, script IDs, and web app URLs as non-secret identifiers.

## What exists today (repo map)

| Repo | Clasp project folder | scriptId | Notes |
|------|----------------------|----------|------|
| `RA_Emails` | `apps-script-consolidated/` | `1Gghw14qU6SsVHwhVAHhrB6ZRKDPnQliO1GCseWNUUp8hUCt8pVs_ubBK` | Manifest enables People API + AnalyticsData; webapp is anonymous |
| `RA_Emails_v2` | `apps-script/` | `1WQwmWumdb-z7LQINU49Il2u3S1zJ-_orap-Vz3lLNEkUe-fO41uYbbWk` | Manifest enables People API |
| `RA_Join` | `apps-script/` | *(not yet clasp-linked)* | Has `Code.gs` for join webhook; can be turned into clasp project |

## Standard workflow (local)

1. Install clasp:

```bash
npm i -g @google/clasp
clasp --version
```

2. Login (must be `rubberarmstrongcamp@gmail.com`):

```bash
clasp login
```

3. In a repo that already has `.clasp.json`, push:

```bash
cd <clasp-folder>
clasp status
clasp push
```

## CI workflow (GitHub Actions)

### Required GitHub secrets (per repo)

| Secret | Purpose |
|--------|---------|
| `CLASPRC_JSON` | The exact contents of `~/.clasprc.json` for `rubberarmstrongcamp@gmail.com` |

### How to capture `CLASPRC_JSON`

On a machine already logged into clasp as `rubberarmstrongcamp@gmail.com`:

1. Locate `~/.clasprc.json`
2. Copy its full JSON contents into a GitHub secret named `CLASPRC_JSON`

### Example workflow: push Apps Script on main

Use this template as `.github/workflows/clasp-push.yml`:

```yaml
name: clasp push
on:
  push:
    branches: [main]
    paths:
      - 'apps-script/**'
      - 'apps-script-consolidated/**'

jobs:
  push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm i -g @google/clasp

      - name: Write clasp token
        run: |
          mkdir -p ~/.config
          echo '${{ secrets.CLASPRC_JSON }}' > ~/.clasprc.json

      # Repo-specific: set working directory to the clasp project folder
      - name: Push (RA_Emails_v2)
        working-directory: apps-script
        run: |
          clasp status
          clasp push

      # If you also deploy versions, add:
      # - run: clasp deploy --description "CI deploy $GITHUB_SHA"
```

## Web app deployments (doPost endpoints)

Common pattern:

1. `clasp push`
2. Create a new deployed version:

```bash
clasp deploy --description "Update $(date -Iseconds)"
```

3. In the Apps Script UI: Deploy → Manage deployments
   - switch the Web App to the newest version if the URL is pinned

## Conventions

- Keep Apps Script code in one folder per project.
- Ensure `appsscript.json` is present and checked in (manifest on).
- Prefer `scriptExtensions` that include `.gs` and `.js` only.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `User has not enabled the Apps Script API` | Enable Apps Script API in Google Cloud project tied to the account; then re-run `clasp login`. |
| `Invalid credentials` in CI | `CLASPRC_JSON` is wrong/expired; re-login locally and update the secret. |
| `clasp push` ignores files | Check `.claspignore` and confirm `rootDir` in `.clasp.json`. |

## Additional resources

- For concrete per-repo commands, see [examples.md](examples.md).
