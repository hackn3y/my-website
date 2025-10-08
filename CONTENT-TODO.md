# Content To-Do List

This document outlines the placeholder content that should be replaced with your actual information.

## 🔴 HIGH PRIORITY

### 1. Projects Section (index.html)
**Location:** Line ~990-1030

Currently has placeholder text. Replace with your actual projects:

#### Project 2: "Security Audit Project"
```
Current: "Add your cybersecurity capstone project or a project from your Google cert here..."

Replace with:
- Name of the project
- What you analyzed/secured
- Tools used (Wireshark, Nessus, Metasploit, etc.)
- Key findings or accomplishments
- Link to GitHub repo or documentation (if available)
```

#### Project 3: "Embedded Systems Project"
```
Current: "Add an ECE project from OSU - maybe a senior design project?..."

Replace with:
- Name of your ECE project
- What it does/purpose
- Hardware used (Arduino, Raspberry Pi, custom PCB, etc.)
- Software/languages (C/C++, Python)
- Outcome/demo
- Link to project if available
```

### 2. Update Domain URLs in Meta Tags
**Files:** All HTML files

Replace `https://yourdomain.com/` with your actual domain:
- index.html
- blog-post-1.html
- blog-post-2.html
- blog-post-3.html

Example:
```html
<meta property="og:url" content="https://youractualsite.com/">
```

### 3. Blog Post Content (blog-post-1.html)
**Location:** blog-post-1.html, lines ~180-200

Fill in the actual content for your Camaro build:
- What year/model Camaro?
- Current condition when you got it
- Your vision for the build
- Specific modifications planned
- Add more photos as you progress
- Update dates to actual post dates

## 🟡 MEDIUM PRIORITY

### 4. Blog Posts 2 & 3
**Files:** blog-post-2.html, blog-post-3.html

Options:
- **Fill with real content:** Write actual blog posts about:
  - Tech projects
  - Cybersecurity topics
  - Farm/beekeeping updates
  - BMW build updates
  
- **OR Delete:** If you only need one blog post for now:
  1. Delete blog-post-2.html and blog-post-3.html
  2. Remove any links to them from index.html (currently only blog-post-1 is linked)

### 5. Add More Products (Optional)
**Location:** index.html, JavaScript section ~1100

Currently you have 4 products. If you make more items, add them to the products array:

```javascript
{
    id: 'prod_5',
    name: 'Your Product Name',
    price: 20.00,
    description: 'Product description',
    image: 'product-image.jpg'
}
```

Don't forget to also set up the corresponding Stripe product!

## 🟢 LOW PRIORITY (Nice to Have)

### 6. Add Resume Content
**File:** resume.pdf

Update or replace with your current resume. The download button is in the hero section.

### 7. Social Media Links Update
Currently linked:
- ✅ GitHub: https://github.com/hackn3y
- ✅ LinkedIn: https://www.linkedin.com/in/ryan-hackney-0b9230132/
- ✅ Instagram: https://www.instagram.com/rhackn3y/
- ✅ Twitter: https://x.com/Hackn3y

Verify these are all current/correct.

### 8. Add More Blog Posts
As you work on projects, add more blog posts:
1. Create a new HTML file (blog-post-4.html, etc.)
2. Use blog-post-1.html as a template
3. Add a new card in the blog section of index.html

### 9. Project Links
**Location:** Project cards on index.html

Add actual links to your GitHub repos or live demos:
```html
<a href="https://github.com/yourusername/project" class="project-link">View on GitHub →</a>
```

## 📋 CHECKLIST

Before going live, make sure you've:
- [ ] Filled in Projects 2 & 3 with real content
- [ ] Updated domain URLs in all meta tags
- [ ] Completed blog-post-1.html with Camaro build details
- [ ] Decided what to do with blog-post-2 and blog-post-3
- [ ] Generated and added favicons (see FAVICON-INSTRUCTIONS.md)
- [ ] Updated resume.pdf with current version
- [ ] Verified all social media links work
- [ ] Tested all products in Stripe
- [ ] Tested contact form submission
- [ ] Tested theme toggle on all pages
- [ ] Tested cart functionality
- [ ] Mobile tested all pages
- [ ] Spell-checked all content

## 🚀 DEPLOYMENT NOTES

Remember to:
1. Update environment variables if deploying to Netlify/Vercel
2. Test Stripe webhooks in production
3. Update URLs in Open Graph tags to production domain
4. Set up Google Analytics or other analytics (optional)
5. Submit sitemap to Google Search Console (optional)

---

Need help with any of this? The code is well-commented and organized!
