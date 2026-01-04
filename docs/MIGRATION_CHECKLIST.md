# 🚀 Migration Checklist - rubberarmstrong.com to Cloudflare Pages

Complete these steps in order. Reply "done" after each step.

---

## ✅ Pre-Flight (I've Done This For You)

- [x] Code is ready in GitHub repo
- [x] SOI form is working at soi.rubberarmstrong.com
- [x] All documentation is organized
- [x] DNS configuration analyzed (GoDaddy with Adobe Portfolio)

---

## 📝 Step 1: Create Cloudflare Pages Project

**What to do:**

1. **Open Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com
   - Log in with your account

2. **Navigate to Pages**
   - Click "Workers & Pages" in left sidebar
   - Click "Create application" button
   - Choose "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub**
   - Authorize Cloudflare to access your GitHub
   - Select repository: **RA_Website**
   - Click "Begin setup"

4. **Configure Build Settings**
   
   Copy these settings EXACTLY:
   ```
   Project name: rubber-armstrong-main
   Production branch: main
   Framework preset: None
   Build command: [LEAVE EMPTY]
   Build output directory: /
   Root directory (advanced): main-site
   ```
   
   **IMPORTANT:** Click "Environment variables (advanced)" and verify it's empty

5. **Deploy**
   - Click "Save and Deploy"
   - Wait 1-2 minutes for deployment to complete
   - You'll see "Success! Your site is live!"

6. **Copy Your URL**
   - You'll get a URL like: `rubber-armstrong-main.pages.dev`
   - **COPY THIS URL** - you'll need it for DNS setup
   - Test it by visiting the URL - you should see your main site

**Reply "done" when you have your `.pages.dev` URL**

---

## 📝 Step 2: Test Your Cloudflare Pages Site

**What to do:**

1. **Visit your `.pages.dev` URL**
   - Should show the Rubber Armstrong home page

2. **Test all pages:**
   - Click "About" - should load about.html
   - Click "Camp Life" - should load camp-life.html
   - Click "Gallery" - should show images
   - Click "Ticketing" - should load ticketing.html
   - Click "Join" - should load join.html

3. **Test SOI form link:**
   - The link should point to: soi.rubberarmstrong.com
   - Click it to verify it opens the form

4. **Test on mobile:**
   - Open the `.pages.dev` URL on your phone
   - Check navigation works
   - Verify images load

**Reply "done" when testing is complete and everything works**

---

## 📝 Step 3: Add Custom Domain in Cloudflare Pages

**What to do:**

1. **In Cloudflare Pages project:**
   - Go to your project "rubber-armstrong-main"
   - Click "Custom domains" tab
   - Click "Set up a custom domain"

2. **Add rubberarmstrong.com:**
   - Enter: `rubberarmstrong.com`
   - Click "Continue"
   - Cloudflare will verify and show DNS instructions
   - Click "Activate domain"

3. **Add www subdomain:**
   - Click "Set up a custom domain" again
   - Enter: `www.rubberarmstrong.com`
   - Click "Continue"
   - Click "Activate domain"

4. **Note the CNAME targets:**
   - Both should show target: `rubber-armstrong-main.pages.dev`
   - You'll need this for GoDaddy DNS setup

**Reply "done" when custom domains are added**

---

## 📝 Step 4: Update DNS in GoDaddy

**What to do:**

1. **Open GoDaddy DNS Management:**
   - Go to: https://dcc.godaddy.com/domains
   - Log in
   - Find "rubberarmstrong.com"
   - Click "DNS" button

2. **Delete Old A Records (Adobe Portfolio):**
   
   Find and DELETE these 4 records:
   ```
   Type: A, Name: @, Value: 151.101.128.119 → DELETE
   Type: A, Name: @, Value: 151.101.192.119 → DELETE
   Type: A, Name: www, Value: 151.101.128.119 → DELETE
   Type: A, Name: www, Value: 151.101.192.119 → DELETE
   ```
   
   Click the trash/pencil icon for each, confirm deletion

3. **Add New CNAME Records:**
   
   Click "Add" or "Add Record" button
   
   **Record 1:**
   ```
   Type: CNAME
   Name: @
   Value: rubber-armstrong-main.pages.dev
   TTL: 600
   ```
   Click "Save"
   
   **Record 2:**
   ```
   Type: CNAME
   Name: www
   Value: rubber-armstrong-main.pages.dev
   TTL: 600
   ```
   Click "Save"

4. **Verify your DNS records:**
   - Should now show 2 CNAME records (@ and www)
   - Both pointing to your `.pages.dev` URL
   - NS records should remain unchanged

**Reply "done" when DNS is updated in GoDaddy**

---

## 📝 Step 5: Wait for DNS Propagation

**What to do:**

1. **Wait 1-2 hours**
   - DNS changes take time to propagate globally
   - GoDaddy DNS is usually fast (1-2 hours)

2. **Check propagation status:**
   - Go to: https://dnschecker.org
   - Enter: `rubberarmstrong.com`
   - Select "CNAME" from dropdown
   - Should show: `rubber-armstrong-main.pages.dev`
   - Check multiple locations - green checkmarks are good

3. **Test the domain:**
   - Try visiting: https://rubberarmstrong.com
   - Try visiting: https://www.rubberarmstrong.com
   - Both should show your new site
   - **If you get SSL error, wait longer** - certificate is provisioning

**Reply "done" when rubberarmstrong.com loads the new site**

---

## 📝 Step 6: Final Verification

**What to do:**

1. **Test all pages on main domain:**
   - https://rubberarmstrong.com (home)
   - https://rubberarmstrong.com/about.html
   - https://rubberarmstrong.com/camp-life.html
   - https://rubberarmstrong.com/gallery.html
   - https://rubberarmstrong.com/ticketing.html
   - https://rubberarmstrong.com/join.html

2. **Test www redirect:**
   - https://www.rubberarmstrong.com
   - Should redirect to or show same as rubberarmstrong.com

3. **Check HTTPS:**
   - Look for padlock icon in browser
   - Click padlock - certificate should show "Cloudflare"

4. **Test on mobile devices:**
   - Visit on your phone
   - Check navigation works
   - Verify gallery images load

5. **Test SOI form link:**
   - From main site, click link to SOI form
   - Should go to: soi.rubberarmstrong.com
   - Form should still work

**Reply "done" when all testing passes**

---

## 📝 Step 7: Decommission Adobe Portfolio

**What to do:**

**⚠️ ONLY do this after Step 6 is complete and verified!**

1. **Log into Adobe Portfolio:**
   - Go to your Adobe Portfolio dashboard

2. **Unpublish or delete the site:**
   - Find rubberarmstrong.com site
   - Choose "Unpublish" or "Delete"
   - Confirm the action

3. **Optional - Cancel subscription:**
   - If you're paying for Adobe Portfolio and no longer need it
   - Cancel the subscription to stop charges

**Reply "done" when Adobe Portfolio is decommissioned**

---

## 🎉 Step 8: Post-Migration Tasks

**What to do:**

1. **Set up Cloudflare Web Analytics:**
   - In Cloudflare Dashboard → "Web Analytics"
   - Click "Add a site"
   - Enter: rubberarmstrong.com
   - Copy the beacon script
   - I'll help you add it to the pages

2. **Monitor for 24 hours:**
   - Check the site works
   - Watch for any broken links or errors
   - Monitor form submissions continue to work

3. **Update any external links:**
   - If you have social media or other sites linking to old Adobe URL
   - Update them to point to rubberarmstrong.com

**Reply "done" when post-migration tasks are complete**

---

## 📞 Troubleshooting

### If something doesn't work:

**Site shows "Not Found" or 404:**
- Wait longer for DNS propagation (up to 48 hours max)
- Check DNS at https://dnschecker.org

**HTTPS shows error:**
- SSL certificate is still provisioning
- Wait up to 24 hours after DNS propagation
- Should auto-resolve

**Old site still showing:**
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private browsing
- Try different device or network

**Images not loading:**
- Check browser console (F12) for errors
- Let me know what errors you see

---

## 🆘 Need Help?

If you get stuck on any step, tell me:
1. Which step number
2. What you see
3. Any error messages
4. Screenshot if possible

I'll help you troubleshoot!

---

**Ready? Start with Step 1 and reply "done" after each step!** 🚀

