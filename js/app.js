/**
 * NRASHAD STUDIOS - Main JavaScript
 * GSAP Scroll Animations + Anime.js Effects + Stripe Integration
 */

// ==========================================
// Data & Configuration
// ==========================================

const products = {
    artwork: [
        { id: 'urban-voices', name: 'Urban Voices', price: 450, category: 'Graffiti Art', image: 'graffiti' },
        { id: 'color-theory', name: 'Color Theory', price: 380, category: 'Abstract', image: 'abstract' },
        { id: 'identity-1', name: 'Identity No. 1', price: 520, category: 'Portrait', image: 'portrait' },
        { id: 'florida-dreams', name: 'South Florida Dreams', price: 650, category: 'Painting', image: 'painting' },
        { id: 'street-poetry', name: 'Street Poetry', price: 480, category: 'Graffiti Art', image: 'graffiti' },
        { id: 'chaos-theory', name: 'Chaos Theory', price: 420, category: 'Abstract', image: 'abstract' },
    ],
    prints: [
        { id: 'print-1', name: 'Urban Voices - Limited Print', price: 85, category: 'Limited Edition', image: 'graffiti' },
        { id: 'print-2', name: 'Abstract Dreams Print', price: 65, category: 'Print', image: 'abstract' },
        { id: 'print-3', name: 'Street Life Series', price: 75, category: 'Series', image: 'graffiti' },
        { id: 'print-4', name: 'Color Study No. 5', price: 55, category: 'Print', image: 'abstract' },
    ],
    merch: [
        { id: 'tee-1', name: 'NRashad Studios Tee', price: 35, category: 'Apparel', image: 'merch' },
        { id: 'tee-2', name: 'Art That Declares Tee', price: 35, category: 'Apparel', image: 'merch' },
        { id: 'hoodie-1', name: 'NRD Art Hoodie', price: 65, category: 'Apparel', image: 'merch' },
        { id: 'cap-1', name: 'Studio Snapback', price: 28, category: 'Accessories', image: 'merch' },
    ],
    digital: [
        { id: 'digital-1', name: 'Digital Art Pack Vol. 1', price: 25, category: 'Download', image: 'digital' },
        { id: 'digital-2', name: 'Wallpaper Collection', price: 10, category: 'Download', image: 'digital' },
        { id: 'digital-3', name: 'Tutorial: Graffiti Basics', price: 45, category: 'Course', image: 'digital' },
    ]
};

const eventDetails = {
    'america-trap-house': {
        title: 'America is a Trap House: Solo Exhibition',
        date: 'February 28, 2026',
        time: '10:00 AM - 10:00 PM',
        location: 'THRIVE Art District, 710 NW 5th Ave, Fort Lauderdale, FL 33312',
        price: 'Free Entry',
        description: 'Join us for a powerful solo exhibition exploring themes of identity, culture, and urban reality through bold mixed-media works. This exhibition represents a culmination of years of work and reflection on the American experience.',
        features: ['Original Artworks', 'Live Painting', 'Artist Talk', 'Meet & Greet']
    },
    'paint-sip': {
        title: 'Paint & Sip Sessions',
        schedule: 'Every Friday & Saturday',
        time: '7:00 PM - 9:00 PM',
        location: 'Various Locations in South Florida',
        price: '$45 per person',
        description: 'Unleash your creativity with guided painting sessions led by Rashad. All supplies included, BYOB (21+). No experience necessary!',
        features: ['All Supplies Included', 'Step-by-Step Instruction', 'Take Home Your Artwork', 'BYOB']
    },
    'draw-sip': {
        title: 'Draw & Sip',
        schedule: 'Bi-Weekly Thursdays',
        time: '6:30 PM - 8:30 PM',
        location: 'NRDArtHouse Studio',
        price: '$35 per person',
        description: 'Sketch, draw, and create in a relaxed atmosphere. Perfect for those who prefer pencils and pens over brushes.',
        features: ['Drawing Materials Provided', 'Still Life Setup', 'Figure Drawing Sessions', 'Sketching Techniques']
    },
    'heart-art': {
        title: 'Heart Art Party',
        schedule: 'Monthly Special Events',
        time: 'Varies',
        location: 'Various Venues',
        price: '$55 per person / $100 couples',
        description: 'A celebration of love through art. Perfect for date nights, anniversaries, or just expressing creativity together.',
        features: ['Couples Canvas Options', 'Romantic Themes', 'Champagne Toast', 'Photo Opportunities']
    }
};

// ==========================================
// State Management
// ==========================================

let cart = [];
let currentCategory = 'artwork';

// ==========================================
// DOM Elements
// ==========================================

const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    element: document.querySelector('.cursor')
};

// ==========================================
// Custom Cursor
// ==========================================

function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for dot
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        cursor.dot.style.left = dotX + 'px';
        cursor.dot.style.top = dotY + 'px';

        // Slower follow for outline
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursor.outline.style.left = outlineX + 'px';
        cursor.outline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .event-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.element.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.element.classList.remove('hover'));
    });
}

// ==========================================
// Navigation
// ==========================================

function initNavigation() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile menu toggle
    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ==========================================
// GSAP Animations
// ==========================================

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl
        .to('.hero-tagline', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .to('.title-char', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.title-studios-text', {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

    // Paint blob animation
    gsap.to('.paint-blob', {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            each: 0.5,
            from: 'random'
        }
    });

    // About section animations
    gsap.from('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-content > *', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });

    // Events section
    gsap.from('.events .section-header', {
        scrollTrigger: {
            trigger: '.events',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.event-card', {
        scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Gallery section
    gsap.from('.gallery .section-header', {
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.gallery-filter', {
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: {
            each: 0.1,
            grid: 'auto',
            from: 'start'
        },
        ease: 'back.out(1.5)'
    });

    // Shop section
    gsap.from('.shop .section-header, .shop-categories', {
        scrollTrigger: {
            trigger: '.shop',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Testimonials
    gsap.from('.testimonials .section-header', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Newsletter
    gsap.from('.newsletter-content', {
        scrollTrigger: {
            trigger: '.newsletter',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Contact
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-form-wrapper', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Parallax effects
    gsap.to('.about-float-element.float-1', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        rotation: 360,
        ease: 'none'
    });

    gsap.to('.about-float-element.float-2', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        rotation: -360,
        ease: 'none'
    });
}

// ==========================================
// Anime.js Animations
// ==========================================

function initAnimeAnimations() {
    // Marquee animation enhancement
    anime({
        targets: '.marquee-content',
        translateX: ['0%', '-50%'],
        duration: 30000,
        easing: 'linear',
        loop: true
    });

    // Floating badges animation
    anime({
        targets: '.float-badge',
        translateY: [
            { value: -10, duration: 2000 },
            { value: 10, duration: 2000 }
        ],
        rotate: [
            { value: '+=5', duration: 2000 },
            { value: '-=5', duration: 2000 }
        ],
        delay: anime.stagger(500),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // Scroll line animation
    anime({
        targets: '.scroll-line',
        scaleY: [1, 0.5, 1],
        opacity: [1, 0.3, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
    });

    // Button hover effect with anime.js
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // Gallery item hover
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item.querySelector('.gallery-image'),
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        item.addEventListener('mouseleave', () => {
            anime({
                targets: item.querySelector('.gallery-image'),
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    // Event card tilt effect
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            anime({
                targets: card,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // Graffiti text shake animation
    anime({
        targets: '.graffiti-text',
        skewX: [
            { value: -5, duration: 100 },
            { value: 5, duration: 100 },
            { value: 0, duration: 100 }
        ],
        delay: anime.stagger(2000),
        loop: true,
        easing: 'easeInOutSine'
    });
}

// ==========================================
// Gallery Filter
// ==========================================

function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter items with animation
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    anime({
                        targets: item,
                        opacity: 1,
                        scale: 1,
                        duration: 400,
                        easing: 'easeOutCubic',
                        begin: () => {
                            item.style.display = 'block';
                        }
                    });
                } else {
                    anime({
                        targets: item,
                        opacity: 0,
                        scale: 0.8,
                        duration: 400,
                        easing: 'easeOutCubic',
                        complete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// ==========================================
// Shop Functionality
// ==========================================

function initShop() {
    renderShopProducts();
    initShopCategories();
}

function renderShopProducts() {
    const shopGrid = document.getElementById('shop-grid');
    const items = products[currentCategory];

    shopGrid.innerHTML = items.map(item => `
        <div class="gallery-item shop-item" data-id="${item.id}">
            <div class="gallery-image">
                <div class="image-placeholder ${item.image}-piece">
                    <span class="piece-title">${item.name.split(' ').slice(0, 2).join(' ')}</span>
                </div>
                <div class="gallery-overlay">
                    <button class="gallery-btn" onclick="addToCart('${item.id}')">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
            </div>
            <div class="gallery-info">
                <h4>${item.name}</h4>
                <span class="gallery-category">${item.category}</span>
                <span class="gallery-price">$${item.price}</span>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide icons
    lucide.createIcons();
}

function initShopCategories() {
    const categories = document.querySelectorAll('.shop-category');
    
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            
            currentCategory = cat.dataset.category;
            
            // Animate transition
            anime({
                targets: '#shop-grid',
                opacity: [1, 0],
                duration: 200,
                easing: 'easeOutQuad',
                complete: () => {
                    renderShopProducts();
                    anime({
                        targets: '#shop-grid .shop-item',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(50),
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    });
}

// ==========================================
// Cart Functionality
// ==========================================

function addToCart(productId) {
    // Find product in all categories
    let product = null;
    for (const category in products) {
        product = products[category].find(p => p.id === productId);
        if (product) break;
    }

    if (!product) return;

    // Check if already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast('Added to cart!', 'success');

    // Animate cart button
    const cartFloat = document.getElementById('cart-float');
    anime({
        targets: cartFloat,
        scale: [1, 1.3, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .5)'
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <p style="font-size: 0.875rem; color: var(--color-gray-light);">Add some art!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: linear-gradient(135deg, #333, #444);"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                </button>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total}`;

    // Re-initialize Lucide icons
    lucide.createIcons();
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.querySelector('.cart-overlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.querySelector('.cart-overlay').classList.remove('active');
}

// ==========================================
// Stripe Checkout
// ==========================================

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    // Show coming soon message
    showToast('Stripe checkout integration ready! Connect your Stripe account to enable payments.', 'success');
    
    // In production, you would:
    // 1. Create a checkout session on your server
    // 2. Redirect to Stripe Checkout
    // Example:
    /*
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
    })
    .then(res => res.json())
    .then(session => {
        const stripe = Stripe('your-publishable-key');
        stripe.redirectToCheckout({ sessionId: session.id });
    });
    */
}

// ==========================================
// Testimonials Slider
// ==========================================

function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let current = 0;

    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    prevBtn?.addEventListener('click', () => {
        current = (current - 1 + cards.length) % cards.length;
        showSlide(current);
    });

    nextBtn?.addEventListener('click', () => {
        current = (current + 1) % cards.length;
        showSlide(current);
    });

    // Auto-advance
    setInterval(() => {
        current = (current + 1) % cards.length;
        showSlide(current);
    }, 5000);
}

// ==========================================
// Modal Functions
// ==========================================

function openEventModal(eventId) {
    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('event-modal-body');
    const event = eventDetails[eventId];

    if (!event) return;

    modalBody.innerHTML = `
        <div class="modal-event">
            <h2>${event.title}</h2>
            <div class="modal-meta">
                <p><i data-lucide="calendar"></i> ${event.date || event.schedule}</p>
                <p><i data-lucide="clock"></i> ${event.time}</p>
                <p><i data-lucide="map-pin"></i> ${event.location}</p>
                <p><i data-lucide="tag"></i> ${event.price}</p>
            </div>
            <p class="modal-description">${event.description}</p>
            <div class="modal-features">
                <h4>What's Included:</h4>
                <ul>
                    ${event.features.map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
                </ul>
            </div>
            <form class="modal-form" onsubmit="handleEventRSVP(event, '${eventId}')">
                <h4>RSVP Now</h4>
                <div class="form-row">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <input type="tel" name="phone" placeholder="Phone Number">
                <input type="number" name="guests" placeholder="Number of Guests" min="1" value="1">
                <button type="submit" class="btn btn-primary btn-full">Complete RSVP</button>
            </form>
        </div>
    `;

    modal.classList.add('active');
    document.querySelector('.modal-overlay').classList.add('active');
    lucide.createIcons();
}

function openArtworkModal(artworkId) {
    // Find artwork
    let artwork = null;
    for (const category in products) {
        artwork = products[category].find(p => p.id === artworkId);
        if (artwork) break;
    }

    if (!artwork) return;

    const modal = document.getElementById('artwork-modal');
    const modalBody = document.getElementById('artwork-modal-body');

    modalBody.innerHTML = `
        <div class="modal-artwork">
            <div class="artwork-image">
                <div class="image-placeholder ${artwork.image}-piece" style="height: 400px;">
                    <span class="piece-title" style="font-size: 2.5rem;">${artwork.name}</span>
                </div>
            </div>
            <div class="artwork-details">
                <h2>${artwork.name}</h2>
                <span class="artwork-category">${artwork.category}</span>
                <span class="artwork-price">$${artwork.price}</span>
                <p class="artwork-description">
                    Original artwork by Nkchruma Rashad Dardy. Each piece is unique and carries 
                    the energy and story of its creation. Perfect for collectors and art enthusiasts.
                </p>
                <div class="artwork-specs">
                    <div class="spec">
                        <span class="spec-label">Medium</span>
                        <span class="spec-value">Mixed Media on Canvas</span>
                    </div>
                    <div class="spec">
                        <span class="spec-label">Dimensions</span>
                        <span class="spec-value">24" x 36"</span>
                    </div>
                    <div class="spec">
                        <span class="spec-label">Year</span>
                        <span class="spec-value">2025</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="addToCart('${artwork.id}'); closeModal('artwork-modal');">
                    Add to Cart - $${artwork.price}
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.querySelector('.modal-overlay').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.querySelector('.modal-overlay').classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.querySelector('.modal-overlay').classList.remove('active');
    closeCart();
}

function handleEventRSVP(e, eventId) {
    e.preventDefault();
    showToast('RSVP received! Check your email for confirmation.', 'success');
    closeModal('event-modal');
}

// ==========================================
// Form Handling
// ==========================================

function initForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newsletterForm);
        
        // Show success message
        showToast('Welcome to the creative community! Check your email for a special discount.', 'success');
        newsletterForm.reset();

        // In production, send to your email service (Mailchimp, ConvertKit, etc.)
        // Example:
        /*
        fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: formData.get('firstName'),
                email: formData.get('email')
            })
        });
        */
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// ==========================================
// Toast Notifications
// ==========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();

    // Remove after animation
    setTimeout(() => {
        toast.remove();
    }, 3300);
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Initialize Everything
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all components
    initCursor();
    initNavigation();
    initGSAPAnimations();
    initAnimeAnimations();
    initGalleryFilter();
    initShop();
    initTestimonials();
    initForms();
    initSmoothScroll();

    // Add CSS for modal elements
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-event h2 {
            font-family: var(--font-display);
            font-size: 1.75rem;
            margin-bottom: 1rem;
        }
        .modal-meta {
            margin-bottom: 1rem;
        }
        .modal-meta p {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: var(--color-gray-light);
            font-size: 0.9375rem;
        }
        .modal-meta i {
            width: 16px;
            height: 16px;
            color: var(--color-primary);
        }
        .modal-description {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .modal-features {
            margin-bottom: 1.5rem;
        }
        .modal-features h4 {
            font-family: var(--font-display);
            margin-bottom: 0.5rem;
        }
        .modal-features ul {
            list-style: none;
        }
        .modal-features li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
            color: var(--color-gray-light);
        }
        .modal-features i {
            width: 14px;
            height: 14px;
            color: #00CC99;
        }
        .modal-form {
            background: var(--color-gray-dark);
            padding: 1.5rem;
            border-radius: var(--radius-md);
        }
        .modal-form h4 {
            font-family: var(--font-display);
            margin-bottom: 1rem;
        }
        .modal-form input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 0.75rem;
            background: var(--color-gray);
            border: 1px solid transparent;
            border-radius: var(--radius-md);
            color: var(--color-white);
        }
        .modal-form input:focus {
            outline: none;
            border-color: var(--color-primary);
        }
        .modal-artwork {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .artwork-details h2 {
            font-family: var(--font-display);
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
        }
        .artwork-category {
            display: block;
            color: var(--color-gray-light);
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }
        .artwork-price {
            display: block;
            font-family: var(--font-display);
            font-size: 2rem;
            color: var(--color-accent);
            margin-bottom: 1rem;
        }
        .artwork-description {
            color: var(--color-gray-light);
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .artwork-specs {
            background: var(--color-gray-dark);
            padding: 1rem;
            border-radius: var(--radius-md);
            margin-bottom: 1.5rem;
        }
        .spec {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--color-gray);
        }
        .spec:last-child {
            border-bottom: none;
        }
        .spec-label {
            color: var(--color-gray-light);
            font-size: 0.875rem;
        }
        .spec-value {
            font-weight: 500;
        }
        .cart-empty {
            text-align: center;
            padding: 3rem 1rem;
        }
        @media (max-width: 768px) {
            .modal-artwork {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(modalStyles);
});

// ==========================================
// Utility Functions
// ==========================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
