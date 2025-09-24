
  document.addEventListener('DOMContentLoaded', function () {
    // Load navbar
    fetch("./components/navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar").innerHTML = data;

        // Initialize dark mode toggle (after navbar is loaded)
        new DarkModeToggle();

        // Now the logo exists — get it
        const logo = document.querySelector('#logo');

        if (logo) {
          function updateLogo() {
            const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
            logo.src = isDark
              ? logo.getAttribute("data-dark-src") || './images/logo-transparent-dark-mode.png'
              : logo.getAttribute("data-light-src") || './images/logo_bg_transparent.png';
          }

          updateLogo();

          const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                updateLogo();
              }
            });
          });

          observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme']
          });
        }
      })
      .catch(error => console.error("Navbar load error:", error));
  });