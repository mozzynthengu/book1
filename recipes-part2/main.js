// main.js
import recipes from './recipes.mjs';

/*==============================
  Random helper functions
===============================*/
function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe(list) {
    const index = random(list.length);
    return list[index];
}

/*==============================
  Template functions
===============================*/
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
    // Assignment requires ARIA attributes + span wrappers
    let html = `
    <span 
        class="rating" 
        role="img" 
        aria-label="Rating: ${rating} out of 5 stars">
    `;

    const fullStars = Math.floor(rating); // required

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

function recipeTemplate(recipe, highlightWords = []) {
    // Optional: highlight search words
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
            <img src="${recipe.image}" alt="Image of ${recipe.name}">
        </div>
        <div class="recipe-content">
            <ul class="recipe__tags">${tagsTemplate(recipe.tags)}</ul>
            <h2><a href="${recipe.url || '#'}">${name}</a></h2>
            <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
            <p class="recipe__description">${description}</p>
            <p class="prep-time"><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        </div>
    </div>
    `;
}

/*==============================
  Rendering functions
===============================*/
function renderRecipes(list, highlightWords = []) {
    const container = document.getElementById('recipe-list');
    if (list.length === 0) {
        container.innerHTML = `<p>No recipes found. Try another search!</p>`;
    } else {
        container.innerHTML = list
            .map(recipe => recipeTemplate(recipe, highlightWords))
            .join('');
    }
}

/*==============================
  Search / Filter
===============================*/
function filterRecipes(query) {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);

    return recipes
        .filter(recipe => {
            return words.every(word => {
                return (
                    recipe.name.toLowerCase().includes(word) ||
                    recipe.description.toLowerCase().includes(word) ||
                    recipe.tags.some(tag => tag.toLowerCase().includes(word)) ||
                    recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(word))
                );
            });
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

function handleSearch(event) {
    event.preventDefault();
    const input = document.querySelector('#searchForm input[type="text"]');
    const query = input.value.trim();

    if (query) {
        const results = filterRecipes(query);
        renderRecipes(results, query.split(/\s+/));
    } else {
        // Empty search resets to random recipe
        renderRecipes([getRandomRecipe(recipes)]);
    }
}

/*==============================
  Initialize Page
===============================*/
function init() {
    // Show random recipe on page load
    renderRecipes([getRandomRecipe(recipes)]);

    // Search listener
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
}

init();
