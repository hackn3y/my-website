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
            // dispatch event so other scripts can initialize
            window.dispatchEvent(new CustomEvent('header:loaded'));
        } catch (err) {
            console.error('Failed to load header partial:', err);
        }
    }

    // Load header on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
