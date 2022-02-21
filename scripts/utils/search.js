//Regex pour validation du texte sur input
let isTextValid = function (element) {
    if (/^\b([A-zÀ-ÿ][-,A-zÀ-ÿ. ']+[ ]*)+$/gm.test(element.value)){
        return true;
    }};

function lookForString(array, value) {
    let matchingRecipes = [];
    //let regex = "(^|\\s)" + value + "?[ ]?[^$]*(\\w)";
    let regex = value;
   // console.log('regex')
    let regexForString = new RegExp(regex, 'g');
   // console.log(regexForString);
    for (let i = 0; i < array.length; i++) {
        if (strNoAccent(array[i]._name.toLowerCase()).match(regexForString)) {
            matchingRecipes.push(array[i]);
        } else {
            notMatchingRecipes.push(array[i]);
        }
    }
   // console.log("matchingRecipes", matchingRecipes);
   // console.log("unmatch", notMatchingRecipes);
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
        const recipeCard = document.getElementById(`recipe-card--${dataModified[i]._id}`);
        recipeCard.classList.add('recipe-card--visible');
        recipeCard.classList.remove('recipe-card--hidden');
    }
    //on vérifie qu'au moins 3 caractères sont saisis
    if (element.value.length >= element.getAttribute('minlength')) {
    //on vérifie que les caractères saisis sont valides
        if (isTextValid (element) === true){
            element.parentElement.parentElement.setAttribute("data-error-visible", false);
            let modifiedInput = strNoAccent(element.value.toLowerCase());
            if (modifiedInput.length > mainSearchFieldValue.length) {
                lookForString (displayedRecipes, modifiedInput);
            } else {
                notMatchingRecipes = [];
                lookForString (dataModified, modifiedInput);
            }
            // on stocke  la valeur entrée
            mainSearchFieldValue = modifiedInput;
            //console.log("mainSearchFieldValue", mainSearchFieldValue);
        } else {
            console.log("le format du texte n'est pas valide");
            element.parentElement.parentElement.setAttribute("data-error-visible", true);
        }
    } else {
        element.parentElement.parentElement.setAttribute("data-error-visible", false);
    }
}