//Affiche la carte de chaque recette
function displayData(data) {
    const recipeWrapper = document.querySelector('.recipe-wrapper');
    data.forEach((recipe) => {
        const recipeCard = new RecipeCard(recipe).getRecipeCardDOM();
        recipeWrapper.appendChild(recipeCard);
    });
};


//Initialise la page index.html
function init() {
    //On affiche les recettes
    displayData(recipes);
};
init();