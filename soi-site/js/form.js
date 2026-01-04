/**
 * Rubber Armstrong - Statement of Intent Form Logic
 * Handles validation, submission, honeypot checking, duplicate warnings
 */

import { CONFIG } from './config.js';
import { COUNTRIES } from './countries.js';
import { 
  capitalizeNameField, 
  removeLeadingZeros, 
  validatePhoneNumber,
  validateBirthYear,
  getBirthYearError,
  getPhoneError
} from './validation.js';

(function() {
  'use strict';
  
  // Form elements
  const form = document.getElementById('soi-form');
  const submitBtn = document.getElementById('submit-btn');
  const emailInput = document.getElementById('email');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const birthYearInput = document.getElementById('birthYear');
  const phoneInput = document.getElementById('phone');
  const phoneCountryCodeSelect = document.getElementById('phoneCountryCode');
  const countryOfBirthSelect = document.getElementById('countryOfBirth');
  const countryOfResidenceSelect = document.getElementById('countryOfResidence');
  
  // Message containers
  const duplicateWarning = document.getElementById('duplicate-warning');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const errorDetails = document.getElementById('error-details');
  
  // Local storage key for tracking submissions
  const STORAGE_KEY = 'ra_soi_submissions';
  
  /**
   * Populate birth year dropdown (2010 to 1940)
   */
  function populateBirthYearDropdown() {
    const birthYearSelect = document.getElementById('birthYear');
    for (let year = 2010; year >= 1940; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      birthYearSelect.appendChild(option);
    }
  }
  
  /**
   * Populate country dropdowns
   */
  function populateCountryDropdowns() {
    const countries = [...COUNTRIES]; // Copy array
    
    // Populate country of birth dropdown
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name;
      option.textContent = country.name;
      countryOfBirthSelect.appendChild(option);
    });
    
    // Populate country of residence dropdown
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name;
      option.textContent = country.name;
      countryOfResidenceSelect.appendChild(option);
    });
    
    // Populate phone country code dropdown
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.dialCode;
      option.textContent = `${country.dialCode} ${country.name}`;
      phoneCountryCodeSelect.appendChild(option);
    });
  }
  
  /**
   * Check if email has been submitted before (localStorage)
   */
  function checkDuplicateEmail(email) {
    try {
      const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return submissions.includes(email.toLowerCase());
    } catch (e) {
      console.warn('localStorage not available:', e);
      return false;
    }
  }
  
  /**
   * Store email in localStorage after successful submission
   */
  function storeEmail(email) {
    try {
      const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!submissions.includes(email.toLowerCase())) {
        submissions.push(email.toLowerCase());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
      }
    } catch (e) {
      console.warn('Could not store email in localStorage:', e);
    }
  }
  
  /**
   * Show duplicate email warning
   */
  function showDuplicateWarning() {
    duplicateWarning.classList.add('show');
    duplicateWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  /**
   * Hide duplicate email warning
   */
  function hideDuplicateWarning() {
    duplicateWarning.classList.remove('show');
  }
  
  /**
   * Email field validation and duplicate check
   */
  function handleEmailInput() {
    const email = emailInput.value.trim();
    hideDuplicateWarning();
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (checkDuplicateEmail(email)) {
        showDuplicateWarning();
      }
    }
  }
  
  /**
   * Handle name field auto-capitalization
   */
  function handleNameCapitalization(field) {
    if (field.value) {
      field.value = capitalizeNameField(field.value);
    }
  }
  
  /**
   * Handle phone number input (remove leading zeros)
   */
  function handlePhoneInput() {
    if (phoneInput.value) {
      phoneInput.value = removeLeadingZeros(phoneInput.value.replace(/\D/g, ''));
    }
  }
  
  /**
   * Validate individual field
   */
  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorSpan = formGroup?.querySelector('.field-error');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
      formGroup?.classList.add('has-error');
      return false;
    }
    
    // Validate email format
    if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        formGroup?.classList.add('has-error');
        return false;
      }
    }
    
    // Birth year dropdown validation (just check if selected)
    if (field.id === 'birthYear' && field.tagName === 'SELECT') {
      // Dropdown validation is handled by required attribute
      // No special validation needed
    }
    
    // Validate phone number
    if (field.id === 'phone' && field.value) {
      const dialCode = phoneCountryCodeSelect.value;
      const phoneNumber = field.value;
      
      if (!dialCode) {
        formGroup?.classList.add('has-error');
        if (errorSpan) {
          errorSpan.textContent = 'Please select a country code';
        }
        return false;
      }
      
      if (!validatePhoneNumber(dialCode, phoneNumber)) {
        formGroup?.classList.add('has-error');
        if (errorSpan) {
          errorSpan.textContent = getPhoneError(dialCode, phoneNumber);
        }
        return false;
      }
    }
    
    // Validate radio groups
    if (field.type === 'radio' && field.hasAttribute('required')) {
      const radioGroup = document.getElementsByName(field.name);
      const isChecked = Array.from(radioGroup).some(radio => radio.checked);
      if (!isChecked) {
        formGroup?.classList.add('has-error');
        return false;
      }
    }
    
    // Field is valid
    formGroup?.classList.remove('has-error');
    return true;
  }
  
  /**
   * Validate all form fields
   */
  function validateForm() {
    let isValid = true;
    
    // Get all required fields
    const requiredFields = form.querySelectorAll('[required]');
    
    // Validate each required field
    requiredFields.forEach(field => {
      // Skip radio buttons (validated as group)
      if (field.type === 'radio') {
        const radioName = field.name;
        if (radioName && !form.querySelector(`[name="${radioName}"]:checked`)) {
          const radioGroup = field.closest('.form-group');
          radioGroup?.classList.add('has-error');
          isValid = false;
        }
      } else {
        if (!validateField(field)) {
          isValid = false;
        }
      }
    });
    
    // Also validate phone country code (it's part of phone validation)
    if (phoneInput.value && !phoneCountryCodeSelect.value) {
      const formGroup = phoneInput.closest('.form-group');
      formGroup?.classList.add('has-error');
      isValid = false;
    }
    
    // Focus on first error if validation failed
    if (!isValid) {
      const firstError = form.querySelector('.form-group.has-error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError?.querySelector('input, textarea, select')?.focus();
    }
    
    return isValid;
  }
  
  /**
   * Check honeypot field (spam protection)
   */
  function checkHoneypot() {
    const honeypot = document.getElementById('website');
    return !honeypot || !honeypot.value;
  }
  
  /**
   * Collect checked values from checkbox group
   */
  function getCheckedValues(name) {
    const checkboxes = form.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value).sort().join(',');
  }
  
  /**
   * Get radio button value
   */
  function getRadioValue(name) {
    const radio = form.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
  }
  
  /**
   * Collect form data
   */
  function collectFormData() {
    const firstBurnCheckbox = document.getElementById('firstBurn');
    const isFirstBurn = firstBurnCheckbox ? firstBurnCheckbox.checked : false;
    
    const data = {
      timestamp: new Date().toISOString(),
      formName: CONFIG.FORM_NAME,
      status: 'Pending',
      
      // Personal Information
      firstName: capitalizeNameField(firstNameInput.value.trim()),
      lastName: capitalizeNameField(lastNameInput.value.trim()),
      sex: document.getElementById('sex').value,
      birthYear: birthYearInput.value,
      countryOfBirth: countryOfBirthSelect.value,
      countryOfResidence: countryOfResidenceSelect.value,
      
      // Contact Information
      email: emailInput.value.trim().toLowerCase(),
      phoneCountryCode: phoneCountryCodeSelect.value,
      phoneNumber: removeLeadingZeros(phoneInput.value.replace(/\D/g, '')),
      
      // Camp Connection
      referringCampmate: document.getElementById('referringCampmate').value.trim(),
      
      // Burning Man History (comma-separated years)
      burnsWithRA: getCheckedValues('burnsWithRA'),
      burnsWithoutRA: getCheckedValues('burnsWithoutRA'),
      firstBurn: isFirstBurn ? 'Yes' : 'No',
      
      // Commitment & Contribution
      likelihoodOfAttending: getRadioValue('likelihoodOfAttending'),
      stewardTicketInterest: getRadioValue('stewardTicketInterest'),
      whatYouOffer: document.getElementById('whatYouOffer').value.trim(),
      notes: document.getElementById('notes').value.trim()
    };
    
    return data;
  }
  
  /**
   * Show success message and redirect
   */
  function handleSuccess(email) {
    // Store email
    storeEmail(email);
    
    // Hide error messages
    errorMessage.classList.remove('show');
    hideDuplicateWarning();
    
    // Show success message
    successMessage.classList.add('show');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = 'https://rubberarmstrong.com/?submission=success';
    }, 3000);
  }
  
  /**
   * Show error message
   */
  function handleError(message) {
    errorDetails.textContent = message || 'Please check your connection and try again.';
    errorMessage.classList.add('show');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Re-enable form
    enableForm();
  }
  
  /**
   * Disable form during submission
   */
  function disableForm() {
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Disable all inputs
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = true;
    });
  }
  
  /**
   * Re-enable form after error
   */
  function enableForm() {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    
    // Re-enable all inputs
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = false;
    });
  }
  
  /**
   * Submit form to Google Apps Script
   * Note: Google Apps Script requires special handling for CORS
   */
  async function submitForm(data) {
    try {
      // Add a redirect parameter to force Google to handle CORS properly
      const url = CONFIG.APPS_SCRIPT_ENDPOINT + '?redirect=false';
      
      const response = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'success' || result.success === true) {
        return { success: true };
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  }
  
  /**
   * Handle form submission
   */
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Hide previous messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Validate honeypot
    if (!checkHoneypot()) {
      console.warn('Honeypot triggered - likely spam');
      // Show success to bot, but don't actually submit
      handleSuccess('spam@example.com');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Collect form data
    const data = collectFormData();
    
    // Disable form during submission
    disableForm();
    
    try {
      // Submit to Google Apps Script
      await submitForm(data);
      
      // Handle success
      handleSuccess(data.email);
    } catch (error) {
      // Handle error
      let errorMsg = 'Unable to submit form. Please check your internet connection and try again.';
      
      if (error.message.includes('Failed to fetch')) {
        errorMsg = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('HTTP error')) {
        errorMsg = 'Server error. Please try again in a few minutes.';
      }
      
      handleError(errorMsg);
    }
  }
  
  /**
   * Setup field validation listeners
   */
  function setupValidation() {
    // Auto-capitalize name fields on blur
    if (firstNameInput) {
      firstNameInput.addEventListener('blur', () => handleNameCapitalization(firstNameInput));
    }
    if (lastNameInput) {
      lastNameInput.addEventListener('blur', () => handleNameCapitalization(lastNameInput));
    }
    
    // Handle phone number input (remove leading zeros)
    if (phoneInput) {
      phoneInput.addEventListener('input', handlePhoneInput);
      phoneInput.addEventListener('blur', () => validateField(phoneInput));
    }
    
    // Birth year dropdown doesn't need special validation beyond required
    
    // Validate on blur for all required fields
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.addEventListener('blur', () => {
        if (field.hasAttribute('required') && field.value.trim()) {
          validateField(field);
        }
      });
      
      // Clear error on input
      field.addEventListener('input', () => {
        const formGroup = field.closest('.form-group');
        if (formGroup?.classList.contains('has-error')) {
          formGroup.classList.remove('has-error');
        }
      });
    });
    
    // Special handling for email field (duplicate check)
    if (emailInput) {
      emailInput.addEventListener('blur', handleEmailInput);
      emailInput.addEventListener('input', () => {
        // Debounce duplicate check
        clearTimeout(emailInput.debounceTimer);
        emailInput.debounceTimer = setTimeout(() => {
          if (emailInput.value.trim()) {
            handleEmailInput();
          }
        }, 500);
      });
    }
  }
  
  /**
   * Initialize form
   */
  function init() {
    if (!form) {
      console.error('Form not found');
      return;
    }
    
    // Check if Apps Script endpoint is configured
    if (CONFIG.APPS_SCRIPT_ENDPOINT.includes('PLACEHOLDER')) {
      console.warn('Apps Script endpoint not configured. Update js/config.js before deploying.');
    }
    
    // Populate dropdowns
    populateBirthYearDropdown();
    populateCountryDropdowns();
    
    // Setup validation
    setupValidation();
    
    // Handle form submission
    form.addEventListener('submit', handleSubmit);
    
    // Announce form ready for screen readers
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Statement of Intent form loaded and ready';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
