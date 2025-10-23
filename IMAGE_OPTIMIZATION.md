# Image Optimization Guide for Mobile Performance

## Current Issues

The mobile Lighthouse score is being heavily impacted by large, unoptimized images:

### Critical Images to Optimize (Above-the-fold)
- **profile.jpg** - 6.7MB (CRITICAL - shown immediately on page load)
- **shepherd.jpg** - 8.3MB
- **pyrenees.jpg** - 2.6MB

### High Priority Images (Below-the-fold but large)
- **layens.jpg** - 1.4MB
- **chickens.jpg** - 1.1MB
- **goat4.jpg** - 967KB
- **goat1.jpg** - 767KB
- **goat3.jpg** - 643KB
- **quadcopter.jpg** - 582KB

## Recommended Solutions

### 1. Convert to WebP Format

WebP provides 25-35% better compression than JPEG. Use online tools or ImageMagick:

```bash
# Using ImageMagick (if installed)
magick profile.jpg -quality 80 -resize 800x800 profile.webp

# Using online tools
# - https://squoosh.app/ (Google's image optimizer)
# - https://tinypng.com/
# - https://imagecompressor.com/
```

### 2. Create Responsive Image Sizes

For each critical image, create multiple sizes:
- Small: 400px width (for mobile)
- Medium: 800px width (for tablet)
- Large: 1200px width (for desktop)

### 3. Target File Sizes

| Image Type | Target Size | Current Avg | Reduction Needed |
|-----------|-------------|-------------|------------------|
| Hero/Profile | < 100KB | 6.7MB | 98.5% |
| Product Photos | < 150KB | 400-450KB | 65% |
| Gallery Images | < 200KB | 600KB-2.6MB | 70-92% |

### 4. Use Modern `<picture>` Element

Update index.html to use responsive images:

```html
<picture>
  <source srcset="profile.webp" type="image/webp">
  <source srcset="profile-800.jpg" media="(max-width: 768px)">
  <img src="profile.jpg" alt="Ryan Hackney" width="400" height="400"
       fetchpriority="high" decoding="async">
</picture>
```

## Quick Win - Compress profile.jpg

**IMMEDIATE ACTION**: profile.jpg needs to be reduced from 6.7MB to under 150KB.

Steps using Squoosh (no installation needed):
1. Go to https://squoosh.app/
2. Upload profile.jpg
3. Choose WebP format
4. Set quality to 75-80
5. Resize to 800x800px (it's displayed at ~400px anyway)
6. Download and replace

Expected result: 6.7MB → ~80KB = **98.8% reduction**

## Tools to Use

### Online (No Installation)
- **Squoosh** - https://squoosh.app/ (Best for manual optimization)
- **TinyPNG** - https://tinypng.com/ (Batch compression)
- **Compressor.io** - https://compressor.io/

### Command Line (If Available)
```bash
# ImageMagick
magick input.jpg -quality 80 -resize 800x800 output.webp

# cwebp (WebP encoder)
cwebp -q 80 input.jpg -o output.webp -resize 800 800

# mozjpeg (Better JPEG compression)
cjpeg -quality 85 -progressive input.jpg > output.jpg
```

### Batch Processing Script (PowerShell)

```powershell
# Example batch conversion using ImageMagick
$images = Get-ChildItem *.jpg
foreach ($img in $images) {
    $name = $img.BaseName
    magick $img.Name -quality 80 -resize 800x800 "$name-optimized.webp"
}
```

## Implementation Checklist

- [ ] Compress profile.jpg to WebP (CRITICAL)
- [ ] Compress all product images (candle, soap, honey)
- [ ] Compress blog images
- [ ] Create responsive sizes for hero images
- [ ] Update HTML to use `<picture>` elements
- [ ] Test on mobile device
- [ ] Run Lighthouse again to verify improvements

## Expected Performance Gains

After optimization:
- **Page Load Time**: -60% (from ~8s to ~3s on 3G)
- **Lighthouse Mobile Score**: +30-40 points (from 60 to 90-100)
- **Total Page Weight**: -15MB (from ~18MB to ~3MB)
- **First Contentful Paint**: -2s
- **Largest Contentful Paint**: -3s

## Already Implemented

✅ Extracted inline JavaScript to external file (saved ~20KB initial HTML)
✅ Added `loading="lazy"` to below-the-fold images
✅ Added `fetchpriority="high"` to profile.jpg
✅ Added `width` and `height` attributes to prevent layout shift
✅ Added `content-visibility: auto` for rendering performance
✅ Added preload hint for critical profile image
✅ Using system fonts (no font downloads)
✅ Scripts properly deferred

## Next Steps

The biggest impact will come from compressing the images, especially profile.jpg. This single change could improve your mobile score by 20-25 points immediately.
