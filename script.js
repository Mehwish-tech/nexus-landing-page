// ============================================
// NEXUS — script.js
// 1. Scroll Animations (Intersection Observer)
// 2. Hero Canvas Particles
// 3. Typewriter Effect
// ============================================


// ── 1. SCROLL ANIMATIONS ───────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .stagger-child').forEach(el => {
    observer.observe(el);
});


// ── 2. HERO CANVAS PARTICLES ───────────────
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let W, H;

function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
        particles.push({
            x:     randomBetween(0, W),
            y:     randomBetween(0, H),
            r:     randomBetween(0.8, 2.2),
            vx:    randomBetween(-0.18, 0.18),
            vy:    randomBetween(-0.18, 0.18),
            alpha: randomBetween(0.15, 0.55),
        });
    }
}
initParticles();

function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(166, 94, 237, ${0.12 * (1 - dist / 120)})`;
                ctx.lineWidth   = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 94, 237, ${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(drawParticles);
}
drawParticles();


// ── 3. TYPEWRITER EFFECT ───────────────────
const words  = ['0.1%', 'elite.', 'future.', 'builders.'];
const target = document.getElementById('typewriter');
let   wordIndex = 0;
let   charIndex = 0;
let   deleting  = false;

function type() {
    if (!target) return;

    const current = words[wordIndex];

    if (!deleting) {
        target.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            setTimeout(() => { deleting = true; type(); }, 1800);
            return;
        }
    } else {
        target.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting   = false;
            wordIndex  = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(type, deleting ? 60 : 100);
}

setTimeout(type, 800);


// ── 4. NAVBAR ACTIVE LINK ON SCROLL ────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
