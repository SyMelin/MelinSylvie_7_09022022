class Combobox {

    /**
     *  @param {Array} options tableau regroupant les options
     *  @param {String} number chiffre de numérotation
     *  @param {String} name nom de la liste
     */

    constructor (options, number, name) {
        this._options = options;
        this._number = number;
        this._name = name;
        this._comboboxLabel = this.createComboboxLabel();
        this._comboboxInput = this.createComboboxInput();
        this._comboboxDatalist = this.createComboboxDatalist();
        this._comboboxButton = this.createComboboxButton();
        this._comboboxHeader = this.createComboboxHeader();
    }
    

    create () {
        const comboboxContainer = document.createElement('form');
        comboboxContainer.classList.add('combobox-container', `combobox-container--${this._number}`);
        [this._comboboxHeader, this._comboboxDatalist].map(element => comboboxContainer.appendChild(element));

        const filters = document.querySelector('.filters');
        filters.appendChild(comboboxContainer);
    }

    createComboboxHeader () {
        const comboboxHeader = document.createElement('div');
        comboboxHeader.classList.add('combobox__header', `combobox__header--${this._number}`);
        [this._comboboxLabel, this._comboboxInput, this._comboboxButton].map(element => comboboxHeader.appendChild(element));
        return comboboxHeader;
    }

    createComboboxButton () {
        const comboboxButton = document.createElement('div');
        comboboxButton.setAttribute('role', 'button');
        comboboxButton.setAttribute('aria-haspopup', 'listbox');
        comboboxButton.setAttribute('aria-expanded', false);
        comboboxButton.classList.add('combobox__btn', 'expandBtn', 'expandBtn--more');

        //////////// Fonction utile pour l'évenement sur le bouton expand de la combobox /////////////////
        function changeDatalistDisplay (label, input, datalist) {

            let state = datalist.getAttribute('aria-expanded');

            //On masque le label, on affiche l'input du combobox ou l'inverse
            label.classList.toggle('combobox__label--hidden');
            input.classList.toggle('combobox__input--hidden');

            //On affiche les options de la datalist
            comboboxButton.setAttribute('aria-expanded', true);
            comboboxButton.classList.toggle('expandBtn--less');
            ['combobox__datalist--closed', 'combobox__datalist--open'].map(element => datalist.classList.toggle(element));

            //Selon l'état de la comboboxDatalist enregistré au clic
            if (state == "false") {
                datalist.setAttribute('aria-expanded', true);
            } else {
                comboboxButton.setAttribute('aria-expanded', false);
                datalist.setAttribute('aria-expanded', false);
            }
        }


        //////////// Evenement sur le bouton expand de la listbox au  clic sur le bouton expand /////////////////
        comboboxButton.addEventListener('click', function(e){
            e.preventDefault();
            const label = e.target.parentElement.firstChild;
            const input = label.nextSibling;
            const datalist = e.target.parentElement.parentElement.lastChild;
            changeDatalistDisplay(label, input, datalist);
        });

        return comboboxButton;
    }


    createComboboxLabel () {
        const label = document.createElement('div');
        label.setAttribute('id', `combobox__label--${this._number}`); //
        label.setAttribute('for', `${strNoAccent(this._name).toLowerCase()}`)
        label.classList.add('combobox__label');
        label.textContent = this._name;
        return label;
    }


    createComboboxInput () {
        const input = document.createElement('input');
        input.setAttribute('id', `${strNoAccent(this._name).toLowerCase()}`);
        input.setAttribute('name', `${this._name}`);
        input.setAttribute('type', 'text');
        input.setAttribute('minlength', 3);
        input.setAttribute('placeholder', `Rechercher un ${this._name.toLowerCase()}`);
        input.classList.add('combobox__input',`combobox__input--${this._number}`, 'combobox__input--hidden');
        return input;
    }

    createComboboxDatalist () {
        const datalist = document.createElement('ul');
        datalist.setAttribute('role', 'datalist');
        datalist.setAttribute('aria-expanded', false);
        datalist.setAttribute('aria-labelledby', `combobox__label--${this._number}`);
        datalist.setAttribute('click-index', '0');
        ['combobox__datalist', `combobox__datalist--${this._number}`,'combobox__datalist--closed'].map(element => datalist.classList.add(element));

        let integer = 1;
        this._options.forEach((option) => {
            const optionDOM = this.createOption(integer, option);
            datalist.appendChild(optionDOM);
            integer++ ;
        })

        return datalist;
    }

    updateComboboxDatalist (updatedList) {
        const datalist = document.querySelector(`.combobox__datalist--${this._number}`);
        let datalistOptions = Array.from(datalist.children);
        datalistOptions.forEach((option) => {
            datalist.removeChild(option);
        })
        let integer = 1;
        updatedList.forEach((option) =>{
            const optionDOM = this.createOption(integer, option);
            datalist.appendChild(optionDOM);
            integer++ ;
        })

        return datalist;
    }

    createOption (integer, text) {
        const option = document.createElement('li');
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', false);
        option.setAttribute('id', `option--${integer}`);
        option.classList.add('option', 'option--notSelected', `option--${this._number}`, 'option--visible');
        option.textContent = text;

        function lookForTagString(array, value) {
            console.log("array utilisé", array);
            let matchingRecipes = [];
            //on cherche une correspondance au niveau du nom de chaque recette
            let regex = "\\b" + value;
            let regexForString = new RegExp(regex, 'g');
            //console.log(regexForString);
            for (let i = 0; i < array.length; i++) {
                let recipe = array[i];
                //console.log(array[i]);
                //On cherche une correspondance au niveau des ingrédients de la recette
                let test = false;
                for (let j = 0; j < recipe._ingredients.length; j++) {
                    //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                    if (strNoAccent(recipe._ingredients[j].ingredient.toLowerCase()).match(regexForString)) {
                        test = true;
                        matchingRecipes.push(recipe);
                        break;
                    }
                }
                if (test == false) {
                    notMatchingRecipesTag.push(recipe);  
                }  
            }
            console.log("matchingRecipes", matchingRecipes);
            console.log("notMatchingRecipesTag", notMatchingRecipesTag);
            if (matchingRecipes.length == 0) {
                //document.querySelector('.main-search__formField'). setAttribute('data-error-visible', true);
            }

            // On actualise le tableau des recettes affichées
            displayedRecipesTag = matchingRecipes;
            console.log("displayedRecipesTag", displayedRecipesTag);
            for (let i = 0; i < displayedRecipesTag.length; i++) {
            const recipeCardOn = document.getElementById(`recipe-card--${displayedRecipesTag[i]._id}`);
                recipeCardOn.classList.add('recipe-card--visible');
                recipeCardOn.classList.remove('recipe-card--hidden');
            }
            //notDisplayedRecipes = notMatchingRecipes;
            for (let i = 0; i < notMatchingRecipesTag.length; i++) {
                const recipeCardOff = document.getElementById(`recipe-card--${notMatchingRecipesTag[i]._id}`);
                recipeCardOff.classList.remove('recipe-card--visible');
                recipeCardOff.classList.add('recipe-card--hidden');
            }
        }


        option.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("index", indexFilterIteration);
            const optionValue = strNoAccent(e.target.textContent.toLowerCase());
            if (mainSearchFieldValue == 0) {
                if (indexFilterIteration == 0) {
                    lookForTagString (dataModified, optionValue);
                } else {
                    lookForTagString (displayedRecipesTag, optionValue);
                }
            } else {
                if (indexFilterIteration == 0) {
                    lookForTagString (displayedRecipes, optionValue);
                } else {
                    lookForTagString (displayedRecipesTag, optionValue);
                }
            }
            //on ajoute une iteration à l'indice des tags
            indexFilterIteration++ ;
            //on stocke  la valeur entrée
            mainSearchFieldValue = optionValue;


            option.classList.add('option--hidden');
            option.classList.remove('option--visible');
            const optionClone = e.target.cloneNode(true);
            optionClone.setAttribute('aria-selected', true);

            const closeBtn = document.createElement('div');
            closeBtn.setAttribute('role', 'button');
            closeBtn.classList.add('closeBtn');



            function lookForTagStringInTagList(array, value) {
               // console.log("array utilisé", array);
                let matchingRecipes = [];
                //on cherche une correspondance au niveau du nom de chaque recette
                let regex = "\\b" + value;
                let regexForString = new RegExp(regex, 'g');
                //console.log(regexForString);
                for (let i = 0; i < array.length; i++) {
                    let recipe = array[i];
                    //On cherche une correspondance au niveau des ingrédients de la recette
                    let test = false;
                    for (let j = 0; j < recipe._ingredients.length; j++) {
                        //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                        if (strNoAccent(recipe._ingredients[j].ingredient.toLowerCase()).match(regexForString)) {
                            test = true;
                            matchingRecipes.push(recipe);
                            break;
                        }
                    }
                    if (test == false) {
                        notMatchingRecipesTag.push(recipe);  
                    }  
                }
                console.log("matchingRecipes", matchingRecipes);
                console.log("notMatchingRecipesTag", notMatchingRecipesTag);
                if (matchingRecipes.length == 0) {
                }
    
                // On actualise le tableau des recettes à afficher et on les affiche
                displayedRecipesTag = matchingRecipes;
                console.log("displayedRecipesTag", displayedRecipesTag);
                for (let i = 0; i < displayedRecipesTag.length; i++) {
                    const recipeCardOn = document.getElementById(`recipe-card--${displayedRecipesTag[i]._id}`);
                    recipeCardOn.classList.add('recipe-card--visible');
                    recipeCardOn.classList.remove('recipe-card--hidden');
                }
                //On masque les recettes non correspondantes
                for (let i = 0; i < notMatchingRecipesTag.length; i++) {
                    const recipeCardOff = document.getElementById(`recipe-card--${notMatchingRecipesTag[i]._id}`);
                    recipeCardOff.classList.remove('recipe-card--visible');
                    recipeCardOff.classList.add('recipe-card--hidden');
                }
            }

            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const option = e.target.parentElement;
                const id = option.getAttribute('id');
                option.parentElement.removeChild(option);
                const optionInList = document.querySelector(`.combobox__datalist--1 #${id}`);
                optionInList.classList.remove('option--hidden');
                optionInList.classList.add('option--visible');

                let matchingRecipes = [];
                notMatchingRecipesTag = [];

                let tagsAll = document.querySelector('.tagsList').children;
                if (tagsAll.length == 0) {
                    matchingRecipes = displayedRecipes;
                    notMatchingRecipesTag = [];
                    indexFilterIteration = 0;
                    for (let i = 0; i < matchingRecipes.length; i++) {
                        const recipeCardOn = document.getElementById(`recipe-card--${matchingRecipes[i]._id}`);
                        recipeCardOn.classList.add('recipe-card--visible');
                        recipeCardOn.classList.remove('recipe-card--hidden');
                    }
                } else {
                    //console.log("tags", tagsAll);
                    let tagsText = [];
                    for (let i = 0; i < tagsAll.length; i++) {
                        tagsText.push(strNoAccent(tagsAll[i].textContent.toLocaleLowerCase()));
                    }
                    //console.log(tagsText);
                    
                    //On réduit le nombre de recettes à tester à celles dont la longueur de la liste d'ingrédient correspond à la longueur de la liste de tags
                    console.log("displayedRecipes", displayedRecipes);
                    console.log(tagsText);
                    for (let i = 0; i < displayedRecipes.length; i++) {
                        let recipe = displayedRecipes[i];
                        //Si le nombre d'ingrédients de la liste d'ingrédients de la recette i est inférieur aux nombres de tags recherchés, on ajoute directement la recette au non correspondance par tag
                        if (recipe._ingredients.length < tagsText.length ) {
                            notMatchingRecipesTag.push(recipe); 
                        //Sinon, on l'ajoute au tableau des non-correspondance par tag
                        } else {
                            matchingRecipes.push(recipe);
                        }
                    }
                    lookForTagStringInTagList(matchingRecipes, tagsText[0]);
                        //console.log("tagsText[0] tableau utilisé", displayedRecipes);
                        //console.log("tagsText[0] mot", tagsText[0]);
                    for (let i = 1; i < tagsText.length; i++) {
                        //console.log("tagsText[i] tableau utilisé", displayedRecipesTag);
                        //console.log("tagsText[i] tableau mot", tagsText[i]);
                        lookForTagStringInTagList(displayedRecipesTag, tagsText[i]);
                    }
                }
            })

            optionClone.appendChild(closeBtn);
            document.querySelector('.tagsList').appendChild(optionClone);
        })

        return option;
    }
}