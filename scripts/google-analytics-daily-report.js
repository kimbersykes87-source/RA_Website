/**
 * Google Analytics 4 Daily Report Script
 * Sends daily email with visitor stats and country breakdown
 * 
 * Setup Instructions:
 * 1. Set up Google Analytics 4 on your sites
 * 2. Enable Google Analytics Data API in Google Cloud Console
 * 3. Add this script to Google Apps Script
 * 4. Set up daily trigger
 */

// Analytics Configuration
const ANALYTICS_CONFIG = {
  // Your GA4 Property ID (format: properties/123456789)
  // Get this from GA4: Admin > Property Settings > Property ID
  propertyId: 'properties/518391310',
  
  // Email to send reports to
  emailRecipient: 'rubberarmstrongcamp@gmail.com',
  
  // Date range (last 7 days for weekly report)
  startDate: '7daysAgo',
  endDate: 'yesterday'
};

/**
 * Main function - runs weekly via trigger (Mondays at 9 AM LA time)
 */
function sendWeeklyAnalyticsReport() {
  try {
    const report = getAnalyticsData();
    const emailBody = formatEmailReport(report);
    sendEmail(emailBody);
    Logger.log('Weekly analytics report sent successfully');
  } catch (error) {
    Logger.log('Error sending weekly report: ' + error.message);
    // Send error notification
    MailApp.sendEmail({
      to: ANALYTICS_CONFIG.emailRecipient,
      subject: 'RA Analytics Report Error',
      body: 'Failed to generate analytics report: ' + error.message
    });
  }
}

/**
 * Fetch analytics data from GA4
 */
function getAnalyticsData() {
  const request = {
    dateRanges: [{
      startDate: ANALYTICS_CONFIG.startDate,
      endDate: ANALYTICS_CONFIG.endDate
    }],
    dimensions: [
      { name: 'country' }
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' }
    ]
  };
  
  const response = AnalyticsData.Properties.runReport(request, ANALYTICS_CONFIG.propertyId);
  
  return parseAnalyticsResponse(response);
}

/**
 * Parse GA4 API response
 */
function parseAnalyticsResponse(response) {
  const data = {
    totalUsers: 0,
    totalSessions: 0,
    totalPageViews: 0,
    countries: []
  };
  
  if (!response.rows) {
    return data;
  }
  
  response.rows.forEach(row => {
    const country = row.dimensionValues[0].value;
    const users = parseInt(row.metricValues[0].value);
    const sessions = parseInt(row.metricValues[1].value);
    const pageViews = parseInt(row.metricValues[2].value);
    
    data.totalUsers += users;
    data.totalSessions += sessions;
    data.totalPageViews += pageViews;
    
    data.countries.push({
      country: country,
      users: users,
      sessions: sessions,
      pageViews: pageViews
    });
  });
  
  // Sort countries by user count (descending)
  data.countries.sort((a, b) => b.users - a.users);
  
  return data;
}

/**
 * Format data into email body
 */
function formatEmailReport(data) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1); // Yesterday
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); // 7 days ago
  
  const dateStr = Utilities.formatDate(startDate, 'America/Los_Angeles', 'MMM dd') + 
                  ' - ' + 
                  Utilities.formatDate(endDate, 'America/Los_Angeles', 'MMM dd, yyyy');
  
  let body = `Rubber Armstrong Website Analytics - Weekly Report\n`;
  body += `Period: ${dateStr}\n`;
  body += `${'='.repeat(60)}\n\n`;
  
  // Summary
  body += `SUMMARY\n`;
  body += `${'-'.repeat(60)}\n`;
  body += `Unique Visitors: ${data.totalUsers}\n`;
  body += `Total Sessions: ${data.totalSessions}\n`;
  body += `Total Page Views: ${data.totalPageViews}\n\n`;
  
  // Country breakdown
  body += `VISITORS BY COUNTRY\n`;
  body += `${'-'.repeat(60)}\n`;
  
  if (data.countries.length === 0) {
    body += `No visitors recorded\n`;
  } else {
    data.countries.forEach((country, index) => {
      body += `${index + 1}. ${country.country}: ${country.users} visitor${country.users !== 1 ? 's' : ''}\n`;
    });
  }
  
  body += `\n${'-'.repeat(60)}\n`;
  body += `View full analytics: https://analytics.google.com/\n`;
  
  return body;
}

/**
 * Send email report
 */
function sendEmail(body) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  
  const dateStr = Utilities.formatDate(startDate, 'America/Los_Angeles', 'MMM dd') + 
                  ' - ' + 
                  Utilities.formatDate(endDate, 'America/Los_Angeles', 'MMM dd');
  
  MailApp.sendEmail({
    to: ANALYTICS_CONFIG.emailRecipient,
    subject: `RA Website Analytics - ${dateStr}`,
    body: body
  });
}

/**
 * Set up weekly trigger (run this once manually)
 * Runs every Monday at 9 AM LA time
 */
function setupWeeklyTrigger() {
  // Delete existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendWeeklyAnalyticsReport') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger - runs every Monday at 9 AM (LA time)
  ScriptApp.newTrigger('sendWeeklyAnalyticsReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .inTimezone('America/Los_Angeles')
    .create();
  
  Logger.log('Weekly trigger created successfully - Mondays at 9 AM LA time');
}

/**
 * Test function - run manually to test email
 */
function testReport() {
  const testData = {
    totalUsers: 42,
    totalSessions: 58,
    totalPageViews: 127,
    countries: [
      { country: 'United States', users: 15, sessions: 22, pageViews: 45 },
      { country: 'United Kingdom', users: 8, sessions: 11, pageViews: 28 },
      { country: 'Australia', users: 7, sessions: 9, pageViews: 19 },
      { country: 'Canada', users: 5, sessions: 7, pageViews: 15 },
      { country: 'Germany', users: 4, sessions: 5, pageViews: 12 },
      { country: 'Netherlands', users: 3, sessions: 4, pageViews: 8 }
    ]
  };
  
  const emailBody = formatEmailReport(testData);
  Logger.log(emailBody);
  sendEmail(emailBody);
  Logger.log('Test email sent');
}


      { country: 'Canada', users: 5, sessions: 7, pageViews: 15 },
      { country: 'Germany', users: 4, sessions: 5, pageViews: 12 },
      { country: 'Netherlands', users: 3, sessions: 4, pageViews: 8 }
    ]
  };
  
  const emailBody = formatEmailReport(testData);
  Logger.log(emailBody);
  sendEmail(emailBody);
  Logger.log('Test email sent');
}


      { country: 'Canada', users: 5, sessions: 7, pageViews: 15 },
      { country: 'Germany', users: 4, sessions: 5, pageViews: 12 },
      { country: 'Netherlands', users: 3, sessions: 4, pageViews: 8 }
    ]
  };
  
  const emailBody = formatEmailReport(testData);
  Logger.log(emailBody);
  sendEmail(emailBody);
  Logger.log('Test email sent');
}

