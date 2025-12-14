/* eslint-env browser */
/* eslint max-len: ["error", { "code": 120 }] */

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // Services Data
    // =========================
    const services = [
        { id: 1, title: "Website Design", category: "web", description: "Modern, mobile-friendly, and professional websites tailored for your business.", image: "assets/images/img/web1.png" },
        { id: 2, title: "Hosting", category: "hosting", description: "Reliable and secure hosting solutions for websites and applications.", image: "assets/images/img/host.jpeg" },
        { id: 3, title: "E-Commerce Solutions", category: "ecommerce", description: "Sell your products online with secure and fast e-commerce platforms.", image: "assets/images/img/eco.jpeg" },
        { id: 4, title: "Custom Systems", category: "custom", description: "Tailor-made software solutions for your business needs.", image: "assets/images/img/custom.jpeg" },
        { id: 5, title: "School/Clinic Systems", category: "school", description: "Professional systems to manage schools, clinics, and organizations.", image: "assets/images/img/sclinic.jpeg" },
        { id: 6, title: "Branding & Graphic Design", category: "branding", description: "Professional logos, branding kits, posters, and marketing materials.", image: "assets/images/img/dez.png" },
        { id: 7, title: "IT Consulting", category: "it", description: "Expert guidance for technology adoption, systems, and digital transformation.", image: "assets/images/img/it.png" },
        { id: 8, title: "Maintenance", category: "maintenance", description: "Keep your websites and systems running smoothly with regular updates and support.", image: "assets/images/img/Maintain.jpeg" },
        { id: 9, title: "Cybersecurity", category: "cybersecurity", description: "Protect your data and systems from cyber threats and attacks.", image: "assets/images/img/cyber.jpeg" },
        { id: 10, title: "Mobile App Development", category: "mobile", description: "Create user-friendly mobile applications for Android and iOS.", image: "assets/images/img/mobile.jpeg" },
        { id: 11, title: "Digital Marketing", category: "marketing", description: "Grow your online presence with SEO, social media, and ad campaigns.", image: "assets/images/img/digit.jpeg" },
        { id: 12, title: "Cloud Solutions", category: "cloud", description: "Scalable and secure cloud solutions for your business infrastructure.", image: "assets/images/img/cloud.jpeg" }
    ];

    // =========================
    // DOM References
    // =========================
    const servicesGrid = document.getElementById("servicesGrid");
    const serviceCategory = document.getElementById("serviceCategory");
    const searchInput = document.querySelector(".nav-search input");

    // =========================
    // Render services with fade
    // =========================
    function renderServices(filteredServices) {
        servicesGrid.innerHTML = "";

        if (filteredServices.length === 0) {
            servicesGrid.innerHTML = `<p style="text-align:center; color:#1B5E20;">No services found.</p>`;
            return;
        }

        filteredServices.forEach((service, index) => {
            const card = document.createElement("div");
            card.className = "service-card hide";
            card.tabIndex = 0;
            card.innerHTML = `
                <img src="${service.image}" alt="${service.title}" loading="lazy">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <button class="read-more-btn" aria-label="Read more about ${service.title}">Read More</button>
            `;
            servicesGrid.appendChild(card);

            // Animate fade-in
            setTimeout(() => card.classList.remove("hide"), index * 50);

            // Read More click
            card.querySelector(".read-more-btn").addEventListener("click", () => {
                window.location.href = `service-detail.html?service=${service.category}`;
            });

            // Keyboard accessibility
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    card.querySelector(".read-more-btn").click();
                }
            });
        });
    }

    // =========================
    // Filter services
    // =========================
    function filterServices(category) {
        const filtered = category === "all" ? services : services.filter(s => s.category === category);
        renderServices(filtered);
    }

    // =========================
    // Search services (with debounce)
    // =========================
    let searchTimeout;
    function searchServices(keyword) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const filtered = services.filter(s =>
                s.title.toLowerCase().includes(keyword.toLowerCase().trim()) ||
                s.description.toLowerCase().includes(keyword.toLowerCase().trim()) ||
                s.category.toLowerCase().includes(keyword.toLowerCase().trim())
            );
            renderServices(filtered);
        }, 300);
    }

    // =========================
    // Event listeners
    // =========================
    if (serviceCategory) {
        serviceCategory.addEventListener("change", e => filterServices(e.target.value));
    }

    if (searchInput) {
        searchInput.addEventListener("input", e => searchServices(e.target.value));
    }

    // =========================
    // Initial render
    // =========================
    renderServices(services);

    // =========================
    // Handle URL query
    // =========================
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("q");
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        searchServices(searchQuery);
    }
});
