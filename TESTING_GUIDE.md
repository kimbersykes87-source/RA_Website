# Local Testing Guide

## Option 1: Python HTTP Server (Recommended for Windows)

### For Main Site
```powershell
cd main-site
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### For SOI Site
```powershell
cd soi-site
python -m http.server 8001
```
Then visit: `http://localhost:8001`

**Note**: When testing locally, the form will not work until you've set up the Google Apps Script endpoint. You can test form validation, but submissions will fail until the endpoint URL is configured in `soi-site/js/config.js`.

---

## Option 2: Node.js HTTP Server

### Install http-server globally
```powershell
npm install -g http-server
```

### For Main Site
```powershell
cd main-site
http-server -p 8000
```

### For SOI Site
```powershell
cd soi-site
http-server -p 8001
```

---

## Option 3: Visual Studio Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `main-site/index.html` or `soi-site/index.html`
3. Select "Open with Live Server"

---

## Testing Checklist

### Main Site (`main-site/`)

#### Desktop Testing
- [ ] Home page loads correctly
- [ ] Navigation works (click through all pages)
- [ ] Gallery images display
- [ ] Gallery images are lazy-loaded (use Network tab in DevTools)
- [ ] All buttons link to correct destinations
- [ ] Link to SOI subdomain is present and correct
- [ ] Skip-to-content link works (press Tab on keyboard)
- [ ] Footer displays correctly

#### Mobile Testing (resize browser to < 768px)
- [ ] Bottom navigation bar appears
- [ ] Bottom navigation is fixed at bottom of screen
- [ ] Active page is highlighted in bottom nav
- [ ] Navigation items are tappable and work correctly
- [ ] Gallery images display correctly in grid
- [ ] All text is readable (no overflow)
- [ ] Buttons are touch-friendly (not too small)

#### Accessibility Testing
- [ ] Tab through navigation using keyboard only
- [ ] All interactive elements are focusable
- [ ] Focus indicators are visible
- [ ] Skip-to-content link works (Tab, then Enter)
- [ ] Images have meaningful alt text
- [ ] Headings are in logical order (h1, h2, h3)
- [ ] Color contrast is sufficient (use DevTools Lighthouse)

---

### SOI Site (`soi-site/`)

#### Form Validation Testing
- [ ] Try to submit form without filling required fields → should show browser validation
- [ ] Enter invalid email format → should show error
- [ ] Fill all required fields → submit button should work
- [ ] Honeypot field is not visible (check by inspecting HTML)

#### Form Submission Testing (requires Apps Script endpoint)
- [ ] Fill form with valid data and submit
- [ ] Success message appears
- [ ] Form clears after successful submission
- [ ] Redirect to main site happens after 3 seconds
- [ ] Check Google Sheet for new row in `SOI_Staging`
- [ ] Data in Sheet matches what was submitted

#### Duplicate Email Warning Testing
- [ ] Submit form with a specific email (e.g., test@example.com)
- [ ] After success, revisit the form
- [ ] Start typing the same email in the email field
- [ ] Warning message should appear: "This email has already been submitted..."

#### Honeypot Testing (advanced)
- [ ] Open browser DevTools
- [ ] In Console, type: `document.getElementById('address').value = 'bot@spam.com'`
- [ ] Submit form
- [ ] Should see error: "Submission blocked due to suspicious activity"
- [ ] Check Google Sheet: no new row should be added

#### Mobile Testing
- [ ] Form displays correctly on mobile
- [ ] All form fields are easily tappable
- [ ] Keyboard appears correctly for different input types
- [ ] Dropdown works on mobile
- [ ] Textarea is expandable
- [ ] Submit button is easily tappable

---

## Browser DevTools Tips

### Check JavaScript Console
- Press F12 to open DevTools
- Go to Console tab
- Look for any errors (red text)
- Common errors to watch for:
  - CORS errors (expected locally if testing SOI form)
  - 404 errors (missing files)
  - JavaScript syntax errors

### Check Network Tab
- Press F12 → Network tab
- Reload the page
- Look for:
  - Failed requests (red status codes)
  - Slow-loading images
  - Correct MIME types for CSS and JS files

### Check Mobile View
- Press F12 → Toggle device toolbar (Ctrl+Shift+M)
- Select a mobile device (e.g., iPhone 12, Galaxy S21)
- Test navigation and interactions
- Rotate to landscape to test both orientations

### Run Lighthouse Audit
- Press F12 → Lighthouse tab
- Select categories: Performance, Accessibility, Best Practices, SEO
- Click "Analyze page load"
- Review scores and recommendations

---

## Common Issues & Solutions

### Issue: CSS not loading
**Solution**: Check file paths. When testing locally, paths should be relative to the HTML file.

### Issue: Images not displaying
**Solution**: Verify image file paths are correct. Check that images exist in the specified folders.

### Issue: Navigation not working
**Solution**: Check JavaScript console for errors. Ensure `navigation.js` is loaded correctly.

### Issue: Form submission fails with CORS error
**Expected**: When testing locally, the Google Apps Script endpoint will reject requests due to CORS. This is normal and will work once deployed to Cloudflare Pages.

### Issue: Bottom navigation doesn't appear on mobile
**Solution**: Make sure browser width is < 768px. Check CSS media queries are working.

---

## Testing on Real Devices

### Option 1: Connect to Local Network
1. Find your computer's local IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.10)

2. Start local server as usual

3. On your mobile device, connect to same WiFi network

4. Visit `http://YOUR_IP_ADDRESS:8000` (replace with your IP)

### Option 2: Use Cloudflare Pages Preview
Once deployed to Cloudflare Pages:
- Every git push creates a preview URL
- Test on real devices using the preview URL
- Preview URLs look like: `abc123.rubber-armstrong-main.pages.dev`

---

## Automated Testing (Optional)

For more advanced testing, consider:
- **Pa11y**: Automated accessibility testing
- **Lighthouse CI**: Continuous performance monitoring
- **Playwright/Cypress**: End-to-end testing for form submission

---

## Pre-Launch Testing Protocol

Before launching to the public:

1. **Test all pages on desktop** (Chrome, Firefox, Safari if available)
2. **Test all pages on mobile** (real device preferred)
3. **Submit a test SOI form** and verify data reaches Google Sheet
4. **Test navigation flows**:
   - Main site → SOI site → Submit → Redirect back
   - Main site → All navigation links
5. **Verify accessibility** with keyboard navigation
6. **Check analytics** are tracking visits
7. **Review content** one final time for typos or errors

---

## Need Help?

- Check browser console for JavaScript errors
- Review `README.md` for setup instructions
- Verify all file paths are correct
- Ensure all configuration (Analytics tokens, Apps Script URL) is set

