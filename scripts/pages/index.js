///////// Variables globales /////////

//Variables pour les filtres (=comboboxes)
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

let filter1;
let filter2;
let filter3;

//Variables des recettes affichées / non-correspondantes
let displayedRecipes = [];
let notMatchingRecipes = [];

//Variable contenant la valeur du champ de recherche principal
let mainSearchFieldValue = 0;

//Variable contenant la valeur du champ de recherche secondaire
let secondarySearchFieldValue1 = 0;
let secondarySearchFieldValue2 = 0;
let secondarySearchFieldValue3 = 0;

//Variables des options affichées / non-correspondantes
let displayedOptions = [];
let notMatchingOptions = [];

//Variable qui compte le nombre d'interaction avec les filtres
let indexFilterIteration = 0;

//Variables des recettes affichées / non-correspondantes suite à la recherche par tag
let displayedRecipesTag = [];
let notMatchingRecipesTag = [];




///////// Fonctions de l'initialisation ////////

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

//Retourne un tableau contenant tous les ingrédients des recettes passées en paramètre 'data'
function getAllIngredients (data) {
    allIngredients = [];//nécessaire pour le mise à jour du tableau après recherche
    data.forEach(((recipe) => {
        (recipe.ingredients).forEach((ingredient) => {
            let item = capitaliseString(ingredient.ingredient);//capitaliseString() est situé dans le utils/utils
            if (!(allIngredients.includes(item))) {
                allIngredients.push(item);
            }
        });
    }));
    allIngredients.sort(Intl.Collator().compare);//sort(Intl.Collator().compare) permet de trier le tableau en prenant en compte les accents
    //console.log("allIngredients", allIngredients);
    return allIngredients;
}

//Retourne un tableau contenant tous les appareils des recettes passées en paramètre 'data'
function getAllAppliances (data) {
    allAppliances = [];//nécessaire pour le mise à jour du tableau après recherche
    data.forEach(((recipe) => {
        let item = capitaliseString(recipe.appliance);
        if (!(allAppliances.includes(item))) {
            allAppliances.push(item);
        } 
    }));
    allAppliances.sort(Intl.Collator().compare);
    return allAppliances;
}

//Retourne un tableau contenant tous les ustensiles des recettes passées en paramètre 'data'
function getAllUstensils (data) {
    allUstensils = [];//nécessaire pour le mise à jour du tableau après recherche
    data.forEach(((recipe) => {
        (recipe.ustensils).forEach((ustensil) => {
            let item = capitaliseString(ustensil);
            if (!(allUstensils.includes(item))) {
                allUstensils.push(item);
            }
        });
    }));
    allUstensils.sort(Intl.Collator().compare);
    //console.log("allUstensils", allUstensils);
    return allUstensils;
   
}

//Initialise les filtres (= comboboxes)
function initialiseFilters (data) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    filter1 = new Combobox (allIngredients, '1', 'Ingrédients', 'ingredients', secondarySearchFieldValue1);
    filter2 = new Combobox (allAppliances, '2', 'Appareils', 'appliance', secondarySearchFieldValue2);
    filter3 = new Combobox (allUstensils, '3', 'Ustensiles', 'ustensils', secondarySearchFieldValue3);
    [filter1, filter2, filter3].map(element => element.create());
}

//Actualise les filtres
function updateFilters (data) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    filter1.updateComboboxDatalist(allIngredients);//updateComboboxDatalist est une méthode associée à la class d'objet Combobox
    filter2.updateComboboxDatalist(allAppliances);
    filter3.updateComboboxDatalist(allUstensils);
}


//Actualise les filtres au clic sur les options (= comboboxes)
function updateFiltersTag (data, list) {
    getAllIngredients(data);
    getAllAppliances(data);
    getAllUstensils(data);
    let tags = [];
    for (let i = 0; i < list.length; i++) {
        const tagName = strNoAccent(list[i].textContent.toLocaleLowerCase());
        const tagId = list[i].getAttribute('id');
        const tagType = tagId.substring(tagId.indexOf('--'), tagId.indexOf('-') + 1);
        console.log('tagtype', tagType);
        const tag = {"tagname": tagName, "tagtype": tagType};
        tags.push(tag);
    }
    console.log(tags);
    for (let i = 0; i < list.length; i++) {
        let type;
        type = list[i].tagType;
        let index;
        switch (type) {
            case 'ingredients' :
                index = allIngredients.indexOf(list[i]);
                return allIngredients = allIngredients(index, 1);
            break;
            case 'appliance' :
                index = allAppliances.indexOf(list[i]);
                return allAppliances = allIngredients(index, 1);
            break;
            case 'ustensils' :
                index = allUstensils.indexOf(list[i]);
                return allUstensils = allIngredients(index, 1);
            break;
        }
    }
    console.log('allIngredients', allIngredients);
    console.log('allAppliances', allAppliances);
    console.log('allUstensils', allUstensils);
    filter1.updateComboboxDatalist(allIngredients);//updateComboboxDatalist est une méthode associée à la class d'objet Combobox
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
    //const comboboxInputs = Array.from(document.getElementsByClassName('combobox__input'));
    //console.log(comboboxInputs);
  /*  comboboxInputs.forEach((input) => {
        input.addEventListener('input', function(e){
            searchOnCombobox(e.target);
        });
    })*/
};
init();