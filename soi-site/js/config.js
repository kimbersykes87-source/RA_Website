/**
 * Rubber Armstrong - Statement of Intent Configuration
 * 
 * IMPORTANT: Update APPS_SCRIPT_ENDPOINT before deploying!
 * 
 * To get your Google Apps Script endpoint:
 * 1. Create a Google Apps Script web app (see README for details)
 * 2. Deploy as web app with "Anyone" access
 * 3. Copy the deployment URL
 * 4. Replace the placeholder below
 */

export const CONFIG = {
  // Google Apps Script web app endpoint URL
  // Format: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
  APPS_SCRIPT_ENDPOINT: 'PLACEHOLDER_APPS_SCRIPT_URL_TO_BE_UPDATED',
  
  // Form metadata
  FORM_NAME: 'Statement of Intent 2026',
  FORM_VERSION: '1.0',
  
  // Redirect after successful submission
  REDIRECT_URL: 'https://rubberarmstrong.com/?submission=success',
  
  // Form field configuration
  FIELDS: {
    // Required fields
    REQUIRED: [
      'fullName',
      'email'
    ],
    
    // Optional fields
    OPTIONAL: [
      'preferredName',
      'whatsapp',
      'country',
      'city',
      'pronouns',
      'accessNeeds'
    ]
  }
};

// Validation rules
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  
  maxLengths: {
    shortText: 100,
    paragraph: 500,
    longParagraph: 1000
  }
};

