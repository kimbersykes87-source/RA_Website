/**
 * Rubber Armstrong Navigation
 * Handles active page highlighting, smooth scroll, keyboard accessibility
 */

(function() {
  'use strict';
  
  // Get current page from URL
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
  }
  
  // Set active nav link
  function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.replace('.html', '');
      
      if (linkPage === currentPage || 
          (currentPage === 'index' && linkPage === '') ||
          (currentPage === '' && linkPage === 'index')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
  
  // Smooth scroll to content (for skip link)
  function setupSkipLink() {
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  // Keyboard navigation enhancement
  function enhanceKeyboardNav() {
    // Allow Enter key to activate links
    const navItems = document.querySelectorAll('.mobile-nav-item, .nav-link');
    
    navItems.forEach(item => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }
  
  // Handle success message from form submission
  function handleSuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submission') === 'success') {
      showSuccessMessage();
      // Clean URL without reloading
      if (window.history.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }
  
  function showSuccessMessage() {
    // Create success message element
    const message = document.createElement('div');
    message.className = 'message message-success';
    message.setAttribute('role', 'alert');
    message.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <div>
        <strong>Statement of Intent submitted successfully!</strong>
        <p style="margin-top: 0.5rem; margin-bottom: 0;">Thank you for your interest in Rubber Armstrong. We'll review your submission and be in touch.</p>
      </div>
    `;
    
    // Insert at top of main content
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(message, main.firstChild);
      
      // Scroll to message
      message.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        message.style.transition = 'opacity 0.5s ease';
        message.style.opacity = '0';
        setTimeout(() => {
          message.remove();
        }, 500);
      }, 10000);
    }
  }
  
  // Announce page navigation for screen readers
  function announcePageLoad() {
    const title = document.title;
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `${title} loaded`;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }
  
  // Initialize on DOM ready
  function init() {
    setActiveNavLink();
    setupSkipLink();
    enhanceKeyboardNav();
    handleSuccessMessage();
    announcePageLoad();
  }
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

