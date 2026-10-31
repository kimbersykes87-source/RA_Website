# Examples — Rubber Armstrong clasp

## RA_Emails (apps-script-consolidated) LEGACY, do not deploy

```bash
cd "C:\dev\RA_Emails\apps-script-consolidated"
clasp status
clasp push
clasp deploy --description "RA_Emails update"
```

Script ID (from `.clasp.json`):
`1Gghw14qU6SsVHwhVAHhrB6ZRKDPnQliO1GCseWNUUp8hUCt8pVs_ubBK`

Manifest (`appsscript.json`) enables:
- People API v1
- Analytics Data API v1beta
- Web app access: `ANYONE_ANONYMOUS`

## RA_Emails_v2 (apps-script)

```bash
cd "C:\dev\RA_Emails_v2\apps-script"
clasp status
clasp push
clasp deploy --description "RA_Emails_v2 update"
```

Script ID (from `.clasp.json`):
`1WQwmWumdb-z7LQINU49Il2u3S1zJ-_orap-Vz3lLNEkUe-fO41uYbbWk`

If the repo tracks a Web App URL (example): see `RA_Emails_v2/deployed-urls.json`.

## Turning RA_Join apps-script into a clasp project

Current folder: `C:\dev\RA_Join\apps-script` (contains `Code.gs` and a README).

Option A (recommended): Create a new standalone Apps Script project:

```bash
cd "C:\dev\RA_Join\apps-script"
clasp login
clasp create --title "RA Join 2026" --type standalone
clasp push
clasp open
```

Then deploy as a Web App from the Apps Script UI, and set the endpoint in
`join-site/js/config.prod.js`.

Option B: Clone an existing script by `scriptId`:

```bash
cd "C:\dev\RA_Join\apps-script"
clasp clone <scriptId>
clasp push
```

## GitHub Actions secret setup

Store your clasp token JSON (contents of `~/.clasprc.json`) in a repo secret:

```bash
gh secret set CLASPRC_JSON
```

Then in the workflow, write it to `~/.clasprc.json` before running `clasp push`.

