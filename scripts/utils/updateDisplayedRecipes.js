function updateDisplayedRecipes (arrayToDisplay, noMatchArray) {
    console.log('arrayToDisplay', arrayToDisplay);
    //on affiche les recettes correspondantes
    for (let i = 0; i < arrayToDisplay.length; i++) {
        const recipeCardOn = document.getElementById(`recipe-card--${arrayToDisplay[i].id}`);
        recipeCardOn.classList.add('recipe-card--visible');
        recipeCardOn.classList.remove('recipe-card--hidden');
    }
    //on masque les recettes non-correspondantes
    for (let i = 0; i < noMatchArray.length; i++) {
        const recipeCardOff = document.getElementById(`recipe-card--${noMatchArray[i].id}`);
        recipeCardOff.classList.remove('recipe-card--visible');
        recipeCardOff.classList.add('recipe-card--hidden');
    }
}