console.log("script.js is loading");
console.log(document.getElementById("backToTop"));

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

  // Initialize scroll animations
  initScrollAnimations();
});

// === Scroll Animation System ===
function initScrollAnimations() {
  // Create Intersection Observer for better performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a small delay to make animations feel more natural
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, 100);
        // Stop observing after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  addAnimationClasses();
  
  // Small delay before starting observations to ensure page is ready
  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.fade-in-element, .slide-left, .slide-right, .scale-up');
    animatedElements.forEach(el => observer.observe(el));
  }, 500);
}

function addAnimationClasses() {
  // Skip service cards to avoid merge conflicts - keep them as they are
  
  // Animate work/gallery cards
  const workCards = document.querySelectorAll('.work-card, .gallery-card');
  workCards.forEach((card, index) => {
    if (!card.classList.contains('fade-in-element')) {
      card.classList.add('fade-in-element');
      if (index > 0) {
        card.classList.add(`delay-${Math.min(index % 3 + 1, 3)}`);
      }
    }
  });

  // Animate headings (but skip navbar and carousel headings)
  const headings = document.querySelectorAll('h1, h2, h3, .heading-text');
  headings.forEach((heading) => {
    if (!heading.closest('.navbar') && !heading.closest('.carousel-caption') && !heading.classList.contains('fade-in-element')) {
      heading.classList.add('fade-in-element');
    }
  });

  // Animate about section content
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutImages = aboutSection.querySelectorAll('img');
    const aboutText = aboutSection.querySelectorAll('.about-us, .founder-detail');
    
    aboutImages.forEach(img => {
      if (!img.classList.contains('slide-left')) {
        img.classList.add('slide-left');
      }
    });
    
    aboutText.forEach((text, index) => {
      if (!text.classList.contains('slide-right') && !text.classList.contains('slide-left')) {
        text.classList.add('slide-right');
      }
    });
  }

  // Animate buttons (but skip navbar buttons and carousel controls)
  const buttons = document.querySelectorAll('.btn:not(.carousel-control-prev):not(.carousel-control-next), .redirect-btns button');
  buttons.forEach(button => {
    if (!button.closest('.navbar') && !button.closest('.carousel') && !button.classList.contains('scale-up')) {
      button.classList.add('scale-up');
    }
  });

  // Keep footer exactly as it is - no animations to avoid conflicts
  
  // Animate training links in services section
  const trainingLinks = document.querySelectorAll('.training-links');
  trainingLinks.forEach((link, index) => {
    if (!link.classList.contains('scale-up')) {
      link.classList.add('scale-up');
      if (index > 0) {
        link.classList.add(`delay-${Math.min(index % 3 + 1, 3)}`);
      }
    }
  });
}
