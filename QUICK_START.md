# Quick Start Guide - Rubber Armstrong 2026 Site

This guide will get you from zero to deployed in the fastest way possible.

---

## ⚡ 5-Minute Local Testing

1. **Open a terminal in the project root**
   ```powershell
   cd c:\dev\RubberArmstrongWebsite
   ```

2. **Start local server for main site**
   ```powershell
   cd main-site
   python -m http.server 8000
   ```

3. **Open in browser**
   - Visit: `http://localhost:8000`
   - Navigate through the pages
   - Check the gallery

4. **Test SOI site** (in a new terminal)
   ```powershell
   cd soi-site
   python -m http.server 8001
   ```
   - Visit: `http://localhost:8001`
   - Note: Form won't submit until you configure Apps Script endpoint

---

## 🚀 15-Minute Deployment (No Form)

Get the informational site live quickly. Add form functionality later.

### 1. Push to GitHub (5 minutes)
```powershell
cd c:\dev\RubberArmstrongWebsite
git init
git add .
git commit -m "Initial commit"
```

- Create repo on GitHub: https://github.com/new
- Copy the repo URL, then:

```powershell
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### 2. Deploy Main Site to Cloudflare (5 minutes)
1. Go to: https://dash.cloudflare.com/ → Pages
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repository
4. **Settings**:
   - Project name: `rubber-armstrong-main`
   - Build command: (leave empty)
   - Build output directory: `/main-site`
   - Root directory: `main-site`
5. Click "Save and Deploy"
6. Wait 1-2 minutes
7. Visit the assigned URL (e.g., `rubber-armstrong-main.pages.dev`)

### 3. Deploy SOI Site (5 minutes)
1. In Cloudflare Pages, click "Create a project" again
2. Select the SAME GitHub repository
3. **Settings**:
   - Project name: `rubber-armstrong-soi`
   - Build command: (leave empty)
   - Build output directory: `/soi-site`
   - Root directory: `soi-site`
4. Click "Save and Deploy"
5. Visit the assigned URL (e.g., `rubber-armstrong-soi.pages.dev`)

**Result**: Your site is now live! The SOI form won't work yet (needs Apps Script setup below).

---

## 📋 30-Minute Full Setup (With Working Form)

Follow the 15-minute deployment above, then:

### 4. Set Up Google Apps Script Endpoint (10 minutes)

1. **Create Google Sheet**
   - Go to: https://sheets.google.com
   - Create new spreadsheet: "RA 2026 SOI Submissions"

2. **Create Tabs**
   - Create 4 tabs: `SOI_Staging`, `SOI_Approved`, `SOI_Rejected`, `SOI_2026 Archive`

3. **Add Column Headers to `SOI_Staging`** (first row)
   ```
   Timestamp | Full Name | Preferred Name | Email | WhatsApp | Country | Closest City | Pronouns | Why RA | What You Bring | How Heard | Access/Support Needs | Status | Reviewed By | Reviewed At | Internal Notes | Form Name
   ```

4. **Create Apps Script**
   - In your Sheet: Extensions → Apps Script
   - Delete existing code
   - Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SOI_Staging');
    const data = JSON.parse(e.postData.contents);
    
    // Append row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.preferredName || '',
      data.email || '',
      data.whatsapp || '',
      data.country || '',
      data.city || '',
      data.pronouns || '',
      data.whyRA || '',
      data.whatYouBring || '',
      data.howHeard || '',
      data.accessNeeds || '',
      data.status || 'Pending',
      '', // Reviewed By
      '', // Reviewed At
      '', // Internal Notes
      data.formName || 'Statement of Intent 2026'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **Deploy Apps Script**
   - Click "Deploy" → "New deployment"
   - Click gear icon → "Web app"
   - **Execute as**: Me
   - **Who has access**: Anyone
   - Click "Deploy"
   - **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...`)
   - Click "Authorize access" and complete OAuth flow

6. **Update SOI Site Config** (5 minutes)
   - Open: `soi-site/js/config.js`
   - Replace `PLACEHOLDER_URL_TO_BE_UPDATED` with your Apps Script URL
   - Save the file
   - Commit and push:
   ```powershell
   git add soi-site/js/config.js
   git commit -m "Add Apps Script endpoint"
   git push
   ```
   - Wait 1-2 minutes for Cloudflare to rebuild

7. **Test the Form**
   - Visit your SOI site (the `.pages.dev` URL)
   - Fill out the form with test data
   - Submit
   - Check your Google Sheet → `SOI_Staging` tab
   - You should see a new row with your test data!

---

## 🎨 Add Custom Domain (Optional, 10 minutes)

### Main Site: rubberarmstrong.com

1. In Cloudflare Pages project → Custom domains
2. Add domain: `rubberarmstrong.com`
3. Add domain: `www.rubberarmstrong.com`
4. Cloudflare will show you DNS records to add
5. If your domain is registered with Cloudflare, DNS is automatic
6. If external registrar, add the CNAME records shown
7. Wait for DNS propagation (5 minutes to 24 hours)

### SOI Site: soi.rubberarmstrong.com

1. In the SOI Pages project → Custom domains
2. Add domain: `soi.rubberarmstrong.com`
3. Add CNAME record as instructed
4. Wait for DNS propagation

**Update main site links after custom domain is live**:
- Edit `main-site/index.html` and `main-site/join.html`
- Change SOI links from `.pages.dev` URLs to `https://soi.rubberarmstrong.com`
- Commit and push

---

## 📊 Add Analytics (Optional, 5 minutes)

1. Go to: https://dash.cloudflare.com/ → Web Analytics
2. Click "Add a site"
3. Enter: `rubberarmstrong.com`
4. Copy the analytics token
5. Open all HTML files in `main-site/`
6. Replace `YOUR_CLOUDFLARE_ANALYTICS_TOKEN` with your token
7. Repeat for SOI site (`soi.rubberarmstrong.com`)
8. Commit and push

---

## ✅ Final Checks

- [ ] Main site loads at your URL
- [ ] All pages are accessible via navigation
- [ ] Gallery displays your images
- [ ] SOI form submits successfully
- [ ] New submissions appear in Google Sheet
- [ ] Mobile navigation works (test on phone)
- [ ] All links work correctly

---

## 🔄 Making Updates

After initial deployment, making changes is easy:

1. **Edit files locally**
2. **Commit changes**:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Cloudflare automatically rebuilds** (1-2 minutes)
4. **Check your live site**

---

## 📚 Full Documentation

- **DEPLOYMENT_CHECKLIST.md**: Comprehensive deployment guide
- **TESTING_GUIDE.md**: Detailed testing procedures
- **GOOGLE_SHEETS_SETUP.md**: Google Sheets structure and Apps Script details
- **README.md**: Project overview and architecture
- **shared/README.md**: Design system documentation

---

## 🆘 Common Issues

**Form submissions not reaching Sheet**
- Check Apps Script URL in `soi-site/js/config.js`
- Verify Apps Script is deployed as "Anyone" can access
- Check browser console for errors (F12)

**Images not loading**
- Verify images exist in `main-site/images/gallery/`
- Check file paths are correct in `gallery.html`

**Custom domain not working**
- DNS can take up to 24 hours to propagate
- Verify CNAME records are correct
- Check Cloudflare DNS settings

**Site not updating after git push**
- Cloudflare Pages rebuilds take 1-2 minutes
- Check Pages → Deployments to see build status
- If build fails, check error logs

---

## 🎉 You're Done!

Your Rubber Armstrong 2026 site is now live! 

**Next steps**:
- Share the SOI link with prospective campers
- Monitor Google Sheet for new submissions
- Review submissions and mark as Approved/Rejected
- Update content as needed (edit, commit, push)

Need help? Check the full documentation files listed above.

