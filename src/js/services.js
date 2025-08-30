
document.querySelectorAll(".read-more").forEach((btn) => {
    btn.addEventListener("click", () => {
        const extra = btn.closest(".card-body").querySelector(".extra");
        extra.classList.toggle("d-none");
        btn.textContent = extra.classList.contains("d-none") ? "Read More" : "Read Less";
    });
});

