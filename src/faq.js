// FAQ JavaScript - Interactive Accordion Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize FAQ functionality
  initializeFAQ();
  
  // Add smooth scrolling for internal links
  initializeSmoothScrolling();
  
  // Add search functionality (optional enhancement)
  initializeFAQSearch();
});

// Main FAQ Initialization
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon i');
    
    // Add click event listener to each question
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon i');
          
          // Slide up other answers
          slideUp(otherAnswer);
          
          // Reset other icons
          if (otherIcon) {
            otherIcon.className = 'fas fa-plus';
          }
        }
      });
      
      // Toggle current item
      if (isActive) {
        // Close current item
        item.classList.remove('active');
        slideUp(answer);
        if (icon) icon.className = 'fas fa-plus';
      } else {
        // Open current item
        item.classList.add('active');
        slideDown(answer);
        if (icon) icon.className = 'fas fa-minus';
        
        // Scroll to question smoothly
        setTimeout(() => {
          question.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    });
    
    // Add keyboard navigation
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
    
    // Make questions focusable
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', `faq-answer-${index + 1}`);
    
    // Add IDs to answers for accessibility
    answer.setAttribute('id', `faq-answer-${index + 1}`);
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', `faq-question-${index + 1}`);
    
    // Add ID to question for accessibility
    question.setAttribute('id', `faq-question-${index + 1}`);
  });
}

// Smooth slide down animation
function slideDown(element) {
  element.style.display = 'block';
  element.style.height = '0px';
  element.style.overflow = 'hidden';
  element.style.transition = 'height 0.4s ease';
  
  const height = element.scrollHeight + 'px';
  
  // Trigger reflow
  element.offsetHeight;
  
  element.style.height = height;
  
  setTimeout(() => {
    element.style.height = '';
    element.style.overflow = '';
    element.style.transition = '';
  }, 400);
}

// Smooth slide up animation
function slideUp(element) {
  element.style.height = element.scrollHeight + 'px';
  element.style.overflow = 'hidden';
  element.style.transition = 'height 0.4s ease';
  
  // Trigger reflow
  element.offsetHeight;
  
  element.style.height = '0px';
  
  setTimeout(() => {
    element.style.display = 'none';
    element.style.height = '';
    element.style.overflow = '';
    element.style.transition = '';
  }, 400);
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal links with valid targets
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Optional: FAQ Search Functionality
function initializeFAQSearch() {
  // Create search input if it doesn't exist
  const searchContainer = document.createElement('div');
  searchContainer.className = 'faq-search-container mb-4';
  searchContainer.innerHTML = `
    <div class="input-group">
      <input type="text" id="faqSearch" class="form-control" placeholder="Search FAQ..." aria-label="Search FAQ">
      <button class="btn btn-outline-secondary" type="button" onclick="clearFAQSearch()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Insert search before FAQ container
  const faqContainer = document.querySelector('.faq-container');
  if (faqContainer) {
    faqContainer.parentNode.insertBefore(searchContainer, faqContainer);
    
    // Add search functionality
    const searchInput = document.getElementById('faqSearch');
    searchInput.addEventListener('input', performFAQSearch);
  }
}

// Perform FAQ search
function performFAQSearch() {
  const searchTerm = document.getElementById('faqSearch').value.toLowerCase();
  const faqItems = document.querySelectorAll('.faq-item');
  let hasResults = false;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = 'block';
      hasResults = true;
      
      // Highlight search terms (optional)
      if (searchTerm.length > 2) {
        highlightSearchTerm(item, searchTerm);
      }
    } else {
      item.style.display = 'none';
      // Remove previous highlights
      removeHighlights(item);
    }
  });
  
  // Show/hide no results message
  showNoResultsMessage(!hasResults && searchTerm.length > 0);
}

// Clear FAQ search
function clearFAQSearch() {
  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.value = '';
    performFAQSearch();
  }
}

// Highlight search terms
function highlightSearchTerm(element, term) {
  // Remove previous highlights first
  removeHighlights(element);
  
  if (term.length < 3) return; // Don't highlight very short terms
  
  const textNodes = getTextNodes(element);
  const regex = new RegExp(`(${term})`, 'gi');
  
  textNodes.forEach(node => {
    if (node.textContent.toLowerCase().includes(term)) {
      const parent = node.parentNode;
      const wrapper = document.createElement('span');
      wrapper.innerHTML = node.textContent.replace(regex, '<mark class="faq-highlight">$1</mark>');
      parent.replaceChild(wrapper, node);
    }
  });
}

// Remove highlights
function removeHighlights(element) {
  const highlights = element.querySelectorAll('.faq-highlight');
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    parent.normalize();
  });
}

// Get text nodes
function getTextNodes(element) {
  const textNodes = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  
  return textNodes;
}

// Show/hide no results message
function showNoResultsMessage(show) {
  let noResultsMsg = document.querySelector('.faq-no-results');
  
  if (show && !noResultsMsg) {
    noResultsMsg = document.createElement('div');
    noResultsMsg.className = 'faq-no-results text-center py-5';
    noResultsMsg.innerHTML = `
      <div class="mb-3">
        <i class="fas fa-search fa-3x text-muted"></i>
      </div>
      <h4>No results found</h4>
      <p class="text-muted">Try different keywords or browse all questions below.</p>
      <button class="btn btn-outline-primary" onclick="clearFAQSearch()">
        <i class="fas fa-times"></i> Clear Search
      </button>
    `;
    
    const faqContainer = document.querySelector('.faq-container');
    faqContainer.appendChild(noResultsMsg);
  } else if (!show && noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Add CSS for search highlights
const style = document.createElement('style');
style.textContent = `
  .faq-search-container {
    max-width: 400px;
    margin: 0 auto 2rem auto;
  }
  
  .faq-highlight {
    background-color: #ffeb3b;
    padding: 0.1em 0.2em;
    border-radius: 3px;
    font-weight: bold;
  }
  
  .faq-no-results {
    background: rgba(76, 175, 80, 0.05);
    border: 2px dashed rgba(76, 175, 80, 0.3);
    border-radius: 15px;
    margin: 2rem 0;
    padding: 2rem;
  }
  
  /* Dark mode support for search */
  .dark-mode .faq-highlight,
  .dark .faq-highlight {
    background-color: #ffc107;
    color: #000;
  }
  
  .dark-mode .faq-no-results,
  .dark .faq-no-results {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(76, 175, 80, 0.4);
  }
`;
document.head.appendChild(style);

// Auto-expand FAQ if URL contains hash
window.addEventListener('load', function() {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target && target.closest('.faq-item')) {
      const faqItem = target.closest('.faq-item');
      const question = faqItem.querySelector('.faq-question');
      if (question) {
        setTimeout(() => {
          question.click();
        }, 500);
      }
    }
  }
});

// Export functions for global access (if needed)
window.clearFAQSearch = clearFAQSearch;
