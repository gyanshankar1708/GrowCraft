
//Show/hide the back-to-top button on scroll
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to top smoothly when back-to-top button is clicked
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTop");
    if (btn) {
        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});



const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("cta-btn");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        alert(`Learn more about our ${card.querySelector("h3").innerText} service!`);
    });
});

const benefitItems = document.querySelectorAll(".benefit-alt-item");

const revealOnScroll = () => {
    benefitItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }
    });
};

benefitItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);

document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");

    let scrollAmount = 0;
    setInterval(() => {
        if (timeline.scrollLeft + timeline.clientWidth >= timeline.scrollWidth) {
            timeline.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            scrollAmount += 280;
            timeline.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    }, 4000);
});


document.addEventListener("DOMContentLoaded", () => {
    const caseCards = document.querySelectorAll(".case-card");

    caseCards.forEach(card => {
        const fill = card.querySelector(".progress-fill");
        const resultText = card.querySelector(".result-text");
        const resultValue = card.getAttribute("data-result");

        // Animate when card comes into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fill.style.width = resultValue;
                    resultText.textContent = resultValue + " Growth";
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(card);
    });
});
