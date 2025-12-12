/* ========================
   Optimized Hero Slider
======================== */

let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.getElementById("prevHero");
const nextBtn = document.getElementById("nextHero");
const indicators = document.getElementById("heroIndicators");

// Create dots dynamically
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.dataset.index = index;
    dot.setAttribute("aria-label", `Slide ${index + 1}`);
    indicators.appendChild(dot);
});

const dots = indicators.querySelectorAll("span");

// Function to show a specific slide
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active-dot"));

    slides[index].classList.add("active");
    dots[index].classList.add("active-dot");

    currentSlide = index;
}

// Next and previous controls
function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Auto-slide with reset on manual navigation
let slideInterval = setInterval(nextSlide, 6000);
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
}

// Event listeners
nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        showSlide(Number(e.target.dataset.index));
        resetInterval();
    });
});

// Swipe support for mobile
let startX = 0;
let endX = 0;

slides.forEach(slide => {
    slide.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    slide.addEventListener("touchmove", e => endX = e.touches[0].clientX);
    slide.addEventListener("touchend", () => {
        if (startX - endX > 50) { nextSlide(); resetInterval(); }
        if (endX - startX > 50) { prevSlide(); resetInterval(); }
    });
});

// Initialize first slide
showSlide(0);
