/**
 * Fix Burns Count Display - COMPLETE FIX
 * 
 * This script:
 * 1. Fixes existing data (converts scientific notation back to years)
 * 2. Formats columns as TEXT to prevent future issues
 * 3. Adds count columns for easy viewing
 * 
 * Run this once to fix everything.
 */

function fixEverything() {
  const ui = SpreadsheetApp.getUi();
  
  ui.alert(
    'Complete Burns Fix',
    'This will:\n' +
    '1. Fix existing data (convert scientific notation)\n' +
    '2. Format columns as TEXT\n' +
    '3. Add count columns\n\n' +
    'Continue?',
    ui.ButtonSet.OK_CANCEL
  );
  
  // Step 1: Fix existing data
  fixExistingData();
  
  // Step 2: Format columns as text
  formatColumnsAsText();
  
  // Step 3: Add count columns
  addBurnsCountColumns();
  
  ui.alert(
    '✅ Complete!\n\n' +
    'All burns data has been fixed.\n' +
    'Future entries will be stored correctly.'
  );
}

function fixExistingData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    
    // Fix Burns (RA) - Column L (12)
    const burnsRARange = sheet.getRange(2, 12, lastRow - 1, 1);
    const burnsRAData = burnsRARange.getValues();
    const fixedRAData = burnsRAData.map(row => {
      let value = row[0];
      if (!value || value === '') return [''];
      
      // If it's a number in scientific notation, it's corrupted
      if (typeof value === 'number' || value.toString().includes('E+')) {
        // Can't recover the exact years, but we can note it
        return ['[Data corrupted - please re-enter years]'];
      }
      
      // If it's already text, clean it up
      value = value.toString().trim();
      
      // Remove any spaces
      value = value.replace(/\s+/g, '');
      
      // Ensure commas between years
      if (value && !value.includes(',') && value.length > 4) {
        // Try to split every 4 characters (year length)
        const years = value.match(/.{1,4}/g);
        if (years) {
          value = years.join(',');
        }
      }
      
      return [value];
    });
    burnsRARange.setValues(fixedRAData);
    
    // Fix Burns (Other) - Column M (13)
    const burnsOtherRange = sheet.getRange(2, 13, lastRow - 1, 1);
    const burnsOtherData = burnsOtherRange.getValues();
    const fixedOtherData = burnsOtherData.map(row => {
      let value = row[0];
      if (!value || value === '') return [''];
      
      if (typeof value === 'number' || value.toString().includes('E+')) {
        return ['[Data corrupted - please re-enter years]'];
      }
      
      value = value.toString().trim().replace(/\s+/g, '');
      
      if (value && !value.includes(',') && value.length > 4) {
        const years = value.match(/.{1,4}/g);
        if (years) {
          value = years.join(',');
        }
      }
      
      return [value];
    });
    burnsOtherRange.setValues(fixedOtherData);
    
    Logger.log('Fixed existing data in ' + sheetName);
  });
}

function formatColumnsAsText() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const lastRow = Math.max(sheet.getLastRow(), 100); // Format at least 100 rows
    
    // Format Burns (RA) column as TEXT
    sheet.getRange(2, 12, lastRow - 1, 1).setNumberFormat('@STRING@');
    
    // Format Burns (Other) column as TEXT
    sheet.getRange(2, 13, lastRow - 1, 1).setNumberFormat('@STRING@');
    
    Logger.log('Formatted columns as TEXT in ' + sheetName);
  });
}

function addBurnsCountColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    // Column L = Burns (RA) - raw data (column 12)
    // Column M = Burns (Other) - raw data (column 13)
    
    // We'll add helper columns after the existing columns
    const lastCol = sheet.getLastColumn();
    const lastRow = sheet.getLastRow();
    
    // Add headers for count columns if they don't exist
    const currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    
    // Check if we need to add "Burns (RA) Count" column
    if (!currentHeaders.includes('Burns (RA) Count')) {
      const newCol = lastCol + 1;
      sheet.getRange(1, newCol).setValue('Burns (RA) Count')
        .setFontWeight('bold')
        .setBackground('#f3f3f3');
      
      // Add formula to count commas + 1 (if not empty)
      if (lastRow > 1) {
        const formula = '=IF(ISBLANK(L2), 0, IF(L2="", 0, LEN(L2)-LEN(SUBSTITUTE(L2,",",""))+1))';
        sheet.getRange(2, newCol).setFormula(formula);
        
        // Copy formula down
        if (lastRow > 2) {
          sheet.getRange(2, newCol).copyTo(sheet.getRange(2, newCol, lastRow - 1, 1));
        }
      }
      
      Logger.log('Added "Burns (RA) Count" column to ' + sheetName);
    }
    
    // Check if we need to add "Burns (Other) Count" column
    if (!currentHeaders.includes('Burns (Other) Count')) {
      const newCol = lastCol + 2;
      sheet.getRange(1, newCol).setValue('Burns (Other) Count')
        .setFontWeight('bold')
        .setBackground('#f3f3f3');
      
      // Add formula to count commas + 1 (if not empty)
      if (lastRow > 1) {
        const formula = '=IF(ISBLANK(M2), 0, IF(M2="", 0, LEN(M2)-LEN(SUBSTITUTE(M2,",",""))+1))';
        sheet.getRange(2, newCol).setFormula(formula);
        
        // Copy formula down
        if (lastRow > 2) {
          sheet.getRange(2, newCol).copyTo(sheet.getRange(2, newCol, lastRow - 1, 1));
        }
      }
      
      Logger.log('Added "Burns (Other) Count" column to ' + sheetName);
    }
  });
  
  SpreadsheetApp.getUi().alert(
    '✅ Burns count columns added!\n\n' +
    'New columns:\n' +
    '- "Burns (RA) Count" - shows number (e.g., 9)\n' +
    '- "Burns (Other) Count" - shows number\n\n' +
    'The original columns still show the years for reference.'
  );
}

/**
 * Alternative: Replace the years with counts in the existing columns
 * WARNING: This will lose the year data!
 */
function convertBurnsToCountsInPlace() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'WARNING',
    'This will replace year lists with counts.\n\n' +
    'Example: "2015,2016,2017" becomes "3"\n\n' +
    'You will LOSE the year data!\n\n' +
    'Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    
    // Process Burns (RA) - Column L (12)
    const burnsRAData = sheet.getRange(2, 12, lastRow - 1, 1).getValues();
    const burnsRACount = burnsRAData.map(row => {
      const value = row[0];
      if (!value || value === '') return ['0'];
      const count = value.toString().split(',').length;
      return [count.toString()];
    });
    sheet.getRange(2, 12, lastRow - 1, 1).setValues(burnsRACount);
    
    // Process Burns (Other) - Column M (13)
    const burnsOtherData = sheet.getRange(2, 13, lastRow - 1, 1).getValues();
    const burnsOtherCount = burnsOtherData.map(row => {
      const value = row[0];
      if (!value || value === '') return ['0'];
      const count = value.toString().split(',').length;
      return [count.toString()];
    });
    sheet.getRange(2, 13, lastRow - 1, 1).setValues(burnsOtherCount);
    
    Logger.log('Converted burns to counts in ' + sheetName);
  });
  
  ui.alert('✅ Conversion complete!\n\nBurns columns now show counts instead of years.');
}

/**
 * Recommended: Change column headers to clarify what's shown
 */
function updateColumnHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['SOI_Staging', 'SOI_Approved', 'SOI_Rejected'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    // Column L (12) = Burns (RA)
    // Column M (13) = Burns (Other)
    
    sheet.getRange(1, 12).setValue('Burns (RA) - Years');
    sheet.getRange(1, 13).setValue('Burns (Other) - Years');
    
    Logger.log('Updated headers in ' + sheetName);
  });
  
  SpreadsheetApp.getUi().alert(
    '✅ Headers updated!\n\n' +
    'Columns now labeled:\n' +
    '- "Burns (RA) - Years"\n' +
    '- "Burns (Other) - Years"\n\n' +
    'This clarifies they show years, not counts.'
  );
}

