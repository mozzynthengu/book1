// =========================
// Services Data
// =========================
const services = [
    {
        id: 1,
        title: "Website Design",
        category: "web",
        description: "Modern, mobile-friendly, and professional websites tailored for your business.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 2,
        title: "Hosting",
        category: "hosting",
        description: "Reliable and secure hosting solutions for websites and applications.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 3,
        title: "E-Commerce Solutions",
        category: "ecommerce",
        description: "Sell your products online with secure and fast e-commerce platforms.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 4,
        title: "Custom Systems",
        category: "custom",
        description: "Tailor-made software solutions for your business needs.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 5,
        title: "School/Clinic Systems",
        category: "school",
        description: "Professional systems to manage schools, clinics, and organizations.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 6,
        title: "Branding & Graphic Design",
        category: "branding",
        description: "Professional logos, branding kits, posters, and marketing materials.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 7,
        title: "IT Consulting",
        category: "it",
        description: "Expert guidance for technology adoption, systems, and digital transformation.",
        image: "assets/images/img/it.png"
    },
    {
        id: 8,
        title: "Maintenance",
        category: "maintenance",
        description: "Keep your websites and systems running smoothly with regular updates and support.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 9,
        title: "Cybersecurity",
        category: "cybersecurity",
        description: "Protect your data and systems from cyber threats and attacks.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 10,
        title: "Mobile App Development",
        category: "mobile",
        description: "Create user-friendly mobile applications for Android and iOS.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 11,
        title: "Digital Marketing",
        category: "marketing",
        description: "Grow your online presence with SEO, social media, and ad campaigns.",
        image: "assets/images/img/web1.png"
    },
    {
        id: 12,
        title: "Cloud Solutions",
        category: "cloud",
        description: "Scalable and secure cloud solutions for your business infrastructure.",
        image: "assets/images/img/web1.png"
    }
];

// =========================
// DOM References
// =========================
const servicesGrid = document.getElementById("servicesGrid");
const serviceCategory = document.getElementById("serviceCategory");

// =========================
// Functions
// =========================

// Render services to grid (animated)
function renderServicesAnimated(filteredServices) {
    const currentCards = Array.from(servicesGrid.children);

    // Fade out current cards
    currentCards.forEach(card => card.classList.add("hide"));

    // Wait for fade-out transition
    setTimeout(() => {
        servicesGrid.innerHTML = ""; // Clear grid

        filteredServices.forEach(service => {
            const card = document.createElement("div");
            card.classList.add("service-card", "hide"); // start hidden
            card.innerHTML = `
                <img src="${service.image}" alt="${service.title}">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <button class="read-more-btn" onclick="window.location.href='service-detail.html?service=${service.category}'">Read More</button>
            `;
            servicesGrid.appendChild(card);

            // Trigger fade-in after a tiny delay
            setTimeout(() => card.classList.remove("hide"), 50);
        });
    }, 400); // matches CSS transition duration
}
// =========================
// Check for search query in URL
// =========================

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("q");

if (searchQuery && searchQuery.trim() !== "") {
    document.querySelector(".nav-search input").value = searchQuery; 
    searchServices(searchQuery);
}

// Filter services
function filterServices(category) {
    if (category === "all") {
        renderServicesAnimated(services);
    } else {
        const filtered = services.filter(service => service.category === category);
        renderServicesAnimated(filtered);
    }
}
// =========================
// Text Search Handler
// =========================

function searchServices(keyword) {
    keyword = keyword.toLowerCase().trim();

    const filtered = services.filter(service =>
        service.title.toLowerCase().includes(keyword) ||
        service.description.toLowerCase().includes(keyword) ||
        service.category.toLowerCase().includes(keyword)
    );

    renderServicesAnimated(filtered);
}

// =========================
// Event Listeners
// =========================
serviceCategory.addEventListener("change", (e) => {
    filterServices(e.target.value);
});

// Initial render
renderServicesAnimated(services);
