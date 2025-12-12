// Contact Form Script with Email Validation
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        // Simple validation
        if (!name || !email || !service || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Email format validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Create a contact object
        const contactEntry = {
            name,
            email,
            service,
            message,
            submittedAt: new Date().toLocaleString()
        };

        // Save to localStorage (array of contacts)
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(contactEntry);
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Notify user
        alert("Thank you! Your message has been received.");

        // Reset form
        contactForm.reset();
    });
});
