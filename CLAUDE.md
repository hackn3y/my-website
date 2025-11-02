# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and e-commerce website combining a professional showcase with an integrated shop for handmade farm products. Built as a static site with Netlify serverless functions for payment processing.

## Key Technologies

- **Frontend**: Vanilla JavaScript (no frameworks), CSS variables for theming
- **Payments**: Stripe API with Netlify Functions serverless backend
- **Testing**: Playwright for browser automation tests
- **Hosting**: Netlify (forms, functions, deployment)

## Development Commands

### Local Development Server
**Required**: Must use a local server (not `file://`) for header partial loading:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Testing
```bash
# Install dependencies first
npm install

# Run smoke tests (theme toggle, basic functionality)
npm run test:smoke

# Run comprehensive tests (full site functionality)
npm run test:comprehensive

# Run all Playwright tests
npm run test:all
```

## Architecture

### Component Loading Pattern
The site uses a **dynamic header injection** system:
- `partials/header.html` contains the navigation component
- `js/header.js` fetches and injects header into all pages at runtime
- Tries multiple paths (`/partials/header.html`, `./partials/header.html`, `partials/header.html`)
- Falls back to inline header creation if loading fails
- Dispatches `header:loaded` event when ready for initialization
- Other scripts wait for this event before initializing (e.g., theme.js)

### State Management
**No framework** - uses vanilla JavaScript with:
- **localStorage** for cart persistence and theme preference
- **Event delegation** for UI interactions (theme toggle, cart, modals)
- Cart state shared across pages via localStorage serialization

### Theme System
- Dual dark/light modes using CSS variables
- `js/theme.js` manages toggle and persistence
- Body class `.light-mode` controls appearance
- Preference saved to localStorage as `theme` key
- **Seasonal Themes**: Automatically changes accent colors based on season/holiday
  - Halloween (Oct): Orange theme
  - Thanksgiving (Nov): Brown/chocolate theme
  - Christmas (Dec-Jan 6): Red theme
  - Valentine's (Feb 1-14): Pink theme
  - St. Patrick's (Mar 1-17): Green theme
  - Spring (Mar 18-May): Pink theme
  - Summer (Jun-Aug): Orange theme
  - Fall (Sep): Brown theme
  - See `SEASONAL_THEMES.md` for full details

### Shopping Cart Flow
1. Products defined in `js/shop.js` in the `products` array (lines 5-36)
2. "Add to Cart" buttons push items to in-memory `cart` array
3. Cart synced to localStorage as product ID array
4. Checkout button triggers fetch to `/.netlify/functions/create-checkout`
5. Serverless function creates Stripe session with line items
6. User redirected to Stripe-hosted checkout page
7. Success/cancel URLs redirect back to site with query params

### Page Structure
- `index.html` - Main SPA-style homepage with all sections, inline scripts for shop initialization
- `blog-post-*.html` - Individual blog pages with cart redirect to index
- `project-*.html` - Detailed project pages showcasing portfolio work
- `services.html` - Services offering page
- `premium-*.html` - Premium landing page variations
- `thank-you.html` - Contact form success page
- `partials/header.html` - Shared navigation component

## Important Implementation Details

### Stripe Integration
- **Client-side**: Publishable key in `js/shop.js` line 2 (`STRIPE_PUBLISHABLE_KEY`)
- **Server-side**: Secret key in Netlify environment variable `STRIPE_SECRET_KEY`
- Stripe library loaded via CDN in index.html: `https://js.stripe.com/v3/`
- Products must exist in both code array AND Stripe Dashboard
- Price calculation: `Math.round(item.price * 100)` to convert dollars to cents
- Success/cancel URLs use `event.headers.origin` with fallback to production domain
- Shipping limited to US and CA in checkout session configuration

### Cart Badge Synchronization
Cart count displayed in header badge requires:
1. Element `#cart-count` for visible badge number
2. Element `#cart-count-sr` for screen reader announcement
3. Call `updateCartCount()` after any cart modification
4. Badge auto-syncs from localStorage on page load
5. Cart persisted as array of product IDs in localStorage key `cart`

### Accessibility Features
- Keyboard navigation detection via `user-is-tabbing` class on `<html>`
- Focus rings shown only during keyboard navigation
- Screen reader-only text uses `.sr-only` utility class
- ARIA attributes on interactive elements (cart button, theme toggle)

### Modal System
Modals with shared close behavior and conflict prevention:
- `#checkout-modal` - Shopping cart checkout
- `#quickview-modal` - Product detail view
- `#product-lightbox` - Image gallery with navigation
- Close via `.close-modal` buttons (event delegation in theme.js)
- Functions: `openCheckout()`, `closeCheckout()`, `openQuickView()`, `closeQuickView()`
- Global `closeAllModals()` ensures only one modal open at a time
- `openModal(modalId)` helper manages modal state and body overflow
- Lightbox supports keyboard (arrows/Escape) and mousewheel navigation
- Click outside modal backdrop closes the modal
- Focus management: lightbox stores last focused element and restores on close

### Cross-Page Cart Navigation
Blog pages redirect to index with cart open:
1. Set `localStorage.setItem('openCart', '1')`
2. Navigate to `index.html`
3. Index page checks flag in DOMContentLoaded
4. Auto-opens cart modal and clears flag

## File Organization

```
/
├── index.html                    # Main page with inline shop initialization
├── blog-post-*.html             # Blog pages
├── project-*.html               # Project detail pages
├── services.html                # Services offering page
├── premium-*.html               # Premium landing pages
├── thank-you.html               # Contact form success
├── partials/
│   └── header.html             # Shared nav component
├── js/
│   ├── header.js               # Loads header partial with fallback
│   ├── theme.js                # Theme toggle, seasonal themes, cart badge sync
│   ├── shop.js                 # Product catalog, cart logic, Stripe integration
│   └── app.js                  # Additional utilities
├── netlify/functions/
│   └── create-checkout.js      # Stripe session creation serverless function
└── tests/
    ├── smoke.spec.js           # Basic smoke tests
    ├── comprehensive-test.js   # Full functionality tests
    └── *.spec.js               # Various test suites
```

## Adding Products

1. Create product in Stripe Dashboard
2. Add entry to `products` array in `js/shop.js` (lines 5-36):
   ```javascript
   {
     id: 'prod_X',
     name: 'Product Name',
     price: 25.00,
     description: 'Product description',
     image: 'image.jpg',
     images: ['image.jpg', 'image2.jpg']  // Optional: for gallery
   }
   ```
3. Add product image(s) to root directory
4. Product ID should match Stripe for webhook processing
5. If `images` array has >1 item, gallery badge and "View Gallery" button appear automatically
6. Products automatically rendered by `loadProducts()` function in shop.js

## Common Tasks

### Update Navigation
Edit `partials/header.html` - changes propagate to all pages

### Change Color Scheme
Modify CSS variables in `:root` and `body.light-mode` blocks in HTML files

### Add Blog Post
1. Copy `blog-post-1.html` template
2. Update meta tags (title, description, og:tags, twitter:tags)
3. Replace content in article sections
4. Add card to blog section in `index.html`

### Environment Variables
Set in Netlify dashboard:
- `STRIPE_SECRET_KEY` - Required for payment processing

### reCAPTCHA Setup
Contact form uses Netlify's built-in reCAPTCHA v2:
- Script loaded in head: `https://www.google.com/recaptcha/api.js`
- Form has `netlify-recaptcha` attribute
- reCAPTCHA widget: `<div data-netlify-recaptcha="true"></div>`
- No manual configuration needed - Netlify handles keys automatically

## JavaScript Module Architecture

The codebase uses a modular JavaScript architecture with separate concerns:

### js/header.js
- Loads navigation from `partials/header.html` via fetch
- Tries multiple path strategies for different hosting environments
- Creates fallback header if loading fails (ensures site always has navigation)
- Initializes hamburger menu functionality
- Dispatches `header:loaded` event for coordination

### js/theme.js
- Listens for `header:loaded` before initialization
- Manages dark/light theme toggle with localStorage persistence
- Implements seasonal theme system (automatically changes accent colors)
- Handles cart badge synchronization across pages
- Uses event delegation for all UI interactions (theme toggle, cart, modals)
- Detects keyboard navigation for accessibility (user-is-tabbing class)

### js/shop.js
- Defines product catalog array
- Manages shopping cart state (in-memory + localStorage sync)
- Handles Stripe integration and checkout flow
- Implements modal system (checkout, quickview, lightbox)
- Product gallery with keyboard/mousewheel navigation
- Event delegation for product interactions
- Project filtering system for portfolio section

### Coordination Pattern
Scripts coordinate using custom events:
1. `header.js` loads first, injects header, fires `header:loaded`
2. `theme.js` listens for `header:loaded`, then initializes
3. `shop.js` uses DOMContentLoaded for initialization
4. All scripts use event delegation to avoid timing issues

### Event Delegation Strategy
To avoid race conditions with dynamic content:
- Click handlers attached to `document.body` or persistent containers
- Use `e.target.closest()` to match selectors (bubbling pattern)
- Enables handling clicks on dynamically loaded elements
- Examples: `#theme-toggle`, `#cart-link`, `.close-modal`, `[data-add-to-cart]`
- Reduces memory footprint vs. individual element listeners

## Testing Notes

Playwright tests use `file:///` protocol - fine for smoke tests but header won't load (expected limitation). For full integration testing, deploy to Netlify preview or use local server.
