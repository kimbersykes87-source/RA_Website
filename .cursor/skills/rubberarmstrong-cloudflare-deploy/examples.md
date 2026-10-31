# Examples — Rubber Armstrong Cloudflare Deploys

## 1. Deploy `join-site/` to `join.rubberarmstrong.com` (Pages)

```bash
# Verify you are on the personal (RA) account, not Wonder
npx wrangler whoami

# Authenticate if needed (must be Kimbersykes87@gmail.com)
npx wrangler login

# Deploy the static folder
npx wrangler pages deploy join-site --project-name ra-join

# First deploy creates the project. Then bind the custom domain:
#   Pages > ra-join > Custom domains > Add "join.rubberarmstrong.com"
```

**SPA fallback** — create `join-site/_redirects`:

```
/* /index.html 200
```

**Security headers** — create `join-site/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 2. Deploy the email tracking Worker (`RA_Emails_v2`)

The existing `wrangler.toml` is at `RA_Emails_v2/cloudflare-worker/wrangler.toml`:

```toml
name = "email-tracking-worker"
main = "worker-bundled.js"
account_id = "503a8a2ff4270cb830d68d08e3705e92"
workers_dev = true
# routes planned: track.rubberarmstrong.com/*
```

```bash
npx wrangler whoami                       # confirm RA account
cd cloudflare-worker
npx wrangler dev                          # local dev
npx wrangler deploy                       # production deploy
npx wrangler secret put SHEET_ID          # set a runtime secret
```

## 3. Add a DNS record for a new subdomain

For a Pages or Workers custom domain, Cloudflare creates the record
automatically when you bind the domain in the dashboard.

For an external target:

1. Go to **DNS > Records** in the rubberarmstrong.com zone.
2. Add: `CNAME  photos  →  external-host.example.com`  (Proxy: ON).
3. Verify SSL certificate provisions under **SSL/TLS > Edge Certificates**.

## 4. CI/CD — GitHub Actions for `join-site/`

### Set secrets once

```bash
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

### `.github/workflows/deploy-join.yml`

```yaml
name: Deploy join-site
on:
  push:
    branches: [main]
    paths:
      - 'join-site/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx wrangler pages deploy join-site --project-name ra-join
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Verify

After push, check the Actions tab. The deploy log shows the Pages URL
(e.g. `https://<hash>.ra-join.pages.dev`). The custom domain
`join.rubberarmstrong.com` serves the same content once bound.
