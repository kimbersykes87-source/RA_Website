# Migrating rubberarmstrong.com from Adobe Portfolio to Cloudflare Pages

**Status:** 🔄 Ready to migrate  
**Current:** Adobe Portfolio  
**Target:** Cloudflare Pages (static site from this repo)

---

## 📋 Pre-Migration Checklist

### Before You Start
- [ ] Backup current Adobe Portfolio site (screenshots, content)
- [ ] Confirm DNS access for rubberarmstrong.com
- [ ] Test new site locally (all pages work, links functional)
- [ ] Verify SOI form is working on soi.rubberarmstrong.com
- [ ] Review all content for accuracy

### Domain Requirements
- [ ] Access to domain registrar (where you bought rubberarmstrong.com)
- [ ] Ability to change DNS nameservers OR add DNS records

---

## 🚀 Migration Steps

### Step 1: Set Up Cloudflare Pages Project

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Click "Pages" in the left sidebar

2. **Create New Project**
   - Click "Create a project"
   - Choose "Connect to Git"
   - Select your GitHub account
   - Choose repository: `RA_Website`

3. **Configure Build Settings**
   ```
   Project name: rubber-armstrong-main
   Production branch: main
   Build command: (leave empty)
   Build output directory: /
   Root directory (advanced): main-site
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for first deployment to complete
   - You'll get a URL like: `rubber-armstrong-main.pages.dev`

5. **Test the Deployment**
   - Visit the `.pages.dev` URL
   - Check all pages load correctly
   - Test navigation between pages
   - Verify gallery images display
   - Test links to SOI form

---

### Step 2: Add Custom Domain to Cloudflare Pages

1. **In Cloudflare Pages Project**
   - Go to your project → "Custom domains" tab
   - Click "Set up a custom domain"

2. **Add rubberarmstrong.com**
   - Enter: `rubberarmstrong.com`
   - Also add: `www.rubberarmstrong.com`
   - Cloudflare will provide DNS instructions

---

### Step 3: Update DNS Settings in GoDaddy

You have two options. **Option B is faster and recommended for your setup.**

---

**Option A: Switch to Cloudflare Nameservers (Full Control)**

**Pros:** Complete Cloudflare features, better caching, automatic SSL  
**Cons:** Takes 24-48 hours for nameserver propagation  
**Best for:** Long-term if you want full Cloudflare benefits

1. **Add Domain to Cloudflare**
   - Go to Cloudflare Dashboard → "Websites"
   - Click "Add a site"
   - Enter: `rubberarmstrong.com`
   - Choose Free plan

2. **Cloudflare will scan your DNS** and show you existing records

3. **Update Nameservers in GoDaddy**
   - Cloudflare will show you 2 nameservers (e.g., `arya.ns.cloudflare.com`)
   - Log into GoDaddy: https://dcc.godaddy.com/domains
   - Find `rubberarmstrong.com` → Click "DNS"
   - Scroll to "Nameservers" section
   - Click "Change"
   - Select "Custom" or "I'll use my own nameservers"
   - Replace:
     ```
     OLD: ns01.domaincontrol.com
          ns02.domaincontrol.com
     
     NEW: [Cloudflare nameserver 1]
          [Cloudflare nameserver 2]
     ```
   - Save changes
   - **Wait 24-48 hours** for propagation

4. **Once Active in Cloudflare**
   - Cloudflare Pages will auto-configure DNS
   - Verify these records exist:
     ```
     Type: CNAME
     Name: rubberarmstrong.com (or @)
     Target: rubber-armstrong-main.pages.dev
     Proxied: Yes (orange cloud)

     Type: CNAME
     Name: www
     Target: rubber-armstrong-main.pages.dev
     Proxied: Yes (orange cloud)
     ```

---

**Option B: Keep GoDaddy Nameservers (Quick Update) ⭐ RECOMMENDED**

**Pros:** Fast (propagates in 1-2 hours), simple change  
**Cons:** Less Cloudflare features (but still works great)  
**Best for:** Quick migration without changing nameservers

1. **Get Your Cloudflare Pages URL**
   - After deploying in Step 1, you'll have a URL like:
   - `rubber-armstrong-main.pages.dev`

2. **Update DNS in GoDaddy**
   - Log into GoDaddy: https://dcc.godaddy.com/domains
   - Find `rubberarmstrong.com` → Click "DNS"
   - Scroll to "DNS Records" section

3. **Delete Old A Records**
   - Find the 4 A records currently pointing to:
     - `151.101.128.119` (Adobe/Fastly)
     - `151.101.192.119` (Adobe/Fastly)
   - Delete ALL 4 A records (both @ and www)

4. **Add New CNAME Records**
   
   **For root domain (@):**
   ```
   Type: CNAME
   Name: @
   Value: rubber-armstrong-main.pages.dev
   TTL: 600 seconds (10 minutes)
   ```
   
   **For www:**
   ```
   Type: CNAME  
   Name: www
   Value: rubber-armstrong-main.pages.dev
   TTL: 600 seconds (10 minutes)
   ```

5. **Save Changes**
   - Click "Save" or "Add Record"
   - Changes propagate in **1-2 hours** (much faster than nameserver changes!)

6. **Verify Propagation**
   - Wait 1-2 hours
   - Visit: https://dnschecker.org
   - Enter: `rubberarmstrong.com`
   - Should show CNAME pointing to your `.pages.dev` URL

---

**Which Option Should You Choose?**

| Factor | Option A (Cloudflare NS) | Option B (GoDaddy DNS) |
|--------|-------------------------|------------------------|
| Speed | 24-48 hours | 1-2 hours |
| Complexity | Medium | Easy |
| Features | Full Cloudflare | Basic (still works!) |
| **Recommended** | Long-term | ⭐ Quick start |

**My Recommendation:** Start with **Option B** to get live quickly. You can always switch to Option A later for more Cloudflare features.

---

### Step 4: Enable HTTPS

Cloudflare automatically provisions SSL certificates. This happens within 24 hours of DNS propagation.

**To verify:**
1. Visit https://rubberarmstrong.com
2. Check for padlock icon in browser
3. Certificate should show "Cloudflare"

---

### Step 5: Decommission Adobe Portfolio

**IMPORTANT: Only do this AFTER confirming the new site is live!**

1. **Test New Site Thoroughly**
   - Visit https://rubberarmstrong.com
   - Check all pages
   - Verify gallery loads
   - Test SOI form link
   - Check on mobile devices

2. **Once Confirmed Working**
   - Log into Adobe Portfolio
   - Navigate to site settings
   - Unpublish or delete the old site
   - Cancel Adobe Portfolio subscription (if desired)

---

## 🔍 Verification Checklist

After migration, verify:

- [ ] https://rubberarmstrong.com loads the new site
- [ ] https://www.rubberarmstrong.com redirects correctly
- [ ] All navigation links work
- [ ] Gallery images display
- [ ] Link to SOI form works (soi.rubberarmstrong.com)
- [ ] Site loads on mobile devices
- [ ] HTTPS is working (padlock icon)
- [ ] Old Adobe Portfolio site is no longer accessible

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| Cloudflare Pages setup | 10 minutes |
| DNS propagation | 1-48 hours |
| SSL certificate | Automatic (within 24 hours) |
| Testing | 30 minutes |
| **Total** | **1-2 days** |

---

## 🆘 Troubleshooting

### "Site not found" or 404 errors
- **Cause:** DNS hasn't propagated yet
- **Solution:** Wait up to 48 hours, check DNS with: https://dnschecker.org

### HTTPS not working
- **Cause:** SSL certificate still provisioning
- **Solution:** Wait up to 24 hours after DNS propagation

### Images not loading
- **Cause:** Path issues or missing files
- **Solution:** Check browser console (F12), verify image paths in HTML

### Old site still showing
- **Cause:** DNS cache or browser cache
- **Solution:** 
  - Clear browser cache (Ctrl+Shift+Delete)
  - Try incognito/private browsing
  - Check on different device/network

---

## 📞 Support

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **DNS Help:** https://developers.cloudflare.com/dns
- **Project Docs:** See `/docs` folder in this repo

---

## 🎯 Post-Migration Tasks

After successful migration:

1. **Set up Cloudflare Web Analytics**
   - Dashboard → Web Analytics → Add site
   - Add tracking beacon to all pages

2. **Configure Page Rules** (optional)
   - Force HTTPS redirect
   - Cache settings optimization

3. **Update Social Links** (if any)
   - Update any external links pointing to old Adobe Portfolio URL

4. **Monitor for 1 Week**
   - Check analytics daily
   - Watch for any broken links or errors
   - Monitor form submissions

---

**Ready to migrate?** Follow the steps above and you'll be live on Cloudflare Pages within 1-2 days! 🚀

