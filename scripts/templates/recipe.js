/**
 * La classe recipe renvoie un objet avec les éléments qui sont nécessaires à la carte de la recette
 */

class Recipe {

    /**
     * @param {Object} data objet contenant toutes les données d'une recette
     */

    constructor (data) {
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time =  data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
        this._recipeCardDOM = this.createRecipeCardDOM();
    }

    createRecipeCardDOM() {

        const recipeCard = document.createElement('a');
        recipeCard.setAttribute('role', 'link');
        recipeCard.setAttribute('href', '');
        recipeCard.setAttribute('id', `recipe-card--${this._id}`);
        recipeCard.classList.add('recipe-card', 'recipe-card--visible');

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
        duration.innerHTML = `<i class="far fa-clock"></i><p>${this._time} min</p>`;

        [title, duration].map(element => detailTop.appendChild(element));

        //On crée la partie inférieure du texte: liste des ingédients + description
        const detailBottom = document.createElement('div');
        detailBottom.classList.add('details__bottom');

        this._ingredientList = document.createElement('ul');
        this._ingredientList.classList.add('recipe-ingredientList');

        this._ingredients.forEach((ingredient) => {
            if (ingredient.quantity == 1) {
                //console.log( ingredient.quantity);
                if (ingredient.unit) {
                    if (ingredient.unit.length > 3) {
                       // console.log( ingredient.unit);
                      
                        if (!(strNoAccent(ingredient.unit).match(/cuillere|cuilleres/g))) {
                           // console.log(ingredient.unit.lastIndexOf('s'));
                           // console.log(ingredient.unit.length);
     
                           if (ingredient.unit.lastIndexOf('s') == ingredient.unit.length - 1) {

                              ingredient.unit = ingredient.unit.substring(0, ingredient.unit.length - 1);
                              //  console.log( ingredient.quantity);
                              // console.log(ingredient.unit);
                              //  console.log('hello');
                            } 
                        }
                    }
                }    
            } else if (ingredient.quantity > 1) {
                //console.log( ingredient.quantity);
                if (ingredient.unit) {
                    if (ingredient.unit.length > 3) {
                       // console.log( ingredient.unit);
                      
                        if (!(strNoAccent(ingredient.unit).match(/cuillere|cuilleres/g))) {
                            //console.log(ingredient.unit);
                            //console.log(ingredient.unit.lastIndexOf('s'));
                            //console.log(ingredient.unit.length);
                            
     
                           if (ingredient.unit.lastIndexOf('s') < ingredient.unit.length - 1) {

                              //ingredient.unit = ingredient.unit.substring(0, ingredient.unit.length - 1);
                              //  console.log( ingredient.quantity);
                               //console.log(ingredient.unit);
                                ingredient.unit = ingredient.unit.concat('s');
                               // console.log(ingredient.unit);
                            } 
                        }
                    }
                } 
            }   





           // if (ingredient.quantity = 1) {
                //ingredient.unit = ingredient.unit.substring(0, ingredient.unit.length - 1);

                //${this._name.toLowerCase().substring(0, this._name.length - 1)}`)
          //  }
            let li = document.createElement('li');
            for (let [key, value] of Object.entries(ingredient)) {
                let span = document.createElement('span');

                switch (key) {

                    case 'ingredient' :
                        span.textContent = value;
                        span.classList.add('recipe-ingredient');
                    break;
                    case 'quantity' :
                        span.innerHTML = `<span class="fontWeight">: </span>${value}`;
                        span.classList.add('ingredient-quantity');
                    break;
                    case 'unit' :
                        let wordToFind;
                        if (strNoAccent(value).match(/cuilleres/g)) {
                            wordToFind = 'cuillères';
                            span.textContent = ' ' + wordToFind;
                        }/*
                        else if (strNoAccent(value).match(/cuillere/g)) {
                            wordToFind = 'cuillère';
                            console.log('hello!');
                            span.textContent = ' ' + wordToFind;
                        }*/
                        else if (value == "grammes"){
                            span.textContent = "g";
                        } else if (value.length > 2) {
                            span.textContent = " "+ value;
                        } else {
                            span.textContent = value;
                        }
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