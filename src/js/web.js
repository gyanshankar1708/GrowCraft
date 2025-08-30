
//Show/hide the back-to-top button on scroll
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
    ) {
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

// Carousel logic for "What We Made" section
(function initCarousel() {
    const wrapper = document.querySelector(".carousel-wrapper");
    if (!wrapper) return; // safety
    const scroller = wrapper.querySelector(".glass-scroll-wrapper");
    const prevBtn = wrapper.querySelector(".carousel-btn.prev");
    const nextBtn = wrapper.querySelector(".carousel-btn.next");
    const dotsContainer = document.querySelector(".carousel-dots");
    if (!scroller || !prevBtn || !nextBtn) return;

    const getCardWidth = () => {
        const first = scroller.querySelector(".glass-item");
        if (!first) return 300;
        const style = window.getComputedStyle(first);
        return (
            first.getBoundingClientRect().width +
            parseFloat(style.marginRight || 24)
        );
    };


    const updateButtons = () => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth - 2; // allow small epsilon
        prevBtn.disabled = scroller.scrollLeft <= 0;
        nextBtn.disabled = scroller.scrollLeft >= maxScroll;
        updateActiveDot();
    };


    const scrollByAmount = (dir) => {
        // If using fixed 4-dot model we'll override below after anchors built
        scroller.scrollBy({ left: dir * getCardWidth(), behavior: "smooth" });
    };

    prevBtn.addEventListener("click", () => scrollByAmount(-1));
    nextBtn.addEventListener("click", () => scrollByAmount(1));
    scroller.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    // keyboard support
    scroller.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByAmount(1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByAmount(-1);
        }
    });
    // Fixed 4-dot pagination with discrete anchor positions
    const DOT_COUNT = 4;
    let dots = [];
    let anchors = [0, 0, 0, 0];
    const computeAnchors = () => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        anchors = [0, maxScroll / 3, (2 * maxScroll) / 3, maxScroll];
    };
    const buildDots = () => {
        if (!dotsContainer) return;
        computeAnchors();
        dotsContainer.innerHTML = "";
        dots = Array.from({ length: DOT_COUNT }, (_, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.setAttribute("role", "tab");
            btn.setAttribute("aria-label", `Go to section ${idx + 1}`);
            btn.addEventListener("click", () => {
                scroller.scrollTo({ left: anchors[idx], behavior: "smooth" });
            });
            dotsContainer.appendChild(btn);
            return btn;
        });
    };
    const getActiveIndex = () => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll <= 0) return 0;
        const sl = scroller.scrollLeft;
        const ratio = sl / maxScroll;
        // Use floor so it doesn't jump early; last anchor when near end
        let idx = Math.floor(ratio * (DOT_COUNT - 1) + 0.0001);
        if (sl >= maxScroll - 2) idx = DOT_COUNT - 1; // ensure end
        return Math.min(DOT_COUNT - 1, Math.max(0, idx));
    };
    const updateActiveDot = () => {
        if (!dots.length) return;
        const idx = getActiveIndex();
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    };
    // Override arrow buttons to move between anchors for stability
    const gotoAnchorDelta = (delta) => {
        const current = getActiveIndex();
        const next = Math.min(DOT_COUNT - 1, Math.max(0, current + delta));
        scroller.scrollTo({ left: anchors[next], behavior: "smooth" });
    };
    prevBtn.addEventListener("click", () => gotoAnchorDelta(-1));
    nextBtn.addEventListener("click", () => gotoAnchorDelta(1));
    buildDots();
    window.addEventListener("resize", () => {
        buildDots();
        updateButtons();
        updateActiveDot();
    });
    // Ensure we start at the very first card (left=0) and active dot is first
    scroller.scrollTo({ left: 0, behavior: "auto" });
    updateButtons();
    updateActiveDot();
})();
