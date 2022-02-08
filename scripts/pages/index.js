//Affiche la carte de chaque recette
function displayData(data) {
    const recipeWrapper = document.querySelector('.recipe-wrapper');
    data.forEach((recipe) => {
        const recipeCard = new Recipe(recipe).getRecipeCardDOM();
        recipeWrapper.appendChild(recipeCard);
    });
};


//Initialise la page index.html
function init() {
    //On affiche les recettes
    displayData(recipes);
};
init();