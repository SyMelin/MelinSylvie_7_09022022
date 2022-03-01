//La fonction lookForString recherche une valeur dans les éléments du tableau (valeur et tableau passés en paramètres)
//Pour chaque recette du tableau, on chercher d'abord une correspondance au niveau du nom de la recette, sinon au niveau des ingrédients, sinon au niveau de la description
function lookForString(array, value) {
    let matchingRecipes = [];
    //on cherche une correspondance au niveau du nom de chaque recette
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    //console.log(regexForString);
    for (let i = 0; i < array.length; i++) {
        let recipe = array[i];
        //s'il y a correspondance sur le nom de la recette, on ajoute la recette au tableau des correspondance et on passe à la recette suivante (si celle-ci existe)
        if (strNoAccent(recipe.name.toLowerCase()).match(regexForString)) {
            matchingRecipes.push(recipe);
        }
        //sinon on cherche une correspondance au niveau des ingrédients de la recette
        else {
            let test = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                if (strNoAccent(recipe.ingredients[j].ingredient.toLowerCase()).match(regexForString)) {
                    test = true;
                    matchingRecipes.push(recipe);
                    break;
                }
            }
            //Si le test est toujours faux, on chercher une correspondance sur la description
            if (test == false) {
                if (strNoAccent(recipe.description.toLowerCase()).match(regexForString)) {
                    matchingRecipes.push(recipe);
                } else {
                    notMatchingRecipes.push(recipe);  
                }
            }     
        }
    }
    if (matchingRecipes.length == 0) {
        document.querySelector('.main-search__formField'). setAttribute('data-error-visible', true);
    }

    //on actualise le tableau des recettes affichées
    displayedRecipes = matchingRecipes;
    updateDisplayOfRecipes(displayedRecipes, notMatchingRecipes);
}