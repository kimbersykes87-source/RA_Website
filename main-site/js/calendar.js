/**
 * Rubber Armstrong Calendar
 * Handles CSV parsing, calendar grid generation, and event rendering
 */

(function() {
  'use strict';
  
  // Calendar configuration
  // Use local date to avoid timezone issues
  const START_DATE = new Date(2026, 6, 27); // July 27, 2026 (month is 0-indexed, so 6 = July)
  const END_DATE = new Date(2026, 8, 13);   // September 13, 2026 (month is 0-indexed, so 8 = September)
  
  // Events data
  let eventsData = [];
  
  // Day names (Monday first)
  const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  /**
   * Simple CSV parser
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
          currentField += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentField);
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = '';
        }
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }
    
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }
    
    return rows;
  }
  
  /**
   * Parse date string (supports YYYY-MM-DD and DD/MM/YYYY formats)
   * Uses local date to avoid timezone issues
   */
  function parseDate(dateString) {
    if (!dateString) return null;
    
    // Try YYYY-MM-DD format first
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day, 0, 0, 0, 0);
      }
    }
    
    // Try DD/MM/YYYY format
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day, 0, 0, 0, 0);
      }
    }
    
    return null;
  }
  
  /**
   * Format date as YYYY-MM-DD
   */
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  /**
   * Check if two dates are the same day
   */
  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  /**
   * Get day of week (0 = Monday, 6 = Sunday)
   */
  function getDayOfWeek(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, Monday (1) to 0
  }
  
  /**
   * Check if date is today
   */
  function isToday(date) {
    const today = new Date();
    return isSameDay(date, today);
  }
  
  /**
   * Get color value - supports hex codes and named colors
   */
  function getColor(colorString) {
    if (!colorString) return '#d4a574'; // Default accent color
    
    const trimmed = colorString.trim();
    
    // If it's a hex color, return it
    if (trimmed.startsWith('#')) {
      return trimmed;
    }
    
    // Map named colors to actual hex values (from design tokens)
    const colorMap = {
      'accent': '#d4a574',
      'success': '#5a9d7e',
      'error': '#d47474',
      'warning': '#d4a574',
    };
    
    return colorMap[trimmed.toLowerCase()] || '#d4a574';
  }
  
  /**
   * Load and parse CSV
   */
  async function loadEvents() {
    try {
      const response = await fetch('data/dates.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
      if (rows.length < 2) {
        throw new Error('CSV file is empty or invalid');
      }
      
      // First row is headers - preserve case for Title column
      const headersLower = rows[0].map(h => h.trim().toLowerCase());
      const headersOriginal = rows[0].map(h => h.trim());
      const startDateIdx = headersLower.indexOf('start_date');
      const endDateIdx = headersLower.indexOf('end_date');
      const titleIdx = headersLower.indexOf('title');
      const colorIdx = headersLower.indexOf('color');
      // Title column is case-sensitive (capital T)
      const titleDetailIdx = headersOriginal.findIndex(h => h === 'Title');
      const crewIdx = headersLower.indexOf('crew');
      const notesIdx = headersLower.indexOf('notes');
      
      if (startDateIdx === -1 || endDateIdx === -1 || titleIdx === -1) {
        throw new Error('Required CSV columns not found');
      }
      
      eventsData = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0) continue;
        
        const startDate = parseDate(row[startDateIdx]);
        const endDate = parseDate(row[endDateIdx]);
        const title = row[titleIdx] || '';
        const color = colorIdx >= 0 ? (row[colorIdx] || '') : '';
        const titleDetail = titleDetailIdx >= 0 ? (row[titleDetailIdx] || '') : '';
        const crew = crewIdx >= 0 ? (row[crewIdx] || '') : '';
        const notes = notesIdx >= 0 ? (row[notesIdx] || '') : '';
        
        if (!startDate || !endDate || !title) continue;
        
        eventsData.push({
          startDate,
          endDate,
          title: title.trim(),
          color: color.trim(),
          titleDetail: titleDetail.trim(),
          crew: crew.trim(),
          notes: notes.trim()
        });
      }
      
      return eventsData;
    } catch (error) {
      console.error('Error loading events:', error);
      throw error;
    }
  }
  
  /**
   * Generate all dates in the calendar range
   */
  function generateCalendarDates() {
    const dates = [];
    const current = new Date(START_DATE);
    
    while (current <= END_DATE) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }
  
  /**
   * Check if an event spans a specific date
   */
  function eventSpansDate(event, date) {
    return date >= event.startDate && date <= event.endDate;
  }
  
  /**
   * Get events for a specific date
   */
  function getEventsForDate(date) {
    return eventsData.filter(event => eventSpansDate(event, date));
  }
  
  /**
   * Check if date is start of event
   */
  function isEventStart(event, date) {
    return isSameDay(event.startDate, date);
  }
  
  /**
   * Check if date is end of event
   */
  function isEventEnd(event, date) {
    return isSameDay(event.endDate, date);
  }
  
  /**
   * Get event position class
   */
  function getEventPositionClass(event, date) {
    const isStart = isEventStart(event, date);
    const isEnd = isEventEnd(event, date);
    
    if (isStart && isEnd) {
      return 'calendar-event-single';
    } else if (isStart) {
      return 'calendar-event-start';
    } else if (isEnd) {
      return 'calendar-event-end';
    } else {
      return 'calendar-event-middle';
    }
  }
  
  /**
   * Render calendar grid
   */
  function renderCalendar() {
    const dates = generateCalendarDates();
    const container = document.getElementById('calendar-container');
    if (!container) return;
    
    let html = '<div class="calendar-grid">';
    
    // Day headers row - add spacer for month column, then Mon-Sun
    html += '<div class="calendar-day-header-spacer"></div>';
    html += '<div class="calendar-day-header">Mon</div>';
    html += '<div class="calendar-day-header">Tue</div>';
    html += '<div class="calendar-day-header">Wed</div>';
    html += '<div class="calendar-day-header">Thu</div>';
    html += '<div class="calendar-day-header">Fri</div>';
    html += '<div class="calendar-day-header">Sat</div>';
    html += '<div class="calendar-day-header">Sun</div>';
    
    // Get day of week for first date (0 = Monday, 6 = Sunday)
    const firstDayOfWeek = getDayOfWeek(dates[0]);
    
    // Group dates into calendar weeks (Monday to Sunday)
    // Each week should contain 7 consecutive dates, aligned to Monday-Sunday
    const weeks = [];
    let currentWeek = [];
    
    dates.forEach((date, index) => {
      const dayOfWeek = getDayOfWeek(date);
      
      // Start a new week on Monday (dayOfWeek === 0)
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek]);
        currentWeek = [date];
      } else {
        currentWeek.push(date);
      }
    });
    
    // Add the last week
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    // Set explicit month header spans based on user requirements:
    // Row 1 = day headers (Mon-Sun)
    // Row 2 = weekIndex 0 (July)
    // Row 3-6 = weekIndex 1-4 (August)
    // Row 7-8 = weekIndex 5-6 (September)
    const monthHeaderSpans = new Map();
    
    // July: span row 2 only (weekIndex 0)
    monthHeaderSpans.set(6, { // 6 = July
      startWeek: 0,
      endWeek: 0,
      rowSpan: 1
    });
    
    // August: span rows 3-6 (weekIndex 1-4)
    monthHeaderSpans.set(7, { // 7 = August
      startWeek: 1,
      endWeek: 4,
      rowSpan: 4
    });
    
    // September: span rows 7-8 (weekIndex 5-6) - starting on row above previous position
    monthHeaderSpans.set(8, { // 8 = September
      startWeek: 5,
      endWeek: 6,
      rowSpan: 2
    });
    
    // Render each week
    weeks.forEach((week, weekIndex) => {
      // Check if this weekIndex is the start of any month header span
      let monthHeaderToShow = null;
      for (const [month, spanInfo] of monthHeaderSpans.entries()) {
        if (weekIndex === spanInfo.startWeek) {
          monthHeaderToShow = { month, spanInfo };
          break;
        }
      }
      
      // Determine if we should show month header and calculate row span
      if (monthHeaderToShow) {
        const { month, spanInfo } = monthHeaderToShow;
        // Calculate explicit row numbers (row 1 is headers, so weeks start at row 2)
        const startRow = spanInfo.startWeek + 2; // weekIndex 0 = row 2, weekIndex 1 = row 3, etc.
        const endRow = spanInfo.endWeek + 3; // +3 because end is exclusive in grid-row syntax
        
        if (spanInfo.rowSpan > 1) {
          // Use explicit grid positioning with column and row for multi-row spans
          html += `<div class="calendar-month-header" style="grid-column: 1; grid-row: ${startRow} / ${endRow}"><h2 class="calendar-month-title">${MONTH_NAMES[month]}</h2></div>`;
        } else {
          // Single row span - still specify both column and row explicitly
          html += `<div class="calendar-month-header" style="grid-column: 1; grid-row: ${startRow}"><h2 class="calendar-month-title">${MONTH_NAMES[month]}</h2></div>`;
        }
      } else {
        // Check if we're within a month header span
        let isWithinSpan = false;
        for (const [spanMonth, spanInfo] of monthHeaderSpans.entries()) {
          if (weekIndex > spanInfo.startWeek && weekIndex <= spanInfo.endWeek) {
            isWithinSpan = true;
            break;
          }
        }
        
        // Always add a cell to maintain 8-column grid structure
        // When within a span, the spanning header visually covers this cell
        // We add an empty invisible cell that the spanning header will overlay
        const rowNum = weekIndex + 2; // Calculate row number (row 1 is headers)
        html += `<div class="calendar-month-header" style="grid-column: 1; grid-row: ${rowNum}; visibility: hidden; height: 0; padding: 0; border: none;"></div>`;
      }
      
      // Get the day of week for the first date in this week
      const firstDay = getDayOfWeek(week[0]);
      
      // Add empty cells before first date to align to Monday (only for first week if it doesn't start on Monday)
      if (weekIndex === 0 && firstDay > 0) {
        for (let i = 0; i < firstDay; i++) {
          html += '<div class="calendar-cell"></div>';
        }
      }
      
      // Create a map of dates by their day of week for this week
      const dateMap = new Map();
      week.forEach(date => {
        const dayOfWeek = getDayOfWeek(date);
        dateMap.set(dayOfWeek, date);
      });
      
      // Render 7 cells for this week (Mon-Sun), placing dates in correct columns
      // dayPos 0 = Monday, 1 = Tuesday, etc.
      for (let dayPos = 0; dayPos < 7; dayPos++) {
        const date = dateMap.get(dayPos);
        
        if (date) {
          // Cell classes
          const cellClasses = ['calendar-cell'];
          const dateClasses = ['calendar-date'];
          
          if (isToday(date)) {
            dateClasses.push('today');
          }
          
          // Get events for this date
          const dayEvents = getEventsForDate(date);
          
          html += '<div class="' + cellClasses.join(' ') + '">';
          html += `<span class="${dateClasses.join(' ')}">${date.getDate()}</span>`;
          
          // Render events
          dayEvents.forEach((event, eventIndex) => {
            const positionClass = getEventPositionClass(event, date);
            const color = getColor(event.color);
            const style = `background-color: ${color};`;
            const isFirstDayOfWeek = dayPos === 0; // First day in week row (Monday)
            
            // Find the event index in eventsData to use as data attribute
            const eventIndexInData = eventsData.findIndex(e => 
              e.startDate.getTime() === event.startDate.getTime() &&
              e.endDate.getTime() === event.endDate.getTime() &&
              e.title === event.title
            );
            
            html += `<div class="calendar-event ${positionClass}" style="${style}" title="${escapeHtml(event.title)}" tabindex="0" role="button" aria-label="Event: ${escapeHtml(event.title)}" data-event-index="${eventIndexInData}">`;
            // Show title on start day OR when event continues on a new week (first day of week)
            if (isEventStart(event, date) || (isFirstDayOfWeek && eventSpansDate(event, date) && !isEventStart(event, date))) {
              html += escapeHtml(event.title);
            }
            html += '</div>';
          });
          
          html += '</div>';
        } else {
          // Empty cell - no date for this day of week
          html += '<div class="calendar-cell"></div>';
        }
      }
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    
    // Add click handlers to events after rendering
    attachEventHandlers();
  }
  
  /**
   * Attach click handlers to calendar events
   */
  function attachEventHandlers() {
    const eventElements = document.querySelectorAll('.calendar-event');
    eventElements.forEach(element => {
      element.addEventListener('click', function() {
        const eventIndex = parseInt(this.getAttribute('data-event-index'), 10);
        if (eventIndex >= 0 && eventIndex < eventsData.length) {
          showEventModal(eventsData[eventIndex]);
        }
      });
      
      // Add keyboard support
      element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const eventIndex = parseInt(this.getAttribute('data-event-index'), 10);
          if (eventIndex >= 0 && eventIndex < eventsData.length) {
            showEventModal(eventsData[eventIndex]);
          }
        }
      });
    });
  }
  
  /**
   * Show event details modal
   */
  function showEventModal(event) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'event-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'event-modal-title');
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    
    // Format dates in a user-friendly format
    const formatDateForDisplay = (date) => {
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    };
    
    const startDateStr = formatDateForDisplay(event.startDate);
    const endDateStr = formatDateForDisplay(event.endDate);
    const dateRange = event.startDate.getTime() === event.endDate.getTime() 
      ? startDateStr 
      : `${startDateStr} - ${endDateStr}`;
    
    // Build modal content
    let modalContent = `
      <div class="event-modal-header">
        <h2 id="event-modal-title" class="event-modal-title">${escapeHtml(event.title)}</h2>
        <button class="event-modal-close" aria-label="Close modal" type="button">×</button>
      </div>
      <div class="event-modal-body">
        <div class="event-modal-date">
          <strong>Date:</strong> ${escapeHtml(dateRange)}
        </div>
    `;
    
    if (event.titleDetail) {
      modalContent += `
        <div class="event-modal-field">
          <strong>Title:</strong> ${escapeHtml(event.titleDetail)}
        </div>
      `;
    }
    
    if (event.crew) {
      modalContent += `
        <div class="event-modal-field">
          <strong>Crew:</strong> ${escapeHtml(event.crew)}
        </div>
      `;
    }
    
    if (event.notes) {
      modalContent += `
        <div class="event-modal-field">
          <strong>Notes:</strong> ${escapeHtml(event.notes)}
        </div>
      `;
    }
    
    modalContent += `
      </div>
    `;
    
    modal.innerHTML = modalContent;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close handlers
    const closeModal = () => {
      document.body.removeChild(overlay);
      document.body.style.overflow = ''; // Restore scrolling
    };
    
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
      }
    });
    
    const closeButton = modal.querySelector('.event-modal-close');
    closeButton.addEventListener('click', closeModal);
    
    // ESC key to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Focus the close button for accessibility
    closeButton.focus();
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
   * Initialize calendar
   */
  async function init() {
    try {
      await loadEvents();
      renderCalendar();
    } catch (error) {
      console.error('Error initializing calendar:', error);
      const container = document.getElementById('calendar-container');
      if (container) {
        container.innerHTML = `
          <div class="calendar-loading">
            <p>Error loading calendar. Please refresh the page.</p>
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
