/* eslint-env browser */
/* exported navigateService */

// =========================
// Services Data
// =========================
const services = [
    { id: 1, title: "Website Design", category: "web", description: "Modern, mobile-friendly, and professional websites tailored for your business.", image: "assets/images/img/web1.png", details: "Full-service website design including responsive design, UI/UX optimization, CMS integration, and SEO-ready development." },
    { id: 2, title: "Hosting", category: "hosting", description: "Reliable and secure hosting solutions for websites and applications.", image: "assets/images/img/host.jpeg", details: "Secure hosting plans with daily backups, SSL, and 24/7 monitoring to keep your website online and fast." },
    { id: 3, title: "E-Commerce Solutions", category: "ecommerce", description: "Sell your products online with secure and fast e-commerce platforms.", image: "assets/images/img/eco.jpeg", details: "Custom online store development with payment gateway integration, product management, and analytics." },
    { id: 4, title: "Custom Systems", category: "custom", description: "Tailor-made software solutions for your business needs.", image: "assets/images/img/custom.jpeg", details: "Develop custom software solutions for business automation, workflow management, and reporting." },
    { id: 5, title: "School/Clinic Systems", category: "school", description: "Professional systems to manage schools, clinics, and organizations.", image: "assets/images/img/sclinic.jpeg", details: "Systems for attendance, patient management, billing, timetables, and reports to streamline operations." },
    { id: 6, title: "Branding & Graphic Design", category: "branding", description: "Professional logos, branding kits, posters, and marketing materials.", image: "assets/images/img/dez.png", details: "Brand identity, logo design, brochures, flyers, and marketing material to make your brand stand out." },
    { id: 7, title: "IT Consulting", category: "it", description: "Expert guidance for technology adoption, systems, and digital transformation.", image: "assets/images/img/it.png", details: "Analyze your business needs, recommend best technology, implement IT strategies, and optimize processes." },
    { id: 8, title: "Maintenance", category: "maintenance", description: "Keep your websites and systems running smoothly with regular updates and support.", image: "assets/images/img/Maintain.jpeg", details: "Regular maintenance, updates, bug fixes, and performance optimization for web and software systems." },
    { id: 9, title: "Cybersecurity", category: "cybersecurity", description: "Protect your data and systems from cyber threats and attacks.", image: "assets/images/img/cyber.jpeg", details: "Cybersecurity audits, threat analysis, firewall configuration, and employee training to secure your business." },
    { id: 10, title: "Mobile App Development", category: "mobile", description: "Create user-friendly mobile applications for Android and iOS.", image: "assets/images/img/Mobile.jpeg", details: "Custom mobile apps development, UI/UX design, backend integration, and app store deployment." },
    { id: 11, title: "Digital Marketing", category: "marketing", description: "Grow your online presence with SEO, social media, and ad campaigns.", image: "assets/images/img/digit.jpeg", details: "SEO optimization, social media management, paid ads campaigns, and analytics to increase traffic and leads." },
    { id: 12, title: "Cloud Solutions", category: "cloud", description: "Scalable and secure cloud solutions for your business infrastructure.", image: "assets/images/img/cloud.jpeg", details: "Cloud hosting, storage, backup, and SaaS integration to improve scalability and reduce costs." }
];

// =========================
// DOM References
// =========================
const serviceDetailContainer = document.getElementById("serviceDetail");

// =========================
// Get category from URL
// =========================
const params = new URLSearchParams(window.location.search);
const serviceCategory = params.get("service");

// =========================
// Find the service
// =========================
const serviceIndex = services.findIndex(s => s.category === serviceCategory);
const service = services[serviceIndex];

// =========================
// Render Service Detail
// =========================
if (service) {
    // Breadcrumbs
    const breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a> &gt; 
            <a href="services.html">Services</a> &gt; 
            <span>${service.title}</span>
        </nav>
    `;

    // Navigation Buttons
    const prevIndex = serviceIndex > 0 ? serviceIndex - 1 : services.length - 1;
    const nextIndex = serviceIndex < services.length - 1 ? serviceIndex + 1 : 0;

    const navigationButtons = `
        <div class="navigation-buttons">
            <button class="prev-btn" onclick="navigateService(${prevIndex})">← Previous</button>
            <button class="back-btn" onclick="window.history.back()">Back to Services</button>
            <button class="next-btn" onclick="navigateService(${nextIndex})">Next →</button>
        </div>
    `;

    // Render content
    serviceDetailContainer.innerHTML = `
        ${breadcrumbs}
        <h1 id="service-title">${service.title}</h1>
        <img src="${service.image}" alt="${service.title}" loading="lazy">
        <p>${service.description}</p>
        <p>${service.details}</p>
        ${navigationButtons}
    `;

    // Fade-in animation
    setTimeout(() => serviceDetailContainer.classList.add('visible'), 50);

} else {
    serviceDetailContainer.innerHTML = `<p>Service not found.</p>`;
}

// =========================
// Navigate to previous/next service
// =========================
function navigateService(index) {
    const selectedService = services[index];
    if (selectedService) {
        window.location.href = `service-detail.html?service=${selectedService.category}`;
    }
}
