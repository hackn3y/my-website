// header.js - loads the header partial and injects into the page
(function() {
    async function tryFetch(paths) {
        for (const p of paths) {
            try {
                const resp = await fetch(p);
                if (!resp.ok) continue;
                const html = await resp.text();
                return html;
            } catch (e) {
                // continue to next
            }
        }
        throw new Error('Header partial not found in any known location');
    }

    async function loadHeader() {
        const tryPaths = ['/partials/header.html', './partials/header.html', 'partials/header.html'];
        try {
            const html = await tryFetch(tryPaths);
            const container = document.createElement('div');
            container.innerHTML = html;
            // insert at top of body
            document.body.insertBefore(container, document.body.firstChild);
            
            // Wait a bit for DOM to update
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // dispatch event so other scripts can initialize
            window.dispatchEvent(new CustomEvent('header:loaded'));

            // Initialize hamburger menu
            initHamburgerMenu();
            
            console.log('Header loaded successfully');
        } catch (err) {
            console.error('Failed to load header partial:', err);
            // Create a fallback header if loading fails
            createFallbackHeader();
        }
    }
    
    function createFallbackHeader() {
        const fallbackHeader = document.createElement('nav');
        fallbackHeader.innerHTML = `
            <div class="nav-inner">
                <div class="nav-controls">
                    <button class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Toggle dark mode">
                        <span id="theme-icon">🌙</span>
                        <span id="theme-text" class="sr-only">Dark Mode</span>
                    </button>
                </div>
                <button class="hamburger" id="hamburger-menu" aria-label="Toggle menu" aria-expanded="false">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
                <div class="nav-center" id="nav-menu">
                    <ul>
                        <li><a href="index.html#home">Home</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#skills">Skills</a></li>
                        <li><a href="index.html#projects">Projects</a></li>
                        <li><a href="index.html#blog">Blog</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="index.html#shop">Shop</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="nav-controls">
                    <button id="cart-link" aria-label="Open cart" class="cart-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M6 6H21L20 12H8L6 6Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="10" cy="19" r="1" fill="currentColor"/>
                            <circle cx="18" cy="19" r="1" fill="currentColor"/>
                        </svg>
                        <span class="cart-badge" aria-hidden="true">
                            <span id="cart-count" class="badge" style="display:none;">0</span>
                        </span>
                        <span class="sr-only">Cart (<span id="cart-count-sr" aria-live="polite" aria-atomic="true">0</span>)</span>
                    </button>
                </div>
            </div>
        `;
        document.body.insertBefore(fallbackHeader, document.body.firstChild);
        window.dispatchEvent(new CustomEvent('header:loaded'));
        initHamburgerMenu();
        console.log('Fallback header created');
    }

    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');

                // Update aria-expanded
                const isExpanded = navMenu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            });

            // Close menu when clicking a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    // Load header on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
