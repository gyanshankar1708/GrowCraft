/**
 * Footer Component Loader
 * Loads the footer component dynamically into pages
 */
function loadFooterComponent(relativePath = "") {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) {
    console.error(
      'Footer container not found. Make sure to add <div id="footer-container"></div> where you want the footer.'
    );
    return;
  }

  // Determine the correct path to the footer component
  const footerPath = relativePath + "components/footer.html";

  fetch(footerPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;

      // ✅ Initialize after footer is injected
      initializeFooter();
    })
    .catch((error) => {
      console.error("Error loading footer component:", error);
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

// Initialize footer functionality
function initializeFooter() {
  // Track footer links
  const footerLinks = document.querySelectorAll(".professional-footer a");
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      console.log("Footer link clicked:", e.target.href);
    });
  });

  // ✅ Newsletter form logic
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.email.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(email)) {
        Toastify({
          text: "Invalid email address ❌",
          backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
          duration: 3000,
        }).showToast();
        return;
      }

      Toastify({
        text: "Thank you for subscribing! 🎉",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        duration: 3000,
      }).showToast();

      this.reset();
    });
  } else {
    console.warn("⚠️ newsletterForm not found yet");
  }
}

// Auto-load footer when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  let relativePath = "";

  const pathSegments = path
    .split("/")
    .filter((segment) => segment && segment !== "index.html");
  if (pathSegments.length > 1) {
    relativePath = "../".repeat(pathSegments.length - 1);
  }

  if (path.includes("/src/")) {
    relativePath = "../";
  }

  loadFooterComponent(relativePath);
});

window.loadFooterComponent = loadFooterComponent;
