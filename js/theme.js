(function () {
  // Initialize theme + header-related bindings. Guarded to run once.
  function initTheme() {
    if (initTheme._inited) return;
    initTheme._inited = true;

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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.getElementById('theme-toggle') || document.querySelector('nav')) initTheme();
    });
  } else {
    if (document.getElementById('theme-toggle') || document.querySelector('nav')) initTheme();
  }
})();
