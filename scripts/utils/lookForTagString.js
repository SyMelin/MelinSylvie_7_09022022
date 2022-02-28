function lookForTagString(array, value, type) {
    console.log('tagValue');
    let matchingRecipes = [];
    value = value.replaceAll(/\)|\(/g, "");//enleve les parenthèses
    console.log('valueModif', value);
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    console.log(regexForString);
    for (let i = 0; i < array.length; i++) {
        let recipe = array[i];

        switch (type) {

            case 'ingredients' :
                //On cherche une correspondance au niveau des ingrédients de la recette (donc sur un tableau)
                testElement('arrayIngredients', regexForString, recipe, recipe.ingredients, matchingRecipes, notMatchingRecipesTag);
                break;

            case 'appliance' :
                //On cherche une correspondance au niveau de l'appareil de la recette (donc sur une chaîne de caractère)
                testElement('string', regexForString, recipe, recipe.appliance, matchingRecipes, notMatchingRecipesTag);
                break;

            case 'ustensils' :
                //On cherche une correspondance au niveau des ustensils de la recette (donc sur un tableau.toString())
                testElement('string', regexForString, recipe, recipe.ustensils.toString(), matchingRecipes, notMatchingRecipesTag);
                break;

            default:
                console.log("pas de fonction");
        }
    }
    console.log("matchingRecipes", matchingRecipes);
    console.log("notMatchingRecipesTag", notMatchingRecipesTag);

    //on actualise le tableau des recettes affichées
    displayedRecipesTag = matchingRecipes;
    updateDisplayOfRecipes(displayedRecipesTag, notMatchingRecipesTag);
}