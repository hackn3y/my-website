# Deployment Checklist 🚀

Use this checklist before deploying your site to production.

## Pre-Deployment

### Content Review
- [ ] All placeholder text replaced with real content
- [ ] Projects section filled out with actual projects
- [ ] Blog posts written (or extra ones removed)
- [ ] All images optimized and uploaded
- [ ] Favicons generated and added
- [ ] Resume PDF updated and working
- [ ] Social media links verified
- [ ] Contact information correct

### SEO & Meta Tags
- [ ] All meta descriptions filled in
- [ ] Open Graph URLs updated with production domain
- [ ] Twitter card URLs updated with production domain
- [ ] Image URLs in meta tags point to production URLs
- [ ] Page titles are descriptive and accurate
- [ ] Keywords relevant and not spammy

### Stripe Configuration
- [ ] All products created in Stripe Dashboard
- [ ] Product IDs match between code and Stripe
- [ ] Prices correct in both code and Stripe
- [ ] Stripe webhook configured for production
- [ ] Success/cancel URLs point to production domain
- [ ] Test a full purchase flow in Stripe test mode
- [ ] Switch to live Stripe keys (keep test keys safe!)

### Netlify Forms (if using)
- [ ] Contact form has `netlify` attribute
- [ ] Form name specified: `name="contact"`
- [ ] Hidden form-name field included
- [ ] Success page (thank-you.html) working
- [ ] Test form submission after deployment

### Functionality Testing
- [ ] Test all navigation links
- [ ] Test smooth scrolling to sections
- [ ] Test theme toggle (dark/light mode)
- [ ] Test cart add/remove functionality
- [ ] Test cart persistence (localStorage)
- [ ] Test modal open/close (cart & quick view)
- [ ] Test product quick view
- [ ] Test checkout flow
- [ ] Test newsletter signup (Mailchimp)
- [ ] Test contact form

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Responsive Testing
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768px width)
- [ ] Mobile (375px width, 414px width)
- [ ] All images display correctly
- [ ] No horizontal scrolling
- [ ] Navigation works on mobile
- [ ] Forms usable on mobile

### Performance
- [ ] Images compressed (use TinyPNG or similar)
- [ ] No console errors
- [ ] Page loads in under 3 seconds
- [ ] Lighthouse score check (aim for 90+ performance)

### Accessibility
- [ ] All images have alt text
- [ ] Form labels present
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient (use WebAIM checker)
- [ ] Screen reader tested (if possible)

## Deployment

### Netlify Deployment
1. [ ] Connect GitHub repo to Netlify
2. [ ] Set build command: (leave empty for static site)
3. [ ] Set publish directory: `/` (root)
4. [ ] Add environment variables:
   - `STRIPE_SECRET_KEY` (from Stripe dashboard)
5. [ ] Enable Netlify Forms
6. [ ] Deploy!

### Post-Deployment
- [ ] Visit production URL and verify site loads
- [ ] Test all functionality in production
- [ ] Test Stripe checkout with real card (small amount)
- [ ] Test contact form submission
- [ ] Check all links work
- [ ] Verify images load correctly
- [ ] Test theme toggle persistence
- [ ] Test cart across page navigation

### Domain Setup
- [ ] Custom domain configured in Netlify
- [ ] DNS records updated
- [ ] HTTPS/SSL certificate active
- [ ] www redirect set up (or vice versa)
- [ ] Update all hardcoded URLs to production domain

### External Services
- [ ] Update Stripe webhook URL to production
- [ ] Test Stripe webhook is receiving events
- [ ] Mailchimp embed form URL correct
- [ ] Google Analytics added (optional)
- [ ] Facebook Pixel added (optional)

### SEO Setup (Optional but Recommended)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify site ownership in search consoles
- [ ] Create robots.txt if needed
- [ ] Set up Google My Business (if applicable)

### Social Media
- [ ] Share on LinkedIn
- [ ] Share on Twitter
- [ ] Share on Instagram
- [ ] Update bio links to new site
- [ ] Post in relevant communities (if appropriate)

### Monitoring & Maintenance
- [ ] Set up uptime monitoring (UptimeRobot - free)
- [ ] Enable Netlify notifications for deploys
- [ ] Check analytics weekly
- [ ] Update blog regularly
- [ ] Respond to contact form messages promptly

## Launch Day! 🎉

After deployment:
1. [ ] Celebrate! 🥳
2. [ ] Monitor for any issues in first 24 hours
3. [ ] Check error logs in Netlify dashboard
4. [ ] Test a real purchase if selling products
5. [ ] Share with friends/family for feedback

## Ongoing Tasks

Weekly:
- [ ] Check for new orders/contact messages
- [ ] Review analytics
- [ ] Update blog if needed

Monthly:
- [ ] Review and update projects
- [ ] Update resume if needed
- [ ] Check for broken links
- [ ] Review product inventory
- [ ] Update meta descriptions if needed

## Troubleshooting

Common issues after deployment:

**Images not loading:**
- Check file paths are relative, not absolute
- Verify images uploaded to repo
- Check file names match exactly (case-sensitive)

**Forms not working:**
- Verify `netlify` attribute present
- Check hidden form-name field
- Ensure field names match between HTML and hidden field

**Stripe not working:**
- Verify using live keys, not test keys
- Check product IDs match Stripe dashboard
- Verify webhook URL updated to production
- Check browser console for errors

**Theme not persisting:**
- Check localStorage enabled in browser
- Verify theme.js is loading correctly
- Clear browser cache and test

---

Good luck with your launch! 🚀
