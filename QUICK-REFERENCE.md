# Quick Reference Guide

Quick answers to common questions about your site.

## 🔧 Common Edits

### Change Colors
**File:** Any HTML file (CSS section)
**Location:** Look for `:root` near the top
```css
:root {
    --accent-primary: #ff6b35;     /* Change main orange */
    --accent-hover: #ff4500;       /* Change hover orange */
}
```

### Add a Product
**File:** index.html
**Location:** Line ~1100 in JavaScript section
```javascript
const products = [
    // ... existing products
    {
        id: 'prod_5',                    // Must match Stripe
        name: 'New Product',
        price: 25.00,
        description: 'Product description',
        image: 'product.jpg'             // Put image in root folder
    }
];
```

### Update Contact Email
**File:** netlify.toml (if exists) or Netlify dashboard
- Forms submitted go to the email associated with your Netlify account
- Change in: Netlify Dashboard → Forms → Form notifications

### Change Hero Text
**File:** index.html
**Location:** Line ~895
```html
<h1>Hi, I'm Ryan Hackney</h1>
<p>ECE Grad • Cybersecurity • Developer</p>
```

### Update About Section
**File:** index.html
**Location:** Line ~920-960
Replace the paragraphs in the about-content div

### Add Social Media Links
**File:** index.html & partials/header.html
**Location:** Footer section (~1275) and hero section (~905)

## 🎨 Design Tweaks

### Change Font
**File:** Any HTML file
**Location:** Look for `font-family` in CSS
```css
body {
    font-family: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Adjust Section Spacing
**File:** index.html
**Location:** Look for `.container` in CSS
```css
.container {
    padding: 4rem 5%;  /* Change 4rem to adjust spacing */
}
```

### Change Button Style
**File:** index.html
**Location:** Look for `.btn` in CSS (~line 260)
```css
.btn {
    border-radius: 5px;     /* Make more/less rounded */
    padding: 0.8rem 2rem;   /* Make bigger/smaller */
}
```

## 📝 Content Updates

### Add Blog Post
1. Copy blog-post-1.html → blog-post-X.html
2. Update title, meta tags, and content
3. Add to index.html blog section:
```html
<article class="blog-card">
    <a href="blog-post-X.html" class="card-link">
        <img src="your-image.jpg" alt="Description">
        <div class="blog-card-content">
            <h3>Your Title</h3>
            <p class="date">January 16, 2025</p>
            <p>Excerpt...</p>
            <span class="read-more">Read More →</span>
        </div>
    </a>
</article>
```

### Update Resume
1. Replace resume.pdf with your new version
2. Keep the filename as `resume.pdf` (or update link in index.html)

### Change Profile Photo
1. Replace profile.jpg with your photo
2. Keep filename as `profile.jpg` (or update all references)
3. Recommended: Square image, at least 400x400px

## 🛒 E-Commerce

### Stripe Product IDs
**Must match between:**
1. Stripe Dashboard
2. index.html products array (`id` field)
3. netlify/functions/create-checkout.js

### Test a Purchase
1. Use test mode keys
2. Test card: `4242 4242 4242 4242`
3. Any future date, any 3-digit CVC
4. Check Stripe Dashboard → Payments

### Update Prices
**Change in TWO places:**
1. index.html products array
2. Stripe Dashboard (create new price or product)

## 🎯 SEO

### Update Meta Description
**File:** Any HTML file
**Location:** `<head>` section
```html
<meta name="description" content="Your new description here">
```

### Update Page Title
**File:** Any HTML file
**Location:** `<head>` section
```html
<title>Your New Title - Ryan Hackney</title>
```

### Update Open Graph Image
**File:** Any HTML file
**Location:** `<head>` section
```html
<meta property="og:image" content="https://yoursite.com/image.jpg">
```

## ⚙️ Settings

### Disable Dark Mode
**File:** js/theme.js
Comment out the theme toggle functionality (not recommended)

### Change Default Theme
**File:** index.html and blog HTML files
**Location:** CSS section, remove/add `.light-mode` from body:
```css
/* Default to light mode */
body {
    /* Add these variables directly to body instead of :root */
}
```

### Disable Cart Persistence
**File:** js/theme.js and index.html
Remove localStorage.setItem and localStorage.getItem for cart

## 🐛 Debug

### Check Console Errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Google the error or fix based on message

### Theme Not Working
- Check: localStorage enabled in browser
- Check: theme.js is loading (Network tab in DevTools)
- Clear: Browser cache (Ctrl+Shift+Delete)

### Header Not Showing
- Check: Running on local server (not file://)
- Check: partials/header.html exists
- Check: header.js loading (Console tab)

### Cart Not Working
- Check: localStorage enabled
- Check: No JavaScript errors in console
- Check: Products array formatted correctly

## 📱 Mobile Testing

### Test on Real Device
1. Start local server: `python -m http.server 8000`
2. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. On phone, visit: `http://YOUR-IP:8000`

### Chrome DevTools Mobile View
1. F12 to open DevTools
2. Click device icon (Ctrl+Shift+M)
3. Select device or custom dimensions

## 🔑 Environment Variables

### Netlify Environment Variables
Location: Netlify Dashboard → Site settings → Environment variables

Required:
- `STRIPE_SECRET_KEY` - Your Stripe secret key (sk_live_...)

Optional:
- Any other API keys you add

## 📞 Contact

### Email for Forms
Goes to email associated with Netlify account
Change: Netlify Dashboard → Forms → Notifications

### Newsletter Email List
Managed through Mailchimp
Change: Update form action URL in index.html

## 🚀 Deploy

### Quick Deploy to Netlify
```bash
# If using Netlify CLI
netlify deploy --prod
```

Or:
1. Push to GitHub
2. Netlify auto-deploys from main branch

### Force Clear Cache
After deploy, if changes not showing:
1. Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy
2. Or in users' browsers: Ctrl+Shift+R (hard refresh)

---

**Can't find what you need?** Check the other documentation files:
- CONTENT-TODO.md
- DEPLOYMENT-CHECKLIST.md  
- FAVICON-INSTRUCTIONS.md
- README.md
