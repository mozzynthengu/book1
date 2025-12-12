// =========================
// Portfolio Data
// =========================
const portfolioItems = [
    {
        id: 1,
        title: "Corporate Website",
        category: "web",
        description: "A modern, responsive corporate website with sleek design and fast performance.",
        image: "assets/images/img/portfolio1.png",
        details: "Built with HTML, CSS, and JavaScript, fully optimized for SEO and mobile devices."
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        category: "web",
        description: "An online store with secure payment integration and inventory management.",
        image: "assets/images/img/portfolio2.png",
        details: "Developed on Shopify and integrated with payment gateways and logistics systems."
    },
    {
        id: 3,
        title: "Branding for Startup",
        category: "branding",
        description: "Logo design, brand colors, typography, and marketing materials for a startup.",
        image: "assets/images/img/portfolio3.png",
        details: "Focused on brand consistency and visual identity across all platforms."
    },
    {
        id: 4,
        title: "Digital Marketing Campaign",
        category: "marketing",
        description: "SEO, social media management, and online advertising for client growth.",
        image: "assets/images/img/portfolio4.png",
        details: "Campaign analytics, performance tracking, and ROI optimization included."
    },
    {
        id: 5,
        title: "Mobile App Development",
        category: "mobile",
        description: "User-friendly mobile application for Android and iOS with seamless UX.",
        image: "assets/images/img/portfolio5.png",
        details: "Built using Flutter, integrated with backend APIs and push notifications."
    },
    {
        id: 6,
        title: "Website Redesign",
        category: "web",
        description: "Redesigned client website for modern look, improved UX and faster load times.",
        image: "assets/images/img/portfolio6.png",
        details: "Implemented responsive design, accessibility improvements, and SEO optimization."
    }
];

// =========================
// DOM References
// =========================
const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioCategory = document.getElementById("portfolioCategory");

// =========================
// Functions
// =========================

// Render portfolio items
function renderPortfolioAnimated(filteredItems) {
    const currentCards = Array.from(portfolioGrid.children);

    // Fade out current cards
    currentCards.forEach(card => card.classList.add("hide"));

    setTimeout(() => {
        portfolioGrid.innerHTML = ""; // Clear grid

        filteredItems.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("portfolio-card", "hide");
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="read-more-btn" onclick="window.location.href='portfolio-detail.html?portfolio=${item.id}'">Read More</button>
            `;
            portfolioGrid.appendChild(card);

            setTimeout(() => card.classList.remove("hide"), 50);
        });
    }, 400);
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
portfolioCategory.addEventListener("change", (e) => {
    filterPortfolio(e.target.value);
});

// Initial render
renderPortfolioAnimated(portfolioItems);
