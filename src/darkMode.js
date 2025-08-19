/**
 * Dark Mode Toggle Module
 * A clean, modular implementation for theme switching
 */

class DarkModeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleElement = null;
        this.init();
    }

    init() {
        // Apply saved theme on page load
        this.applyTheme();

        // Create and insert toggle button
        this.createToggle();

        // Add transition styles
        this.addTransitionStyles();
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
        }
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-mode');
        }
        
        // Update logo based on theme
        this.updateLogo();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();

        // Update toggle button state
        if (this.toggleElement) {
            this.toggleElement.classList.toggle('active', this.theme === 'dark');
        }
        
        // Update logo based on theme
        this.updateLogo();
    }
    
    updateLogo() {
        const logo = document.querySelector("#logo");
        if (logo) {
            // Determine the correct path based on current page location
            let darkLogoPath, lightLogoPath;
            
            // Check if we're in the src folder (contact page) or root (home page)
            if (window.location.pathname.includes('/src/')) {
                // We're in src folder, use relative path
                darkLogoPath = 'images/logo-transparent-dark-mode.png';
                lightLogoPath = 'images/logo_bg_transparent.png';
            } else {
                // We're in root folder, use root path
                darkLogoPath = 'images/logo-transparent-dark-mode.png';
                lightLogoPath = 'images/logo_bg_transparent.png';
            }
            
            console.log('Updating logo:', this.theme, 'Dark path:', darkLogoPath, 'Light path:', lightLogoPath);
            
            if (this.theme === 'dark') {
                logo.src = darkLogoPath;
                console.log('Logo updated to dark mode:', logo.src);
            } else {
                logo.src = lightLogoPath;
                console.log('Logo updated to light mode:', logo.src);
            }
        } else {
            console.log('Logo element not found');
        }
    }

    addTransitionStyles() {
        // Add smooth transitions for theme switching
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
            
            .theme-toggle-container {
                display: flex;
                align-items: center;
            }
            
            .theme-toggle {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                color: var(--text-color, #333);
                background-color: var(--bg-color, transparent);
            }
            
            .theme-toggle:hover {
                background-color: var(--hover-bg, rgba(0,0,0,0.1));
                transform: scale(1.1);
            }
            
            .theme-toggle svg {
                transition: all 0.3s ease;
            }
            
            .theme-toggle .sun-icon {
                display: block;
            }
            
            .theme-toggle .moon-icon {
                display: none;
            }
            
            .theme-toggle.active .sun-icon {
                display: none;
            }
            
            .theme-toggle.active .moon-icon {
                display: block;
            }
            
            /* Dark mode variables */
            :root {
                --bg-primary: #ffffff;
                --bg-secondary: #f8f9fa;
                --text-primary: #333333;
                --text-secondary: #666666;
                --border-color: #dee2e6;
                --shadow: rgba(0, 0, 0, 0.1);
            }
            
            .dark, .dark-mode {
                --bg-primary: #1a1a1a;
                --bg-secondary: #2d2d2d;
                --text-primary: #ffffff;
                --text-secondary: #cccccc;
                --border-color: #404040;
                --shadow: rgba(0, 0, 0, 0.3);
            }
            
            /* Comprehensive dark mode overrides */
            body {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
            }
            
            /* Override all text colors in dark mode */
            .dark-mode *,
            .dark * {
                color: var(--text-primary) !important;
            }
            
            /* Specific element overrides */
            .dark-mode h1, .dark h1,
            .dark-mode h2, .dark h2,
            .dark-mode h3, .dark h3,
            .dark-mode h4, .dark h4,
            .dark-mode h5, .dark h5,
            .dark-mode h6, .dark h6 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode p, .dark p {
                color: var(--text-primary) !important;
            }
            
            .dark-mode span, .dark span {
                color: var(--text-primary) !important;
            }
            
            .dark-mode div, .dark div {
                color: var(--text-primary) !important;
            }
            
            /* Navbar overrides */
            .dark-mode .navbar, .dark .navbar {
                background-color: var(--bg-primary) !important;
                border-bottom-color: var(--border-color) !important;
            }
            
            .dark-mode .navbar .nav-link, .dark .navbar .nav-link {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .navbar .navbar-brand, .dark .navbar .navbar-brand {
                color: var(--text-primary) !important;
            }
            /* training card bg white on dark*/
            .dark-mode .program-card , .dark .program-card{
               background-color: var(--bg-primary); 
            }
            /* Card overrides */
            .dark-mode .card, .dark .card {
                background-color: var(--bg-secondary) !important;
                border-color: var(--border-color) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .card-services, .dark .card-services {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .card-services h5, .dark .card-services h5 {
                color: var(--text-primary) !important;
            }
            
            /* Form elements */
            .dark-mode .form-control, .dark .form-control,
            .dark-mode .form-select, .dark .form-select {
                background-color: var(--bg-secondary) !important;
                border-color: var(--border-color) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .form-control::placeholder, .dark .form-control::placeholder,
            .dark-mode .form-select::placeholder, .dark .form-select::placeholder {
                color: var(--text-secondary) !important;
            }
            
            /* Button overrides */
            .dark-mode .btn, .dark .btn {
                border-color: var(--border-color) !important;
            }
            
            /* Footer overrides */
            .dark-mode .footer, .dark .footer {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .footer a, .dark .footer a {
                color: var(--text-primary) !important;
            }
            
            /* Gallery card overrides */
            .dark-mode .gallery-card, .dark .gallery-card {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            /* Training links */
            .dark-mode .training-links, .dark .training-links {
                color: var(--text-primary) !important;
            }
            
            /* Text center elements */
            .dark-mode .text-center, .dark .text-center {
                color: var(--text-primary) !important;
            }
            
            /* Container elements */
            .dark-mode .container, .dark .container {
                color: var(--text-primary) !important;
            }
            
            /* Section elements */
            .dark-mode section, .dark section {
                color: var(--text-primary) !important;
            }
            
            /* List elements */
            .dark-mode li, .dark li {
                color: var(--text-primary) !important;
            }
            
            /* Link elements */
            .dark-mode a, .dark a {
                color: var(--text-primary) !important;
            }
            
            /* Preserve gradient text effects */
            .dark-mode .gradient-text, .dark .gradient-text,
            .dark-mode .hero-text h1, .dark .hero-text h1 {
                background: linear-gradient(90deg, #00ffe7, #0b84f3) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            
            /* Preserve specific colored elements */
            .dark-mode .heading-text, .dark .heading-text {
                text-decoration-color: var(--blue, #0078ff) !important;
            }
            
            /* Override any remaining black text */
            .dark-mode [style*="color: black"], .dark [style*="color: black"],
            .dark-mode [style*="color: #000"], .dark [style*="color: #000"],
            .dark-mode [style*="color: #000000"], .dark [style*="color: #000000"] {
                color: var(--text-primary) !important;
            }
            
            /* Override any remaining white backgrounds in dark mode */
            .dark-mode [style*="background-color: white"], .dark [style*="background-color: white"],
            .dark-mode [style*="background-color: #fff"], .dark [style*="background-color: #fff"],
            .dark-mode [style*="background-color: #ffffff"], .dark [style*="background-color: #ffffff"] {
                background-color: var(--bg-secondary) !important;
            }
            
            /* About Us section specific overrides */
            .dark-mode .about-section, .dark .about-section {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .about-title, .dark .about-title {
                color: var(--text-primary) !important;
                border-bottom-color: var(--blue, #0078ff) !important;
            }
            
            .dark-mode .about-subtitle, .dark .about-subtitle {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .about-card, .dark .about-card {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
                box-shadow: 0 8px 16px var(--shadow) !important;
            }
            
            .dark-mode .about-card h3, .dark .about-card h3,
            .dark-mode .about-card h4, .dark .about-card h4 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .about-card p, .dark .about-card p {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .about-card:hover, .dark .about-card:hover {
                box-shadow: 0 12px 24px var(--shadow) !important;
            }
            
            /* About Us specific elements from style.css */
            .dark-mode .about-us, .dark .about-us {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .about, .dark .about {
                color: var(--text-primary) !important;
            }
            
            /* Work section overrides */
            .dark-mode .section, .dark .section {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .fst-italic, .dark .fst-italic {
                color: var(--text-secondary) !important;
            }
            
            /* Gallery card specific overrides */
            .dark-mode .gallery-card .card-title, .dark .gallery-card .card-title {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .gallery-card .card-text, .dark .gallery-card .card-text {
                color: var(--text-primary) !important;
            }
            
            /* Badge overrides */
            .dark-mode .badge, .dark .badge {
                color: var(--text-primary) !important;
            }
            
            /* Text decoration overrides */
            .dark-mode .text-decoration-none, .dark .text-decoration-none {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .text-dark, .dark .text-dark {
                color: var(--text-primary) !important;
            }
            
            /* Blog page specific overrides */
            .dark-mode .blog-section, .dark .blog-section {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
                box-shadow: 0 8px 32px var(--shadow) !important;
            }
            
            .dark-mode .blog-card, .dark .blog-card {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
                box-shadow: 0 2px 10px var(--shadow) !important;
                border-left-color: var(--blue, #0078ff) !important;
            }
            
            .dark-mode .blog-card h4, .dark .blog-card h4 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .blog-card small, .dark .blog-card small {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .blog-card p, .dark .blog-card p {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .blog-card:hover, .dark .blog-card:hover {
                box-shadow: 0 6px 22px var(--shadow) !important;
            }
            
            .dark-mode .blog-card:hover h4, .dark .blog-card:hover h4 {
                color: var(--blue, #0078ff) !important;
            }
            
            /* Blog form elements */
            .dark-mode form input, .dark form input,
            .dark-mode form textarea, .dark form textarea {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode form input:focus, .dark form input:focus,
            .dark-mode form textarea:focus, .dark form textarea:focus {
                border-color: var(--blue, #0078ff) !important;
                box-shadow: 0 2px 12px rgba(0, 120, 255, 0.2) !important;
            }
            
            /* Blog buttons */
            .dark-mode form button[type=submit], .dark form button[type=submit] {
                background: linear-gradient(85deg, var(--blue, #0078ff) 70%, #3458FF 100%) !important;
                color: #fff !important;
            }
            
            .dark-mode form button[type=submit]:hover, .dark form button[type=submit]:hover {
                background: #273EBB !important;
            }
            
            /* Back button in blog */
            .dark-mode button[onclick*="blogListing.html"], .dark button[onclick*="blogListing.html"] {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode button[onclick*="blogListing.html"]:hover, .dark button[onclick*="blogListing.html"]:hover {
                background-color: var(--bg-primary) !important;
                color: var(--blue, #0078ff) !important;
            }
            
            /* FAB button */
            .dark-mode .fab, .dark .fab {
                background: linear-gradient(120deg, var(--blue, #0078ff) 75%, #3458FF 100%) !important;
                color: #fff !important;
                border-color: var(--bg-secondary) !important;
            }
            
            .dark-mode .fab:hover, .dark .fab:hover {
                background: linear-gradient(120deg, #273EBB 75%, #3351C4 100%) !important;
            }
            
            /* Blog view specific */
            .dark-mode #full-blog-content h1, .dark #full-blog-content h1,
            .dark-mode #full-blog-content h2, .dark #full-blog-content h2 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode #full-blog-content p, .dark #full-blog-content p {
                color: var(--text-primary) !important;
            }
            
            .dark-mode #full-blog-content small, .dark #full-blog-content small {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode #full-blog-content div, .dark #full-blog-content div {
                color: var(--text-primary) !important;
            }
            
            /* Back button in blog view */
            .dark-mode .back-btn, .dark .back-btn {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .back-btn:hover, .dark .back-btn:hover {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
            }
            
            /* Blog write page specific */
            .dark-mode #blog-form input, .dark #blog-form input,
            .dark-mode #blog-form textarea, .dark #blog-form textarea {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode #blog-form input:focus, .dark #blog-form input:focus,
            .dark-mode #blog-form textarea:focus, .dark #blog-form textarea:focus {
                border-color: var(--blue, #0078ff) !important;
            }
            
            .dark-mode #blog-form button[type="submit"], .dark #blog-form button[type="submit"] {
                background-color: var(--blue, #0078ff) !important;
                color: #fff !important;
            }
            
            .dark-mode #blog-form button[type="submit"]:hover, .dark #blog-form button[type="submit"]:hover {
                background-color: #0056b3 !important;
            }
            
            /* Blog listing page */
            .dark-mode .bg-light, .dark .bg-light {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
            }
            
            /* Blog error messages */
            .dark-mode [style*="color:#B00"], .dark [style*="color:#B00"] {
                color: #ff6b6b !important;
            }
            
            /* Blog content styling */
            .dark-mode [style*="color:#293241"], .dark [style*="color:#293241"] {
                color: var(--text-primary) !important;
            }
            
            .dark-mode [style*="color:#8492a6"], .dark [style*="color:#8492a6"] {
                color: var(--text-secondary) !important;
            }
            
            /* Contact Us page specific overrides */
            .dark-mode .contact-hero, .dark .contact-hero {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .hero-title, .dark .hero-title {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .hero-subtitle, .dark .hero-subtitle {
                color: var(--text-secondary) !important;
            }
            
            // no need to apply background black in footer in light mode
            // /* Contact info section */
            // .dark-mode .contact-info, .dark .contact-info {
            //     background-color: var(--bg-primary) !important;
            // }
            
            .dark-mode .contact-info-card, .dark .contact-info-card {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
                box-shadow: 0 5px 15px var(--shadow) !important;
            }
            
            .dark-mode .contact-info-card:hover, .dark .contact-info-card:hover {
                box-shadow: 0 15px 30px var(--shadow) !important;
            }
            
            .dark-mode .contact-info-card h4, .dark .contact-info-card h4 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .contact-info-card p, .dark .contact-info-card p {
                color: var(--text-secondary) !important;
            }
            
            /* Get in Touch info boxes (Contact page) - keep original white cards in dark mode */
            .dark-mode .info-box, .dark .info-box {
                background-color: #ffffff !important;
                color: #333333 !important;
                box-shadow: 0 5px 15px var(--shadow) !important;
            }

            /* Ensure inner text stays dark on white cards in dark mode */
            .dark-mode .info-box *, .dark .info-box * {
                color: #333333 !important;
            }
            
            .dark-mode .info-box i, .dark .info-box i {
                color: #00b894 !important; /* keep the accent color for icons */
            }
            
            /* Contact form section */
            .dark-mode .contact-form-section, .dark .contact-form-section {
                background-color: var(--bg-primary) !important;
            }
            
            .dark-mode .form-container, .dark .form-container {
                background-color: var(--bg-secondary) !important;
                box-shadow: 0 10px 40px var(--shadow) !important;
            }
            
            .dark-mode .form-title, .dark .form-title {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .form-subtitle, .dark .form-subtitle {
                color: var(--text-secondary) !important;
            }
            
            /* Contact form elements */
            .dark-mode .form-group label, .dark .form-group label {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .form-group input, .dark .form-group input,
            .dark-mode .form-group select, .dark .form-group select,
            .dark-mode .form-group textarea, .dark .form-group textarea {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .form-group input:focus, .dark .form-group input:focus,
            .dark-mode .form-group select:focus, .dark .form-group select:focus,
            .dark-mode .form-group textarea:focus, .dark .form-group textarea:focus {
                border-color: var(--blue, #0078ff) !important;
                box-shadow: 0 0 0 0.2rem rgba(0, 120, 255, 0.25) !important;
            }
            
            .dark-mode .form-group input::placeholder, .dark .form-group input::placeholder,
            .dark-mode .form-group textarea::placeholder, .dark .form-group textarea::placeholder {
                color: var(--text-secondary) !important;
            }
            
            /* File upload section */
            .dark-mode .file-upload-area, .dark .file-upload-area {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .file-upload-area:hover, .dark .file-upload-area:hover {
                border-color: var(--blue, #0078ff) !important;
            }
            
            .dark-mode .file-upload-area p, .dark .file-upload-area p {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .file-upload-area small, .dark .file-upload-area small {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .file-item, .dark .file-item {
                background-color: var(--bg-secondary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .file-item span, .dark .file-item span {
                color: var(--text-primary) !important;
            }
            
            /* Contact preferences */
            .dark-mode .contact-preferences > label, .dark .contact-preferences > label {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .contact-method, .dark .contact-method {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .contact-method:hover, .dark .contact-method:hover {
                background-color: var(--bg-secondary) !important;
            }
            
            .dark-mode .contact-method span, .dark .contact-method span {
                color: var(--text-primary) !important;
            }
            
            /* Quick contact section */
            .dark-mode .quick-contact, .dark .quick-contact {
                background-color: var(--bg-secondary) !important;
                color: var(--text-primary) !important;
            }
            
            .dark-mode .quick-contact h3, .dark .quick-contact h3 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .quick-contact p, .dark .quick-contact p {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .quick-btn, .dark .quick-btn {
                background-color: var(--bg-primary) !important;
                color: var(--text-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .quick-btn:hover, .dark .quick-btn:hover {
                background-color: var(--bg-secondary) !important;
            }
            
            /* Office hours */
            .dark-mode .office-hours, .dark .office-hours {
                background-color: var(--bg-secondary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .office-hours h4, .dark .office-hours h4 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .hour-item, .dark .hour-item {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .hour-item span, .dark .hour-item span {
                color: var(--text-primary) !important;
            }
            
            /* Response card */
            .dark-mode .response-card, .dark .response-card {
                background-color: var(--bg-primary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .response-text h5, .dark .response-text h5 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .response-text p, .dark .response-text p {
                color: var(--text-secondary) !important;
            }
            
            /* Form messages */
            .dark-mode .error-message, .dark .error-message {
                background-color: #4a2a2a !important;
                border-color: #8b3a3a !important;
                color: #ffcccc !important;
            }
            
            .dark-mode .success-message, .dark .success-message {
                background-color: #2a4a2a !important;
                border-color: #3a8b3a !important;
                color: #ccffcc !important;
            }
            
            /* Contact buttons */
            .dark-mode .btn-primary, .dark .btn-primary {
                background: linear-gradient(135deg, var(--blue, #0078ff), #0066cc) !important;
                color: #fff !important;
            }
            
            .dark-mode .btn-primary:hover, .dark .btn-primary:hover {
                background: linear-gradient(135deg, #0056cc, #0055aa) !important;
            }
            
            /* Info icons */
            .dark-mode .info-icon, .dark .info-icon {
                background: linear-gradient(135deg, var(--blue, #0078ff), #0066cc) !important;
                color: #fff !important;
            }
            
            /* Response icon */
            .dark-mode .response-icon, .dark .response-icon {
                color: var(--blue, #0078ff) !important;
            }
            
            /* Booking section */
            .dark-mode .booking-section, .dark .booking-section {
                background-color: var(--bg-secondary) !important;
                border-color: var(--border-color) !important;
            }
            
            .dark-mode .booking-section h4, .dark .booking-section h4 {
                color: var(--text-primary) !important;
            }
            
            /* File upload section */
            .dark-mode .file-upload-section h4, .dark .file-upload-section h4 {
                color: var(--text-primary) !important;
            }
            
            /* Contact footer */
            .dark-mode .contact-footer, .dark .contact-footer {
                background-color: var(--bg-primary) !important;
                border-top-color: var(--border-color) !important;
            }
            
            .dark-mode .footer-content h4, .dark .footer-content h4 {
                color: var(--text-primary) !important;
            }
            
            .dark-mode .footer-content p, .dark .footer-content p {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .footer-links a, .dark .footer-links a {
                color: var(--text-secondary) !important;
            }
            
            .dark-mode .footer-links a:hover, .dark .footer-links a:hover {
                color: var(--blue, #0078ff) !important;
            }
            
            .dark-mode .footer-bottom p, .dark .footer-bottom p {
                color: var(--text-secondary) !important;
            }
                .dark .hero {
    background: linear-gradient(135deg, #0d1b2a, #1b263b);
}

.dark .hero-content h1 {
    color: #f4f6fb;
}

.dark .hero-content p {
    color: #c9d6e5;
}

.dark .hero-content button {
    background-color: #1e90ff;
}

.dark .hero-content button:hover {
    background-color: #63b3ff;
}

.dark .modal-content {
    background: #1b263b;
    color: #e2e8f0;
}

.dark .modal-content h2 {
    color: #f4f6fb;
}

.dark label {
    color: #cbd5e1;
}

.dark input,
.dark textarea {
    background: #0d1b2a;
    color: #e2e8f0;
    border-color: #334155;
}
/* DARK MODE STYLES */
.dark .services-section {
    background: #0f172a; /* deep navy */
}

.dark .services-intro h2 {
    color: #f1f5f9; /* soft white */
}

.dark .services-intro p {
    color: #94a3b8; /* muted gray */
}

.dark .service-card {
    background: #1e293b; /* slate */
    border-color: rgba(255,255,255,0.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}

.dark .service-card h3 {

    color: #bfd5f0ff; /* soft blue */
    font-weight: 400;
}

.dark .service-card p {
    color: #cbd5e1; /* light gray */
}

.dark .services-highlight {
    background: rgba(96, 165, 250, 0.1); /* soft blue background */
    color: #93c5fd;
}
    /* DARK MODE STYLES */
.dark .benefits-alt-section {
    background: linear-gradient(135deg, #0f172a, #1e293b);
}

.dark .benefits-alt-header h2 {
    color: #f1f5f9;
    font-weight: 400;

}

.dark .benefits-alt-header p {
    color: #94a3b8;
}

.dark .benefit-alt-item {
    background: #1e293b;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}
    .dark .benefit-alt-item: hover {
    background: #46484bff;
    box-shadow: 0 5px 15px rgba(215, 212, 212, 0.5);
}

.dark .benefit-alt-text h3 {
    color: #60a5fa;
}

.dark .benefit-alt-text p {
    color: #cbd5e1;
}

.dark .benefit-alt-icon {
    color: #93c5fd;
}
    .dark .process-flow {
    background: #0f172a;
}

.dark .section-title {
    color: #f1f5f9;
}

.dark .timeline::-webkit-scrollbar-thumb {
    background: #475569;
}

.dark .timeline::-webkit-scrollbar-track {
    background: #1e293b;
}

.dark .step {
    background: #1e293b;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dark .step::before {
    background: #60a5fa;
    color: #0f172a;
}

.dark .step h3 {
    color: #e2e8f0;
}

.dark .step p {
    color: #cbd5e1;
}
.dark .case-study-section {
    background: #0f172a; /* Dark navy */
}

.dark .case-study-header h2 {
    color: #f1f5f9; /* Light gray text */
}

.dark .case-study-header p {
    color: #cbd5e1; /* Softer light text */
}

.dark .case-card {
    background: #1e293b;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
}

.dark .case-card h3 {
    color: #e2e8f0;
}

.dark .case-card p {
    color: #cbd5e1;
}

.dark .progress-bar {
    background: #334155; /* Darker gray for background */
}

.dark .result-text {
    color: #f1f5f9;
}
    .dark .cta-section {
    background: linear-gradient(135deg, #1f2937, #111827);
}

.dark .cta-section h2 {
    color: #f9fafb;
}

.dark .cta-section p {
    color: #d1d5db;
}

.dark .btn-primary {
    background: #2563eb;
}

.dark .btn-primary:hover {
    background: #1d4ed8;
}

.dark .btn-secondary {
    border-color: #2563eb;
    color: #93c5fd;
}

.dark .btn-secondary:hover {
    background: #2563eb;
    color: #fff;
    }
    .dark .cta-btn:hover {
  background-color: #ffa54d;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 165, 77, 0.4);
}

/* CTA section hover effect */
.dark .cta-section:hover {
  background-color: #222;
  box-shadow: 0 4px 30px rgba(255, 123, 0, 0.15);
}
   .dark .service-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 8px 25px rgba(42, 41, 41, 0.26);
        }

        `;
        document.head.appendChild(style);
    }
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
} 