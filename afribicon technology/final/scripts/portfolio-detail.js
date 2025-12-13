// =========================
// Portfolio Detail JS
// =========================

// Get the portfolio ID from URL query string
function getPortfolioId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("portfolio");
}

// Portfolio Data (same as portfolio.js)
const portfolioItems = [
    {
        id: "1",
        title: "Corporate Website",
        category: "web",
        description: "A modern, responsive corporate website with sleek design and fast performance.",
        image: "assets/images/img/portfolio1.png",
        details: "Built with HTML, CSS, and JavaScript, fully optimized for SEO and mobile devices."
    },
    {
        id: "2",
        title: "E-Commerce Platform",
        category: "web",
        description: "An online store with secure payment integration and inventory management.",
        image: "assets/images/img/portfolio2.png",
        details: "Developed on Shopify and integrated with payment gateways and logistics systems."
    },
    {
        id: "3",
        title: "Branding for Startup",
        category: "branding",
        description: "Logo design, brand colors, typography, and marketing materials for a startup.",
        image: "assets/images/img/portfolio3.png",
        details: "Focused on brand consistency and visual identity across all platforms."
    },
    {
        id: "4",
        title: "Digital Marketing Campaign",
        category: "marketing",
        description: "SEO, social media management, and online advertising for client growth.",
        image: "assets/images/img/portfolio4.png",
        details: "Campaign analytics, performance tracking, and ROI optimization included."
    },
    {
        id: "5",
        title: "Mobile App Development",
        category: "mobile",
        description: "User-friendly mobile application for Android and iOS with seamless UX.",
        image: "assets/images/img/portfolio5.png",
        details: "Built using Flutter, integrated with backend APIs and push notifications."
    },
    {
        id: "6",
        title: "Website Redesign",
        category: "web",
        description: "Redesigned client website for modern look, improved UX and faster load times.",
        image: "assets/images/img/portfolio6.png",
        details: "Implemented responsive design, accessibility improvements, and SEO optimization."
    }
];

// Reference to container
const portfolioDetail = document.getElementById("portfolioDetail");

// Render the portfolio detail
function renderPortfolioDetail(id) {
    const item = portfolioItems.find(p => p.id === id);

    if (!item) {
        portfolioDetail.innerHTML = `<p>Portfolio item not found.</p>`;
        return;
    }

    // Build the card
    const card = document.createElement("div");
    card.classList.add("portfolio-detail-card");
    card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h1>${item.title}</h1>
        <h3>Description</h3>
        <p>${item.description}</p>
        <h3>Details</h3>
        <p>${item.details}</p>
        <a class="back-btn" href="portfolio.html">← Back to Portfolio</a>
    `;

    // Start hidden for fade-in
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    portfolioDetail.appendChild(card);

    // Trigger fade-in
    setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
    }, 50);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    const id = getPortfolioId();
    renderPortfolioDetail(id);
});
