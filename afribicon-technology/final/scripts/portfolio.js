// =========================
// Portfolio Data
// =========================
const portfolioItems = [
    { id: 1, title: "Corporate Website", category: "web", description: "A modern, responsive corporate website with sleek design and fast performance.", image: "assets/images/img/portfolio1.png" },
    { id: 2, title: "E-Commerce Platform", category: "web", description: "An online store with secure payment integration and inventory management.", image: "assets/images/img/portfolio2.png" },
    { id: 3, title: "Branding for Startup", category: "branding", description: "Logo design, brand colors, typography, and marketing materials for a startup.", image: "assets/images/img/portfolio3.png" },
    { id: 4, title: "Digital Marketing Campaign", category: "marketing", description: "SEO, social media management, and online advertising for client growth.", image: "assets/images/img/portfolio4.png" },
    { id: 5, title: "Mobile App Development", category: "mobile", description: "User-friendly mobile application for Android and iOS with seamless UX.", image: "assets/images/img/portfolio5.png" },
    { id: 6, title: "Website Redesign", category: "web", description: "Redesigned client website for modern look, improved UX and faster load times.", image: "assets/images/img/portfolio6.png" }
];

// =========================
// DOM References
// =========================
const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioCategory = document.getElementById("portfolioCategory");

// =========================
// Functions
// =========================

// Render portfolio items with animation
function renderPortfolioAnimated(items) {
    const currentCards = Array.from(portfolioGrid.children);

    // Fade out existing cards
    currentCards.forEach(card => card.classList.add("hide"));

    setTimeout(() => {
        portfolioGrid.innerHTML = ""; // Clear grid

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("portfolio-card", "hide");
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="read-more-btn" onclick="window.location.href='portfolio-detail.html?portfolio=${item.id}'">Read More</button>
            `;
            portfolioGrid.appendChild(card);

            // Fade in
            setTimeout(() => card.classList.remove("hide"), 50);
        });
    }, 300); // Match animation duration
}

// Filter portfolio items
function filterPortfolio(category) {
    if (category === "all") {
        renderPortfolioAnimated(portfolioItems);
    } else {
        const filtered = portfolioItems.filter(item => item.category === category);
        renderPortfolioAnimated(filtered);
    }
}

// =========================
// Event Listeners
// =========================
if (portfolioCategory) {
    portfolioCategory.addEventListener("change", (e) => {
        filterPortfolio(e.target.value);
    });
}

// =========================
// Initial Render
// =========================
if (portfolioGrid) {
    renderPortfolioAnimated(portfolioItems);
}
