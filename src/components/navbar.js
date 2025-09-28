   function setUpThemeIcon(){
   /* Enhanced Theme Toggle Functionality */
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      
      // Get current theme from localStorage or default to 'light'
      let currentTheme = localStorage.getItem('theme') || 'light';
      
      // Apply theme on page load
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
      updateThemeIcon(currentTheme);
      
      // Theme toggle event listener
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          // Add click animation
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          }, 100);
          
          // Toggle theme
          currentTheme = currentTheme === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-bs-theme', currentTheme);
          localStorage.setItem('theme', currentTheme);
          updateThemeIcon(currentTheme);
        });
      }
      
      function updateThemeIcon(theme) {
        if (themeIcon) {
          if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.transform = 'rotate(180deg)';
          } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0deg)';
          }
        }
      }
      const logo = document.querySelector("#logo");
      function updateLogo() {
        const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
        logo.src = isDark ? "/GrowCraft/images/Logo.png" : "/GrowCraft/images/Logo_new.png";
      }

      updateLogo();
      const themeObserver = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
          if (mutation.type === "attributes" && mutation.attributeName === "data-bs-theme") {
            updateLogo();
          }
        }
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-bs-theme"],
      });

            /* Enhanced Navbar Scroll Effect */
      const navbar = document.querySelector('.navbar');
      let lastScrollY = window.scrollY;

      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
      });
    }