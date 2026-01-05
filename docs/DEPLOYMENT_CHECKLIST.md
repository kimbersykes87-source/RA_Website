# Rubber Armstrong 2026 - Deployment Checklist

## Pre-Deployment Tasks

### 1. Configure Cloudflare Web Analytics
- [x] Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Web Analytics
- [x] Create a new site for `rubberarmstrong.com`
- [x] Create a new site for `soi.rubberarmstrong.com`
- [x] Enabled automatic Web Analytics on both Cloudflare Pages projects

### 2. Set Up Google Apps Script Endpoint
- [ ] Create a new Google Sheet named "RA 2026 SOI Submissions"
- [ ] Follow the structure in `GOOGLE_SHEETS_SETUP.md`
- [ ] Create tabs: `SOI_Staging`, `SOI_Approved`, `SOI_Rejected`, `SOI_2026 Archive`
- [ ] Set up column headers as specified in the documentation
- [ ] Create a new Apps Script project (Extensions → Apps Script)
- [ ] Paste the sample code from `GOOGLE_SHEETS_SETUP.md`
- [ ] Deploy as Web App (Execute as: Me, Access: Anyone)
- [ ] Copy the deployment URL
- [ ] Update `soi-site/js/config.js` with the endpoint URL

### 3. Add 2022 Gallery Images
- [ ] Add 5-10 curated images to `main-site/images/gallery/2022/`
- [ ] Update `main-site/gallery.html` to replace the placeholder section with actual images

### 4. Optional: Add Custom Logo
- [ ] Replace `shared/assets/logo.svg` with your actual camp logo
- [ ] Ensure it's in SVG format for best quality

### 5. Optional: Add Custom Fonts
- [ ] Place custom font files in `shared/fonts/`
- [ ] Update `shared/design-tokens.css` to reference custom fonts
- [ ] Follow instructions in `shared/README.md`

---

## GitHub Repository Setup

### 1. Initialize Git Repository
```bash
cd c:\dev\RubberArmstrongWebsite
git init
git add .
git commit -m "Initial commit: Rubber Armstrong 2026 site"
```

### 2. Create GitHub Repository
- [ ] Go to [GitHub](https://github.com/new)
- [ ] Create a new repository (e.g., `rubber-armstrong-2026`)
- [ ] Do NOT initialize with README (we already have one)
- [ ] Copy the repository URL

### 3. Push to GitHub
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## Cloudflare Pages Deployment

### Main Site (rubberarmstrong.com)

1. **Create Cloudflare Pages Project**
   - [ ] Go to Cloudflare Dashboard → Pages
   - [ ] Click "Create a project" → "Connect to Git"
   - [ ] Select your GitHub repository
   - [ ] Project name: `rubber-armstrong-main`

2. **Build Settings**
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `/main-site`
   - Root directory: `main-site`

3. **Deploy**
   - [ ] Click "Save and Deploy"
   - [ ] Wait for deployment to complete
   - [ ] Note the assigned URL (e.g., `rubber-armstrong-main.pages.dev`)

4. **Custom Domain**
   - [ ] In the Pages project → Settings → Custom domains
   - [ ] Add custom domain: `rubberarmstrong.com`
   - [ ] Add custom domain: `www.rubberarmstrong.com`
   - [ ] Follow DNS configuration instructions from Cloudflare

### SOI Site (soi.rubberarmstrong.com)

1. **Create Cloudflare Pages Project**
   - [ ] Go to Cloudflare Dashboard → Pages
   - [ ] Click "Create a project" → "Connect to Git"
   - [ ] Select the SAME GitHub repository
   - [ ] Project name: `rubber-armstrong-soi`

2. **Build Settings**
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `/soi-site`
   - Root directory: `soi-site`

3. **Deploy**
   - [ ] Click "Save and Deploy"
   - [ ] Wait for deployment to complete
   - [ ] Note the assigned URL (e.g., `rubber-armstrong-soi.pages.dev`)

4. **Custom Domain**
   - [ ] In the Pages project → Settings → Custom domains
   - [ ] Add custom domain: `soi.rubberarmstrong.com`
   - [ ] Follow DNS configuration instructions from Cloudflare

---

## Post-Deployment Testing

### Main Site Testing
- [ ] Visit `rubberarmstrong.com`
- [ ] Test navigation on desktop
- [ ] Test navigation on mobile (should show bottom nav bar)
- [ ] Check all pages load correctly: Home, About, Camp Life, Gallery, Ticketing, Join
- [ ] Test gallery images load and display correctly
- [ ] Verify all links work (especially to SOI subdomain)
- [ ] Test accessibility: Tab through navigation, check screen reader compatibility

### SOI Site Testing
- [ ] Visit `soi.rubberarmstrong.com`
- [ ] Fill out the form with test data
- [ ] Verify form validation works (required fields)
- [ ] Submit the form
- [ ] Check success message displays
- [ ] Verify redirect to main site after 3 seconds
- [ ] Check Google Sheet for new submission in `SOI_Staging` tab
- [ ] Verify data matches what you submitted
- [ ] Test honeypot: Fill the "Address" field (should be hidden) and submit → should be blocked
- [ ] Test duplicate email warning: Submit twice with same email → should show warning on second attempt

### Mobile Testing
- [ ] Test both sites on actual mobile device or browser dev tools
- [ ] Verify responsive layout works
- [ ] Test bottom navigation on main site (mobile only)
- [ ] Test form on mobile (SOI site)
- [ ] Verify images load with lazy loading

### Performance Testing
- [ ] Run Google PageSpeed Insights for both domains
- [ ] Check Cloudflare Web Analytics is tracking visits
- [ ] Verify images are being optimized by Cloudflare

---

## Security & Privacy

- [ ] Verify Google Apps Script is set to "Execute as: Me" and "Who has access: Anyone"
- [ ] Test that the Apps Script endpoint only accepts POST requests
- [ ] Verify no sensitive data is exposed in client-side code
- [ ] Check that honeypot field is working to block bots
- [ ] Review Google Sheet permissions (only you should have edit access)

---

## Content Review

- [ ] Review all page content for accuracy
- [ ] Update any placeholder text if needed
- [ ] Verify contact information is correct
- [ ] Check that all Manifesto-derived content aligns with your vision
- [ ] Update gallery image captions if needed (make them more specific)

---

## Optional Enhancements (Post-Launch)

- [ ] Add meta tags for social media sharing (Open Graph, Twitter Cards)
- [ ] Consider adding a favicon
- [ ] Set up email notifications when new SOI submissions arrive (Apps Script trigger)
- [ ] Add more detailed alt text to gallery images based on actual content
- [ ] Create a simple admin dashboard for reviewing SOI submissions (future Phase 2)

---

## Go-Live Checklist

- [ ] All pre-deployment tasks completed
- [ ] Both sites deployed to Cloudflare Pages
- [ ] Custom domains configured and DNS propagated
- [ ] All testing completed successfully
- [ ] Google Sheets receiving form submissions correctly
- [ ] Analytics tracking verified
- [ ] Mobile experience tested and approved
- [ ] Content reviewed and approved

---

## Support & Maintenance

### Updating Content
To update site content:
1. Edit files in your local repository
2. Commit changes: `git add . && git commit -m "Update: description of changes"`
3. Push to GitHub: `git push`
4. Cloudflare Pages will automatically rebuild and deploy (usually within 1-2 minutes)

### Reviewing SOI Submissions
1. Open your Google Sheet
2. Go to `SOI_Staging` tab
3. Review new submissions (Status = "Pending")
4. Change Status to "Approved" or "Rejected"
5. Fill in "Reviewed By", "Reviewed At", and "Internal Notes"
6. For approved submissions, copy the entire row to `SOI_Approved` tab

### Adding Gallery Images
1. Add new images to `main-site/images/gallery/YEAR/` folder
2. Update `main-site/gallery.html` to reference the new images
3. Commit and push to GitHub

---

## Emergency Contacts & Resources

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Google Apps Script Docs**: https://developers.google.com/apps-script
- **Cloudflare Web Analytics**: https://developers.cloudflare.com/analytics/web-analytics/
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Notes

- Keep your Google Apps Script endpoint URL private
- Regularly back up your Google Sheets data
- Monitor analytics for unusual traffic patterns
- Consider setting up a separate test Sheet for testing form changes

