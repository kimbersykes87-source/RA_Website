# Scripts

This folder contains backend scripts and automation.

## Files

- **apps-script-complete.js** - Complete Google Apps Script for SOI form backend
  - Handles form submissions via `doPost()`
  - Manages Google Sheet structure and formatting
  - Includes test functions

## Usage

1. Open your Google Sheet
2. Go to Extensions → Apps Script
3. Copy the contents of `apps-script-complete.js`
4. Deploy as Web App with "Anyone" access
5. Copy the deployment URL to `soi-site/js/config.js`

See [SETUP_GUIDE.md](../docs/SETUP_GUIDE.md) and [APPS_SCRIPT_GUIDE.md](../docs/APPS_SCRIPT_GUIDE.md) for detailed instructions.

