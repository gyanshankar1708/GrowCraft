
const btns = document.querySelectorAll(".btn-read-more");
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const extra = btn.previousElementSibling;
        extra.style.display =
            extra.style.display === "block" ? "none" : "block";
        btn.textContent =
            btn.textContent === "Read More" ? "Read Less" : "Read More";
    });
});