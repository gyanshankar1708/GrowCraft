// Logo switching functionality for dark mode
document.addEventListener('DOMContentLoaded', function () {
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

// JavaScript (custom carousel) 
var myCarousel = new bootstrap.Carousel('#carouselExampleDark', {
    interval: 4000,  // auto-slide time
    wrap: true       // enables infinite loop
});



document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("currentYear");
    yearSpan.textContent = new Date().getFullYear();
});
