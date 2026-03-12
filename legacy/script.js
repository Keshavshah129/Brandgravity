document.addEventListener('DOMContentLoaded', () => {

    // --- Intro Loader ---
    Splitting();

    // Disable scroll while intro plays
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        const loader = document.getElementById('intro-loader');
        if (loader) {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 6500); // 6s duration + 0.5s buffer

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Magnetic buttons with lerp
    const magneticItems = document.querySelectorAll('[data-magnetic]');

    magneticItems.forEach(item => {
        let isHovering = false;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        function animate() {
            if (isHovering || Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                // Lerp formula: current = current + (target - current) * friction
                currentX += (targetX - currentX) * 0.15;
                currentY += (targetY - currentY) * 0.15;

                item.style.setProperty('--tx', `${currentX}px`);
                item.style.setProperty('--ty', `${currentY}px`);

                requestAnimationFrame(animate);
            } else {
                item.style.setProperty('--tx', `0px`);
                item.style.setProperty('--ty', `0px`);
            }
        }

        item.addEventListener('mouseenter', () => {
            isHovering = true;
            document.body.classList.add('cursor-hover');
            animate();
        });

        item.addEventListener('mousemove', (e) => {
            const position = item.getBoundingClientRect();
            // Calculate distance from center
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            targetX = x * 0.4; // Magnetic strength
            targetY = y * 0.4;
        });

        item.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;
            document.body.classList.remove('cursor-hover');
        });
    });

    // Hover effects on any link
    const links = document.querySelectorAll('a, button, .work-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Full Screen Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const fullScreenMenu = document.getElementById('full-screen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuCloseBtn = document.getElementById('menu-close-btn');

    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        fullScreenMenu.classList.toggle('open');

        // Prevent body scrolling when menu is open
        if (fullScreenMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            // Ensure navbar doesn't stay frosted/white on light sections
            navbar.style.background = 'transparent';
            navbar.style.color = '#ffffff';
            document.querySelectorAll('.logo').forEach(el => el.style.color = '#ffffff');
            mobileMenuBtn.style.opacity = '0';
            mobileMenuBtn.style.pointerEvents = 'none';
        } else {
            document.body.style.overflow = '';
            mobileMenuBtn.style.opacity = '1';
            mobileMenuBtn.style.pointerEvents = 'auto';
            // Will re-trigger observer on scroll
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (fullScreenMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- Service Card Glow on Mouse Move ---
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-text');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger reveal on load for elements in viewport
    setTimeout(() => {
        const topElements = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-text');
        topElements.forEach(el => el.classList.add('active'));
    }, 100);

    // --- Portfolio Hover Image Reveal ---
    const portfolioRows = document.querySelectorAll('.portfolio-row');
    const hoverImgContainer = document.getElementById('portfolio-hover-img');
    const hoverImg = hoverImgContainer ? hoverImgContainer.querySelector('img') : null;

    if (hoverImgContainer && portfolioRows.length > 0) {
        portfolioRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const imgSrc = row.getAttribute('data-img');
                if (imgSrc) {
                    hoverImg.src = imgSrc;
                    hoverImgContainer.classList.add('active');
                }
            });

            row.addEventListener('mousemove', (e) => {
                // slightly move the image based on mouse position within the row
                const rect = row.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                hoverImgContainer.style.transform = `translate(calc(-50% + ${x * 50}px), calc(-50% + ${y * 50}px)) scale(1)`;
            });

            row.addEventListener('mouseleave', () => {
                hoverImgContainer.classList.remove('active');
                hoverImgContainer.style.transform = `translate(-50%, -50%) scale(0.8)`;
            });
        });
    }

    // --- Section Wipe Effect (Color Transition) ---
    const wipeSections = document.querySelectorAll('.wipe-section');

    const wipeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is light, make the navbar text dark, else keep it light
                if (entry.target.classList.contains('light-section')) {
                    navbar.style.background = 'rgba(247, 247, 247, 0.9)';
                    navbar.style.color = '#050505';
                    document.querySelectorAll('.nav-links a, .logo').forEach(el => el.style.color = '#050505');
                } else {
                    navbar.style.background = 'rgba(5, 5, 5, 0.8)';
                    navbar.style.color = '#ffffff';
                    document.querySelectorAll('.nav-links a, .logo').forEach(el => el.style.color = '#ffffff');
                }
            }
        });
    }, { threshold: 0.3 });

    wipeSections.forEach(section => {
        wipeObserver.observe(section);
    });

    // --- Interactive Water Ripple Background ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let ripples = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 80 + 120; // Size of the ripple
            this.speed = Math.random() * 3 + 2; // Initial speed
            this.opacity = 0.8;
            // Base hue for blue/cyan waves, with slight randomization
            this.hue = Math.random() < 0.5 ? 190 : 210;
        }

        update() {
            // Decelerate speed slightly to create physics-like outward push
            this.speed *= 0.95;
            this.radius += this.speed;
            this.opacity -= 0.015;
        }

        draw() {
            // Draw a radial gradient that looks like a liquid droplet expanding
            const grad = ctx.createRadialGradient(
                this.x, this.y, Math.max(0, this.radius - 20),
                this.x, this.y, this.radius
            );

            grad.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 0)`);
            grad.addColorStop(0.5, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.3})`);
            grad.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    // Create ripple effect on mouse move (throttled slightly)
    let lastTime = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime > 40) { // Throttle creation
            ripples.push(new Ripple(e.clientX, e.clientY));
            lastTime = now;
        }
    });

    // Optional: Add occasional random ripples even without mouse movement
    setInterval(() => {
        if (Math.random() > 0.6 && ripples.length < 10) {
            ripples.push(new Ripple(Math.random() * width, Math.random() * height));
        }
    }, 1500);

    function animateRipples() {
        ctx.clearRect(0, 0, width, height);

        // Draw very subtle base gradient to replace old bg-glow
        const gradient = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, width * 0.6);
        gradient.addColorStop(0, 'rgba(0, 114, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < ripples.length; i++) {
            ripples[i].update();
            ripples[i].draw();

            // Remove dead ripples
            if (ripples[i].opacity <= 0 || ripples[i].radius >= ripples[i].maxRadius) {
                ripples.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animateRipples);
    }

    animateRipples();
});
