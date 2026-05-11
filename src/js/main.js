// --- Navigation Scroll Effect ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
    });
}

// --- Counter Animation ---
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (outQuad)
        const ease = progress * (2 - progress);
        const currentCount = Math.floor(ease * target);
        
        el.innerText = currentCount + (target === 100 || target === 6 ? '+' : '');
        if (target === 24) el.innerText = '24/7'; // Special case

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerText = target + (target === 100 || target === 6 ? '+' : '');
            if (target === 24) el.innerText = '24/7';
        }
    }

    requestAnimationFrame(update);
}

// --- Intersection Observer for Animations ---
const hero = document.getElementById('hero');
const reveals = document.querySelectorAll('.reveal');
const staggerContainers = document.querySelectorAll('.services-grid');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counters if this is the stats section
            if (entry.target.classList.contains('stats-section')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => animateCounter(counter));
            }

            // Handle staggered children if it's a container
            const staggers = entry.target.querySelectorAll('.reveal-stagger');
            staggers.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, { threshold: 0.15 });

if (hero) revealObserver.observe(hero);
reveals.forEach(reveal => revealObserver.observe(reveal));

// --- Parallax Effect ---
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && window.innerWidth > 1024) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
    if (heroVisual && window.innerWidth > 1024) {
        heroVisual.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
});

// --- Subtle Particle Effect (Stars) ---
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 15 + Math.random() * 20;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            opacity: ${Math.random() * 0.3};
            left: ${x}%;
            top: ${y}%;
            border-radius: 50%;
            pointer-events: none;
            animation: move ${duration}s linear infinite;
        `;
        container.appendChild(particle);
    }
}

// Particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes move {
        from { transform: translateY(0); }
        to { transform: translateY(-50px); }
    }
`;
document.head.appendChild(style);

createParticles();

// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
lucide.createIcons();

// --- Cursor Glow Effect ---
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// --- Magnetic Buttons Effect ---
const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
