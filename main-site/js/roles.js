/**
 * Rubber Armstrong Roles Page
 * Handles CSV parsing, org chart rendering, modals, and deep linking
 */

(function() {
  'use strict';
  
  // Roles data
  let rolesData = [];
  let activeRole = null;
  let activeRoleElement = null;
  
  // Hierarchy mapping
  const hierarchy = {
    'Kimber': { parent: null, level: 'leadership' },
    'Angus': { parent: 'Kimber', level: 'leadership' },
    'Charlie': { parent: 'Angus', level: 'experience' },
    // Area leads are under Charlie
    'Tracy': { parent: 'Charlie', level: 'area-lead' }, // Medical
    'Iggy?': { parent: 'Charlie', level: 'area-lead' }, // Power
    // Add other area leads - they'll be matched by name or title
  };
  
  // Role title to name mapping (for hierarchy matching)
  const roleTitleToName = {
    'Camp Lead': 'Kimber',
    'TOO ICY': 'Angus',
    'Mother Hen': 'Charlie',
    'Medical': 'Tracy',
    'Power': 'Iggy?',
    'Power & Electrical': 'Iggy?',
    'Water': null, // TBC
    'Water & Showers': null, // TBC
    'Kitchen': null, // TBC
    'Kitchen & Meals': null, // TBC
    'Bar': null, // TBC
    'Bar & Mezcal': null, // TBC
    'Art Car': 'Mikey?',
    'Tents': null, // TBC
    'Shade & Tent City': null, // TBC
    'Audio': null, // TBC
    'Audio & DJ Gear': null, // TBC
    'MOOP': null, // TBC
    'MOOP & Recycling': null, // TBC
    'SQUIRREL': null, // Display name - shows as "Quartermaster" in modal
    'Quartermaster': null, // Legacy
    'Logistics': null, // Legacy
    'Logistics & Ops': null, // Legacy
  };
  
  /**
   * Simple CSV parser that handles quoted fields with newlines
   */
  function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        currentRow.push(currentField);
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        // End of row
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = '';
        }
        // Skip \r\n combination
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }
    
    // Add last field and row
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }
    
    return rows;
  }
  
  /**
   * Normalize text to slug
   */
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  
  /**
   * Parse multi-line field (handles \r\n and \n)
   */
  function parseMultiLine(text) {
    if (!text) return [];
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  
  /**
   * Get role group
   */
  function getRoleGroup(role) {
    const title = role.Title.toLowerCase();
    if (title.includes('camp lead') || title.includes('too icy')) {
      return 'leadership';
    } else if (title.includes('mother hen')) {
      return 'experience';
    } else {
      return 'area-lead';
    }
  }
  
  /**
   * Get area lead category for grouping
   */
  function getAreaLeadCategory(role) {
    const title = role.title.toLowerCase().trim();
    
    // Technical: Power, Water, Audio
    if (title === 'power' || title === 'water' || title === 'audio') {
      return 'technical';
    }
    
    // Experience: Art Car, Bar, MOOP, Bikes
    if (title === 'art car' || title === 'bar' || title === 'moop' || title === 'bikes') {
      return 'experience';
    }
    
    // Camp Life: Kitchen, Quartermaster (SQUIRREL), Medical, Tents
    if (title === 'kitchen' || title === 'quartermaster' || title === 'squirrel' || 
        title === 'medical' || title === 'tents') {
      return 'camp-life';
    }
    
    // Default fallback
    return 'camp-life';
  }
  
  /**
   * Get group badge class
   */
  function getBadgeClass(group) {
    if (group === 'leadership') return 'badge-leadership';
    if (group === 'experience') return 'badge-experience';
    return 'badge-area-lead';
  }
  
  /**
   * Detect if CSV is in matrix format (first column = field names, columns = roles)
   */
  function detectMatrixFormat(rows) {
    if (rows.length < 2) return false;
    
    // Check first column of first few rows for known field names
    const fieldNames = ['Title', 'Name', 'Your North Star', 'Purpose', 'What you run', 'Owns', 'What you wrangle', 'Responsibilities', 'Communication Channels', 'Success Measure'];
    let matchCount = 0;
    
    for (let i = 0; i < Math.min(rows.length, 10); i++) {
      const firstCol = rows[i][0] || '';
      if (fieldNames.some(field => firstCol.includes(field))) {
        matchCount++;
      }
    }
    
    // If first column matches many field names, it's matrix format
    return matchCount >= 3;
  }
  
  /**
   * Load and parse CSV
   * 
   * CSV FORMAT: The CSV is in MATRIX format (not row-based):
   * - First column (index 0) contains field names: "Title", "Name", "Purpose", "Owns", "Responsibilities", etc.
   * - Remaining columns (index 1+) contain role data
   * - Row 0: ["Title", "Camp Lead", "TOO ICY", "Mother Hen", ...]
   * - Row 1: ["Name", "Kimber", "Angus", "Charlie", ...]
   * - Row 2: ["Purpose", "...", "...", ...]
   * - Row 3: ["Owns", "...", "...", ...]
   * - Row 4: ["Responsibilities", "multi-line text\nwith newlines", "multi-line text", ...]
   * - etc.
   * 
   * This function detects the matrix format and transposes it into role objects.
   * Multi-line fields are stored in single cells (with \n characters), which the CSV parser handles correctly.
   */
  async function loadRoles() {
    const DEBUG = true; // Set to false to disable debug logs
    
    try {
      const response = await fetch('data/roles.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
      if (rows.length < 2) {
        throw new Error('CSV file is empty or invalid');
      }
      
      // Debug: log first 10 rows and first 8 columns
      if (DEBUG) {
        console.log('=== CSV PARSING DEBUG ===');
        console.log('First 10 rows, first 8 columns:');
        for (let i = 0; i < Math.min(10, rows.length); i++) {
          console.log(`Row ${i}:`, rows[i].slice(0, 8));
        }
        console.log('First column values (first 30 rows):');
        for (let i = 0; i < Math.min(30, rows.length); i++) {
          console.log(`  Row ${i}: "${rows[i][0]}"`);
        }
      }
      
      // Detect CSV format
      const isMatrix = detectMatrixFormat(rows);
      
      if (DEBUG) {
        console.log('Detected format:', isMatrix ? 'MATRIX' : 'ROW-BASED');
      }
      
      if (!isMatrix) {
        // Row-based format (not currently used, but kept for backwards compatibility)
        const headers = rows[0];
        const titleIdx = headers.indexOf('Title');
        const nameIdx = headers.indexOf('Name');
        const purposeIdx = headers.indexOf('Purpose');
        const ownsIdx = headers.indexOf('Owns');
        const responsibilitiesIdx = headers.indexOf('Responsibilities');
        const commsIdx = headers.indexOf('Communication Channels');
        const successIdx = headers.indexOf('Success Measure');
        
        if (titleIdx === -1 || nameIdx === -1) {
          throw new Error('Required CSV columns not found');
        }
        
        rolesData = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === 0) continue;
          
          const role = {
            title: row[titleIdx] || '',
            name: row[nameIdx] || '',
            purpose: row[purposeIdx] || '',
            owns: row[ownsIdx] || '',
            responsibilities: parseMultiLine(row[responsibilitiesIdx] || ''),
            communicationChannels: parseMultiLine(row[commsIdx] || ''),
            successMeasure: parseMultiLine(row[successIdx] || ''),
            slug: slugify(row[titleIdx] || ''), // Always use title for slug (not name, since names can be "TBC" or empty)
            group: getRoleGroup({ Title: row[titleIdx] || '' })
          };
          
          rolesData.push(role);
        }
        
        return rolesData;
      }
      
      // MATRIX FORMAT: Transpose to role objects
      // CSV structure: first column = field names, remaining columns = roles
      // Row 0: ["Title", "Camp Lead", "2IC", "Mother Hen", ...]
      // Row 1: ["Name", "Kimber", "Angus", "Charlie", ...]
      // Row 2: ["Purpose", "...", "...", ...]
      // Row 3: ["Owns", "...", "...", ...]
      // Row 4+: ["Responsibilities", "...", "...", ...] (multi-line fields in quoted cells)
      
      const roleTitles = rows[0].slice(1); // Skip first column (field names), get role titles
      const numRoles = roleTitles.length;
      
      if (DEBUG) {
        console.log('Role titles:', roleTitles);
        console.log('Number of roles:', numRoles);
      }
      
      // Find row index for each field (first column value)
      let titleRowIdx = -1;
      let nameRowIdx = -1;
      let purposeRowIdx = -1;
      let ownsRowIdx = -1;
      let responsibilitiesRowIdx = -1;
      let commsRowIdx = -1;
      let successRowIdx = -1;
      
      for (let i = 0; i < rows.length; i++) {
        const firstCol = (rows[i][0] || '').trim();
        // Match exact field names (case-insensitive, allow partial match for longer names)
        if (firstCol.toLowerCase() === 'title' || firstCol.startsWith('Title')) {
          titleRowIdx = i;
        }
        if (firstCol.toLowerCase() === 'name' || firstCol.startsWith('Name')) {
          nameRowIdx = i;
        }
        if (firstCol.toLowerCase() === 'your north star' || firstCol.includes('North Star') || firstCol.toLowerCase() === 'purpose' || firstCol.startsWith('Purpose')) {
          purposeRowIdx = i;
        }
        if (firstCol.toLowerCase() === 'what you run' || firstCol.includes('What you run') || firstCol.toLowerCase() === 'owns' || firstCol.startsWith('Owns')) {
          ownsRowIdx = i;
        }
        if (firstCol.includes('What you wrangle') || firstCol.includes('Responsibilities')) {
          if (responsibilitiesRowIdx === -1) responsibilitiesRowIdx = i;
        }
        if (firstCol.includes('Communication Channels') || firstCol.includes('Communication')) {
          if (commsRowIdx === -1) commsRowIdx = i;
        }
        if (firstCol.includes('Success Measure') || firstCol.includes('Success')) {
          if (successRowIdx === -1) successRowIdx = i;
        }
      }
      
      if (DEBUG) {
        console.log('Field row indices:', {
          title: titleRowIdx,
          name: nameRowIdx,
          purpose: purposeRowIdx,
          owns: ownsRowIdx,
          responsibilities: responsibilitiesRowIdx,
          comms: commsRowIdx,
          success: successRowIdx
        });
      }
      
      // Extract field data for each role column
      // Note: Multi-line fields are in single cells (quoted), so we extract the cell directly
      rolesData = [];
      
      for (let roleColIdx = 0; roleColIdx < numRoles; roleColIdx++) {
        const colIdx = roleColIdx + 1; // +1 because first column (index 0) contains field names
        
        // Get title from header row (row 0)
        const title = roleTitles[roleColIdx].trim();
        
        // Get name
        let name = '';
        if (nameRowIdx >= 0 && rows[nameRowIdx] && rows[nameRowIdx][colIdx]) {
          name = (rows[nameRowIdx][colIdx] || '').trim();
        }
        
        // Get purpose (single cell, may contain newlines)
        let purpose = '';
        if (purposeRowIdx >= 0 && rows[purposeRowIdx] && rows[purposeRowIdx][colIdx]) {
          purpose = (rows[purposeRowIdx][colIdx] || '').trim();
        }
        
        // Get owns (single cell, may contain newlines)
        let owns = '';
        if (ownsRowIdx >= 0 && rows[ownsRowIdx] && rows[ownsRowIdx][colIdx]) {
          owns = (rows[ownsRowIdx][colIdx] || '').trim();
        }
        
        // Get responsibilities (single cell, contains newlines - CSV parser handles quoted multi-line)
        // Each field is in a single row, and each cell contains the full multi-line text with \n characters
        let responsibilities = '';
        if (responsibilitiesRowIdx >= 0 && rows[responsibilitiesRowIdx] && rows[responsibilitiesRowIdx][colIdx]) {
          responsibilities = (rows[responsibilitiesRowIdx][colIdx] || '').trim();
        }
        
        // Get communication channels (single cell with newlines)
        let communicationChannels = '';
        if (commsRowIdx >= 0 && rows[commsRowIdx] && rows[commsRowIdx][colIdx]) {
          communicationChannels = (rows[commsRowIdx][colIdx] || '').trim();
        }
        
        // Get success measure (single cell with newlines)
        let successMeasure = '';
        if (successRowIdx >= 0 && rows[successRowIdx] && rows[successRowIdx][colIdx]) {
          successMeasure = (rows[successRowIdx][colIdx] || '').trim();
        }
        
        const role = {
          title: title,
          name: name,
          purpose: purpose,
          owns: owns,
          responsibilities: parseMultiLine(responsibilities),
          communicationChannels: parseMultiLine(communicationChannels),
          successMeasure: parseMultiLine(successMeasure),
          slug: slugify(title), // Always use title for slug (not name, since names can be "TBC" or empty)
          group: getRoleGroup({ Title: title })
        };
        
        rolesData.push(role);
        
        // Debug logging for first role (Camp Lead)
        if (DEBUG && roleColIdx === 0) {
          console.log('=== FIRST ROLE (Camp Lead) DEBUG ===');
          console.log('Title:', role.title);
          console.log('Name:', role.name);
          console.log('First 3 responsibilities:', role.responsibilities.slice(0, 3));
          console.log('First 2 comms:', role.communicationChannels.slice(0, 2));
          console.log('First success measure:', role.successMeasure[0]);
          console.log('Total responsibilities lines:', role.responsibilities.length);
          console.log('Raw responsibilities text (first 200 chars):', responsibilities.substring(0, 200));
        }
      }
      
      if (DEBUG) {
        console.log('=== PARSING COMPLETE ===');
        console.log('Total roles parsed:', rolesData.length);
      }
      
      return rolesData;
    } catch (error) {
      console.error('Error loading roles:', error);
      throw error;
    }
  }
  
  /**
   * Find role by slug
   */
  function findRoleBySlug(slug) {
    return rolesData.find(role => role.slug === slug);
  }
  
  /**
   * Render org chart (desktop)
   */
  function renderOrgChartDesktop() {
    // Find roles by hierarchy
    const kimber = rolesData.find(r => r.name === 'Kimber' || r.title === 'Camp Lead');
    const angus = rolesData.find(r => r.name === 'Angus' || r.title === 'TOO ICY');
    const charlie = rolesData.find(r => r.name === 'Charlie' || r.title === 'Mother Hen');
    
    // Area leads (all except leadership and Mother Hen)
    const areaLeads = rolesData.filter(r => {
      const title = r.title.toLowerCase();
      return !title.includes('camp lead') && 
             !title.includes('too icy') && 
             !title.includes('mother hen');
    });
    
    // Group area leads by category
    const technicalLeads = areaLeads.filter(r => getAreaLeadCategory(r) === 'technical');
    const experienceLeads = areaLeads.filter(r => getAreaLeadCategory(r) === 'experience');
    const campLifeLeads = areaLeads.filter(r => getAreaLeadCategory(r) === 'camp-life');
    
    // Sort each group by title
    technicalLeads.sort((a, b) => a.title.localeCompare(b.title));
    experienceLeads.sort((a, b) => a.title.localeCompare(b.title));
    campLifeLeads.sort((a, b) => a.title.localeCompare(b.title));
    
    if (!kimber || !angus || !charlie) {
      console.error('Could not find required roles in hierarchy');
      return '';
    }
    
    let html = '<div class="roles-pods">';
    
    // Leadership Pod
    html += '<div class="role-pod">';
    html += '<h3 class="pod-title">Leadership</h3>';
    html += '<div class="pod-roles">';
    html += renderRoleCard(kimber);
    html += renderRoleCard(angus);
    html += renderRoleCard(charlie);
    html += '</div>';
    html += '</div>';
    
    // Technical Pod
    html += '<div class="role-pod">';
    html += '<h3 class="pod-title">Technical</h3>';
    html += '<div class="pod-roles">';
    technicalLeads.forEach(role => {
      html += renderRoleCard(role);
    });
    html += '</div>';
    html += '</div>';
    
    // Experience Pod
    html += '<div class="role-pod">';
    html += '<h3 class="pod-title">Experience</h3>';
    html += '<div class="pod-roles">';
    experienceLeads.forEach(role => {
      html += renderRoleCard(role);
    });
    html += '</div>';
    html += '</div>';
    
    // Camp Life Pod
    html += '<div class="role-pod">';
    html += '<h3 class="pod-title">Camp Life</h3>';
    html += '<div class="pod-roles">';
    campLifeLeads.forEach(role => {
      html += renderRoleCard(role);
    });
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    
    return html;
  }
  
  /**
   * Render org chart (mobile)
   */
  function renderOrgChartMobile() {
    const kimber = rolesData.find(r => r.name === 'Kimber' || r.title === 'Camp Lead');
    const angus = rolesData.find(r => r.name === 'Angus' || r.title === 'TOO ICY');
    const charlie = rolesData.find(r => r.name === 'Charlie' || r.title === 'Mother Hen');
    const areaLeads = rolesData.filter(r => {
      const title = r.title.toLowerCase();
      return !title.includes('camp lead') && 
             !title.includes('too icy') && 
             !title.includes('mother hen');
    });
    
    areaLeads.sort((a, b) => a.title.localeCompare(b.title));
    
    if (!kimber || !angus || !charlie) {
      return '';
    }
    
    let html = '<div class="org-chart-mobile">';
    
    // Stacked layout
    html += renderMobileRoleItem(kimber);
    html += renderMobileRoleItem(angus);
    html += renderMobileRoleItem(charlie);
    
    html += '<div class="mobile-role-list">';
    areaLeads.forEach(role => {
      html += renderMobileRoleItem(role);
    });
    html += '</div>';
    
    html += '</div>';
    
    return html;
  }
  
  /**
   * Render role card
   */
  function renderRoleCard(role) {
    return `
      <div class="role-card" 
           data-role-slug="${role.slug}"
           tabindex="0"
           role="button"
           aria-label="View ${role.title} role details">
        <div class="role-card-title">${escapeHtml(role.title)}</div>
      </div>
    `;
  }
  
  /**
   * Render mobile role item
   */
  function renderMobileRoleItem(role) {
    return `
      <div class="mobile-role-item" 
           data-role-slug="${role.slug}"
           tabindex="0"
           role="button"
           aria-label="View ${role.title} role details">
        <div class="mobile-role-header">
          <div>
            <div class="mobile-role-title">${escapeHtml(role.title)}</div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Escape HTML
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Render modal content
   */
  function renderModalContent(role) {
    // Special case: SQUIRREL should display as "Quartermaster" in modal (without "Lead")
    let displayTitle;
    if (role.title === 'SQUIRREL') {
      displayTitle = 'Quartermaster';
    } else {
      // Add "Lead" to Area Lead titles
      displayTitle = role.group === 'area-lead' 
        ? `${role.title} Lead` 
        : role.title;
    }
    
    return `
      <h2 class="modal-title" id="modal-title">${escapeHtml(displayTitle)}</h2>
      
      ${role.purpose ? `
        <div class="modal-section">
          <h3 class="modal-section-title">Your North Star</h3>
          <div class="modal-section-content">
            <p>${escapeHtml(role.purpose)}</p>
          </div>
        </div>
      ` : ''}
      
      ${role.owns ? `
        <div class="modal-section">
          <h3 class="modal-section-title">What you run</h3>
          <div class="modal-section-content">
            <p>${escapeHtml(role.owns)}</p>
          </div>
        </div>
      ` : ''}
      
      ${role.responsibilities.length > 0 ? `
        <div class="modal-section">
          <h3 class="modal-section-title">What you wrangle</h3>
          <div class="modal-section-content">
            <ul class="modal-list">
              ${role.responsibilities.map(resp => `<li>${escapeHtml(resp)}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}
      
      ${role.successMeasure.length > 0 ? `
        <div class="modal-section">
          <h3 class="modal-section-title">Thumbs up if:</h3>
          <div class="modal-section-content">
            <ul class="modal-list">
              ${role.successMeasure.map(measure => `<li>${escapeHtml(measure)}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}
    `;
  }
  
  /**
   * Open modal
   */
  function openModal(role, triggerElement) {
    const modal = document.getElementById('role-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    activeRole = role;
    activeRoleElement = triggerElement;
    
    // Render content
    modalBody.innerHTML = renderModalContent(role);
    
    // Show modal
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
    
    // Update URL hash
    window.location.hash = role.slug;
    
    // Highlight role card
    if (triggerElement) {
      triggerElement.classList.add('active');
    } else {
      // Find and highlight the role card
      const roleCard = document.querySelector(`[data-role-slug="${role.slug}"]`);
      if (roleCard) {
        roleCard.classList.add('active');
        activeRoleElement = roleCard;
      }
    }
  }
  
  /**
   * Close modal
   */
  function closeModal() {
    const modal = document.getElementById('role-modal');
    if (!modal) return;
    
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Clear hash
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname);
    }
    
    // Remove highlight
    if (activeRoleElement) {
      activeRoleElement.classList.remove('active');
    }
    
    // Return focus to trigger element
    if (activeRoleElement) {
      setTimeout(() => {
        if (activeRoleElement) {
          activeRoleElement.focus();
        }
      }, 100);
    }
    
    activeRole = null;
    activeRoleElement = null;
  }
  
  /**
   * Handle hash change
   */
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) {
      closeModal();
      return;
    }
    
    const role = findRoleBySlug(hash);
    if (role) {
      const roleCard = document.querySelector(`[data-role-slug="${hash}"]`);
      openModal(role, roleCard);
    }
  }
  
  /**
   * Initialize event listeners
   */
  function initEventListeners() {
    // Role card clicks
    document.addEventListener('click', (e) => {
      const roleCard = e.target.closest('.role-card, .mobile-role-item');
      if (roleCard) {
        const slug = roleCard.getAttribute('data-role-slug');
        const role = findRoleBySlug(slug);
        if (role) {
          e.preventDefault();
          openModal(role, roleCard);
        }
      }
    });
    
    // Keyboard navigation for role cards
    document.addEventListener('keydown', (e) => {
      const roleCard = e.target.closest('.role-card, .mobile-role-item');
      if (roleCard && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const slug = roleCard.getAttribute('data-role-slug');
        const role = findRoleBySlug(slug);
        if (role) {
          openModal(role, roleCard);
        }
      }
    });
    
    // Modal close button
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Modal backdrop click
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('role-modal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
          closeModal();
        }
      }
    });
    
    // Hash change
    window.addEventListener('hashchange', handleHashChange);
    
    // Focus trap in modal
    const modal = document.getElementById('role-modal');
    if (modal) {
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false') {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }
  
  /**
   * Initialize
   */
  async function init() {
    try {
      // Load roles
      await loadRoles();
      
      // Render org chart
      const container = document.getElementById('roles-container');
      if (container) {
        container.innerHTML = renderOrgChartDesktop() + renderOrgChartMobile();
      }
      
      // Initialize event listeners
      initEventListeners();
      
      // Handle initial hash
      if (window.location.hash) {
        handleHashChange();
      }
    } catch (error) {
      console.error('Error initializing roles page:', error);
      const container = document.getElementById('roles-container');
      if (container) {
        container.innerHTML = `
          <div class="roles-loading">
            <p>Error loading roles. Please refresh the page.</p>
          </div>
        `;
      }
    }
  }
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
