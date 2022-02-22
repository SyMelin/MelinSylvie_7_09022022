//Regex pour validation du texte sur input
let isTextValid = function (element) {
    if (/^\b([A-zÀ-ÿ][-,A-zÀ-ÿ. ']+[ ]*)+$/gm.test(element.value)){
        return true;
    }};

function lookForString(array, value) {
    let matchingRecipes = [];
    //on cherche une correspondance au niveau du nom de la recette
    let regex = value;
    //console.log('regex')
    let regexForString = new RegExp(regex, 'g');
    //console.log(regexForString);
    for (let i = 0; i < array.length; i++) {
        //s'il y a correspondance sur le nom de la recette, on ajoute la recette au tableau des correspondance et on passe à la recette suivante (si celel-ci existe)
        if (strNoAccent(array[i]._name.toLowerCase()).match(regexForString)) {
            matchingRecipes.push(array[i]);
        }
        //sinon on cherche une correspondance au niveau des ingrédients de la recette
        else {
            let recipe = array[i];
            let test = false;
            for (let j = 0; j < recipe._ingredients.length; j++) {
                //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                if (strNoAccent(recipe._ingredients[j].ingredient.toLowerCase()).match(regexForString)) {
                    test = true;
                    matchingRecipes.push(recipe);
                    break;
                }
            }
            //test description
            if (test == false) {
                regex = "\\b" + value;
                regexForString = new RegExp(regex, 'g');
                if (strNoAccent(recipe._description.toLowerCase()).match(regexForString)) {
                    matchingRecipes.push(recipe);
                } else {
                    notMatchingRecipes.push(recipe);  
                }
            }     
        }
    }
    console.log("matchingRecipes", matchingRecipes);
    console.log("unmatch", notMatchingRecipes);
    if (matchingRecipes.length == 0) {
        document.querySelector('.search-form'). setAttribute('data-error-visible', true);
    }

    // On actualise le tableau des recettes affichées
    displayedRecipes = matchingRecipes;
    for (let i = 0; i < displayedRecipes.length; i++) {
        const recipeCard = document.getElementById(`recipe-card--${displayedRecipes[i]._id}`);
        recipeCard.classList.add('recipe-card--visible');
        recipeCard.classList.remove('recipe-card--hidden');
    }
    //notDisplayedRecipes = notMatchingRecipes;
    for (let i = 0; i < notMatchingRecipes.length; i++) {
        const recipeCard = document.getElementById(`recipe-card--${notMatchingRecipes[i]._id}`);
        recipeCard.classList.remove('recipe-card--visible');
        recipeCard.classList.add('recipe-card--hidden');
    }
}

function search(element) {
    //console.log ("element.value", element.value);
    //console.log ("element.value.length", element.value.length);
    //console.log("mainSearchFieldValue", mainSearchFieldValue);
    for (let i = 0; i < dataModified.length; i++) {
        //on rend visible toutes les cartes au début du test
        const recipeCard = document.getElementById(`recipe-card--${dataModified[i]._id}`);
        recipeCard.classList.add('recipe-card--visible');
        recipeCard.classList.remove('recipe-card--hidden');
    }
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
                lookForString (dataModified, modifiedInput);
            }
            //on stocke  la valeur entrée
            mainSearchFieldValue = modifiedInput;
            //console.log("mainSearchFieldValue", mainSearchFieldValue);
        } else {
            console.log("le format du texte n'est pas valide");
            element.parentElement.parentElement.setAttribute("data-error-visible", true);
            for (let i = 0; i < dataModified.length; i++) {
                //On n'affiche aucune recette
                const recipeCard = document.getElementById(`recipe-card--${dataModified[i]._id}`);
                recipeCard.classList.add('recipe-card--hidden');
                recipeCard.classList.remove('recipe-card--visible');
            }
        }
    } else {
        element.parentElement.parentElement.setAttribute("data-error-visible", false);
        // On affiche un message invitant l'utilisateur à saisir le nombre minimum de caractères
        document.querySelector('.data-info').classList.add('data-info--visible');
        document.querySelector('.data-info').classList.remove('data-info--hidden');
    }
}