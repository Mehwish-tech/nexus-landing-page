// ============================================
// NEXUS — Scroll Animations
// Using Intersection Observer API (no library needed)
// ============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

// Observe all animated elements
document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .stagger-child').forEach(el => {
    observer.observe(el);
});
