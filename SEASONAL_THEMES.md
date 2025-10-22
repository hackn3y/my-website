# Seasonal Theme System

The website automatically changes its accent colors based on the current season and holidays throughout the year.

## Theme Schedule

### 🎃 Halloween (October 1-31)
- **Primary:** `#ff6600` (Bright Orange)
- **Secondary:** `#ff8533` (Light Orange)
- **Hover:** `#cc5200` (Dark Orange)

### 🦃 Thanksgiving (November 1-30)
- **Primary:** `#d2691e` (Chocolate/Brown)
- **Secondary:** `#e07a2e` (Light Brown)
- **Hover:** `#a0501e` (Dark Brown)

### 🎄 Christmas/Winter (December 1 - January 6)
- **Primary:** `#c41e3a` (Christmas Red)
- **Secondary:** `#d63e56` (Light Red)
- **Hover:** `#9a182e` (Dark Red)

### 💝 Valentine's Day (February 1-14)
- **Primary:** `#ff1493` (Deep Pink)
- **Secondary:** `#ff69b4` (Hot Pink)
- **Hover:** `#c71585` (Medium Violet Red)

### ☘️ St. Patrick's Day (March 1-17)
- **Primary:** `#228b22` (Forest Green)
- **Secondary:** `#32cd32` (Lime Green)
- **Hover:** `#006400` (Dark Green)

### 🌸 Spring (March 18 - May 31)
- **Primary:** `#ff69b4` (Hot Pink)
- **Secondary:** `#ff85c1` (Light Pink)
- **Hover:** `#ff1493` (Deep Pink)

### ☀️ Summer (June 1 - August 31)
- **Primary:** `#ffa500` (Orange)
- **Secondary:** `#ffb733` (Light Orange)
- **Hover:** `#ff8c00` (Dark Orange)

### 🍂 Fall (September 1-30)
- **Primary:** `#d2691e` (Chocolate/Brown)
- **Secondary:** `#e07a2e` (Light Brown)
- **Hover:** `#a0501e` (Dark Brown)

### 🔥 Default (January 7 - January 31, non-holiday February days)
- **Primary:** `#ff6b35` (Original Orange)
- **Secondary:** `#ff8c42` (Original Light Orange)
- **Hover:** `#ff4500` (Original Dark Orange)

## How It Works

The seasonal theme system is implemented in `js/theme.js`:

1. **Automatic Detection:** The system checks the current date when the page loads
2. **Dynamic Color Application:** CSS custom properties are updated via JavaScript
3. **Seamless Integration:** Works with both dark and light mode
4. **No User Action Required:** Themes change automatically based on calendar

## Technical Implementation

```javascript
function getSeasonalTheme() {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();

  // Returns theme object with primary, secondary, and hover colors
  // Based on current date
}

function applySeasonalColors() {
  const theme = getSeasonalTheme();
  document.documentElement.style.setProperty('--accent-primary', theme.primary);
  document.documentElement.style.setProperty('--accent-secondary', theme.secondary);
  document.documentElement.style.setProperty('--accent-hover', theme.hover);
}
```

## What Changes

The seasonal themes affect:
- Navigation links
- Buttons and CTAs
- Tag badges
- Accent borders
- Hover effects
- Links throughout the site
- Project tags
- Blog card accents

## Testing Different Themes

To test different seasonal themes during development, you can temporarily modify the date check in `js/theme.js`:

```javascript
// For testing: Force a specific month/day
const now = new Date();
now.setMonth(11); // December (0-indexed)
now.setDate(15);  // 15th day
const month = now.getMonth();
const day = now.getDate();
```

## Notes

- The system respects user's dark/light mode preference
- Colors are applied on page load and when toggling between modes
- Current season is stored in localStorage as `current-season`
- The theme automatically updates when the user revisits the site on a different date

## Future Enhancements

Potential additions:
- 🎆 July 4th theme (July 1-4)
- 🎓 Back to School theme (Late August)
- 🎉 New Year's theme (December 31 - January 1)
- Regional holiday support
- User preference to disable seasonal themes
