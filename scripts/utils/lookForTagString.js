function lookForTagString(array, value, type) {
    let matchingRecipes = [];
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    for (let i = 0; i < array.length; i++) {
        let recipe = array[i];
        if (type == 'ingredients') {
            //On cherche une correspondance au niveau des ingrédients de la recette (donc sur un tableau)
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
            //On cherche une correspondance au niveau de l'appareil de la recette (donc sur une chaîne de caractère)
            if (strNoAccent(recipe.appliance.toLowerCase()).match(regexForString)) {
                matchingRecipes.push(recipe);
            }
            //sinon on ajoute l'option dans le tableau des non-correspondances
            else {
                notMatchingRecipesTag.push(recipe);  
            }  
        } else if (type == 'ustensils') {
            //On cherche une correspondance au niveau des ustensils de la recette (donc sur un tableau.toString())
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

    //on actualise le tableau des recettes affichées
    displayedRecipesTag = matchingRecipes;
    updateDisplayOfRecipes(displayedRecipesTag, notMatchingRecipesTag);

}