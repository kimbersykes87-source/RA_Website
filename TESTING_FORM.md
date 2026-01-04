# SOI Form Testing Cheat Sheet

## Quick Test Data

### Personal Information
- **First Name:** Test
- **Last Name:** User
- **Sex:** Male
- **Birth Year:** 1990

### Countries
- **Country of Birth:** United States
- **Country of Residence:** United States

### Contact
- **Email:** test@example.com
- **Phone Code:** +1
- **Phone Number:** 5551234567

### Camp Connection
- **Referring Camp Mate:** Jane Smith

### Burning Man History
- Check: 2025 With RA
- Check: 2024 With RA
- OR: Check "This is my first Burn"

### Commitment
- **Likelihood:** Hell yeah!
- **Steward Ticket:** Yes

### Text Areas
- **What you offer:** Test submission for CORS debugging
- **Notes:** Testing Google Sheets integration

---

## Expected Result
✅ Success message appears
✅ Redirect to main site with success parameter
✅ New row appears in Google Sheet SOI_Staging tab

## Debugging Commands

### Test endpoint directly (GET):
```bash
curl https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Should return: `{"status":"info","message":"This endpoint accepts POST requests only"}`

### Test endpoint with POST:
```bash
curl -X POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'
```

---

## Current Deployment
**URL:** `https://script.google.com/macros/s/AKfycbwuiWeVlLTun8RpKx2NvhwnMKFBLoU6e5WbywFqsbm9HMb21JhofPVFj-_uI58DGN1G/exec`

**Status:** ❌ CORS preflight failing

---

## CORS Error Investigation

The error: `Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present`

This means the OPTIONS preflight request is NOT being handled properly by Google Apps Script.

