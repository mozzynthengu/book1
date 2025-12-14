document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    
    // Create a status message element
    const statusText = document.createElement("p");
    statusText.id = "formStatus";
    contactForm.appendChild(statusText);

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Show thank you message
        statusText.textContent = "Thank you! Your message has been received. We’ll contact you soon.";
        statusText.style.color = "green";
        statusText.style.opacity = "1"; // Ensure it's visible

        // Reset form fields
        contactForm.reset();

        // Fade out message after 5 seconds
        setTimeout(() => {
            statusText.style.transition = "opacity 1s";
            statusText.style.opacity = "0";
        }, 5000);
    });
});
