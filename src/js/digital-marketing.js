
/**
 * Dark Mode Toggle Module
 * A clean, modular implementation for theme switching
 */
class DarkModeToggle {
    constructor() {
        this.theme = this.getSavedTheme() || 'light';
        this.toggleElement = null;
        this.init();
    }

    getSavedTheme() {
        // Use in-memory storage instead of localStorage for artifact compatibility
        return window.themePreference || 'light';
    }

    saveTheme(theme) {
        // Store theme preference in memory
        window.themePreference = theme;
    }

    init() {
        // Apply saved theme on page load
        this.applyTheme();

        // Create and insert toggle button
        this.createToggle();
    }

    createToggle() {
        // Create toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle-container';
        toggleContainer.innerHTML = `
                    <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
                        <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                `;

        // Find navbar and insert toggle
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item d-flex align-items-center ms-3';
            navItem.appendChild(toggleContainer);
            navbar.appendChild(navItem);
        }

        // Add event listener
        this.toggleElement = document.getElementById('themeToggle');
        if (this.toggleElement) {
            this.toggleElement.addEventListener('click', () => this.toggle());
            // Set initial button state
            this.toggleElement.classList.toggle('active', this.theme === 'dark');
        }
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.saveTheme(this.theme);
        this.applyTheme();

        // Update toggle button state
        if (this.toggleElement) {
            this.toggleElement.classList.toggle('active', this.theme === 'dark');
        }
    }
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // Initialize dark mode toggle
    new DarkModeToggle();

    // Back to top button
    const btn = document.getElementById("backToTop");
    if (btn) {
        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Modal functionality
    const modal = document.getElementById("contactModal");
    const openBtn = document.getElementById("cta-btn");
    const closeBtn = document.getElementById("closeModal");

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Service card interactions
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", () => {
            alert(`Learn more about our ${card.querySelector("h3").innerText} service!`);
        });
    });

    // Timeline auto-scroll
    const timeline = document.querySelector(".timeline");
    if (timeline) {
        let scrollAmount = 0;
        const interval = setInterval(() => {
            if (timeline.scrollLeft + timeline.clientWidth >= timeline.scrollWidth) {
                timeline.scrollTo({ left: 0, behavior: "smooth" });
                scrollAmount = 0;
            } else {
                scrollAmount += 280;
                timeline.scrollTo({ left: scrollAmount, behavior: "smooth" });
            }
        }, 4000);

        // Stop auto-scroll on user interaction
        timeline.addEventListener('mouseenter', () => clearInterval(interval));
    }

    // Case study progress bars
    const caseCards = document.querySelectorAll(".case-card");
    caseCards.forEach(card => {
        const fill = card.querySelector(".progress-fill");
        const resultText = card.querySelector(".result-text");
        const resultValue = card.getAttribute("data-result");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fill.style.width = resultValue;
                    resultText.textContent = resultValue + " Growth";
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(card);
    });
});
