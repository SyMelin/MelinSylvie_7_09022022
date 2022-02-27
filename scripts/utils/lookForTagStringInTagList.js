function lookForTagStringInTagList(array, value, type) {
    let matchingRecipes = [];
    //on cherche une correspondance au niveau du nom de chaque recette
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    for (let i = 0; i < array.length; i++) {
        let recipe = array[i];
        if (type == 'ingredients') {
             //On cherche une correspondance au niveau des ingrédients de la recette
            let test = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                if (strNoAccent(recipe.ingredients[j].ingredient.toLowerCase()).match(regexForString)) {
                    test = true;
                    matchingRecipes.push(recipe);
                    break;
                }
            }
            if (test == false) {
                notMatchingRecipesTag.push(recipe);
            }
        } else if (type == 'appliance') {
            if (strNoAccent(recipe.appliance.toLowerCase()).match(regexForString)) {
                matchingRecipes.push(recipe);
            } else {
                notMatchingRecipesTag.push(recipe);  
            }
        } else if (type == 'ustensils') {
            if (strNoAccent(recipe.ustensils.toString()).match(regexForString)) {
                matchingRecipes.push(recipe);
            } else {
                notMatchingRecipesTag.push(recipe);  
            }  
        } else {
            console.log("pas de fonction");
        }   
    }
    console.log("matchingRecipes", matchingRecipes);
    console.log("notMatchingRecipesTag", notMatchingRecipesTag);
    if (matchingRecipes.length == 0) {
    }

    // On actualise le tableau des recettes à afficher et on les affiche
    displayedRecipesTag = matchingRecipes;
    console.log("displayedRecipesTag", displayedRecipesTag);
    for (let i = 0; i < displayedRecipesTag.length; i++) {
        const recipeCardOn = document.getElementById(`recipe-card--${displayedRecipesTag[i].id}`);
        recipeCardOn.classList.add('recipe-card--visible');
        recipeCardOn.classList.remove('recipe-card--hidden');
    }
    //On masque les recettes non correspondantes
    for (let i = 0; i < notMatchingRecipesTag.length; i++) {
        const recipeCardOff = document.getElementById(`recipe-card--${notMatchingRecipesTag[i].id}`);
        recipeCardOff.classList.remove('recipe-card--visible');
        recipeCardOff.classList.add('recipe-card--hidden');
    }
}