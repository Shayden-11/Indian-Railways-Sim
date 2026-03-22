// ══════════════════════════════════════
//   Indian Railways Sim — Website JS
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll fade-in animations ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feat-card, .route-card, .loco-card, .coach-item, .ctrl')
        .forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });

    // ── Signal animation on hero ──
    const lenses = document.querySelectorAll('.signal-post .lens');
    const states = [
        [true,  false, false], // red
        [false, true,  false], // yellow
        [false, false, true],  // green
    ];
    let stateIdx = 0;

    function cycleSignal() {
        lenses.forEach((lens, i) => {
            const on = states[stateIdx][i];
            if (i === 0) { // red
                lens.classList.toggle('active', on);
                lens.style.background   = on ? '#ff2200' : '#330000';
                lens.style.boxShadow    = on ? '0 0 10px #ff2200' : 'none';
            } else if (i === 1) { // yellow
                lens.style.background   = on ? '#ffcc00' : '#333300';
                lens.style.boxShadow    = on ? '0 0 10px #ffcc00' : 'none';
            } else { // green
                lens.style.background   = on ? '#00cc44' : '#003300';
                lens.style.boxShadow    = on ? '0 0 10px #00cc44' : 'none';
            }
        });
        stateIdx = (stateIdx + 1) % states.length;
    }

    setInterval(cycleSignal, 2500);

    // ── Nav active link highlight ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-play)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + current
                ? 'var(--text)'
                : '';
        });
    });

    // ── Staggered card animation delays ──
    document.querySelectorAll('.features-grid .feat-card').forEach((card, i) => {
        card.style.transitionDelay = (i * 0.08) + 's';
    });
    document.querySelectorAll('.controls-grid .ctrl').forEach((ctrl, i) => {
        ctrl.style.transitionDelay = (i * 0.06) + 's';
    });

});

// ── Catalogue tabs ──
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});