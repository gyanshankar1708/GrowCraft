// FAQ JavaScript - Clean Implementation
document.addEventListener('DOMContentLoaded', function() {
  initializeFAQ();
});

function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon i');
    const iconContainer = item.querySelector('.faq-icon');
    
    // Remove any existing onclick attributes to avoid conflicts
    question.removeAttribute('onclick');
    
    // Add click event listener
    question.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if this item is currently active
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon i');
        const otherIconContainer = otherItem.querySelector('.faq-icon');
        const otherQuestion = otherItem.querySelector('.faq-question');
        
        if (otherAnswer) {
          otherAnswer.classList.remove('show');
        }
        
        if (otherIcon) {
          otherIcon.classList.remove('fa-minus');
          otherIcon.classList.add('fa-plus');
        }
        
        if (otherIconContainer) {
          otherIconContainer.classList.remove('rotated');
        }
        
        if (otherQuestion) {
          otherQuestion.style.background = '';
          otherQuestion.style.color = '';
          const h3 = otherQuestion.querySelector('h3');
          if (h3) h3.style.color = '';
        }
      });
      
      // If item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        
        if (answer) {
          answer.classList.add('show');
        }
        
        if (icon) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        }
        
        if (iconContainer) {
          iconContainer.classList.add('rotated');
        }
        
        // Apply hover styles permanently when open
        question.style.background = 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)';
        question.style.color = 'white';
        const h3 = question.querySelector('h3');
        if (h3) {
          h3.style.color = 'white';
        }
        
        // Scroll to question smoothly after animation
        setTimeout(() => {
          question.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }, 300);
      }
    });
    
    // Add keyboard accessibility
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}

// Auto-expand FAQ if URL contains hash
window.addEventListener('load', function() {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const faqNumber = hash.replace('faq-', '');
    const targetItem = document.querySelector(`[data-faq="${faqNumber}"]`);
    
    if (targetItem) {
      const question = targetItem.querySelector('.faq-question');
      if (question) {
        setTimeout(() => {
          question.click();
        }, 500);
      }
    }
  }
});
