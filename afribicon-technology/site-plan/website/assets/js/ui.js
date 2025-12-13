export function renderServices(list, container) {
    container.innerHTML = "";

    list.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-card";

        card.innerHTML = `
            <h4>${service.title}</h4>
            <p class="short-desc">${service.description.substring(0, 60)}...</p>
            <button class="expand-btn">Read More</button>
            <p class="full-desc hidden">${service.description}</p>
        `;

        container.appendChild(card);
    });
}
