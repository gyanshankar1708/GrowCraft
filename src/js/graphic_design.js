
// Generate floating shapes dynamically
const container = document.getElementById("visual");
const colors = ["#6c63ff", "#ff6584", "#3dc1d3", "#feca57"];

for (let i = 0; i < 8; i++) {
    let shape = document.createElement("div");
    let size = Math.random() * 60 + 40;
    shape.classList.add("shape");
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.background = colors[Math.floor(Math.random() * colors.length)];
    shape.style.left = `${Math.random() * 80}%`;
    shape.style.top = `${Math.random() * 80}%`;
    shape.style.animationDuration = `${6 + Math.random() * 5}s`;
    container.appendChild(shape);
}
const items = document.querySelectorAll(".benefit-item");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
let index = 0;

function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
        t.classList.toggle("active", idx === i);
        dots[idx].classList.toggle("active", idx === i);
    });
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showTestimonial(index);
    });
});

// Auto-slide every 5s
setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
}, 5000);
