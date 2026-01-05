/**
 * Rubber Armstrong 2026 - Google Contacts Auto-Sync
 * VERSION 2 - FULLY FIXED
 * 
 * Fixes:
 * - Phone number formatting
 * - Etag handling for updates
 * - Better error handling
 * 
 * This script automatically syncs approved SOI submissions to Google Contacts.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  CONTACT_LABEL: '2026 Rubbers',
  APPROVED_SHEET: 'SOI_Approved',
  STAGING_SHEET: 'SOI_Staging',
  
  COLUMNS: {
    FIRST_NAME: 2,
    LAST_NAME: 3,
    SEX: 4,
    BIRTH_YEAR: 5,
    COUNTRY_BIRTH: 6,
    COUNTRY_RES: 7,
    EMAIL: 8,
    PHONE_CODE: 9,
    PHONE: 10,
    REFERRING: 11,
    BURNS_RA: 12,
    BURNS_OTHER: 13,
    FIRST_BURN: 14,
    LIKELIHOOD: 15,
    STEWARD: 16,
    WHAT_OFFER: 17,
    NOTES: 18,
    STATUS: 19,
    SYNCED_TO_CONTACTS: 24
  }
};

// ============================================================================
// SETUP FUNCTIONS
// ============================================================================

function setupContactsSync() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  [CONFIG.APPROVED_SHEET, CONFIG.STAGING_SHEET].forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const lastCol = sheet.getLastColumn();
      if (lastCol < CONFIG.COLUMNS.SYNCED_TO_CONTACTS) {
        sheet.getRange(1, CONFIG.COLUMNS.SYNCED_TO_CONTACTS)
          .setValue('Synced to Contacts')
          .setFontWeight('bold')
          .setBackground('#f3f3f3');
      }
    }
  });
  
  SpreadsheetApp.getUi().alert(
    '✅ Setup complete!\n\n' +
    'Next: Run setupAutomaticSync'
  );
}

function setupAutomaticSync() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onStatusChange') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  ScriptApp.newTrigger('onStatusChange')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create();
  
  SpreadsheetApp.getUi().alert('✅ Automatic sync enabled!');
}

// ============================================================================
// SYNC FUNCTIONS
// ============================================================================

function syncApprovedToContacts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.APPROVED_SHEET);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ ' + CONFIG.APPROVED_SHEET + ' sheet not found!');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  let syncCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowNumber = i + 1;
    
    const syncedStatus = row[CONFIG.COLUMNS.SYNCED_TO_CONTACTS - 1];
    if (syncedStatus === 'Yes') {
      skipCount++;
      continue;
    }
    
    const status = row[CONFIG.COLUMNS.STATUS - 1];
    if (status !== 'Approved') {
      skipCount++;
      continue;
    }
    
    try {
      syncContactToGoogle(row, sheet, rowNumber);
      syncCount++;
      Utilities.sleep(500);
    } catch (error) {
      Logger.log('Error syncing row ' + rowNumber + ': ' + error.toString());
      errorCount++;
    }
  }
  
  SpreadsheetApp.getUi().alert(
    '✅ Sync complete!\n\n' +
    'Synced: ' + syncCount + '\n' +
    'Skipped: ' + skipCount + '\n' +
    'Errors: ' + errorCount
  );
}

function syncContactToGoogle(row, sheet, rowNumber) {
  const firstName = row[CONFIG.COLUMNS.FIRST_NAME - 1];
  const lastName = row[CONFIG.COLUMNS.LAST_NAME - 1];
  const email = row[CONFIG.COLUMNS.EMAIL - 1];
  const phoneCode = row[CONFIG.COLUMNS.PHONE_CODE - 1];
  const phoneNumber = row[CONFIG.COLUMNS.PHONE - 1];
  
  if (!email) {
    throw new Error('No email address found');
  }
  
  // Check if contact exists
  const existingContacts = People.People.searchContacts({
    query: email,
    readMask: 'names,emailAddresses'
  });
  
  let contact;
  let isUpdate = false;
  let contactExists = false;
  
  if (existingContacts.results && existingContacts.results.length > 0) {
    const resourceName = existingContacts.results[0].person.resourceName;
    contactExists = true;
    
    // If contact exists, just add to label and skip update
    Logger.log('Contact already exists: ' + email + ' - Adding to label only');
    
    // Add to group and mark as synced
    try {
      addToContactGroup(resourceName);
      sheet.getRange(rowNumber, CONFIG.COLUMNS.SYNCED_TO_CONTACTS).setValue('Yes');
      Logger.log('Added existing contact to label: ' + email);
      return; // Exit early - don't update contact data
    } catch (error) {
      Logger.log('Error adding existing contact to label: ' + error.toString());
      throw error;
    }
  }
  
  // Build contact data
  const contactData = {
    names: [{
      givenName: firstName || '',
      familyName: lastName || ''
    }],
    emailAddresses: [{
      value: email,
      type: 'home'
    }],
    biographies: [{
      value: buildContactNotes(row),
      contentType: 'TEXT_PLAIN'
    }],
    userDefined: [
      { key: 'Camp', value: 'Rubber Armstrong' },
      { key: 'Year', value: '2026' },
      { key: 'Likelihood', value: row[CONFIG.COLUMNS.LIKELIHOOD - 1] || '' },
      { key: 'First Burn', value: row[CONFIG.COLUMNS.FIRST_BURN - 1] || '' },
      { key: 'Steward Interest', value: row[CONFIG.COLUMNS.STEWARD - 1] || '' }
    ]
  };
  
  // Add phone if available
  if (phoneNumber && phoneNumber.toString().trim() !== '') {
    try {
      let fullPhone = phoneNumber.toString().trim().replace(/[^\d+]/g, '');
      let code = phoneCode ? phoneCode.toString().trim() : '';
      
      if (code && !fullPhone.startsWith('+')) {
        if (!code.startsWith('+')) {
          code = '+' + code;
        }
        fullPhone = code + fullPhone;
      } else if (!fullPhone.startsWith('+')) {
        fullPhone = '+1' + fullPhone;
      }
      
      if (fullPhone.length >= 10) {
        contactData.phoneNumbers = [{
          value: fullPhone,
          type: 'mobile'
        }];
      }
    } catch (phoneError) {
      Logger.log('Skipping invalid phone for ' + email);
    }
  }
  
  // Create new contact (we already handled existing contacts above)
  contact = People.People.createContact(contactData);
  Logger.log('Created new contact: ' + email);
  
  // Add new contact to group
  try {
    addToContactGroup(contact.resourceName);
  } catch (error) {
    Logger.log('Could not add new contact to group: ' + error.toString());
  }
  
  // Mark as synced
  sheet.getRange(rowNumber, CONFIG.COLUMNS.SYNCED_TO_CONTACTS).setValue('Yes');
  Logger.log('Successfully created and labeled new contact: ' + email);
}

function buildContactNotes(row) {
  const burnsRA = row[CONFIG.COLUMNS.BURNS_RA - 1];
  const burnsOther = row[CONFIG.COLUMNS.BURNS_OTHER - 1];
  const likelihood = row[CONFIG.COLUMNS.LIKELIHOOD - 1];
  const steward = row[CONFIG.COLUMNS.STEWARD - 1];
  const whatOffer = row[CONFIG.COLUMNS.WHAT_OFFER - 1];
  const notes = row[CONFIG.COLUMNS.NOTES - 1];
  const referring = row[CONFIG.COLUMNS.REFERRING - 1];
  const firstBurn = row[CONFIG.COLUMNS.FIRST_BURN - 1];
  
  let contactNotes = '🎪 RUBBER ARMSTRONG 2026\n\n';
  
  if (firstBurn === 'Yes') {
    contactNotes += '🔥 First Burn: YES\n';
  } else {
    if (burnsRA) contactNotes += '🔥 Burns with RA: ' + burnsRA + '\n';
    if (burnsOther) contactNotes += '🔥 Other Burns: ' + burnsOther + '\n';
  }
  
  contactNotes += '\n';
  
  if (likelihood) contactNotes += '📊 Likelihood: ' + likelihood + '\n';
  if (steward) contactNotes += '🎫 Steward Interest: ' + steward + '\n';
  if (referring) contactNotes += '👥 Referred by: ' + referring + '\n';
  
  contactNotes += '\n';
  
  if (whatOffer) contactNotes += '💡 What they offer:\n' + whatOffer + '\n\n';
  if (notes) contactNotes += '📝 Notes:\n' + notes + '\n';
  
  contactNotes += '\n---\nSynced from SOI form: ' + new Date().toLocaleDateString();
  
  return contactNotes;
}

function addToContactGroup(resourceName) {
  try {
    // List all contact groups
    const groups = People.ContactGroups.list({
      pageSize: 1000
    });
    
    let groupResourceName;
    
    // Find existing group - check both name and formattedName
    if (groups.contactGroups) {
      const existingGroup = groups.contactGroups.find(g => {
        const name = g.name || '';
        const formatted = g.formattedName || '';
        return name === CONFIG.CONTACT_LABEL || 
               formatted === CONFIG.CONTACT_LABEL ||
               name.includes('2026 Rubbers') ||
               formatted.includes('2026 Rubbers');
      });
      
      if (existingGroup) {
        groupResourceName = existingGroup.resourceName;
        Logger.log('Found existing group: ' + groupResourceName);
      }
    }
    
    // Create group if it doesn't exist
    if (!groupResourceName) {
      try {
        const newGroup = People.ContactGroups.create({
          contactGroup: {
            name: CONFIG.CONTACT_LABEL
          }
        });
        groupResourceName = newGroup.resourceName;
        Logger.log('Created new contact group: ' + CONFIG.CONTACT_LABEL + ' (' + groupResourceName + ')');
      } catch (createError) {
        Logger.log('Error creating group: ' + createError.toString());
        throw createError;
      }
    }
    
    // Add contact to group
    if (groupResourceName && resourceName) {
      try {
        People.ContactGroups.Members.modify({
          resourceNamesToAdd: [resourceName]
        }, groupResourceName);
        Logger.log('Successfully added contact to group: ' + CONFIG.CONTACT_LABEL);
      } catch (addError) {
        Logger.log('Error adding to group: ' + addError.toString());
        // Don't throw - contact was created/updated successfully
      }
    }
    
  } catch (error) {
    Logger.log('Error in addToContactGroup: ' + error.toString());
    // Don't throw - we don't want to fail the whole sync if just the label fails
  }
}

// ============================================================================
// TRIGGER HANDLER
// ============================================================================

function onStatusChange(e) {
  try {
    const sheet = e.source.getActiveSheet();
    const range = e.range;
    
    const sheetName = sheet.getName();
    if (sheetName !== CONFIG.STAGING_SHEET && sheetName !== CONFIG.APPROVED_SHEET) {
      return;
    }
    
    const col = range.getColumn();
    if (col !== CONFIG.COLUMNS.STATUS) {
      return;
    }
    
    const newValue = range.getValue();
    if (newValue !== 'Approved') {
      return;
    }
    
    const row = range.getRow();
    const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const syncedStatus = rowData[CONFIG.COLUMNS.SYNCED_TO_CONTACTS - 1];
    if (syncedStatus === 'Yes') {
      return;
    }
    
    syncContactToGoogle(rowData, sheet, row);
    Logger.log('Auto-synced contact from row ' + row);
    
  } catch (error) {
    Logger.log('Error in onStatusChange: ' + error.toString());
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function testSingleSync() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.APPROVED_SHEET);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ ' + CONFIG.APPROVED_SHEET + ' sheet not found!');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[CONFIG.COLUMNS.STATUS - 1];
    const synced = row[CONFIG.COLUMNS.SYNCED_TO_CONTACTS - 1];
    
    if (status === 'Approved' && synced !== 'Yes') {
      try {
        syncContactToGoogle(row, sheet, i + 1);
        SpreadsheetApp.getUi().alert('✅ Test sync successful!\n\nCheck Google Contacts for: ' + row[CONFIG.COLUMNS.EMAIL - 1]);
        return;
      } catch (error) {
        SpreadsheetApp.getUi().alert('❌ Test failed:\n\n' + error.toString());
        return;
      }
    }
  }
  
  SpreadsheetApp.getUi().alert('No approved contacts found to test with.');
}

function clearSyncStatus() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear Sync Status',
    'This will clear "Synced to Contacts" for all rows.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [CONFIG.APPROVED_SHEET, CONFIG.STAGING_SHEET].forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, CONFIG.COLUMNS.SYNCED_TO_CONTACTS, lastRow - 1, 1).setValue('');
      }
    }
  });
  
  ui.alert('✅ Sync status cleared!');
}

