class Option {

    /**
     *  @param {String} integer est chiffre de numérotation pour chaque option
     *  @param {Array} options tableau regroupant les options
     *  @param {String} text nom d'option à afficher (en français)
     *  @param {String} type nom de la liste pour le code (en anglais)
     *  @param {String} number chiffre de numérotation de la datalist(combobox) d'origine
     *  @param {} secondarySearchFieldValue variable de stockage de la valeur saisi sur le champ de recherche secondaire
     * 
     */

    constructor (integer, text, type, number, secondarySearchFieldValue) {
        this._integer = integer;
        this._text = text;
        this._type = type;
        this._number = number;
        this._secondarySearchFieldValue = secondarySearchFieldValue;
    }

    getOptionDOM () {
        const optionDOM = document.createElement('li');
        optionDOM.setAttribute('role', 'option');
        optionDOM.setAttribute('aria-selected', false);
        optionDOM.setAttribute('id', `${this._type}--${this._integer}`);
        optionDOM.classList.add('option', `optionOfDatalist--${this._number}`, 'option--notSelected', 'option--visible');
        optionDOM.textContent = this._text;


        //Ajout évènement au clic sur l'option
        optionDOM.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("index", indexFilterIteration);
            const optionValue = strNoAccent(e.target.textContent.toLowerCase());
            const optionId = e.target.getAttribute('id');
            const optionType = optionId.substring(0, optionId.indexOf('--')); //Sur l'id de l'option, on détermine l'index de '--' et on extrait la chaîne de caractères se situant avant cet index pour récupérer le type de l'option
            const datalist = e.target.parentElement;
            if (mainSearchFieldValue == 0) {
                if (indexFilterIteration == 0) {
                    lookForTagString (recipes, optionValue, optionType);
                } else {
                    lookForTagString (displayedRecipesTag, optionValue, optionType);
                }
            } else {
                if (indexFilterIteration == 0) {
                    lookForTagString (displayedRecipes, optionValue, optionType);
                } else {
                    lookForTagString (displayedRecipesTag, optionValue, optionType);
                }
            }
            //on ajoute une iteration à l'indice des tags
            indexFilterIteration++ ;
            //on stocke  la valeur entrée
            this._secondarySearchFieldValue = optionValue;


            //On ajoute un clone de l'option (= tag) à la taglist
            const optionClone = e.target.cloneNode(true);
            optionClone.setAttribute('aria-selected', true);
            const cloneId = `clone-${optionId}`;
            optionClone.setAttribute('id', cloneId);

           
            //on ajout le clone de l'option cliquée à la liste de tags
            document.querySelector('.tagsList').appendChild(optionClone);
            

            //on met à jour les datalists (= filtres)
            let tagsAll = document.querySelector('.tagsList').children;
            console.log(tagsAll);
            updateFiltersTag(displayedRecipesTag, tagsAll);//updateFilters est situé dans pages/index.js


            //on masque l'option de la datalist d'origine
            let datalistChildren = datalist.children;
            let optionInList;
            for (let i = 0; i < datalistChildren.length; i++) {
                //quand la valeur de l'option d'origine est rencontrée, la boucle stoppe et on masque l'option correspondante
                if (strNoAccent(datalistChildren[i].textContent.toLowerCase()) == optionValue) {
                    optionInList = datalistChildren[i];
                    optionInList.classList.add('option--hidden');
                    optionInList.classList.remove('option--visible');
                    break;
                }
            }


            //on crée le bouton de fermeture du clone(= tag)
            const closeBtn = document.createElement('div');
            closeBtn.setAttribute('role', 'button');
            closeBtn.classList.add('closeBtn');

            
            //Ajout de l'évènement au clic sur le bouton 'fermer' de du tag(= clone de l'option d'origine)
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const clone = e.target.parentElement;
                clone.parentElement.removeChild(clone);

                let matchingRecipes = [];
                notMatchingRecipesTag = [];
                let tagsAll = document.querySelector('.tagsList').children;

                if (mainSearchFieldValue == 0) {
                    displayedRecipes = recipes;
                }
                if (tagsAll.length == 0) {
                    matchingRecipes = displayedRecipes;
                    notMatchingRecipesTag = [];
                    indexFilterIteration = 0;
                    for (let i = 0; i < matchingRecipes.length; i++) {
                        const recipeCardOn = document.getElementById(`recipe-card--${matchingRecipes[i].id}`);
                        recipeCardOn.classList.add('recipe-card--visible');
                        recipeCardOn.classList.remove('recipe-card--hidden');
                    }
                    //on met à jour les datalists (= filtres)
                    updateFilters(matchingRecipes);
                } else {
                    let tags = [];
                    for (let i = 0; i < tagsAll.length; i++) {
                        const tagName = strNoAccent(tagsAll[i].textContent.toLocaleLowerCase());
                        const tagId = tagsAll[i].getAttribute('id');
                        const tagType = tagId.substring(tagId.indexOf('--'), tagId.indexOf('-') + 1);
                        console.log('tagtype', tagType);
                        const tag = {"tagname": tagName, "tagtype": tagType};
                        tags.push(tag);
                    }
                    //On réduit le nombre de recettes à tester à celles dont la longueur de la liste d'ingrédient correspond à la longueur de la liste de tags
                    let tagsIngredients = [];
                    for (let i = 0; i < tags.length; i++) {
                        console.log('tags[i].tagtype', tags[i].tagtype );
                        if (tags[i].tagtype == 'ingredients') {
                            tagsIngredients.push(tags[i]);
                        }
                    }
                    console.log("displayedRecipes", displayedRecipes);
                    for (let i = 0; i < displayedRecipes.length; i++) {
                        let recipe = displayedRecipes[i];
                        //Si le nombre d'ingrédients de la liste d'ingrédients de la recette i est inférieur aux nombres de tags recherchés, on ajoute directement la recette au non correspondance par tag
                        if ((tagsIngredients.length > 0) && (recipe.ingredients.length < tagsIngredients.length) ) {
                            notMatchingRecipesTag.push(recipe); 
                        //Sinon, on l'ajoute au tableau des non-correspondance par tag
                        } else {
                            matchingRecipes.push(recipe);
                        }
                    }

                    //On teste les recettes restantes selon les tags
                    lookForTagString(matchingRecipes, tags[0].tagname, tags[0].tagtype);
                    for (let i = 1; i < tags.length; i++) {
                        lookForTagString(displayedRecipesTag, tags[i].tagname, tags[i].tagtype);
                    }
                    //on met à jour les datalists (= filtres)
                    updateFilters(displayedRecipesTag);
                } 
            })

            optionClone.appendChild(closeBtn);

        })

        return optionDOM;
    }
}