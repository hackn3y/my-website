(function () {
  // Initialize theme + header-related bindings. Guarded to run once.
  function initTheme() {
    if (initTheme._inited) return;
    initTheme._inited = true;

    // Seasonal/Holiday theme detection
    function getSeasonalTheme() {
      const now = new Date();
      const month = now.getMonth(); // 0-11
      const day = now.getDate();

      // Halloween (October 1-31)
      if (month === 9) {
        return {
          name: 'halloween',
          primary: '#ff6600',
          secondary: '#ff8533',
          hover: '#cc5200'
        };
      }

      // Thanksgiving (November 1 - Last Thursday of November)
      if (month === 10) {
        return {
          name: 'thanksgiving',
          primary: '#d2691e',
          secondary: '#e07a2e',
          hover: '#a0501e'
        };
      }

      // Christmas/Winter (December 1 - January 6)
      if (month === 11 || (month === 0 && day <= 6)) {
        return {
          name: 'christmas',
          primary: '#c41e3a',
          secondary: '#d63e56',
          hover: '#9a182e'
        };
      }

      // Valentine's Day (February 1-14)
      if (month === 1 && day <= 14) {
        return {
          name: 'valentines',
          primary: '#ff1493',
          secondary: '#ff69b4',
          hover: '#c71585'
        };
      }

      // St. Patrick's Day (March 1-17)
      if (month === 2 && day <= 17) {
        return {
          name: 'stpatricks',
          primary: '#228b22',
          secondary: '#32cd32',
          hover: '#006400'
        };
      }

      // Spring (March 18 - May 31)
      if ((month === 2 && day >= 18) || month === 3 || month === 4) {
        return {
          name: 'spring',
          primary: '#ff69b4',
          secondary: '#ff85c1',
          hover: '#ff1493'
        };
      }

      // Summer (June 1 - August 31)
      if (month >= 5 && month <= 7) {
        return {
          name: 'summer',
          primary: '#ffa500',
          secondary: '#ffb733',
          hover: '#ff8c00'
        };
      }

      // Fall (September 1-30)
      if (month === 8) {
        return {
          name: 'fall',
          primary: '#d2691e',
          secondary: '#e07a2e',
          hover: '#a0501e'
        };
      }

      // Default theme (January 7 - February 28 non-valentines)
      return {
        name: 'default',
        primary: '#ff6b35',
        secondary: '#ff8c42',
        hover: '#ff4500'
      };
    }

    function applySeasonalColors() {
      const theme = getSeasonalTheme();
      const root = document.documentElement;

      root.style.setProperty('--accent-primary', theme.primary);
      root.style.setProperty('--accent-secondary', theme.secondary);
      root.style.setProperty('--accent-hover', theme.hover);

      // Store theme name for potential future use
      try {
        localStorage.setItem('current-season', theme.name);
      } catch (e) {}
    }

    function setThemeState(isLight) {
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');
      const themeBtn = document.getElementById('theme-toggle');

      if (isLight) {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light Mode';
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
      } else {
        body.classList.remove('light-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark Mode';
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'false');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      }

      // Apply seasonal colors
      applySeasonalColors();
    }

    window.toggleTheme = function () {
      const body = document.body;
      const isLight = body.classList.contains('light-mode');
      setThemeState(!isLight);
    };

    // Apply persisted theme if present
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setThemeState(true);
      } else {
        // Apply seasonal colors even if staying in dark mode
        applySeasonalColors();
      }
    } catch (e) { /* ignore */ }

    // Delegated listeners for common UI controls (theme toggle, cart, modals)
    document.body.addEventListener('click', function (e) {
      const t = e.target.closest('#theme-toggle');
      if (t) {
        toggleTheme();
      }
      const cart = e.target.closest('#cart-link');
      if (cart) {
        // On index page, openCheckout() exists; on blog pages we redirect
        try {
          if (typeof openCheckout === 'function') {
            openCheckout();
          } else {
            try { localStorage.setItem('openCart', '1'); } catch (err) {}
            window.location.href = 'index.html';
          }
        } catch (err) { /* ignore */ }
      }
    });

    // Modal close buttons (delegated)
    document.body.addEventListener('click', function (e) {
      const close = e.target.closest('.close-modal');
      if (close) {
        try {
          if (typeof closeCheckout === 'function') closeCheckout();
          if (typeof closeQuickView === 'function') closeQuickView();
        } catch (err) { /* ignore */ }
      }
    });

    // Quickview Add to Cart button
    document.body.addEventListener('click', function (e) {
      const add = e.target.closest('[data-buy-quickview]');
      if (add) {
        try {
          if (typeof addToCartFromQuickView === 'function') addToCartFromQuickView();
        } catch (err) { /* ignore */ }
      }
    });

    // Clear cart button in checkout modal
    document.body.addEventListener('click', function (e) {
      const clearBtn = e.target.closest('#clear-cart');
      if (clearBtn) {
        try { if (typeof clearCart === 'function') clearCart(); } catch (err) {}
      }
    });

    // Cart badge sync: read cart from localStorage and update the visible badge and SR text
    function syncCartBadgeFromStorage() {
      try {
        const raw = localStorage.getItem('cart');
        let count = 0;
        if (raw) {
          const ids = JSON.parse(raw);
          if (Array.isArray(ids)) count = ids.length;
        }

        const badge = document.getElementById('cart-count');
        const sr = document.getElementById('cart-count-sr');
        if (badge) {
          badge.textContent = count;
          badge.style.display = count > 0 ? 'inline-flex' : 'none';
        }
        if (sr) {
          const itemText = count === 1 ? '1 item' : `${count} items`;
          sr.textContent = `${itemText} in cart`;
        }
      } catch (e) { /* ignore */ }
    }

    // Initialize badge state
    syncCartBadgeFromStorage();

    // Keyboard navigation detection: add `user-is-tabbing` to <html> when Tab is used
    (function () {
      function handleFirstTab(e) {
        if (e.key === 'Tab') {
          document.documentElement.classList.add('user-is-tabbing');
          window.removeEventListener('keydown', handleFirstTab);
          window.addEventListener('pointerdown', handlePointerDown, { once: true });
        }
      }

      function handlePointerDown() {
        document.documentElement.classList.remove('user-is-tabbing');
        // re-enable listening for Tab
        window.addEventListener('keydown', handleFirstTab);
      }

      window.addEventListener('keydown', handleFirstTab);
    })();
  }

  // Run initTheme when header is injected or if header already exists on load
  window.addEventListener('header:loaded', initTheme);
  
  // Also try to initialize immediately and on DOM ready
  function tryInitTheme() {
    if (document.getElementById('theme-toggle') || document.querySelector('nav')) {
      initTheme();
      return true;
    }
    return false;
  }
  
  // Try multiple times to ensure theme toggle is available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!tryInitTheme()) {
        // Retry after a short delay if not found immediately
        setTimeout(() => {
          if (!tryInitTheme()) {
            console.log('Theme toggle not found, will retry when header loads');
          }
        }, 1000);
      }
    });
  } else {
    if (!tryInitTheme()) {
      // Retry after a short delay
      setTimeout(tryInitTheme, 500);
    }
  }
})();
