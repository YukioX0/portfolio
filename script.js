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

    // ---- Particles / floating dots background ----
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        heroSection.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrameId;

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(50, Math.floor(canvas.width * canvas.height / 25000));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(74, 158, 255, ${p.opacity})`;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(74, 158, 255, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animFrameId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }
});
