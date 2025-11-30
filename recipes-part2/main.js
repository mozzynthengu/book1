import recipes from './recipes.mjs';

// Helper: random integer
function random(num) {
    return Math.floor(Math.random() * num);
}

// Pick random recipe
function getRandomRecipe(list) {
    return list[random(list.length)];
}

// Generate tags HTML
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Generate rating HTML
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
        html += i <= fullStars
            ? `<span aria-hidden="true" class="icon-star">⭐</span>`
            : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
    html += `</span>`;
    return html;
}

// Recipe card template
function recipeTemplate(recipe, highlightWords = []) {
    let name = recipe.name;
    let description = recipe.description;

    highlightWords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        name = name.replace(regex, '<mark>$1</mark>');
        description = description.replace(regex, '<mark>$1</mark>');
    });

    return `
    <div class="recipe-card">
        <div class="image-container">
            <img src="${recipe.image}" alt="Image of ${recipe.name}" width="400" height="300">
        </div>
        <div class="recipe-content">
            <ul class="recipe__tags">${tagsTemplate(recipe.tags)}</ul>
            <h2><a href="${recipe.url || '#'}">${name}</a></h2>
            <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
            <p class="recipe__description">${description}</p>
            <p class="prep-time"><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        </div>
    </div>`;
}

// Render recipes to DOM
function renderRecipes(list, highlightWords = []) {
    const container = document.getElementById('recipe-list');
    if (!list.length) {
        container.innerHTML = `<p>No recipes found. Try another search!</p>`;
    } else {
        container.innerHTML = list.map(r => recipeTemplate(r, highlightWords)).join('');
    }
}

// Filter recipes by search query
function filterRecipes(query) {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return recipes
        .filter(recipe =>
            words.every(word =>
                recipe.name.toLowerCase().includes(word) ||
                recipe.description.toLowerCase().includes(word) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(word)) ||
                recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(word))
            )
        )
        .sort((a, b) => a.name.localeCompare(b.name));
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    const input = document.querySelector('#searchForm input[type="text"]');
    const query = input.value.trim();
    if (query) {
        renderRecipes(filterRecipes(query), query.split(/\s+/));
    } else {
        renderRecipes([getRandomRecipe(recipes)]);
    }
}

// Initialize page
function init() {
    renderRecipes([getRandomRecipe(recipes)]);
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
}

init();
