/**
 * La classe recipe renvoie un objet avec les éléments qui sont nécessaires à la carte de la recette
 */

class Recipe {

    /**
     * @param {Object} data objet contenant toutes les données d'une recette
     */

    constructor (data) {
        this._id = data.id;
        this._ingredients = data.ingredients;
        this._name = data.name;
        this._time =  data.time;
        this._description = data.description;
    }

    getRecipeCardDOM() {

        const recipeCard = document.createElement('a');
        recipeCard.setAttribute('role', 'link');
        recipeCard.setAttribute('href', '');
        recipeCard.classList.add('recipe-card');

        //On crée la division image
        const recipeCardImg = document.createElement('div');
        recipeCardImg.setAttribute('role', 'img');
        recipeCardImg.setAttribute('alt', this._name);
        recipeCardImg.classList.add('recipe-card__img');
        //recipeCard.style.backgroundImage('image', this._image); Pas de photo pour le moment

        //On crée la partie texte
        const recipeCardDetail = document.createElement('div');
        recipeCardDetail.classList.add('recipe-card__details');

        //On crée la partie supérieure du texte: titre + durée
        const detailTop = document.createElement('div');
        detailTop.classList.add('details__top');

        const title = document.createElement('h2');
        title.classList.add('recipe-title');
        title.textContent = this._name;

        const duration = document.createElement('div');
        duration.classList.add('recipe-duration');
        duration.innerHTML = `<i class="far fa-clock"></i><p>${this._time} min<p>`;

        [title, duration].map(element => detailTop.appendChild(element));

        //On crée la partie inférieure du texte: liste des ingédients + description
        const detailBottom = document.createElement('div');
        detailBottom.classList.add('details__bottom');

        this._ingredientList = document.createElement('ul');
        this._ingredientList.classList.add('recipe-ingredientList');

        this._ingredients.forEach((ingredient) => {
            let li = document.createElement('li');
            for (let [key, value] of Object.entries(ingredient)) {
                let span = document.createElement('span');

                switch (key) {

                    case 'ingredient' :
                        span.textContent = value;
                        span.classList.add('recipe-ingredient');
                    break;
                    case 'quantity' :
                        span.textContent = `: ${value}`;
                        span.classList.add('ingredient-quantity');
                    break;
                    case 'unit' :
                        span.textContent = value;
                        span.classList.add('ingredient-unit');
                    break;

                };
                li.appendChild(span);  
            };
            this._ingredientList.appendChild(li); 
        });

        const recipeDescription = document.createElement('p');
        recipeDescription.classList.add('recipe-description');
        recipeDescription.textContent = this._description;

        [this._ingredientList, recipeDescription].map(element => detailBottom.appendChild(element));

        [detailTop, detailBottom].map(element => recipeCardDetail.appendChild(element));
        [recipeCardImg, recipeCardDetail].map(element => recipeCard.appendChild(element));

        
        return recipeCard;
    };
};