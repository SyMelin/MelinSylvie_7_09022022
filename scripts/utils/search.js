//Regex pour validation du texte sur input
let isTextValid = function (element) {
    if (/^\b([A-zÀ-ÿ][-,A-zÀ-ÿ. ']+[ ]*)+$/gm.test(element.value)){
        return true;
    }};


//La fonction lookForString recherche une valeur dans les éléments du tableau (valeur et tableau passés en paramètres)
//Pour chaque recette du tableau, on chercher d'abord une correspondance au niveau du nom de la recette, sinon au niveau des ingrédients, sinon au niveau de la description
function lookForString(array, value) {
    let matchingRecipes = [];
    //on cherche une correspondance au niveau du nom de la recette
    let regex = "\\b" + value;
    //console.log('regex')
    let regexForString = new RegExp(regex, 'g');
    //console.log(regexForString);
    array.forEach((recipe) => {
        //s'il y a correspondance sur le nom de la recette, on ajoute la recette au tableau des correspondance et on passe à la recette suivante (si celel-ci existe)
        if (strNoAccent(recipe.name.toLowerCase()).match(regexForString)) {
            matchingRecipes.push(recipe);
        }
        //sinon on cherche une correspondance au niveau des ingrédients de la recette
        else {
            let test = false;
            test = recipe.ingredients.some(item => strNoAccent(item.ingredient.toLowerCase()).match(regexForString));
            //s'il y a correspondance sur au moins un ingédient, le test prend la valeur true, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
            if (test == true) {
                matchingRecipes.push(recipe);
            }
            //Sinon, on chercher une correspondance sur la description
            else {
                if (strNoAccent(recipe.description.toLowerCase()).match(regexForString)) {
                    matchingRecipes.push(recipe);
                } else {
                    notMatchingRecipes.push(recipe);  
                }
            }     
        }
    })
    //console.log("matchingRecipes", matchingRecipes);
    //console.log("unmatch", notMatchingRecipes);
    if (matchingRecipes.length == 0) {
        document.querySelector('.search-form').setAttribute('data-error-visible', true);
    }

    // On actualise le tableau des recettes affichées
    displayedRecipes = matchingRecipes;
    updateDisplayOfRecipes(displayedRecipes, notMatchingRecipes);
    
}

//La fonction search est déclenchée à la frappe sur le champ de saisie
//Elle vérifie tout d'abord la validité de la saisie puis déclenche ou non l'appel à la fonction lookForString
function search(element) {
    //on rend visible toutes les cartes au début du test
    const recipeCards = Array.from(document.getElementsByClassName('recipe-card'));
    recipeCards.forEach((recipeCard) => {
            recipeCard.classList.add('recipe-card--visible');
            recipeCard.classList.remove('recipe-card--hidden');
    })
    displayedRecipes = recipes;
    //on vérifie qu'au moins 3 caractères sont saisis
    if (element.value.length >= element.getAttribute('minlength')) {
        document.querySelector('.data-info').classList.add('data-info--hidden');
        document.querySelector('.data-info').classList.remove('data-info--visible');
    //on vérifie que les caractères saisis sont valides
        if (isTextValid (element) === true){
            element.parentElement.parentElement.setAttribute("data-error-visible", false);
            let modifiedInput = strNoAccent(element.value.toLowerCase());
            //Si la longueur de la valeur nouvellement saisie est supérieure à celle de la valeur stockée
            if (modifiedInput.length > mainSearchFieldValue.length) {
                lookForString (displayedRecipes, modifiedInput);
            } else {
                notMatchingRecipes = [];
                lookForString (recipes, modifiedInput);
            }
            //on stocke  la valeur entrée
            mainSearchFieldValue = modifiedInput;
            //console.log("mainSearchFieldValue", mainSearchFieldValue);
        } else {
            console.log("le format du texte n'est pas valide");
            element.parentElement.parentElement.setAttribute("data-error-visible", true);
            //On n'affiche aucune recette
            recipeCards.forEach((recipeCard) => {
                recipeCard.classList.add('recipe-card--hidden');
                recipeCard.classList.remove('recipe-card--visible');
            });
        }
    } else {
        element.parentElement.parentElement.setAttribute("data-error-visible", false);
        // On affiche un message invitant l'utilisateur à saisir le nombre minimum de caractères
        document.querySelector('.data-info').classList.add('data-info--visible');
        document.querySelector('.data-info').classList.remove('data-info--hidden');
    }
}