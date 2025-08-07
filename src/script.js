console.log("script.js is loading");
console.log(document.getElementById("backToTop"));

// Check authentication status when page loads
document.addEventListener('DOMContentLoaded', function() {
  checkAuthStatus();
});

// Check if user is logged in and update navbar
function checkAuthStatus() {
  const userData = localStorage.getItem('growcraft_user');
  const loginBtn = document.getElementById('login-btn');
  const profileSection = document.getElementById('profile-section');
  
  if (userData) {
    const user = JSON.parse(userData);
    updateNavbarForLoggedInUser(user);
  } else {
    // No user logged in - ensure login button is shown and profile is hidden
    if (loginBtn) {
      loginBtn.style.display = 'block';
    }
    if (profileSection) {
      profileSection.classList.remove('show');
      profileSection.style.display = 'none'; // Force hide
    }
  }
}

// Update navbar for logged in user
function updateNavbarForLoggedInUser(user) {
  const loginBtn = document.getElementById('login-btn');
  const profileSection = document.getElementById('profile-section');
  
  if (loginBtn && profileSection) {
    loginBtn.style.display = 'none';
    profileSection.classList.add('show');
    
    // Update navbar display name
    const navbarUserName = document.getElementById('navbar-user-name');
    if (navbarUserName) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      navbarUserName.textContent = fullName || 'User';
    }
    
    // Update dropdown user information
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayEmail = document.getElementById('user-display-email');
    
    if (userDisplayName) {
      userDisplayName.textContent = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
    }
    
    if (userDisplayEmail) {
      userDisplayEmail.textContent = user.email || 'user@example.com';
    }
  }
}

// Logout function
function logout() {
  // Remove user data from localStorage
  localStorage.removeItem('growcraft_user');
  
  // Get elements
  const loginBtn = document.getElementById('login-btn');
  const profileSection = document.getElementById('profile-section');
  
  // Show login button and hide profile section
  if (loginBtn) {
    loginBtn.style.display = 'block';
  }
  
  if (profileSection) {
    profileSection.classList.remove('show');
    profileSection.style.display = 'none'; // Force hide with inline style as backup
  }
  
  // Show logout message
  const logoutMessage = document.createElement('div');
  logoutMessage.className = 'alert alert-success alert-dismissible fade show';
  logoutMessage.style.position = 'fixed';
  logoutMessage.style.top = '20px';
  logoutMessage.style.right = '20px';
  logoutMessage.style.zIndex = '9999';
  logoutMessage.innerHTML = `
    <i class="fas fa-check-circle me-2"></i>
    Logged out successfully!
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(logoutMessage);
  
  // Refresh page after showing message
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

// Auto slide of carousel
let autoSlide = () => {
  let next = document.getElementById("nextbtn");
  if (!next) return; // ⛔ Skip if element doesn't exist
  setInterval(() => {
    next.click();
  }, 5000);
};
autoSlide();

// Auto slide of client section
let clientSlide = () => {
  let client = document.getElementById("client-next");
  if (!client) return; // ⛔ Prevent error if not found
  setInterval(() => {
    client.click();
  }, 5000);
};
clientSlide();

// Scroll effect on navbar (only on index page)
let sections = document.querySelectorAll(".section");
let navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = null;
  let minDistance = window.innerHeight;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < minDistance) {
      minDistance = rect.top;
      currentSection = section.getAttribute("id");
    }
  });

  if (!currentSection && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    currentSection = "contact"; // fallback if at bottom
  }

  navLinks.forEach((link) => {
    link.classList.remove("visited");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("visited");
    }
  });
});


// Form validation (only if form exists)
let submitForm = document.getElementById("form-submit");
if (submitForm) {
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");
    const error = document.getElementById("error");

    if (!nameField || !emailField || !subjectField || !messageField || !error) return;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !subject || !message) {
      error.textContent = "All fields are required.";
      return;
    }
    if (!emailPattern.test(email)) {
      error.textContent = "Please enter a valid email address.";
      return;
    }

    error.textContent = "";
    alert("Form submitted successfully!");
    nameField.value = "";
    emailField.value = "";
    subjectField.value = "";
    messageField.value = "";
  });
}

// Show/hide the back-to-top button on scroll
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
document.querySelectorAll('.toggle-btn').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        const cardBody = btn.closest('.card-body');
                        const summary = cardBody.querySelector('.summary');
                        const extra = cardBody.querySelector('.extra');

                        const isExpanded = !extra.classList.contains('d-none');

                        if (isExpanded) {
                            summary.classList.remove('d-none');
                            extra.classList.add('d-none');
                            btn.textContent = "Read More";
                        } else {
                            summary.classList.add('d-none');
                            extra.classList.remove('d-none');
                            btn.textContent = "Read Less";
                        }
                    });
                });

// Progressive Loading & Enhanced Scroll Animations System
document.addEventListener('DOMContentLoaded', function() {
    // Add loading indicator
    showLoadingProgress();
    
    // Initialize all elements as hidden for progressive loading
    initializeProgressiveElements();
    
    // Setup intersection observers for different content types
    setupProgressiveLoading();
    
    // Add enhanced button effects
    addEnhancedButtonEffects();
    
    // Hide loading indicator after initial setup
    setTimeout(() => hideLoadingProgress(), 500);
});

function showLoadingProgress() {
    // Create and show a subtle loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'progressive-loader';
    loadingIndicator.innerHTML = `
        <div class="loading-bar"></div>
        <div class="loading-text">Loading content...</div>
    `;
    
    const loaderStyle = `
        #progressive-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            z-index: 9999;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
        .loading-bar {
            height: 100%;
            background: linear-gradient(90deg, #007bff, #28a745, #007bff);
            background-size: 200% 100%;
            animation: progressMove 2s infinite;
            width: 0%;
            transition: width 0.3s ease;
        }
        .loading-text {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 12px;
            color: #666;
            opacity: 0.7;
        }
        @keyframes progressMove {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyle;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loadingIndicator);
}

function hideLoadingProgress() {
    const loader = document.getElementById('progressive-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.remove(), 500);
    }
}

function initializeProgressiveElements() {
    // Add initial hidden state to all animatable elements
    const elementsToAnimate = [
        '.card-services',
        '.about-card', 
        '.work-card',
        '.training-pill',
        '.carousel-item',
        '.footer-section'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('progressive-load');
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

function setupProgressiveLoading() {
    // Enhanced observer options for better performance
    const observerOptions = {
        threshold: [0.1, 0.3],
        rootMargin: '50px 0px -50px 0px'
    };

    // Main content observer
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                loadElementWithAnimation(entry.target);
                contentObserver.unobserve(entry.target); // Performance optimization
            }
        });
    }, observerOptions);

    // Section-specific observer for staggered loading
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadSectionContent(entry.target);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '30px' });

    // Observe individual elements
    document.querySelectorAll('.progressive-load').forEach(element => {
        contentObserver.observe(element);
    });

    // Observe sections for staggered animations
    document.querySelectorAll('#services, #about, #work, .footer').forEach(section => {
        sectionObserver.observe(section);
    });
}

function loadElementWithAnimation(element) {
    // Add entrance animation based on element type
    const animationType = getAnimationType(element);
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('loaded');
        
        // Add specific animation class
        element.classList.add(animationType);
        
        // Enhanced hover effects
        addHoverEffects(element);
        
    }, getStaggerDelay(element));
}

function loadSectionContent(section) {
    const sectionId = section.id || section.className;
    const children = section.querySelectorAll('.progressive-load');
    
    children.forEach((child, index) => {
        setTimeout(() => {
            if (!child.classList.contains('loaded')) {
                loadElementWithAnimation(child);
            }
        }, index * 100); // Staggered loading within section
    });
}

function getAnimationType(element) {
    if (element.classList.contains('card-services')) return 'animate-service-card';
    if (element.classList.contains('about-card')) return 'animate-about-card';
    if (element.classList.contains('work-card')) return 'animate-work-card';
    if (element.classList.contains('training-pill')) return 'animate-pill';
    return 'animate-default';
}

function getStaggerDelay(element) {
    const index = Array.from(element.parentNode.children).indexOf(element);
    return Math.min(index * 150, 800); // Max 800ms delay
}

function addHoverEffects(element) {
    if (element.classList.contains('card-services') || 
        element.classList.contains('about-card') || 
        element.classList.contains('work-card')) {
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    }
}

function addEnhancedButtonEffects() {
    // Dynamic CSS injection for enhanced effects
    const style = document.createElement('style');
    style.textContent = `
        /* Progressive loading animations */
        .progressive-load {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-service-card.loaded {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-about-card.loaded {
            animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-work-card.loaded {
            animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-pill.loaded {
            animation: bounceIn 0.6s ease-out forwards;
        }
        
        /* Keyframe animations */
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        /* Enhanced button effects */
        .card-services .btn-group .btn,
        .about-card .btn,
        .work-card .btn {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card-services .btn-group .btn::before,
        .about-card .btn::before,
        .work-card .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }

        .card-services .btn-group .btn:hover::before,
        .about-card .btn:hover::before,
        .work-card .btn:hover::before {
            left: 100%;
        }

        .card-services .btn-group .btn:hover,
        .about-card .btn:hover,
        .work-card .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
        }
        
        /* Loading state improvements */
        .progressive-load:not(.loaded) {
            pointer-events: none;
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Performance optimizations */
        .loaded {
            will-change: auto;
        }
    `;
    document.head.appendChild(style);
}