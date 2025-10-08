# Ryan Hackney - Portfolio & E-Commerce Site

A modern, responsive portfolio and e-commerce website featuring dark/light theme toggle, Stripe payment integration, and a full shopping cart system.

## 🌟 Features

- **Portfolio Sections**: About, Skills, Projects, Blog
- **E-Commerce Shop**: Product catalog with Stripe integration
- **Shopping Cart**: Persistent cart with localStorage
- **Dark/Light Theme**: Toggle with preference persistence
- **Responsive Design**: Mobile-first, works on all devices
- **Contact Form**: Netlify Forms integration
- **Newsletter**: Mailchimp integration
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Accessibility**: Keyboard navigation, screen reader support, focus indicators

## 🚀 Quick Start

### Local Development

The site uses a dynamic header loaded from `partials/header.html`. To develop locally, you need to run a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

> ⚠️ **Important**: Don't open HTML files directly with `file://` - the header won't load!

## 📁 Project Structure

```
├── index.html              # Main homepage
├── blog-post-1.html        # Camaro build blog post
├── blog-post-2.html        # Template blog post
├── blog-post-3.html        # Template blog post
├── thank-you.html          # Contact form success page
├── partials/
│   └── header.html         # Reusable navigation header
├── js/
│   ├── header.js           # Loads header dynamically
│   ├── theme.js            # Theme toggle & cart logic
│   └── app.js              # Additional utilities
├── netlify/
│   └── functions/
│       └── create-checkout.js  # Stripe checkout serverless function
├── images/                 # Your images (profile, products, etc.)
├── resume.pdf             # Your resume
└── Documentation files below
```

## 📝 Documentation Files

- **CONTENT-TODO.md** - List of placeholder content to fill in
- **DEPLOYMENT-CHECKLIST.md** - Complete deployment checklist
- **FAVICON-INSTRUCTIONS.md** - How to create and add favicons

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (CSS Variables), Vanilla JavaScript
- **Payments**: Stripe API
- **Hosting**: Netlify (recommended)
- **Forms**: Netlify Forms
- **Newsletter**: Mailchimp
- **Serverless**: Netlify Functions

## 🎨 Customization

### Color Scheme
The site uses CSS variables for easy theming. Main colors:
- Primary Orange: `#ff6b35`
- Secondary Orange: `#ff8c42`
- Hover Orange: `#ff4500`
- Dark Orange: `#c85a00`

Change these in the `:root` section of each HTML file.

### Adding Products

1. Add product to Stripe Dashboard
2. Add product to `products` array in `index.html` (~line 1100)
3. Match the Stripe product ID
4. Add product image to root directory

### Adding Blog Posts

1. Copy `blog-post-1.html`
2. Rename to `blog-post-X.html`
3. Update content and meta tags
4. Add card to blog section in `index.html`

## ⚙️ Configuration

### Stripe Setup

1. Create products in Stripe Dashboard
2. Get your API keys (test and live)
3. Update `STRIPE_PUBLISHABLE_KEY` in `index.html`
4. Add `STRIPE_SECRET_KEY` to Netlify environment variables
5. Configure webhook for checkout.session.completed

### Netlify Forms

Forms work automatically on Netlify! Just ensure:
- Form has `netlify` attribute
- Form has `name` attribute
- Hidden field with form name is present

### Domain URLs

Replace `https://yourdomain.com/` in all meta tags with your actual domain:
- index.html
- All blog-post-X.html files
- thank-you.html

## 🧪 Testing

### Before Deployment

- [ ] Test all navigation links
- [ ] Test theme toggle on all pages
- [ ] Test cart functionality
- [ ] Test Stripe checkout (test mode)
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Check console for errors

### Stripe Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and CVC

## 🚀 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Connect repo to Netlify
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Add environment variables:
   - `STRIPE_SECRET_KEY`
5. Enable Netlify Forms
6. Deploy!

See **DEPLOYMENT-CHECKLIST.md** for complete steps.

## 🔧 Troubleshooting

**Header not loading:**
- Ensure you're using a local server, not `file://`
- Check `js/header.js` is loading
- Check browser console for errors

**Theme not saving:**
- Check localStorage is enabled
- Clear browser cache
- Check `js/theme.js` is loading

**Cart not persisting:**
- Check localStorage is enabled
- Verify no console errors
- Clear cache and test

**Stripe errors:**
- Verify publishable key is correct
- Check product IDs match Stripe
- Ensure serverless function is deployed
- Check Netlify function logs

## 📞 Support

For issues or questions:
1. Check documentation files in this repo
2. Review browser console for errors
3. Check Netlify deploy logs
4. Verify all API keys are correct

## 📄 License

This is a personal portfolio site. Feel free to use as inspiration, but please don't copy directly.

## 🎯 TODO

See **CONTENT-TODO.md** for a complete list of content to fill in before going live.

---

**Built with ❤️ by Ryan Hackney**
