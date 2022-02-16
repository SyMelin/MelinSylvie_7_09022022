let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let matchingRecipes = [];
let notmatchingRecipes = [];


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

function InitialiseFilters (data) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    new Combobox (allIngredients, '1', 'Ingrédients').create();
    new Combobox (allAppliances, '2', 'Appareils').create();
    new Combobox (allUstensils, '3', 'Ustensiles').create();
   // console.log(getAllIngredients(data).sort());
    //console.log(getAllAppliances(data).sort());
    //console.log(getAllUstensils(data).sort());
}




//Affiche la carte de chaque recette
function displayData(data) {
    const recipeWrapper = document.querySelector('.recipe-wrapper');
    data.forEach((recipe) => {
        const recipeCard = new Recipe(recipe).getRecipeCardDOM();
        recipeWrapper.appendChild(recipeCard);
    });
}


//Initialise la page index.html
function init() {

    //On initialise les filtres: par défaut, ils contiennent toutes les options
    InitialiseFilters(recipes);

    //On affiche les recettes
    displayData(recipes);
};
init();