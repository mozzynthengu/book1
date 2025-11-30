<<<<<<< HEAD
import recipes from './recipes.mjs';

// Helper: random integer
=======
// ==============================
// 1. Import Recipes Data
// ==============================
import recipes from './recipes.mjs';

// ==============================
// 2. Random Number Helper Functions
// ==============================
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
function random(num) {
    return Math.floor(Math.random() * num);
}

// Pick random recipe
function getRandomRecipe(list) {
    return list[random(list.length)];
}

<<<<<<< HEAD
// Generate tags HTML
=======
// ==============================
// 3. Template Functions
// ==============================

// 3a. Tags HTML Template
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

<<<<<<< HEAD
// Generate rating HTML
=======
// 3b. Ratings HTML Template
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
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

<<<<<<< HEAD
// Recipe card template
=======
// 3c. Recipe Card HTML Template
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
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

<<<<<<< HEAD
// Render recipes to DOM
=======
// ==============================
// 4. Render Recipes on Page
// ==============================
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
function renderRecipes(list, highlightWords = []) {
    const container = document.getElementById('recipe-list');
    if (!list.length) {
        container.innerHTML = `<p>No recipes found. Try another search!</p>`;
    } else {
        container.innerHTML = list.map(r => recipeTemplate(r, highlightWords)).join('');
    }
}

<<<<<<< HEAD
// Filter recipes by search query
=======
// ==============================
// 5. Filter Recipes (Search Functionality)
// ==============================
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
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

<<<<<<< HEAD
// Handle search form submission
=======
// ==============================
// 6. Handle Search Form Submission
// ==============================
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
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

<<<<<<< HEAD
// Initialize page
=======
// ==============================
// 7. Initialize Page
// ==============================
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
function init() {
    renderRecipes([getRandomRecipe(recipes)]);
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
}

<<<<<<< HEAD
=======
// Run Initialization
>>>>>>> 55b19cc9eee3116ab7bb1a59abd5991262fcabf7
init();
