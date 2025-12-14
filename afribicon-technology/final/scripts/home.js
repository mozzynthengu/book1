/* eslint-env browser */
/* ============================================================
   HOME.JS — HERO SLIDER + MOBILE NAV + SEARCH
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= HERO SLIDER ================= */
    let currentSlide = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const prevBtn = document.getElementById("prevHero");
    const nextBtn = document.getElementById("nextHero");
    const indicators = document.getElementById("heroIndicators");

    if (slides.length > 0) {
        // Create dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.dataset.index = index;
            dot.setAttribute("aria-label", `Slide ${index + 1}`);
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll("span");

        const showSlide = index => {
            slides.forEach(s => s.classList.remove("active"));
            dots.forEach(d => d.classList.remove("active-dot"));

            slides[index].classList.add("active");
            dots[index].classList.add("active-dot");

            currentSlide = index;
        };

        const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
        const prevSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);

        let slideInterval = setInterval(nextSlide, 6000);

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        };

        // Navigation buttons
        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });

        // Dot click
        dots.forEach(dot => {
            dot.addEventListener("click", e => {
                showSlide(Number(e.target.dataset.index));
                resetInterval();
            });
        });

        // Touch swipe for mobile
        let startX = 0;
        slides.forEach(slide => {
            slide.addEventListener("touchstart", e => startX = e.touches[0].clientX);
            slide.addEventListener("touchend", e => {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) { nextSlide(); resetInterval(); }
                if (endX - startX > 50) { prevSlide(); resetInterval(); }
            });
        });

        // Initialize first slide
        showSlide(0);
    }

    /* ================= MOBILE NAVIGATION ================= */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            hamburger.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
        });

        // Close menu when clicking outside
        document.addEventListener("click", e => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ================= SEARCH BAR (OPTIONAL) ================= */
    const searchField = document.querySelector(".nav-search input");
    if (searchField) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("q");
        if (searchQuery) searchField.value = searchQuery;
    }

});
