
const code = document.querySelector('.error-code');
setInterval(() => {
    code.style.transform = `translateY(${Math.sin(Date.now() / 200) * 10}px)`;
}, 50);
