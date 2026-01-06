/**
 * Rubber Armstrong Email Tracking Worker
 * Tracks email opens (pixel) and clicks (link redirect)
 * Updates Google Sheets directly via Sheets API
 */

import { updateSheetTracking, createNewInviteeRow } from './sheets-api.js';
import { TRACKING_PIXEL_GIF, REDIRECT_URLS } from './config.js';

/**
 * Detect if request is from a bot/crawler
 */
function isBot(request) {
  const ua = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  // Block known bots
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slackbot/i,
    /facebookexternalhit/i,
    /linkedinbot/i,
    /twitterbot/i,
    /headless/i,
    /selenium/i,
    /phantom/i,
    /puppeteer/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /go-http-client/i,
    /^$/ // Empty user agent
  ];
  
  if (botPatterns.some(pattern => pattern.test(ua))) {
    return true;
  }
  
  // Block if referer is Google Sheets/Docs/Drive (link previews)
  if (referer.includes('sheets.google.com') || 
      referer.includes('docs.google.com') || 
      referer.includes('drive.google.com')) {
    return true;
  }
  
  return false;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle OPTIONS requests (CORS preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // Tracking Pixel Handler
      if (url.pathname.startsWith('/p/')) {
        return await handlePixel(url, env, corsHeaders, request);
      }
      
      // Link Click Handler
      if (url.pathname.startsWith('/c/')) {
        return await handleClick(url, env, corsHeaders, request);
      }
      
      // Health check / default
      return new Response(JSON.stringify({
        status: 'ok',
        service: 'Rubber Armstrong Email Tracking',
        endpoints: {
          pixel: '/p/{email-hash}.gif',
          click: '/c/{email-hash}/{link-id}'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Worker error:', error);
      
      // Always return something (don't break emails)
      if (url.pathname.startsWith('/p/')) {
        // Return pixel even on error
        return new Response(TRACKING_PIXEL_GIF, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/gif',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }
      
      return new Response('Error processing request', {
        status: 500,
        headers: corsHeaders
      });
    }
  },
};

/**
 * Handle tracking pixel requests
 * Format: /p/{email-hash}.gif
 */
async function handlePixel(url, env, corsHeaders, request) {
  const pathParts = url.pathname.split('/');
  const emailHash = pathParts[2]?.replace('.gif', '');
  
  if (!emailHash) {
    console.error('No email hash in pixel request');
    return returnPixel(corsHeaders);
  }
  
  // Validate email hash format
  if (!/^[A-Za-z0-9_-]+$/.test(emailHash)) {
    console.error('Invalid email hash format:', emailHash);
    return returnPixel(corsHeaders);
  }
  
  try {
    // Decode email from base64 hash
    const email = decodeEmail(emailHash);
    
    if (!email) {
      console.error('Could not decode email hash:', emailHash);
      return returnPixel(corsHeaders);
    }
    
    // Check if request is from a bot (but still return pixel)
    if (isBot(request)) {
      console.log(`Bot ignored for pixel: ${email}`);
      return returnPixel(corsHeaders); // Return pixel but don't track
    }
    
    // Log the open (don't await - return pixel immediately)
    const trackingPromise = updateSheetTracking(env, email, 'open', {
      userAgent: request.headers.get('user-agent') || '',
      referer: request.headers.get('referer') || '',
      timestamp: new Date().toISOString()
    });
    
    // Don't await - return pixel immediately for speed
    // But register the promise to keep worker alive
    trackingPromise.catch(err => {
      console.error('Error tracking pixel:', err);
    });
    
  } catch (error) {
    console.error('Pixel handler error:', error);
  }
  
  // Always return the tracking pixel
  return returnPixel(corsHeaders);
}

/**
 * Handle link click requests
 * Format: /c/{email-hash}/{link-id}
 */
async function handleClick(url, env, corsHeaders, request) {
  const pathParts = url.pathname.split('/');
  const emailHash = pathParts[2];
  const linkId = pathParts[3];
  
  if (!emailHash || !linkId) {
    return new Response('Invalid click tracking URL', {
      status: 400,
      headers: corsHeaders
    });
  }
  
  // Validate email hash format
  if (!/^[A-Za-z0-9_-]+$/.test(emailHash)) {
    console.error('Invalid email hash format:', emailHash);
    // Still redirect (don't break UX)
    return redirect(linkId, corsHeaders);
  }
  
  try {
    // Decode email from base64 hash
    const email = decodeEmail(emailHash);
    
    if (!email) {
      console.error('Could not decode email hash:', emailHash);
      // Redirect anyway (don't break the user experience)
      return redirect(linkId, corsHeaders);
    }
    
    // Check if request is from a bot (but still redirect)
    if (isBot(request)) {
      console.log(`Bot ignored for click: ${email}`);
      return redirect(linkId, corsHeaders); // Redirect but don't track
    }
    
    // Handle unsubscribe specially
    if (linkId === 'unsubscribe') {
      // Could add unsubscribe tracking here
      console.log(`Unsubscribe request from: ${email}`);
      // Still redirect to mailto link
    }
    
    // Log the click (don't await - redirect immediately)
    const trackingPromise = updateSheetTracking(env, email, 'click', {
      linkId: linkId,
      userAgent: request.headers.get('user-agent') || '',
      referer: request.headers.get('referer') || '',
      timestamp: new Date().toISOString()
    });
    
    // Don't await - redirect immediately for UX
    trackingPromise.catch(err => {
      console.error('Error tracking click:', err);
    });
    
  } catch (error) {
    console.error('Click handler error:', error);
  }
  
  // Always redirect to destination
  return redirect(linkId, corsHeaders);
}

/**
 * Return tracking pixel GIF
 */
function returnPixel(corsHeaders) {
  return new Response(TRACKING_PIXEL_GIF, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

/**
 * Redirect to the target URL based on link ID
 */
function redirect(linkId, corsHeaders) {
  const targetUrl = REDIRECT_URLS[linkId] || REDIRECT_URLS.default;
  
  return Response.redirect(targetUrl, 302);
}

/**
 * Decode email from base64 URL-safe encoding
 * Validates format before decoding
 */
function decodeEmail(encoded) {
  if (!encoded || typeof encoded !== 'string') {
    return null;
  }
  
  // Validate base64url format (only alphanumeric, -, _)
  if (!/^[A-Za-z0-9_-]+$/.test(encoded)) {
    console.error('Invalid email hash format:', encoded);
    return null;
  }
  
  try {
    // Convert URL-safe base64 back to standard base64
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    
    // Decode from base64
    const decoded = atob(padded);
    
    // Basic validation that result looks like an email
    if (!decoded.includes('@') || !decoded.includes('.')) {
      console.error('Decoded value does not look like email:', decoded);
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error decoding email:', error);
    return null;
  }
}

/**
 * Encode email to base64 URL-safe format
 * (For reference / testing - actual encoding happens when sending emails)
 */
export function encodeEmail(email) {
  const encoded = btoa(email);
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

