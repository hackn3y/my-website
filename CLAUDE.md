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

# Run smoke tests (Playwright)
npm run test:smoke
```

## Architecture

### Component Loading Pattern
The site uses a **dynamic header injection** system:
- `partials/header.html` contains the navigation component
- `js/header.js` fetches and injects header into all pages at runtime
- Enables single-source header maintenance across multiple HTML pages
- Dispatches `header:loaded` event when ready for initialization

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

### Shopping Cart Flow
1. Products defined in `index.html` JavaScript array (~line 1181)
2. "Add to Cart" buttons push items to in-memory `cart` array
3. Cart synced to localStorage as product ID array
4. Checkout button triggers fetch to `/.netlify/functions/create-checkout`
5. Serverless function creates Stripe session, returns redirect URL
6. User completes payment on Stripe-hosted checkout page

### Page Structure
- `index.html` - Main SPA-style homepage with all sections
- `blog-post-*.html` - Individual blog pages with cart redirect to index
- `project-*.html` - Detailed project pages
- `thank-you.html` - Contact form success page
- `partials/header.html` - Shared navigation component

## Important Implementation Details

### Stripe Integration
- **Client-side**: Publishable key in `index.html` (~line 1178)
- **Server-side**: Secret key in Netlify environment variable `STRIPE_SECRET_KEY`
- Products must exist in both code array AND Stripe Dashboard
- Price calculation: `item.price * 100` to convert dollars to cents
- Webhook endpoint should handle `checkout.session.completed` events

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
Modals with shared close behavior:
- `#checkout-modal` - Shopping cart checkout
- `#quickview-modal` - Product detail view
- `#product-lightbox` - Image gallery with navigation
- Close via `.close-modal` buttons (event delegation in theme.js)
- Functions: `openCheckout()`, `closeCheckout()`, `openQuickView()`, `closeQuickView()`
- Lightbox supports keyboard (arrows/Escape) and mousewheel navigation

### Cross-Page Cart Navigation
Blog pages redirect to index with cart open:
1. Set `localStorage.setItem('openCart', '1')`
2. Navigate to `index.html`
3. Index page checks flag in DOMContentLoaded
4. Auto-opens cart modal and clears flag

## File Organization

```
/
├── index.html                    # Main page with inline shop logic
├── blog-post-*.html             # Blog pages
├── project-*.html               # Project detail pages
├── partials/header.html         # Shared nav component
├── js/
│   ├── header.js               # Loads header partial
│   └── theme.js                # Theme toggle + cart badge sync
├── netlify/functions/
│   └── create-checkout.js      # Stripe session creation
└── tests/
    └── smoke.spec.js           # Playwright tests
```

## Adding Products

1. Create product in Stripe Dashboard
2. Add entry to `products` array in `index.html` (~line 329):
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

## Testing Notes

Playwright tests use `file:///` protocol - fine for smoke tests but header won't load (expected limitation). For full integration testing, deploy to Netlify preview.
