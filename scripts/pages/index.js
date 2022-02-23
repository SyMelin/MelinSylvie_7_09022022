let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let displayedRecipes = [];
let notMatchingRecipes = [];

let dataModified = [];

let mainSearchFieldValue = 0;


let secondarySearchFieldValue = 0;
let displayedOptions = [];
let notMatchingOptions = [];



//Affiche la carte de chaque recette
function displayData(data) {
    const recipeWrapper = document.querySelector('.recipe-wrapper');
    data.forEach((recipe) => {
        const template = new Recipe(recipe);
        dataModified.push(template);
        recipeCard = template.getRecipeCardDOM();
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

function InitialiseFilters (dataModified) {
    getAllIngredients(dataModified);
    getAllAppliances(dataModified);
    getAllUstensils(dataModified);
    new Combobox (allIngredients, '1', 'Ingrédients').create();
    new Combobox (allAppliances, '2', 'Appareils').create();
    new Combobox (allUstensils, '3', 'Ustensiles').create();
   // console.log(getAllIngredients(data).sort());
    //console.log(getAllAppliances(data).sort());
    //console.log(getAllUstensils(data).sort());
}







//Initialise la page index.html
function init() {

    //On initialise les filtres: par défaut, ils contiennent toutes les options
    InitialiseFilters(recipes);

    //On affiche les recettes
    displayData(recipes);

    //ajout de la fonction search sur le champ de rechercher principal onInput
    const mainSearchField = document.getElementById('mainSearchField');
    mainSearchField.addEventListener('input', function(e){
        search(e.target);
    });
    
    //on évite le rechargement de la page avec la touche Entrée sur le champ de saisie principale
    mainSearchField.addEventListener('keydown', function(e){
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    //ajout de la fonction searchOnCombox sur le champ de recherche par ingrédient
    const ingredientInput = document.getElementById('ingredients');
    ingredientInput.addEventListener('input', function(e){
        searchOnCombobox(e.target);
    });
};
init();