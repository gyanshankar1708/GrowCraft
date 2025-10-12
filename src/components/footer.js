/**
 * Footer Component Loader
 * Loads the footer component dynamically into pages
 */

// Function to load footer component
function loadFooterComponent(relativePath = '') {
  const footerContainer = document.getElementById('footer-container');
  
  if (!footerContainer) {
    console.error('Footer container not found. Make sure to add <div id="footer-container"></div> where you want the footer.');
    return;
  }

  // Determine the correct path to the footer component
  const footerPath = relativePath + 'components/footer.html';
  
  fetch(footerPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      footerContainer.innerHTML = html;
      
      // Initialize any footer-specific functionality here if needed
      initializeFooter();
    })
    .catch(error => {
      console.error('Error loading footer component:', error);
      // Fallback footer content
      footerContainer.innerHTML = `
        <footer class="professional-footer">
          <div class="container">
            <div class="row py-4">
              <div class="col-12 text-center">
                <p>© 2024 <strong>GrowCraft</strong>. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      `;
    });
}

// Function to initialize footer functionality
function initializeFooter() {
  // Add any footer-specific JavaScript functionality here
  // For example, analytics tracking, scroll effects, etc.
  
  // Example: Add click tracking for footer links
  const footerLinks = document.querySelectorAll('.professional-footer a');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Add analytics or tracking code here if needed
      console.log('Footer link clicked:', e.target.href);
    });
  });
}

// Auto-load footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Determine if we're in a subdirectory and need a relative path
  const path = window.location.pathname;
  let relativePath = '';
  
  // Count directory depth to determine relative path
  const pathSegments = path.split('/').filter(segment => segment && segment !== 'index.html');
  if (pathSegments.length > 1) {
    relativePath = '../'.repeat(pathSegments.length - 1);
  }
  
  // Special handling for src/ directory
  if (path.includes('/src/')) {
    relativePath = '../';
  }
  
  loadFooterComponent(relativePath);
});

// Export for manual loading if needed
window.loadFooterComponent = loadFooterComponent;