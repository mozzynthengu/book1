/* eslint-env browser */
/* ============================================================
   HOME.JS — HERO SLIDER (HOME PAGE ONLY)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================
       HERO SLIDER SETUP
    ======================== */
    const slides = document.querySelectorAll(".hero-slide");
    const prevBtn = document.getElementById("prevHero");
    const nextBtn = document.getElementById("nextHero");
    const indicators = document.getElementById("heroIndicators");

    // Exit early if hero does not exist
    if (!slides.length || !indicators) return;

    let currentSlide = 0;
    let slideInterval;

    /* ========================
       CREATE INDICATORS
    ======================== */
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.dataset.index = index;
        dot.setAttribute("aria-label", `Slide ${index + 1}`);
        indicators.appendChild(dot);
    });

    const dots = indicators.querySelectorAll("span");

    /* ========================
       SLIDE CONTROLS
    ======================== */
    const showSlide = index => {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active-dot"));

        slides[index].classList.add("active");
        dots[index].classList.add("active-dot");

        currentSlide = index;
    };

    const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);

    /* ========================
       AUTO SLIDE
    ======================== */
    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoSlide = () => {
        clearInterval(slideInterval);
        startAutoSlide();
    };

    /* ========================
       BUTTON EVENTS
    ======================== */
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    /* ========================
       DOT EVENTS
    ======================== */
    dots.forEach(dot => {
        dot.addEventListener("click", e => {
            showSlide(Number(e.target.dataset.index));
            resetAutoSlide();
        });
    });

    /* ========================
       TOUCH SWIPE (MOBILE)
    ======================== */
    let startX = 0;

    slides.forEach(slide => {
        slide.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        slide.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;

            if (startX - endX > 50) {
                nextSlide();
                resetAutoSlide();
            }

            if (endX - startX > 50) {
                prevSlide();
                resetAutoSlide();
            }
        });
    });

    /* ========================
       INITIALIZE
    ======================== */
    showSlide(0);
    startAutoSlide();

});
