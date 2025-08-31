const phoneInputField = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInputField, {
  preferredCountries: ["in", "us", "gb"],
  separateDialCode: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
});

phoneInputField.addEventListener("input", () => {
  phoneInputField.value = phoneInputField.value.replace(/\D/g, "");
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!iti.isValidNumber()) {
    phoneInputField.classList.add("is-invalid");
    return;
  } else {
    phoneInputField.classList.remove("is-invalid");
  }
  const fullPhoneNumber = iti.getNumber();
  console.log("Full phone number:", fullPhoneNumber);

  this.submit();
});


document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("PreferredDate");
    const today = new Date().toISOString().split("T")[0]; 
    dateInput.setAttribute("min", today);
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        alert("Please fill all required fields.");
      }
    });