// ============================================
// PORTFOLIO — Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Mobile menu toggle ----
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Intersection Observer for fade-in animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section headers and content that should fade in
    document.querySelectorAll('.section-header, .about-grid, .timeline-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ---- Typing effect for hero (subtle) ----
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.style.opacity = '0';
        heroName.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroName.style.opacity = '1';
            heroName.style.transform = 'translateY(0)';
        }, 200);
    }

    const heroRoles = document.querySelector('.hero-roles');
    if (heroRoles) {
        heroRoles.style.opacity = '0';
        heroRoles.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroRoles.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroRoles.style.opacity = '1';
            heroRoles.style.transform = 'translateY(0)';
        }, 500);
    }

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        heroDesc.style.opacity = '0';
        heroDesc.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroDesc.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroDesc.style.opacity = '1';
            heroDesc.style.transform = 'translateY(0)';
        }, 800);
    }

    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroButtons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 1100);
    }

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.style.opacity = '0';
        heroStats.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroStats.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 1400);
    }

    // ============================================
    // PARALLAX STARS BACKGROUND
    // ============================================
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let starsLayers = [];
    let scrollY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    }

    function createStars() {
        starsLayers = [
            // Layer 0: Small distant stars (slow parallax)
            {
                speed: 0.05,
                count: Math.floor((canvas.width * canvas.height) / 3000),
                color: 'rgba(200, 210, 255, ',
                minRadius: 0.3,
                maxRadius: 0.8
            },
            // Layer 1: Medium stars (medium parallax)
            {
                speed: 0.12,
                count: Math.floor((canvas.width * canvas.height) / 5000),
                color: 'rgba(150, 170, 255, ',
                minRadius: 0.6,
                maxRadius: 1.3
            },
            // Layer 2: Bright stars (fast parallax)
            {
                speed: 0.22,
                count: Math.floor((canvas.width * canvas.height) / 8000),
                color: 'rgba(100, 140, 255, ',
                minRadius: 1.0,
                maxRadius: 2.0
            }
        ];

        starsLayers.forEach(layer => {
            layer.stars = [];
            for (let i = 0; i < layer.count; i++) {
                layer.stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height * 1.5,
                    radius: Math.random() * (layer.maxRadius - layer.minRadius) + layer.minRadius,
                    opacity: Math.random() * 0.6 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleOffset: Math.random() * Math.PI * 2
                });
            }
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const time = Date.now() * 0.001;

        starsLayers.forEach(layer => {
            const parallaxOffset = scrollY * layer.speed;

            layer.stars.forEach(star => {
                // Calculate parallax position
                let y = star.y - parallaxOffset;

                // Wrap stars vertically
                const totalHeight = canvas.height * 1.5;
                y = ((y % totalHeight) + totalHeight) % totalHeight;

                // Only draw if visible
                if (y > -10 && y < window.innerHeight + 10) {
                    // Twinkling effect
                    const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.3 + 0.7;
                    const alpha = star.opacity * twinkle;

                    ctx.beginPath();
                    ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = layer.color + alpha + ')';
                    ctx.fill();

                    // Glow effect for brighter stars
                    if (star.radius > 1.2) {
                        ctx.beginPath();
                        ctx.arc(star.x, y, star.radius * 3, 0, Math.PI * 2);
                        const gradient = ctx.createRadialGradient(
                            star.x, y, 0,
                            star.x, y, star.radius * 3
                        );
                        gradient.addColorStop(0, layer.color + (alpha * 0.3) + ')');
                        gradient.addColorStop(1, layer.color + '0)');
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                }
            });
        });

        requestAnimationFrame(drawStars);
    }

    // Track scroll position
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });

    resizeCanvas();
    createStars();
    drawStars();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
});
