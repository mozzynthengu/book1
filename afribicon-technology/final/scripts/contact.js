document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        // Validation
        if (!name || !email || !service || !message) {
            statusText.textContent = "Please fill in all fields.";
            statusText.style.color = "red";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            statusText.textContent = "Please enter a valid email address.";
            statusText.style.color = "red";
            return;
        }

        statusText.textContent = "Sending message...";
        statusText.style.color = "#1B5E20";

        // Send email using EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            reply_to: email,
            service: service,
            message: message
        })
        .then(() => {
            statusText.textContent = "Message sent successfully! We’ll contact you soon.";
            statusText.style.color = "green";
            contactForm.reset();
        })
        .catch(() => {
            statusText.textContent = "Failed to send message. Please try again.";
            statusText.style.color = "red";
        });
    });
});
