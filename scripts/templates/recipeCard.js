class RecipeCard {

    /**
     *  @param {Object} data le tableau de donnée regroupant tous les Objets recettes
     */

    constructor (data) {
        this._data = data;
    }

    getRecipeCardDOM() {

        console.log(this._data);
        const recipeCard = document.createElement('a');
        recipeCard.setAttribute('role', 'link');
        recipeCard.setAttribute('href', '');
        recipeCard.classList.add('recipe-card');

        //On crée la division image
        const recipeCardImg = document.createElement('div');
        recipeCardImg.setAttribute('role', 'img');
        recipeCardImg.setAttribute('alt', this._data.name);
        recipeCardImg.classList.add('recipe-card__img');
        //recipeCard.style.backgroundImage('image', this._data.image); Pas de photo pour le moment

        //On crée la partie texte
        const recipeCardDetail = document.createElement('div');
        recipeCardDetail.classList.add('recipe-card__details');


        const detailTop = document.createElement('div');
        detailTop.classList.add('detail__top');

        const title = document.createElement('h2');
        title.classList.add('recipe-title');
        title.textContent = this._data.name;

        const duration = document.createElement('div');
        duration.classList.add('recipe-duration');
        duration.innerHTML = `<i class="far fa-clock"></i>${this._data.time} min`;

        [title, duration].map(element => detailTop.appendChild(element));


        const detailBottom = document.createElement('div');
        detailBottom.classList.add('detail__bottom');

        this._ingredientList = document.createElement('ul');
        this._ingredientList.classList.add('recipe-ingredientList');

        this._data.ingredients.forEach((ingredient) => {
            let li = document.createElement('li');
            console.log(ingredient);
            for (let [key, value] of Object.entries(ingredient)) {
                let span = document.createElement('span');

                switch (key) {

                    case 'ingredient' :
                        span.textContent = value;
                        console.log("span", span.textContent);
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
        recipeDescription.textContent = this._data.description;

        [this._ingredientList, recipeDescription].map(element => detailBottom.appendChild(element));

        [detailTop, detailBottom].map(element => recipeCardDetail.appendChild(element));
        [recipeCardImg, recipeCardDetail].map(element => recipeCard.appendChild(element));

        
        return recipeCard;
    };
};