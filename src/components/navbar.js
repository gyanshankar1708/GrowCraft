function setUpThemeIcon() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  let currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }, 100);

      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon(currentTheme);
      updateLogo(); // Optional but recommended
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
    if (logo) {
      logo.src = isDark ? "images/Logo.png" : "images/Logo_new.png";
    }
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


function loadNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  const currentPath = window.location.pathname;
  let navbarPath = currentPath.includes('/src/')
    ? 'components/navbar.html'
    : 'src/components/navbar.html';

  fetch(navbarPath)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text();
    })
    .then(html => {
      navbarContainer.innerHTML = html;
      setUpThemeIcon();
    })
    .catch(err => {
      console.error('Error loading navbar:', err);
      navbarContainer.innerHTML = '<nav><p>Navbar failed to load.</p></nav>';
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
