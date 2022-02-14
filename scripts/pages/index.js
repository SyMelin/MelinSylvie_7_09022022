let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

function capitalizeString(item) {
    item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    return item;
}



let getAllIngredients = function (data) {
    data.forEach(((recipe) => {
        (recipe.ingredients).forEach((ingredient) => {
            let item = capitalizeString(ingredient.ingredient);
            if (!(allIngredients.includes(item))) {
                allIngredients.push(item);
            }
        });
    }));
    allIngredients.sort();
    return allIngredients;

    //console.log("allIngredients", allIngredients);
}

let getAllAppliances = function (data) {
   
    data.forEach(((recipe) => {
        let item = capitalizeString(recipe.appliance);
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
            let item = capitalizeString(ustensil);
            if (!(allUstensils.includes(item))) {
                allUstensils.push(item);
            }
        });
    }));
    allUstensils.sort();
    return allUstensils;
   
    //onsole.log("allUstensils", allUstensils);
}

function InitialiseFilters (data) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    new Listbox (allIngredients, '1', 'Ingrédients').create();
    new Listbox (allAppliances, '2', 'Appareils').create();
    new Listbox (allUstensils, '3', 'Ustensiles').create();
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

    InitialiseFilters(recipes);

    //On affiche les recettes
    displayData(recipes);
};
init();