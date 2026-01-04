/**
 * Rubber Armstrong 2026 - Statement of Intent Form Handler
 * Complete setup and submission handler
 */

// ============================================================================
// SETUP FUNCTIONS - Run these once to configure your sheet
// ============================================================================

/**
 * Run this FIRST to set up all tabs with headers and formatting
 * Go to: Run → setupAllTabs
 */
function setupAllTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tabNames = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected', 'SOI_2026'];
  
  // Column headers (23 columns) - shortened for easier scanning
  const headers = [
    'Timestamp',
    'First',
    'Last',
    'Sex',
    'Birth Year',
    'Country (Birth)',
    'Country (Res)',
    'Email',
    'Phone Code',
    'Phone',
    'Ref. Campmate',
    'Burns (RA)',
    'Burns (Other)',
    'First Burn?',
    'Likelihood',
    'Steward Ticket?',
    'What Offer',
    'Notes',
    'Status',
    'Reviewed By',
    'Reviewed At',
    'Internal Notes',
    'Form'
  ];
  
  tabNames.forEach(tabName => {
    let sheet = ss.getSheetByName(tabName);
    
    // Create tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      Logger.log('Created tab: ' + tabName);
    }
    
    // Set headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize all columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
    
    Logger.log('Set up tab: ' + tabName);
  });
  
  SpreadsheetApp.getUi().alert('✅ All tabs set up successfully!\n\nNext: Run setupDataValidation');
}

/**
 * Run this SECOND to add dropdown validations
 * Go to: Run → setupDataValidation
 */
function setupDataValidation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tabNames = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected', 'SOI_2026'];
  
  tabNames.forEach(tabName => {
    const sheet = ss.getSheetByName(tabName);
    if (!sheet) return;
    
    // Sex (Column D / 4)
    const sexRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Male', 'Female', 'Non-binary', 'Other'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange('D2:D1000').setDataValidation(sexRule);
    
    // First Burn (Column N / 14)
    const firstBurnRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Yes', 'No'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange('N2:N1000').setDataValidation(firstBurnRule);
    
    // Likelihood of Attending (Column O / 15)
    const likelihoodRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Hell yeah!', 'Probably', 'Keep me in the loop'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange('O2:O1000').setDataValidation(likelihoodRule);
    
    // Steward Ticket Interest (Column P / 16)
    const stewardRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Yes', 'No'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange('P2:P1000').setDataValidation(stewardRule);
    
    // Status (Column S / 19)
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Pending', 'Approved', 'Rejected'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange('S2:S1000').setDataValidation(statusRule);
    
    Logger.log('Added data validation to: ' + tabName);
  });
  
  SpreadsheetApp.getUi().alert('✅ Data validation added to all tabs!\n\nNext: Run setupConditionalFormatting');
}

/**
 * Run this THIRD to add color coding for Status column
 * Go to: Run → setupConditionalFormatting
 */
function setupConditionalFormatting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SOI_Staging');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ SOI_Staging tab not found!');
    return;
  }
  
  // Clear existing rules
  sheet.clearConditionalFormatRules();
  
  // Define the range (entire rows, columns A-W)
  const range = sheet.getRange('A2:W1000');
  
  // Rule 1: Pending (Yellow)
  const pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$S2="Pending"')
    .setBackground('#fff3cd')
    .setRanges([range])
    .build();
  
  // Rule 2: Approved (Green)
  const approvedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$S2="Approved"')
    .setBackground('#d4edda')
    .setRanges([range])
    .build();
  
  // Rule 3: Rejected (Red)
  const rejectedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$S2="Rejected"')
    .setBackground('#f8d7da')
    .setRanges([range])
    .build();
  
  // Apply rules
  sheet.setConditionalFormatRules([pendingRule, approvedRule, rejectedRule]);
  
  Logger.log('Added conditional formatting to SOI_Staging');
  SpreadsheetApp.getUi().alert('✅ Conditional formatting added!\n\nSetup complete! Now deploy as Web App.');
}

/**
 * Optional: Run all setup functions at once
 * Go to: Run → runCompleteSetup
 */
function runCompleteSetup() {
  setupAllTabs();
  Utilities.sleep(1000);
  setupDataValidation();
  Utilities.sleep(1000);
  setupConditionalFormatting();
  SpreadsheetApp.getUi().alert('🎉 Complete setup finished!\n\nNow go to Deploy → New Deployment');
}

// ============================================================================
// FORM SUBMISSION HANDLER - This runs automatically when form is submitted
// ============================================================================

/**
 * Handles POST requests from the SOI form
 * This is called automatically when someone submits the form
 */
function doPost(e) {
  try {
    // Parse incoming JSON
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet and get SOI_Staging sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('SOI_Staging');
    
    if (!sheet) {
      throw new Error('SOI_Staging sheet not found');
    }
    
    // Prepare row data (must match column order - 23 columns)
    const row = [
      new Date(),                                           // 1. Timestamp
      data.firstName || '',                                 // 2. First Name
      data.lastName || '',                                  // 3. Last Name
      data.sex || '',                                       // 4. Sex
      data.birthYear || '',                                 // 5. Birth Year
      data.countryOfBirth || '',                            // 6. Country of Birth
      data.countryOfResidence || '',                        // 7. Country of Residence
      data.email || '',                                     // 8. Email
      data.phoneCountryCode || '',                          // 9. Phone Country Code
      data.phoneNumber || '',                               // 10. Phone Number
      data.referringCampmate || '',                         // 11. Referring Camp Mate
      data.burnsWithRA || '',                               // 12. Burns with RA
      data.burnsWithoutRA || '',                            // 13. Burns without RA
      data.firstBurn || 'No',                               // 14. First Burn
      data.likelihoodOfAttending || '',                     // 15. Likelihood of Attending
      data.stewardTicketInterest || '',                     // 16. Steward Ticket Interest
      data.whatYouOffer || '',                              // 17. What You Offer
      data.notes || '',                                     // 18. Notes
      'Pending',                                            // 19. Status (default)
      '',                                                   // 20. Reviewed By (empty initially)
      '',                                                   // 21. Reviewed At (empty initially)
      '',                                                   // 22. Internal Notes (empty initially)
      data.formName || 'Statement of Intent 2026'          // 23. Form Name
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Log successful submission
    Logger.log('Submission received from: ' + data.email);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success',
        success: true,
        message: 'Submission received'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    Logger.log('Error processing submission: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error',
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test the doPost function with sample data
 * Go to: Run → testFormSubmission
 */
function testFormSubmission() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    sex: 'Non-binary',
    birthYear: '1990',
    countryOfBirth: 'United States',
    countryOfResidence: 'United States',
    email: 'test@example.com',
    phoneCountryCode: '+1',
    phoneNumber: '5551234567',
    referringCampmate: 'Jane Doe',
    burnsWithRA: '2023,2024',
    burnsWithoutRA: '2015,2016',
    firstBurn: 'No',
    likelihoodOfAttending: 'Hell yeah!',
    stewardTicketInterest: 'Yes',
    whatYouOffer: 'Testing the form submission',
    notes: 'This is a test submission from Apps Script',
    formName: 'Statement of Intent 2026'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const response = doPost(mockEvent);
  const result = JSON.parse(response.getContent());
  
  if (result.success) {
    SpreadsheetApp.getUi().alert('✅ Test submission successful!\n\nCheck SOI_Staging tab for the test row.');
  } else {
    SpreadsheetApp.getUi().alert('❌ Test failed:\n\n' + result.message);
  }
}

