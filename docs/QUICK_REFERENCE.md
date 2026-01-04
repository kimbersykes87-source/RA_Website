# Quick Reference Guide

Essential information for managing the Rubber Armstrong website.

---

## 🌐 Live URLs

| Site | URL | Purpose |
|------|-----|---------|
| Main Site | https://rubberarmstrong.com | Informational hub |
| SOI Form | https://soi.rubberarmstrong.com | Statement of Intent submissions |
| GitHub Repo | https://github.com/kimbersykes87-source/RA_Website | Source code |

---

## 📂 Project Structure

```
RubberArmstrongWebsite/
├── main-site/          → rubberarmstrong.com
├── soi-site/           → soi.rubberarmstrong.com
├── shared/             → Common assets (fonts, logos, CSS)
├── camp_assets/        → Original brand files
├── docs/               → All documentation
├── scripts/            → Backend scripts (Apps Script)
└── NEXT_STEPS.md       → Options for future work
```

---

## 🔧 Common Tasks

### Update Main Site Content
1. Edit HTML files in `main-site/`
2. Commit and push to GitHub
3. Cloudflare Pages auto-deploys

### Add Gallery Images
1. Add JPG files to `main-site/images/gallery/[year]/`
2. Update `main-site/gallery.html` with new image references
3. Commit and push

### Update SOI Form
1. Edit `soi-site/index.html` for form fields
2. Edit `soi-site/js/form.js` for validation logic
3. Update `soi-site/js/config.js` for Apps Script URL
4. Commit and push

### Review SOI Submissions
1. Open your Google Sheet
2. Go to `SOI_Staging` tab
3. Review entries with Status = "Pending"
4. Change Status to "Approved" or "Rejected"
5. Add "Reviewed By" and "Reviewed At"

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `soi-site/js/config.js` | Apps Script endpoint URL |
| `shared/design-tokens.css` | Colors, fonts, spacing |
| `scripts/apps-script-complete.js` | Google Sheets backend |
| `docs/GOOGLE_SHEETS_SETUP.md` | Backend setup guide |
| `docs/PROJECT_STATUS.md` | Current project status |
| `NEXT_STEPS.md` | Future work options |

---

## 🐛 Troubleshooting

### Form Not Submitting
1. Check browser console for errors (F12)
2. Verify Apps Script URL in `soi-site/js/config.js`
3. Confirm Apps Script is deployed with "Anyone" access
4. See `docs/TEST_NOW.md` for CORS solution

### Images Not Loading
1. Check file paths are correct
2. Verify images exist in `main-site/images/gallery/`
3. Check Cloudflare Pages deployment logs

### Google Sheet Not Updating
1. Verify Apps Script deployment URL
2. Check Apps Script execution logs
3. Confirm `SOI_Staging` tab exists
4. See `docs/GOOGLE_SHEETS_SETUP.md`

---

## 📞 Support

- **Documentation**: See `/docs` folder
- **GitHub Issues**: https://github.com/kimbersykes87-source/RA_Website/issues
- **Cloudflare Dashboard**: https://dash.cloudflare.com

---

## 🎯 Quick Commands

```bash
# Local development
cd main-site
python -m http.server 8000

# Deploy (automatic via Cloudflare Pages)
git add .
git commit -m "Your message"
git push

# View logs
# Go to Cloudflare Pages dashboard → Deployments
```

---

## ✅ Pre-Launch Checklist

- [ ] Test form submission end-to-end
- [ ] Verify Google Sheet receives data
- [ ] Check all pages on mobile devices
- [ ] Test in Safari, Firefox, Chrome, Edge
- [ ] Run accessibility audit
- [ ] Set up Cloudflare Web Analytics
- [ ] Review all content for typos
- [ ] Test all navigation links
- [ ] Verify custom domain is working
- [ ] Check gallery images load properly

---

*Last Updated: January 4, 2026*

