// Validation functions for SOI form
// Handles name capitalization and phone number validation

/**
 * Capitalize names properly
 * Handles hyphens, apostrophes, and spaces
 * Examples: "mary o'brien" → "Mary O'Brien", "jean-paul" → "Jean-Paul"
 */
export function capitalizeNameField(value) {
  if (!value) return '';
  
  return value
    .split(/(\s+|-|')/) // Split on spaces, hyphens, apostrophes (keeping separators)
    .map((part) => {
      // Keep separators as-is
      if (part.match(/\s+|-|'/)) return part;
      
      // Capitalize first letter, lowercase the rest
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Remove leading zeros from phone number
 * Handles various formats: "0411234567" → "411234567", "00411234567" → "411234567"
 */
export function removeLeadingZeros(phoneNumber) {
  if (!phoneNumber) return '';
  
  // Remove all leading zeros
  return phoneNumber.replace(/^0+/, '');
}

/**
 * Phone validation patterns by country code
 * Returns regex pattern for validating phone numbers
 */
const PHONE_PATTERNS = {
  // North America (US, Canada)
  '+1': /^\d{10}$/,  // 10 digits
  
  // UK
  '+44': /^\d{10,11}$/,  // 10-11 digits
  
  // Australia
  '+61': /^\d{9}$/,  // 9 digits
  
  // New Zealand
  '+64': /^\d{8,10}$/,  // 8-10 digits
  
  // Germany
  '+49': /^\d{10,11}$/,  // 10-11 digits
  
  // France
  '+33': /^\d{9}$/,  // 9 digits
  
  // Italy
  '+39': /^\d{9,10}$/,  // 9-10 digits
  
  // Spain
  '+34': /^\d{9}$/,  // 9 digits
  
  // Netherlands
  '+31': /^\d{9}$/,  // 9 digits
  
  // Switzerland
  '+41': /^\d{9}$/,  // 9 digits
  
  // Belgium
  '+32': /^\d{8,9}$/,  // 8-9 digits
  
  // Sweden
  '+46': /^\d{9}$/,  // 9 digits
  
  // Norway
  '+47': /^\d{8}$/,  // 8 digits
  
  // Denmark
  '+45': /^\d{8}$/,  // 8 digits
  
  // Finland
  '+358': /^\d{9,10}$/,  // 9-10 digits
  
  // Ireland
  '+353': /^\d{9}$/,  // 9 digits
  
  // Poland
  '+48': /^\d{9}$/,  // 9 digits
  
  // India
  '+91': /^\d{10}$/,  // 10 digits
  
  // China
  '+86': /^\d{11}$/,  // 11 digits
  
  // Japan
  '+81': /^\d{10}$/,  // 10 digits
  
  // South Korea
  '+82': /^\d{9,10}$/,  // 9-10 digits
  
  // Singapore
  '+65': /^\d{8}$/,  // 8 digits
  
  // Hong Kong
  '+852': /^\d{8}$/,  // 8 digits
  
  // Malaysia
  '+60': /^\d{9,10}$/,  // 9-10 digits
  
  // Thailand
  '+66': /^\d{9}$/,  // 9 digits
  
  // Philippines
  '+63': /^\d{10}$/,  // 10 digits
  
  // Indonesia
  '+62': /^\d{9,12}$/,  // 9-12 digits
  
  // Vietnam
  '+84': /^\d{9,10}$/,  // 9-10 digits
  
  // Brazil
  '+55': /^\d{10,11}$/,  // 10-11 digits
  
  // Argentina
  '+54': /^\d{10}$/,  // 10 digits
  
  // Mexico
  '+52': /^\d{10}$/,  // 10 digits
  
  // South Africa
  '+27': /^\d{9}$/,  // 9 digits
  
  // Israel
  '+972': /^\d{9}$/,  // 9 digits
  
  // UAE
  '+971': /^\d{9}$/,  // 9 digits
  
  // Saudi Arabia
  '+966': /^\d{9}$/,  // 9 digits
  
  // Turkey
  '+90': /^\d{10}$/,  // 10 digits
  
  // Russia
  '+7': /^\d{10}$/,  // 10 digits
};

/**
 * Validate phone number based on country code
 * @param {string} dialCode - The country dial code (e.g., "+1", "+44")
 * @param {string} phoneNumber - The phone number (without country code)
 * @returns {boolean} - True if valid, false otherwise
 */
export function validatePhoneNumber(dialCode, phoneNumber) {
  if (!dialCode || !phoneNumber) return false;
  
  // Remove any non-digit characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Remove leading zeros
  const numberWithoutLeadingZeros = removeLeadingZeros(cleanNumber);
  
  // Get pattern for this country code
  const pattern = PHONE_PATTERNS[dialCode];
  
  if (pattern) {
    // Use specific pattern for known countries
    return pattern.test(numberWithoutLeadingZeros);
  } else {
    // Fallback: Basic validation for unknown countries (6-15 digits)
    return /^\d{6,15}$/.test(numberWithoutLeadingZeros);
  }
}

/**
 * Format phone number for display
 * Adds spaces for readability based on country
 */
export function formatPhoneDisplay(dialCode, phoneNumber) {
  if (!phoneNumber) return '';
  
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Simple formatting for US/Canada
  if (dialCode === '+1' && cleanNumber.length === 10) {
    return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
  }
  
  // Simple formatting for UK
  if (dialCode === '+44' && cleanNumber.length === 10) {
    return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 7)} ${cleanNumber.slice(7)}`;
  }
  
  // Default: no formatting
  return cleanNumber;
}

/**
 * Validate birth year
 * Must be 4-digit year between 1940 and 2010
 */
export function validateBirthYear(year) {
  const yearNum = parseInt(year, 10);
  
  if (isNaN(yearNum)) return false;
  if (year.length !== 4) return false;
  if (yearNum < 1940 || yearNum > 2010) return false;
  
  return true;
}

/**
 * Get error message for birth year validation
 */
export function getBirthYearError(year) {
  if (!year) return 'Birth year is required';
  
  const yearNum = parseInt(year, 10);
  
  if (isNaN(yearNum) || year.length !== 4) {
    return 'Please enter a valid 4-digit year';
  }
  
  if (yearNum < 1940) {
    return 'Birth year must be 1940 or later';
  }
  
  if (yearNum > 2010) {
    return 'You must be at least 16 years old';
  }
  
  return '';
}

/**
 * Get error message for phone validation
 */
export function getPhoneError(dialCode, phoneNumber) {
  if (!phoneNumber) return 'Phone number is required';
  
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const pattern = PHONE_PATTERNS[dialCode];
  
  if (!cleanNumber) {
    return 'Please enter a valid phone number';
  }
  
  if (pattern) {
    const expected = pattern.toString().match(/\\d\{(\d+(?:,\d+)?)\}/);
    if (expected) {
      const range = expected[1].split(',');
      if (range.length === 2) {
        return `Phone number must be ${range[0]}-${range[1]} digits for this country`;
      } else {
        return `Phone number must be ${range[0]} digits for this country`;
      }
    }
  }
  
  return 'Phone number format is invalid for the selected country';
}

