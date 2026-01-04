# Rubber Armstrong Main Site

The main informational website for Rubber Armstrong, deployed at `rubberarmstrong.com`.

## Overview

This site provides information about Rubber Armstrong camp, our values, camp life, and the joining process. It links to the SOI subdomain but does not contain any forms itself.

## Structure

```
main-site/
├── index.html              # Home page
├── about.html              # About / Values
├── camp-life.html          # Day-to-day life, Radiance Hour, shifts
├── gallery.html            # Photos from 2022-2025
├── ticketing.html          # BM ticket vs RA membership
├── join.html               # Joining process explanation
├── css/
│   └── styles.css          # Main site styles
├── js/
│   └── navigation.js       # Navigation and accessibility
├── images/
│   └── gallery/
│       ├── 2022/
│       ├── 2023/
│       ├── 2024/
│       └── 2025/
└── README.md (this file)
```

## Deployment to Cloudflare Pages

1. Connect repository to Cloudflare Pages
2. Create new project
3. Set build configuration:
   - **Build command**: (none)
   - **Build output directory**: `main-site`
   - **Root directory**: (leave as root)
4. Add custom domain: `rubberarmstrong.com`
5. Configure DNS in Cloudflare
6. SSL is automatic

## Cloudflare Web Analytics

Update the analytics token in all HTML files:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_CLOUDFLARE_TOKEN"}'></script>
```

Get token from: Cloudflare Dashboard → Web Analytics → Settings

## Cloudflare Image Optimization

Cloudflare automatically optimizes images served through your site:

### Automatic Features
- Format conversion (WebP, AVIF, JPG fallback)
- Responsive sizing
- Compression
- CDN caching

### How It Works
1. Upload your high-quality JPG images to `images/gallery/[year]/`
2. Reference them normally in HTML: `<img src="images/gallery/2025/photo.jpg" ...>`
3. Cloudflare serves optimized versions automatically based on browser support and screen size

### Manual Optimization (Optional)
For more control, use Cloudflare Image Resizing URL parameters:

```html
<img src="/cdn-cgi/image/width=800,quality=85,format=auto/images/gallery/2025/photo.jpg" 
     alt="Description" loading="lazy">
```

Parameters:
- `width=X`: Set width in pixels
- `height=X`: Set height in pixels
- `quality=X`: Compression quality (1-100)
- `format=auto`: Auto-select best format

### Image Upload Guidelines
- **Format**: JPG (PNG for transparency)
- **Recommended size**: 1200-1600px wide
- **Quality**: 80-85% JPG compression
- **File size**: Aim for < 500KB per image
- **Naming**: Descriptive (e.g., `solar-array-sunset.jpg`)

## Gallery Images

### Adding New Images

1. Place images in the appropriate year folder:
   - `images/gallery/2022/`
   - `images/gallery/2023/`
   - `images/gallery/2024/`
   - `images/gallery/2025/`

2. Update `gallery.html` with new image references

3. Include proper alt text (describe what's in the photo)

4. Add optional captions

### Image Categories
Aim for 5-10 images per year covering:
- Build and infrastructure
- Systems and sustainability
- Shared moments (Radiance Hour, meals, community)
- Night life and art car
- Pack down and leave no trace

## Content Updates

### Updating Page Content
1. Edit the relevant HTML file
2. Commit and push changes
3. Cloudflare Pages automatically redeploys

### Yearly Updates
- Update `ticketing.html` with current Burning Man ticket dates
- Add new year folder to `images/gallery/`
- Review all "2026" references and update to current year
- Check that links to SOI and Join subdomains are correct

## Navigation

### Desktop Navigation
Horizontal header navigation with 5 links:
- About
- Camp Life
- Gallery
- Ticketing
- Join

### Mobile Navigation
Fixed bottom bar with icons and labels:
- Optimized for touch (44px minimum touch targets)
- Active page highlighting
- Smooth transitions

### JavaScript Features
- Active page detection and highlighting
- Success message handling (from SOI form redirects)
- Keyboard navigation support
- Skip to content link
- Screen reader announcements

## Accessibility

Site is WCAG 2.1 AA compliant:
- Semantic HTML5
- Proper heading hierarchy
- Color contrast: 4.5:1 minimum
- Keyboard navigation
- Focus indicators
- Alt text for all images
- ARIA landmarks and labels
- Screen reader tested

## Performance

Target Lighthouse scores: 90+ on all metrics

Optimizations in place:
- Lazy loading for images
- Minimal JavaScript
- System fonts for body text
- Cloudflare CDN
- No build step required

## Local Development

```bash
# Navigate to main-site
cd main-site

# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Design System

The site uses shared design tokens from `../shared/design-tokens.css`:
- Minimalist dark theme
- Desert-inspired accent color (#d4a574)
- Mobile-first responsive design
- Fluid typography
- 8px spacing grid

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

Progressive enhancement approach - site works without JavaScript.

## Troubleshooting

### Images not loading
- Check file paths are correct
- Verify images exist in `images/gallery/[year]/`
- Check file extensions match HTML references

### Navigation not working
- Check `js/navigation.js` is loading
- Open browser console for errors
- Verify JavaScript is enabled

### Analytics not tracking
- Verify Cloudflare token is correct
- Check browser console for script errors
- Wait 24 hours for data to appear in Cloudflare dashboard

## Support

For questions or issues, contact RA technical team.

