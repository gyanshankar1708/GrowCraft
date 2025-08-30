
//Show/hide the back-to-top button on scroll
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to top smoothly when back-to-top button is clicked
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTop");
    if (btn) {
        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});


// Pricing toggle (Monthly/Annual)
const toggle = document.getElementById('billingToggle');
const plans = document.querySelectorAll('.plan');
function formatUSD(val) {
    return `$${Number(val).toLocaleString('en-US')}`;
}
function updatePrices() {
    plans.forEach(p => {
        const key = toggle.checked ? 'annual' : 'monthly';
        const price = p.dataset[key];
        p.querySelector('.price-value').textContent = formatUSD(price);
    });
}
if (toggle) {
    toggle.addEventListener('change', updatePrices);
    updatePrices();
}

// Simple contact form handler (front-end only)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // TODO: Hook up to your backend or Formspree/Make/Zapier
    console.log('Lead:', data);
    status.textContent = 'Thanks! We\'ll reach out within 24 hours.';
    form.reset();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
