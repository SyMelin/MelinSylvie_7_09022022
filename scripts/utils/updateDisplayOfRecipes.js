function updateDisplayOfRecipes (arrayToDisplay, noMatchArray) {
    console.log('arrayToDisplay', arrayToDisplay);
    //on affiche les recettes correspondantes
    arrayToDisplay.forEach((recipe) => {
        const recipeCardOn = document.getElementById(`recipe-card--${recipe.id}`);
        recipeCardOn.classList.add('recipe-card--visible');
        recipeCardOn.classList.remove('recipe-card--hidden');
    })
    //on masque les recettes non-correspondantes
    noMatchArray.forEach((recipe) => {
        const recipeCardOff = document.getElementById(`recipe-card--${recipe.id}`);
        recipeCardOff.classList.remove('recipe-card--visible');
        recipeCardOff.classList.add('recipe-card--hidden');
    })
}