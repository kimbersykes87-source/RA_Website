# GoDaddy DNS Update Guide (Visual)

Quick visual reference for updating DNS in GoDaddy.

---

## Step-by-Step with Expected Interface

### 1. Access DNS Management

1. Go to: https://dcc.godaddy.com/domains
2. Find `rubberarmstrong.com`
3. Click the DNS button or "Manage DNS"

---

### 2. Locate DNS Records Section

You'll see a section called "**DNS Records**" with a table showing:

**Current Records (what you should see now):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 151.101.128.119 | 600 |
| A | @ | 151.101.192.119 | 600 |
| A | www | 151.101.128.119 | 600 |
| A | www | 151.101.192.119 | 600 |

These are your **Adobe Portfolio** records (Fastly CDN).

---

### 3. Delete Old A Records

For each A record:
1. Click the **pencil icon** (edit) or **trash icon** (delete) on the right
2. If edit opens, click "Delete Record" at the bottom
3. Confirm deletion

**Delete all 4 A records** pointing to Adobe/Fastly IPs.

---

### 4. Add New CNAME Records

Click "**Add**" or "**Add Record**" button (usually at top or bottom of DNS Records section)

#### Record 1: Root Domain

```
Type: CNAME
Name: @ 
Value: rubber-armstrong-main.pages.dev
TTL: 600 (or "Custom" → 600 seconds)
```

Click "**Save**"

#### Record 2: WWW Subdomain

Click "**Add**" again

```
Type: CNAME
Name: www
Value: rubber-armstrong-main.pages.dev
TTL: 600
```

Click "**Save**"

---

### 5. Verify Changes

After saving, your DNS Records table should show:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | rubber-armstrong-main.pages.dev | 600 |
| CNAME | www | rubber-armstrong-main.pages.dev | 600 |

**Plus existing records** (NS, SOA, etc. - don't touch these!)

---

## Important Notes

### ⚠️ DNS Propagation Time
- Changes take **1-2 hours** to propagate globally
- GoDaddy's DNS is fast but not instant
- Use https://dnschecker.org to monitor propagation

### 🔒 Keep These Records
Do NOT delete:
- **NS records** (ns01.domaincontrol.com, ns02.domaincontrol.com)
- **SOA record** (system record)
- Any **MX records** (email)
- Any other CNAME/TXT records you've added

### ✅ Only Change
- Delete the 4 **A records** for @ and www pointing to Fastly (151.101.x.x)
- Add 2 new **CNAME records** for @ and www pointing to your Cloudflare Pages URL

---

## Common Issues

### "CNAME not allowed at root"
- GoDaddy **does** allow CNAME at @ (root) 
- If you get an error, try using `@` instead of blank
- Or use "CNAME Flattening" option if available

### "Record already exists"
- Make sure you **deleted all A records first**
- CNAME and A records for same name will conflict

### "Invalid value"
- Make sure you copied the full `.pages.dev` URL
- Should be: `your-project-name.pages.dev`
- No `https://` prefix
- No trailing `/` slash

---

## Quick Reference: Current vs New

### Current (Adobe Portfolio):
```
A @ → 151.101.128.119
A @ → 151.101.192.119
A www → 151.101.128.119  
A www → 151.101.192.119
```

### New (Cloudflare Pages):
```
CNAME @ → rubber-armstrong-main.pages.dev
CNAME www → rubber-armstrong-main.pages.dev
```

---

## Testing After Changes

Wait 1-2 hours, then test:

```bash
# Check DNS resolution
nslookup rubberarmstrong.com
nslookup www.rubberarmstrong.com

# Should show CNAME pointing to .pages.dev
```

Or use online tool: https://dnschecker.org

---

**Need help?** See main migration guide: [ADOBE_TO_CLOUDFLARE_MIGRATION.md](./ADOBE_TO_CLOUDFLARE_MIGRATION.md)

