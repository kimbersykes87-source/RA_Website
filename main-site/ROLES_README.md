# Roles Page

Interactive roles and responsibilities page for Rubber Armstrong camp structure.

## Overview

The roles page displays the camp's organizational structure with an interactive org chart. Clicking any role opens a modal with detailed information about that role's purpose, responsibilities, communication channels, and success measures.

## Features

- **Interactive Org Chart**: Visual representation of camp hierarchy (desktop) and stacked layout (mobile)
- **Role Cards**: Clickable cards that open detailed role information
- **Modal Overlays**: Full role details displayed in accessible modal dialogs
- **Deep Linking**: Each role has a unique URL hash (e.g., `/roles#mother-hen`)
- **Grouping**: Roles are visually tagged by group (Leadership, Experience, Area Leads)
- **Mobile Responsive**: Different layout for mobile devices
- **Accessibility**: Full keyboard navigation, ARIA labels, focus management

## Files

- `roles.html` - Main page HTML
- `css/roles.css` - Styles for org chart and modal
- `js/roles.js` - JavaScript for CSV parsing, rendering, and interactions
- `data/roles.csv` - Source data file (row-based CSV)

## Data Source

The page loads data from `data/roles.csv`. The CSV must have these columns (in order):

1. **Title** - Display name for the role (shown on cards and modal)
2. **Name** - Person's name (internal, used for slug generation)
3. **Purpose** - Role's purpose statement
4. **Owns** - What the role owns/responsible for
5. **Responsibilities** - Multi-line field with responsibilities (one per line)
6. **Communication Channels** - Multi-line field with communication methods (one per line)
7. **Success Measure** - Multi-line field with success criteria (one per line)

### CSV Format Requirements

- First row must be headers (column names)
- Each subsequent row is a role
- Multi-line fields (Responsibilities, Communication Channels, Success Measure) can contain line breaks (`\n`)
- Fields with commas or quotes should be properly quoted
- Windows-style line breaks (`\r\n`) are supported

Example CSV structure:
```csv
Title,Name,Purpose,Owns,Responsibilities,Communication Channels,Success Measure
Camp Lead,Kimber,"Set direction...","Budget...","Line 1
Line 2
Line 3","Direct: ...
Broadcast: ...","Measure 1
Measure 2"
```

## How to Add a Role

1. Open `data/roles.csv` in a text editor or spreadsheet application
2. Add a new row with the following fields:
   - **Title**: Display name (e.g., "First Aid")
   - **Name**: Person's name (e.g., "Tracy")
   - **Purpose**: One or two sentences describing the role's purpose
   - **Owns**: What the role owns/manages
   - **Responsibilities**: Each responsibility on a new line (use `\n` for line breaks)
   - **Communication Channels**: Each channel on a new line
   - **Success Measure**: Each measure on a new line
3. Save the CSV file
4. Refresh the roles page to see the new role

**Note**: If using a spreadsheet application (Excel, Google Sheets), the multi-line fields will be in a single cell. The JavaScript parser will split them on line breaks when rendering.

## Slug Generation

Slugs are generated from the **Name** field (preferred) or **Title** field (fallback). The slug is used for:
- Deep linking URLs (e.g., `/roles#mother-hen`)
- Element IDs and data attributes
- Matching roles in the code

Slug format: lowercase, hyphens instead of spaces, special characters removed.

Examples:
- Name: "Charlie" → slug: `charlie`
- Name: "Bar & Mezcal" → slug: `bar-mezcal`
- Title: "Camp Lead" → slug: `camp-lead`

## Hierarchy

The org chart displays roles in this hierarchy:

1. **Kimber (Camp Lead)** - Top level
2. **Angus (2IC)** - Under Kimber
3. **Charlie (Mother Hen)** - Under Angus
4. **Area Leads** - Under Charlie (horizontal row):
   - Power & Electrical
   - Water & Showers
   - Kitchen & Meals
   - Bar & Mezcal
   - Art Car
   - Shade & Tent City
   - Audio & DJ Gear
   - MOOP & Recycling
   - Logistics & Ops
   - First Aid

The hierarchy is determined by matching role names:
- "Kimber" or title "Camp Lead" → top
- "Angus" or title "2IC" → under Kimber
- "Charlie" or title "Mother Hen" → under Angus
- All other roles → Area Leads under Charlie

## Grouping

Roles are visually grouped with badges:

- **Leadership** (Camp Lead, 2IC) - Gold badge
- **Experience** (Mother Hen) - Gold badge
- **Area Leads** (all other roles) - Subtle badge

## Testing Locally

1. Navigate to the main-site directory:
   ```bash
   cd main-site
   ```

2. Start a local server:
   ```bash
   python -m http.server 8000
   ```

3. Open in browser:
   ```
   http://localhost:8000/roles.html
   ```

4. Test features:
   - Click a role card → modal should open
   - Press Esc → modal should close
   - Navigate with keyboard (Tab, Enter/Space) → should work
   - Test deep linking: `http://localhost:8000/roles.html#mother-hen` → modal should auto-open
   - Resize browser to mobile width → layout should change to stacked
   - Check multi-line fields render as lists (bullets)

## Browser Compatibility

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper `role`, `aria-label`, `aria-modal`, `aria-labelledby` attributes
- **Focus Management**: Focus moves to modal when opened, returns to trigger when closed
- **Focus Trap**: Tab navigation is trapped within the modal
- **Screen Reader Support**: Semantic HTML and ARIA attributes for screen readers
- **Skip Links**: Skip to main content link available
- **Focus Indicators**: Clear focus outlines for keyboard users

## Troubleshooting

### Roles not loading
- Check browser console for errors
- Verify `data/roles.csv` exists and is accessible
- Check CSV format (must have proper headers)
- Ensure CSV is properly formatted (quoted fields, line breaks)

### Modal not opening
- Check browser console for JavaScript errors
- Verify role data loaded correctly
- Check that role cards have correct `data-role-slug` attributes

### Deep linking not working
- Verify hash matches role slug (check browser console for role slugs)
- Check that JavaScript loaded correctly
- Ensure URL hash matches slug format (lowercase, hyphens)

### Multi-line fields not displaying correctly
- Verify CSV fields use `\n` for line breaks (not `\r\n` alone)
- Check that CSV fields are properly quoted
- Ensure JavaScript parser is splitting on line breaks correctly

## Future Enhancements

Potential improvements:
- Search/filter functionality
- Role relationships/connections visualization
- Export role data as PDF
- Admin interface for editing roles
- Role templates for common positions
