# Cloudflare Pages Settings Reference

Exact settings to use when creating your Cloudflare Pages project.

---

## Project Configuration

### Basic Settings

```
Project name: rubber-armstrong-main
```

### Git Settings

```
Production branch: main
```

### Build Settings

```
Framework preset: None

Build command: [LEAVE EMPTY - no build needed]

Build output directory: /

Root directory (advanced): main-site
```

### Environment Variables

```
[NONE - Leave empty]
```

---

## Build Configuration Explained

**Why these settings?**

- **No build command:** Your site is pure static HTML/CSS/JS - no build step needed
- **Output directory `/`:** The root of `main-site` folder contains your HTML files
- **Root directory `main-site`:** This tells Cloudflare to deploy only the main-site folder
- **No environment variables:** Static site doesn't need any

---

## Custom Domains Configuration

### Primary Domain

```
Domain: rubberarmstrong.com
Type: CNAME
Target: rubber-armstrong-main.pages.dev
```

### WWW Subdomain

```
Domain: www.rubberarmstrong.com
Type: CNAME
Target: rubber-armstrong-main.pages.dev
```

---

## Expected URLs After Deployment

```
Cloudflare Pages URL: https://rubber-armstrong-main.pages.dev
Custom domain: https://rubberarmstrong.com
WWW subdomain: https://www.rubberarmstrong.com
```

---

## Screenshot Checklist

When setting up, you should see:

### Pages Dashboard
- ✅ "rubber-armstrong-main" project created
- ✅ Green "Active" status
- ✅ Latest commit shows in production
- ✅ Build time: ~30 seconds

### Custom Domains Tab
- ✅ rubberarmstrong.com - Active
- ✅ www.rubberarmstrong.com - Active
- ✅ Both showing green status indicators

### Deployments Tab
- ✅ Production deployment successful
- ✅ Commit message visible
- ✅ View deployment button works

---

## Common Mistakes to Avoid

❌ **Don't** set Framework preset to anything other than "None"  
❌ **Don't** add a build command  
❌ **Don't** set root directory to `/` (must be `main-site`)  
❌ **Don't** add environment variables unless specifically needed  

✅ **Do** leave build command empty  
✅ **Do** set root directory to `main-site`  
✅ **Do** use TTL 600 for CNAME records in GoDaddy  

---

## Verification Commands

After deployment, test with:

```bash
# Check if site is live
curl -I https://rubber-armstrong-main.pages.dev

# Should return: HTTP/2 200

# Check DNS (after GoDaddy update)
nslookup rubberarmstrong.com

# Should show CNAME to rubber-armstrong-main.pages.dev
```

---

**This is your reference guide - keep it handy during setup!**

