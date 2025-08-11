document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const thankYouSection = document.getElementById("thankYouSection");

  thankYouSection.style.display = "flex";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Animate form out
    form.classList.add("hide");

    // Wait for form animation to finish, then show thank-you
    setTimeout(() => {
      form.style.display = "none";
      thankYouSection.classList.add("show");

      // Scroll to thank-you section
      thankYouSection.scrollIntoView({ behavior: "smooth" });
    }, 800); // matches form animation duration
  });
});
