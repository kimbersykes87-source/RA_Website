/**
 * Configuration for email tracking worker
 */

/**
 * 1x1 transparent GIF pixel (base64 decoded)
 * This is the smallest possible GIF file
 */
export const TRACKING_PIXEL_GIF = Uint8Array.from(
  atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
  c => c.charCodeAt(0)
);

/**
 * Link redirect URLs
 * Maps link IDs to destination URLs
 */
export const REDIRECT_URLS = {
  // Main SOI form
  soi_form: 'https://soi.rubberarmstrong.com',
  
  // Unsubscribe (redirects to a form or email)
  unsubscribe: 'mailto:rubberarmstrongcamp@gmail.com?subject=Unsubscribe',
  
  // Main website
  main_site: 'https://rubberarmstrong.com',
  
  // Default fallback
  default: 'https://rubberarmstrong.com'
};

/**
 * Sheet configuration
 * Column letters for tracking columns
 */
export const SHEET_COLUMNS = {
  EMAIL: 'H',           // Column H (8) - Email address
  EMAIL_SENT: 'AA',     // Column 27 - Email Sent
  EMAIL_SENT_AT: 'AB',  // Column 28 - Email Sent At
  EMAIL_OPENED: 'AC',   // Column 29 - Email Opened (NOT 27!)
  FIRST_OPEN_AT: 'AD',  // Column 30 - First Open At
  OPEN_COUNT: 'AE',     // Column 31 - Open Count
  LINK_CLICKED: 'AF',   // Column 32 - Link Clicked
  FIRST_CLICK_AT: 'AG'  // Column 33 - First Click At
};

/**
 * Sheet tab name - can be overridden via environment variable
 * Default: 'SOI_Staging'
 * Alternative: 'Email_Campaign_2026'
 */
export const DEFAULT_SHEET_TAB = 'SOI_Staging';

