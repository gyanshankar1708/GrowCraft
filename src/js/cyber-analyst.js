(function () {
    const root = document.getElementById('gc-hero-cyber');
    const shieldWrap = document.getElementById('gc-shield');
    const btnAudit = document.getElementById('gc-btn-audit');
    const btnDemo = document.getElementById('gc-btn-demo');
    const riskEl = document.getElementById('gc-risk');

    // ---- Risk Score (counts up on view) ----
    let counted = false;
    const targetRisk = Math.floor(32 + Math.random() * 38); // 32–69
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !counted) {
                counted = true;
                let val = 0;
                const step = () => {
                    val += Math.max(1, Math.round((targetRisk - val) * 0.14));
                    if (val >= targetRisk) { val = targetRisk; }
                    riskEl.textContent = val;
                    if (val < targetRisk) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        });
    }, { threshold: 0.35 });
    io.observe(root);

    // ---- Parallax tilt on shield ----
    const tiltStrength = 10; // degrees
    shieldWrap.addEventListener('pointermove', (e) => {
        const r = shieldWrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        const rx = (+dy * tiltStrength).toFixed(2);
        const ry = (-dx * tiltStrength).toFixed(2);
        shieldWrap.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    shieldWrap.addEventListener('pointerleave', () => { shieldWrap.style.transform = 'rotateX(0deg) rotateY(0deg)'; });

    // ---- Magnetic hover for primary button ----
    btnAudit.addEventListener('mousemove', (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        e.currentTarget.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
    });
    btnAudit.addEventListener('mouseleave', (e) => { e.currentTarget.style.transform = 'translate(0,0)'; });

    // ---- Attack Simulation pulse ----
    btnDemo.addEventListener('click', () => {
        root.classList.add('simulating');
        setTimeout(() => root.classList.remove('simulating'), 1300);
    });
})();

(function () {
    const root = document.getElementById('gc-stats-trends');
    if (!root) return;

    // --- Data (sourced / illustrative) ---
    const DATA = {
        global: {
            "targeted-smb": { value: 43, format: (v) => v + '%', spark: [8, 12, 18, 24, 35, 43] },
            "avg-breach-cost": { value: 4880000, format: (v) => '$' + Number(v).toLocaleString(), spark: [2800000, 3100000, 3600000, 4200000, 4880000] },
            "ransomware-cost": { value: 57000000000, format: (v) => '$' + (v / 1e9).toFixed(1) + 'B', spark: [18, 25, 32, 45, 57], sparkLabel: 'B USD' },
            "phishing-share": { value: 36, format: (v) => v + '%', spark: [20, 24, 28, 33, 36] }
        },
        india: {
            // local example: Acronis highlighted ~12.4% share of monitored endpoint attacks in India (sample local stat)
            "targeted-smb": { value: 12.4, format: (v) => v + '%', spark: [6, 7, 9, 11, 12.4] },
            "avg-breach-cost": { value: 2200000, format: (v) => '$' + Number(v).toLocaleString(), spark: [1800000, 1900000, 2000000, 2100000, 2200000] },
            "ransomware-cost": { value: 3.4e9, format: (v) => '$' + (v / 1e9).toFixed(1) + 'B', spark: [0.6, 1.1, 1.8, 2.6, 3.4], sparkLabel: 'B USD' },
            "phishing-share": { value: 40, format: (v) => v + '%', spark: [28, 31, 34, 37, 40] }
        }
    };

    // --- UI references ---
    const scopeEl = document.getElementById('gc-stats-scope');
    const cards = Array.from(root.querySelectorAll('.gc-stat-card'));
    const sourcesToggle = document.getElementById('gc-sources-toggle');
    const sourcesPanel = document.getElementById('gc-sources-panel');

    // helper: draw simple sparkline
    function drawSpark(svgEl, values) {
        // normalize values to 0..1 and build path
        const w = 100, h = 28, pad = 6;
        svgEl.innerHTML = '';
        if (!values || values.length === 0) return;
        const max = Math.max(...values), min = Math.min(...values);
        const range = max - min || 1;
        const points = values.map((v, i) => {
            const x = (i / (values.length - 1)) * (w - pad * 2) + pad;
            const y = pad + (1 - (v - min) / range) * (h - pad * 2);
            return [x, y];
        });
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' ');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'url(#gcSparkGrad)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        svgEl.appendChild(defsFor(svgEl));
        svgEl.appendChild(path);
    }
    // create gradient defs
    function defsFor(svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.setAttribute('id', 'gcSparkGrad');
        grad.setAttribute('x1', '0'); grad.setAttribute('x2', '1');
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); stop1.setAttribute('offset', '0'); stop1.setAttribute('stop-color', '#00d4ff');
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); stop2.setAttribute('offset', '1'); stop2.setAttribute('stop-color', '#7b2ff7');
        grad.appendChild(stop1); grad.appendChild(stop2);
        defs.appendChild(grad);
        return defs;
    }

    // format and animate value (simple counting)
    function animateValue(el, target, formatter) {
        const rawTarget = Number(target) || 0;
        const isCurrency = /[$]/.test((formatter || String)(rawTarget));
        let start = null;
        const duration = 900;
        function step(ts) {
            if (!start) start = ts;
            const t = Math.min(1, (ts - start) / duration);
            const cur = Math.round(rawTarget * t);
            el.textContent = formatter ? formatter(cur) : cur;
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // set card values for chosen scope
    function setStats(scopeKey) {
        const dataset = DATA[scopeKey] || DATA.global;
        cards.forEach(card => {
            const key = card.dataset.key;
            const data = dataset[key] || {};
            const value = data.value ?? '—';
            const format = data.format ?? ((v) => v);
            const valueEl = card.querySelector('.gc-stat-value');
            // animate numbers when card becomes visible
            // set data-value attr for reference
            valueEl.dataset.target = value;
            // draw spark
            const svg = card.querySelector('.gc-spark');
            drawSpark(svg, data.spark || []);
            // if value large (currency), animate differently
            animateValue(valueEl, value, format);
        });
    }

    // intersection observer: animate when grid scrolls into view
    const grid = root.querySelector('.gc-stats-grid');
    const gridObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setStats(scopeEl.value);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    gridObserver.observe(grid);

    // change scope on select
    scopeEl.addEventListener('change', () => {
        // immediate update (no need to wait for intersection)
        setStats(scopeEl.value);
    });

    // sources toggle
    sourcesToggle.addEventListener('click', () => {
        const hidden = sourcesPanel.getAttribute('aria-hidden') === 'true';
        sourcesPanel.setAttribute('aria-hidden', hidden ? 'false' : 'true');
    });

    // small a11y: keyboard focus for cards triggers simple highlight
    cards.forEach(c => c.addEventListener('focus', () => c.classList.add('focused')));
    cards.forEach(c => c.addEventListener('blur', () => c.classList.remove('focused')));

    // initialize (defer heavy ops)
    // draw empty sparklines placeholders
    cards.forEach(card => drawSpark(card.querySelector('.gc-spark'), [1, 1, 1, 1]));

})();

(function () {
    const section = document.getElementById('gc-why-cyber');
    if (!section) return;

    /* ------------ Counters (animate on view) ------------ */
    const statCards = Array.from(section.querySelectorAll('.gc-stat-card'));
    const statObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valEl = entry.target.querySelector('.gc-stat-value');
                const target = Number(valEl.dataset.target || 0);
                // animate (if > 100 show currency-ish)
                let current = 0;
                const isCurrency = target > 1000;
                const duration = 900;
                const start = performance.now();
                function step(ts) {
                    const t = Math.min(1, (ts - start) / duration);
                    current = Math.round(target * t);
                    if (isCurrency) {
                        // format simple currency-style
                        valEl.textContent = '$' + current.toLocaleString();
                    } else {
                        valEl.textContent = current + (valEl.dataset.target <= 100 ? '%' : '');
                    }
                    if (t < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    statCards.forEach(c => statObserver.observe(c));

    /* ------------ Risk slider logic ------------ */
    const range = document.getElementById('gc-risk-range');
    const fill = document.getElementById('gc-risk-bar-fill');
    const level = document.getElementById('gc-risk-level');
    const amount = document.getElementById('gc-risk-amount');

    // base illustrative number (you can change to real baseline per-customer)
    const baseExposure = 200000; // example average exposure in USD

    function updateRiskUI(v) {
        const pct = Math.max(0, Math.min(100, Number(v)));
        fill.style.width = pct + '%';
        range.setAttribute('aria-valuenow', String(pct));

        // map to descriptive level
        let text = 'Low';
        if (pct > 70) text = 'High';
        else if (pct > 40) text = 'Medium';
        level.textContent = text;

        // compute illustrative exposure estimate (simple linear mapping)
        const est = Math.round(baseExposure * (pct / 100));
        amount.textContent = '~$' + est.toLocaleString();

        // add accessible live region update (aria-live on amount or role)
        amount.setAttribute('aria-live', 'polite');
    }

    updateRiskUI(range.value);
    range.addEventListener('input', (e) => updateRiskUI(e.target.value));

    /* ------------ Flip-cards interaction (click/keyboard) ------------ */
    const flipCards = Array.from(section.querySelectorAll('[data-flip]'));
    flipCards.forEach(card => {
        // wrap content for 3d transform
        const inner = document.createElement('div');
        inner.className = 'gc-flip-card-inner';
        // store existing front/back content
        const front = card.querySelector('.front') || document.createElement('div');
        const back = card.querySelector('.back') || document.createElement('div');
        // move nodes into inner wrapper
        // if they already exist in markup, do nothing; our markup already places both faces at top-level, so we reconstruct
        inner.appendChild(front);
        inner.appendChild(back);
        // clear and append
        card.innerHTML = '';
        card.appendChild(inner);

        // click to flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            const pressed = card.classList.contains('flipped') ? 'true' : 'false';
            card.setAttribute('aria-pressed', pressed);
        });

        // keyboard: Enter/Space
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    /* ------------ Micro-tilt for right column (pointermove) ------------ */
    const rightCol = section.querySelector('.gc-why-right') || section.querySelector('.gc-why-right');
    if (rightCol) {
        rightCol.addEventListener('pointermove', (e) => {
            const r = rightCol.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            const rx = (-dy * 4).toFixed(2);
            const ry = (dx * 4).toFixed(2);
            rightCol.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        rightCol.addEventListener('pointerleave', () => { rightCol.style.transform = ''; });
    }

    /* ------------ CTA click behavior (default: scroll to services) ------------ */
    document.getElementById('gc-why-contact').addEventListener('click', (e) => {
        // scroll to services if present, else open contact
        const services = document.getElementById('gc-services-cyber');
        if (services) services.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else window.location.href = 'contact.html';
    });

    // Respect reduced-motion preference: disable pointer effects if reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // remove transforms
        if (rightCol) rightCol.style.transform = '';
        flipCards.forEach(c => c.removeEventListener);
    }
})();

(function () {
    const primary = document.getElementById('gc-cta-primary');
    const mail = document.getElementById('gc-cta-mail');
    const form = document.getElementById('gc-cta-form');
    const status = document.getElementById('gc-form-status');
    const submitBtn = document.getElementById('gc-submit');
    const scheduleBtn = document.getElementById('gc-schedule');

    // Magnetic hover for primary (small)
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            el.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
        });
        el.addEventListener('pointerleave', () => el.style.transform = '');
    });

    // Pre-fill name/email if stored
    try {
        const saved = JSON.parse(localStorage.getItem('growcraft_contact') || '{}');
        if (saved.name) document.getElementById('gc-name').value = saved.name;
        if (saved.email) document.getElementById('gc-email').value = saved.email;
        if (saved.company) document.getElementById('gc-company').value = saved.company;
    } catch (e) {/* ignore */ }

    // Schedule button opens mailto (quick booking) prefilled
    scheduleBtn.addEventListener('click', () => {
        const subject = encodeURIComponent('Request: 15-min consultation — GrowCraft');
        const body = encodeURIComponent('Hi GrowCraft,%0A%0AI would like to book a 15-minute consultation. Preferred times (include timezone):%0A%0ACompany:%20%0AShort note:%20%0A%0AThanks!');
        window.location.href = `mailto:hello@growcraft.example?subject=${subject}&body=${body}`;
    });

    // Submit form: client-side validation + simulated send
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = '';
        // simple validation
        const name = document.getElementById('gc-name').value.trim();
        const email = document.getElementById('gc-email').value.trim();
        if (!name || !email || !validateEmail(email)) {
            status.textContent = 'Please enter a valid name and email.';
            status.style.color = '#ff9aa2';
            return;
        }

        // Save basic info locally for next time (friendly)
        try {
            localStorage.setItem('growcraft_contact', JSON.stringify({ name, email, company: document.getElementById('gc-company').value.trim() }));
        } catch (e) { }

        // show loader state
        submitBtn.disabled = true;
        submitBtn.querySelector('.gc-submit-label').textContent = 'Requesting...';
        const loader = submitBtn.querySelector('.gc-btn-loader');
        if (loader) loader.style.display = 'inline-block';

        // simulate network latency then show success
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.querySelector('.gc-submit-label').textContent = 'Requested';
            status.textContent = 'Thanks — we received your request. Our team will contact you within one business hour.';
            status.style.color = 'var(--gc-accent-1)';
            // small success animation: brief color flash
            submitBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' });
            // reset label after a while
            setTimeout(() => submitBtn.querySelector('.gc-submit-label').textContent = 'Request consultation', 2600);
            form.reset();
        }, 900);
    });

    // mailto CTA: ensure mailto link populated with small template using form values if user filled them
    mail.addEventListener('click', (e) => {
        const name = document.getElementById('gc-name').value.trim();
        const email = document.getElementById('gc-email').value.trim();
        const company = document.getElementById('gc-company').value.trim();
        let body = 'Hi GrowCraft,%0A%0AI would like to request a consultation.%0A%0A';
        if (company) body += `Company: ${encodeURIComponent(company)}%0A`;
        if (name) body += `Contact: ${encodeURIComponent(name)}%0A`;
        if (email) body += `Email: ${encodeURIComponent(email)}%0A`;
        body += '%0AThanks!';
        const href = `mailto:hello@growcraft.example?subject=GrowCraft%20Consultation%20Request&body=${body}`;
        mail.setAttribute('href', href);
        // allow default navigation
    });

    // small helper
    function validateEmail(mail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    }

    // keyboard accessibility: focus outline visible
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('user-tabbing');
    });

    // respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-magnetic]').forEach(el => { el.style.transition = 'none'; });
    }
})();

(function () {
    const section = document.getElementById('gc-services-cyber');
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('.gc-service-card'));
    const fills = section.querySelectorAll('.gc-m-fill');
    const drawer = document.getElementById('gc-service-drawer');
    const drawerBody = document.getElementById('gc-drawer-body');
    const drawerTitle = document.getElementById('gc-drawer-title');
    const drawerClose = document.getElementById('gc-drawer-close');
    const drawerClose2 = document.getElementById('gc-drawer-close-2');
    const formService = document.getElementById('gc-form-service');
    const form = document.getElementById('gc-service-form');
    const formNote = document.getElementById('gc-form-note');
    const sticky = document.getElementById('gc-sticky-cta');

    // Service detail content (customize text as needed)
    const serviceDetails = {
        'risk-assessment': {
            title: 'Risk Assessment & Penetration Testing',
            body: `<p><strong>What we do:</strong> Comprehensive external, internal and application testing to identify vulnerabilities and weak controls. Tests are scoped with your team and delivered with prioritized remediation steps and risk scoring.</p>
             <ul><li>Network & perimeter testing</li><li>Web & API VAPT</li><li>Cloud & infra posture assessment</li></ul>`
        },
        'threat-monitoring': {
            title: '24/7 Threat Monitoring & SIEM',
            body: `<p><strong>What we do:</strong> Centralize logs, apply detection rules, and triage alerts. Our SOC analysts escalate real threats and reduce false positives so you can focus on what matters.</p>
             <ul><li>SIEM tuning & onboarding</li><li>Alert triage & playbooks</li><li>Threat intel correlation</li></ul>`
        },
        'incident-response': {
            title: 'Incident Response & Containment',
            body: `<p><strong>What we do:</strong> Rapid response to incidents including containment, forensic evidence collection, eradication, and recovery planning. We help you reduce MTTD / MTTR and restore services quickly.</p>
             <ul><li>Digital forensics</li><li>Containment & eradication</li><li>Recovery planning & lessons learned</li></ul>`
        },
        'edr': {
            title: 'Endpoint Detection & Response',
            body: `<p><strong>What we do:</strong> Implement and operate EDR to detect behavioral threats on endpoints, automate containment, and support threat-hunting workflows.</p>
             <ul><li>EDR rollout & tuning</li><li>Automated containment</li><li>Endpoint threat hunting</li></ul>`
        },
        'training': {
            title: 'Security Awareness Training',
            body: `<p><strong>What we do:</strong> Role-based training programs, phishing simulations, and tabletop exercises to increase user readiness and reduce human risk.</p>
             <ul><li>Simulated phishing</li><li>Policy workshops</li><li>Tabletop incident drills</li></ul>`
        },
        'compliance': {
            title: 'Compliance & Audit Support',
            body: `<p><strong>What we do:</strong> Gap assessments, policy & control design, and audit remediation support for GDPR, ISO 27001, PCI and other standards.</p>
             <ul><li>Gap analysis</li><li>Policy & control mapping</li><li>Audit remediation plans</li></ul>`
        }
    };

    // Reveal cards on scroll
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    cards.forEach(c => io.observe(c));

    // Animate maturity fills when visible
    const fillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const f = entry.target;
                const val = +f.dataset.value || 0;
                f.style.width = Math.max(4, Math.min(100, val)) + '%';
                obs.unobserve(f);
            }
        });
    }, { threshold: 0.2 });

    fills.forEach(f => fillObserver.observe(f));

    // Open drawer with service details
    function openDrawer(serviceKey) {
        const info = serviceDetails[serviceKey];
        drawerTitle.textContent = info ? info.title : 'Service details';
        drawerBody.innerHTML = info ? info.body : '<p>Service details coming soon.</p>';
        drawer.setAttribute('aria-hidden', 'false');
        formService.value = info ? info.title : serviceKey;
        // focus first field
        setTimeout(() => document.getElementById('gc-name').focus(), 120);
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        drawer.setAttribute('aria-hidden', 'true');
        drawerBody.innerHTML = '';
        document.body.style.overflow = '';
    }

    // Card click / keyboard
    cards.forEach(card => {
        const svc = card.dataset.service;
        const onOpen = () => {
            openDrawer(svc);
        };
        card.addEventListener('click', onOpen);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); }
        });
    });

    drawerClose.addEventListener('click', closeDrawer);
    drawerClose2.addEventListener('click', closeDrawer);

    // Sticky CTA opens generic drawer
    sticky.addEventListener('click', () => { openDrawer('risk-assessment'); });

    // Basic client-side submit handling (no network call)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // simple validation
        const name = document.getElementById('gc-name').value.trim();
        const email = document.getElementById('gc-email').value.trim();
        if (!name || !email) {
            formNote.textContent = 'Please provide your name and email.';
            return;
        }
        // show success message (this is client-side only)
        formNote.textContent = 'Thanks — your request has been noted. We will contact you within one business hour.';
        form.reset();
        // close drawer after a short delay
        setTimeout(closeDrawer, 1600);
    });

    // Close drawer on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') closeDrawer();
    });

    // Ensure accessibility: trap focus within drawer when open (basic)
    const focusableSelector = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    document.addEventListener('focusin', (e) => {
        if (drawer.getAttribute('aria-hidden') === 'false') {
            if (!drawer.contains(e.target)) {
                // bring focus back to drawer
                drawerClose.focus();
            }
        }
    });

})();
