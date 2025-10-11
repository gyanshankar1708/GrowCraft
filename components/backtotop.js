

// Scroll to top functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 50) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
