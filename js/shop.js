// Shop and Cart Management
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SFT2r4298bLnbuDbmaU4GzHAKPcs6gv6wwK0vh7xxjfpvapSzDgpn4tw7Fs9M0UhIv0gaBKOWInlhnswNmcb4xc00WNYF26Ld';
let stripe; // Initialize later when Stripe library is loaded

const products = [
    {
        id: 'prod_1',
        name: 'Soy Candles',
        price: 25.00,
        description: 'Hand-poured soy candle with scents from Black Tie Barn, 304g',
        image: 'candle.jpg',
        images: ['candle.jpg', 'candle2.jpg']
    },
    {
        id: 'prod_2',
        name: 'Pure Raw Local Honey - 1.5lb',
        price: 15.00,
        description: 'Pure raw local honey in a pint mason jar, 1.5lb',
        image: 'honeysmall.jpg'
    },
    {
        id: 'prod_3',
        name: 'Pure Raw Local Honey - 3lb',
        price: 25.00,
        description: 'Pure raw local honey in a quart mason jar, 3lb',
        image: 'honeybig.jpg'
    },
    {
        id: 'prod_4',
        name: 'Handmade Soap',
        price: 7.00,
        description: 'Handmade with beef tallow, coconut, olive, avocado, castor oils and scents from Black Tie Barn',
        image: 'soap.jpg',
        images: ['soap.jpg', 'soap2.jpg', 'soap3.jpg', 'soap4.jpg', 'soap5.jpg']
    }
];

let cart = [];

// Global modal management to prevent conflicts
function closeAllModals() {
    const modals = document.querySelectorAll('.modal, .lightbox');
    modals.forEach(modal => {
        modal.classList.remove('active', 'open');
        modal.style.display = 'none';
    });
    document.body.style.overflow = '';
}

// Ensure only one modal is open at a time
function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => {
        const hasGallery = product.images && product.images.length > 1;
        const galleryBadge = hasGallery ? `<span class="gallery-badge">📷 ${product.images.length} photos</span>` : '';
        const galleryButton = hasGallery ? `<button class="buy-now" data-view-gallery="${product.id}" style="background: #6c757d;">View Gallery</button>` : '';

        return `
        <div class="product-card" data-product-id="${product.id}" tabindex="0" role="button">
            ${galleryBadge}
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
                    ${galleryButton}
                    <button class="buy-now" data-add-to-cart="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

function addToCartById(btn, productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push(product);
    updateCartCount();
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 900);
    }
    // persist cart to localStorage
    try { localStorage.setItem('cart', JSON.stringify(cart.map(i => i.id))); } catch (e) { /* ignore */ }
}

function addToCart(productId, btn) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push(product);
    updateCartCount();

    // persist cart to localStorage
    try { localStorage.setItem('cart', JSON.stringify(cart.map(i => i.id))); } catch (e) { /* ignore */ }

    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1000);
    }
}

function updateCartCount() {
    // visible badge (id="cart-count") and SR-only count (id="cart-count-sr")
    const badge = document.getElementById('cart-count');
    const sr = document.getElementById('cart-count-sr');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'inline-flex' : 'none';
    }
    if (sr) {
        // announce friendly text for screen readers
        const itemText = cart.length === 1 ? '1 item' : `${cart.length} items`;
        sr.textContent = `${itemText} in cart`;
    }
}

function openCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    const cartItems = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');

    document.getElementById('total-amount').textContent = total.toFixed(2);
    modal.classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function clearCart() {
    cart = [];
    try { localStorage.removeItem('cart'); } catch (e) { /* ignore */ }
    updateCartCount();
    const cartItems = document.getElementById('cart-items');
    if (cartItems) cartItems.innerHTML = '';
    document.getElementById('total-amount').textContent = '0.00';
    closeCheckout();
}

let currentQuickViewProduct = null;

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    currentQuickViewProduct = product;

    document.getElementById('quickview-title').textContent = product.name;
    document.getElementById('quickview-image').src = product.image;
    document.getElementById('quickview-description').textContent = product.description;
    document.getElementById('quickview-price').textContent = `$${product.price.toFixed(2)}`;

    openModal('quickview-modal');
}

function closeQuickView() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
        modal.classList.remove('active');
        // Clear any active states
        modal.style.display = 'none';
        // Ensure no other modals are interfering
        document.body.style.overflow = '';
    }
}

function addToCartFromQuickView() {
    if (currentQuickViewProduct) {
        cart.push(currentQuickViewProduct);
        updateCartCount();

        // persist cart to localStorage
        try { localStorage.setItem('cart', JSON.stringify(cart.map(i => i.id))); } catch (e) { /* ignore */ }

        closeQuickView();
        alert(`${currentQuickViewProduct.name} added to cart!`);
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stripe
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    }

    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    }

    // If a blog page requested the cart to open, handle it and clear the flag
    try {
        if (localStorage.getItem('openCart') === '1') {
            localStorage.removeItem('openCart');
            // small timeout to allow DOM to settle
            setTimeout(() => {
                openCheckout();
            }, 200);
        }
    } catch (e) { /* ignore */ }

    loadProducts();

    // ensure cart badge is initialized
    updateCartCount();

    // load persisted cart from localStorage (ids) and rebuild cart array
    try {
        const raw = localStorage.getItem('cart');
        if (raw) {
            const ids = JSON.parse(raw);
            if (Array.isArray(ids)) {
                cart = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
                updateCartCount();
            }
        }
    } catch (e) { /* ignore */ }

    // Project Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(filter) {
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');

            if (filter === 'all') {
                // Show all projects
                card.classList.remove('hidden');
            } else if (filter === 'featured') {
                // Show only featured projects
                if (categories && categories.includes('featured')) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            } else {
                // Show projects matching the selected category
                if (categories && categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            filterProjects(filter);
        });
    });

    // Apply default filter on page load (featured)
    filterProjects('featured');

    // Product Gallery Lightbox setup - must be before event delegation
    const lightbox = document.getElementById('product-lightbox');
    const lightboxImage = document.getElementById('lightbox-main-image');
    const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
    const lightboxCloseBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    let currentGalleryImages = [];
    let currentImageIndex = 0;
    let lightboxLastFocused = null;

    function openLightbox(productId, startIndex = 0) {
        const product = products.find(p => p.id === productId);
        if (!product || !product.images) return;

        currentGalleryImages = product.images;
        currentImageIndex = startIndex;
        lightboxLastFocused = document.activeElement;

        updateLightboxImage();
        updateThumbnails();

        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxCloseBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lightboxLastFocused) lightboxLastFocused.focus();
    }

    function updateLightboxImage() {
        if (currentGalleryImages.length === 0) return;
        lightboxImage.src = currentGalleryImages[currentImageIndex];
        lightboxImage.alt = `Image ${currentImageIndex + 1} of ${currentGalleryImages.length}`;

        // Update active thumbnail
        document.querySelectorAll('.lightbox-thumb').forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentImageIndex);
        });

        // Hide/show nav buttons if only one image
        if (currentGalleryImages.length <= 1) {
            if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
            if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
        } else {
            if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'flex';
            if (lightboxNextBtn) lightboxNextBtn.style.display = 'flex';
        }
    }

    function updateThumbnails() {
        lightboxThumbnails.innerHTML = currentGalleryImages.map((img, idx) =>
            `<img src="${img}" class="lightbox-thumb ${idx === currentImageIndex ? 'active' : ''}"
                  data-index="${idx}" alt="Thumbnail ${idx + 1}" loading="lazy">`
        ).join('');

        // Add click handlers to thumbnails
        lightboxThumbnails.querySelectorAll('.lightbox-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                currentImageIndex = parseInt(thumb.getAttribute('data-index'));
                updateLightboxImage();
            });
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateLightboxImage();
    }

    // Lightbox event listeners
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevImage);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextImage);

    // Close on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // Mousewheel navigation for lightbox
    if (lightbox) {
        lightbox.addEventListener('wheel', (e) => {
            if (!lightbox.classList.contains('open')) return;
            e.preventDefault();

            if (e.deltaY > 0) {
                // Scrolling down = next image
                nextImage();
            } else if (e.deltaY < 0) {
                // Scrolling up = previous image
                prevImage();
            }
        }, { passive: false });
    }

    // Event delegation for product grid (replace inline handlers)
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.addEventListener('click', (e) => {
            // Check for View Gallery button first
            const galleryBtn = e.target.closest('[data-view-gallery]');
            if (galleryBtn) {
                e.stopPropagation();
                const productId = galleryBtn.getAttribute('data-view-gallery');
                openLightbox(productId, 0);
                return;
            }

            const addBtn = e.target.closest('[data-add-to-cart]');
            if (addBtn) {
                e.stopPropagation();
                const id = addBtn.getAttribute('data-add-to-cart');
                addToCartById(addBtn, id);
                return;
            }

            const card = e.target.closest('.product-card');
            if (card) {
                const id = card.getAttribute('data-product-id');
                openQuickView(id);
            }
        });

        // keyboard activation: Enter/Space on focused card
        productsContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.product-card');
                if (card) {
                    e.preventDefault();
                    const id = card.getAttribute('data-product-id');
                    openQuickView(id);
                }
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.id === 'cart-link') return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = document.getElementById('submit-payment');
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';

            try {
                const response = await fetch('/.netlify/functions/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: cart })
                });

                const data = await response.json();

                if (response.ok) {
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || 'Failed to create checkout session');
                }
            } catch (err) {
                console.error('Error:', err);
                alert('Failed to start checkout: ' + err.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Proceed to Checkout';
            }
        });
    }

    // Click outside to close modals
    const checkoutModal = document.getElementById('checkout-modal');
    const quickviewModal = document.getElementById('quickview-modal');

    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                closeCheckout();
            }
        });
    }

    if (quickviewModal) {
        quickviewModal.addEventListener('click', (e) => {
            if (e.target === quickviewModal) {
                closeQuickView();
            }
        });
    }
});
