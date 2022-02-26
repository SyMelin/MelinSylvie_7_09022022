let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

let filter1;
let filter2;
let filter3;


let displayedRecipes = [];
let notMatchingRecipes = [];

//let dataModified = [];

let mainSearchFieldValue = 0;


let secondarySearchFieldValue = 0;
let displayedOptions = [];
let notMatchingOptions = [];

let indexFilterIteration = 0;
let displayedRecipesTag = [];
let notMatchingRecipesTag = [];




//Affiche la carte de chaque recette
function displayData(data) {
    const recipeWrapper = document.querySelector('.recipe-wrapper');
    data.forEach((recipe) => {
        const template = new Recipe(recipe);
       // dataModified.push(template);
        recipeCard = template.createRecipeCardDOM();
        recipeWrapper.appendChild(recipeCard);
    });
   // console.log(dataModified);
}

function capitaliseString(item) {
    item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    return item;
}

let getAllIngredients = function (data) {
    data.forEach(((recipe) => {
        (recipe.ingredients).forEach((ingredient) => {
            let item = capitaliseString(ingredient.ingredient);
            if (!(allIngredients.includes(item))) {
                allIngredients.push(item);
            }
        });
    }));
    allIngredients.sort();
    //console.log("allIngredients", allIngredients);
    return allIngredients;
}

let getAllAppliances = function (data) {
    data.forEach(((recipe) => {
        let item = capitaliseString(recipe.appliance);
        if (!(allAppliances.includes(item))) {
            allAppliances.push(item);
        } 
    }));
    allAppliances.sort();
    return allAppliances;
}

let getAllUstensils = function (data) {
    data.forEach(((recipe) => {
        (recipe.ustensils).forEach((ustensil) => {
            let item = capitaliseString(ustensil);
            if (!(allUstensils.includes(item))) {
                allUstensils.push(item);
            }
        });
    }));
    allUstensils.sort();
    //console.log("allUstensils", allUstensils);
    return allUstensils;
   
}

function initialiseFilters (data) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    filter1 = new Combobox (allIngredients, '1', 'Ingrédients', 'ingredients');
    filter2 = new Combobox (allAppliances, '2', 'Appareils', 'appliance');
    filter3 = new Combobox (allUstensils, '3', 'Ustensiles', 'ustensils');
    [filter1, filter2, filter3].map(element => element.create());
}

let updateAllIngredients = function (data) {
    allIngredients = [];
    data.forEach(((recipe) => {
        (recipe.ingredients).forEach((ingredient) => {
            let item = capitaliseString(ingredient.ingredient);
            if (!(allIngredients.includes(item))) {
                allIngredients.push(item);
            }
        });
    }));
    allIngredients.sort();
    return allIngredients;
}

let updateAllAppliances = function (data) {
    allAppliances = [];
    data.forEach(((recipe) => {
        let item = capitaliseString(recipe.appliance);
        if (!(allAppliances.includes(item))) {
            allAppliances.push(item);
        } 
    }));
    allAppliances.sort();
    return allAppliances;
}

let updateAllUstensils = function (data) {
    allUstensils = [];
    data.forEach(((recipe) => {
        (recipe.ustensils).forEach((ustensil) => {
            let item = capitaliseString(ustensil);
            if (!(allUstensils.includes(item))) {
                allUstensils.push(item);
            }
        });
    }));
    allUstensils.sort();
    return allUstensils; 
}


//Actualise les filtres
function updateFilters (data) {
    updateAllIngredients(data);
    updateAllAppliances(data);
    updateAllUstensils(data);
    filter1.updateComboboxDatalist(allIngredients);
    filter2.updateComboboxDatalist(allAppliances);
    filter3.updateComboboxDatalist(allUstensils);
}


//Initialise la page index.html
function init() {

    //On initialise les filtres: par défaut, ils contiennent toutes les options
    initialiseFilters(recipes);

    //On affiche les recettes
    displayData(recipes);

    //ajout de la fonction search sur le champ de rechercher principal onInput
    const mainSearchField = document.getElementById('mainSearchField');
    mainSearchField.addEventListener('input', function(e){
        search(e.target);
        indexFilterIteration = 0;
        updateFilters(displayedRecipes);
    });
    
    //on évite le rechargement de la page avec la touche Entrée sur le champ de saisie principale
    mainSearchField.addEventListener('keydown', function(e){
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    //ajout de la fonction searchOnCombox sur le champ de recherche des combobox
    const comboboxInputs = Array.from(document.getElementsByClassName('combobox__input'));
    //console.log(comboboxInputs);
    comboboxInputs.forEach((input) => {
        input.addEventListener('input', function(e){
            searchOnCombobox(e.target);
        });
    })
};
init();