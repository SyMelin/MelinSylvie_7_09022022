//Regex pour validation du texte sur input
let isTextValid = function (element) {
    if (/^\b([A-zÀ-ÿ][-,A-zÀ-ÿ. ']+[ ]*)+$/gm.test(element.value)){
        return true;
    }};

function search(element) {
    //on rend visible toutes les cartes au début du test
    const recipeCards = document.getElementsByClassName('recipe-card');
    for (let i = 0; i < recipes.length; i++) {
        recipeCards[i].classList.add('recipe-card--visible');
        recipeCards[i].classList.remove('recipe-card--hidden');
    }
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
            //on stocke la valeur entrée
            mainSearchFieldValue = modifiedInput;
        } else {
            console.log("le format du texte n'est pas valide");
            element.parentElement.parentElement.setAttribute("data-error-visible", true);
            //On n'affiche aucune recette
            const recipeCards = document.getElementsByClassName('recipe-card');
            for (let i = 0; i < recipes.length; i++) {
                recipeCards[i].classList.add('recipe-card--hidden');
                recipeCards[i].classList.remove('recipe-card--visible');
            }
        }
    } else {
        element.parentElement.parentElement.setAttribute("data-error-visible", false);
        // On affiche un message invitant l'utilisateur à saisir le nombre minimum de caractères
        document.querySelector('.data-info').classList.add('data-info--visible');
        document.querySelector('.data-info').classList.remove('data-info--hidden');
    }
}