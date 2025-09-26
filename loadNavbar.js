
  document.addEventListener('DOMContentLoaded', function () {
    // Load navbar
    fetch("./src/components/navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar").innerHTML = data;

        // Initialize dark mode toggle (after navbar is loaded)
        new DarkModeToggle();

        // Now the logo exists — get it
      const logo = document.querySelector("#logo");

      // Function to update logo based on theme
      function updateLogo() {
        const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
        if (isDark) {
          logo.src = 'images/Logo.png';
        } else {
          logo.src = 'images/Logo_new.png';
        }
      }

      // Update logo when page loads
      updateLogo();

      // Watch for theme changes
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
            updateLogo();
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
      });
    });
  });

      