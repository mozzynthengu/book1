/* ============================================================
   MAIN JS — COMMON FUNCTIONS ACROSS PAGES
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================
       MOBILE NAVIGATION
    ======================== */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        // Toggle menu
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            hamburger.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ========================
       HERO SLIDER (if present)
    ======================== */
    const slides = document.querySelectorAll(".hero-slide");
    const nextBtn = document.getElementById("nextHero");
    const prevBtn = document.getElementById("prevHero");
    const indicators = document.getElementById("heroIndicators");

    if (slides.length > 0) {
        let currentSlide = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.dataset.index = index;
            dot.setAttribute("aria-label", `Slide ${index + 1}`);
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll("span");

        function showSlide(index) {
            slides.forEach(s => s.classList.remove("active"));
            dots.forEach(d => d.classList.remove("active-dot"));
            slides[index].classList.add("active");
            dots[index].classList.add("active-dot");
            currentSlide = index;
        }

        function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
        function prevSlide() { showSlide((currentSlide - 1 + slides.length) % slides.length); }

        let slideInterval = setInterval(nextSlide, 6000);
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }

        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });

        dots.forEach(dot => dot.addEventListener("click", (e) => {
            showSlide(Number(e.target.dataset.index));
            resetInterval();
        }));

        // Mobile swipe
        let startX = 0;
        slides.forEach(slide => {
            slide.addEventListener("touchstart", e => startX = e.touches[0].clientX);
            slide.addEventListener("touchend", e => {
                let endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) { nextSlide(); resetInterval(); }
                if (endX - startX > 50) { prevSlide(); resetInterval(); }
            });
        });

        // Initialize
        showSlide(0);
    }

    /* ========================
       SERVICE SEARCH (if present)
    ======================== */
    const searchField = document.querySelector(".nav-search input");
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("q");

    if (searchQuery && searchField) {
        searchField.value = searchQuery;

        if (typeof services !== "undefined" && typeof renderServicesAnimated !== "undefined") {
            const filtered = services.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.category.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filtered.length > 0) {
                renderServicesAnimated(filtered);
            } else if (typeof servicesGrid !== "undefined") {
                servicesGrid.innerHTML = `
                    <p style="text-align:center; font-size:1.2rem; color:#1B5E20;">
                        No services found for '${searchQuery}'
                    </p>`;
            }
        }
    }

});
