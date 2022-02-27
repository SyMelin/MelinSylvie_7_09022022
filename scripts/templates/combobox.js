class Combobox {

    /**
     *  @param {Array} options tableau regroupant les options
     *  @param {String} number chiffre de numérotation
     *  @param {String} name nom de la liste à afficher (en français)
     *  @param {String} type nom de la liste pour le code (en anglais)
     */

    constructor (options, number, name, type) {
        this._options = options;
        this._number = number;
        this._name = name;
        this._type = type;
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
        label.setAttribute('for', `${this._type}`)
        label.classList.add('combobox__label');
        label.textContent = this._name;
        return label;
    }


    createComboboxInput () {
        const input = document.createElement('input');
        input.setAttribute('id', `${this._type}`);
        input.setAttribute('name', `${this._type}`);
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
            const optionDOM = this.createOption(integer, option, this._type);
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
        option.setAttribute('id', `${this._type}--${integer}`);
        option.classList.add('option', `optionOfDatalist--${this._number}`, 'option--notSelected', 'option--visible');
        option.textContent = text;

        //Ajout évènement au clic sur l'option
        option.addEventListener('click', function(e) {
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
            secondarySearchFieldValue = optionValue;


            //On ajoute un clone de l'option (= tag) à la taglist
            const optionClone = e.target.cloneNode(true);
            optionClone.setAttribute('aria-selected', true);
            const cloneId = `clone-${optionId}`;
            optionClone.setAttribute('id', cloneId);


            //on met à jour les datalists (= filtres)
            updateFilters(displayedRecipesTag);


            //on masque l'option de la datalist d'origine
            let datalistChildren =  datalist.children;
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
                    let tagsIngredients = [];
                    for (let i = 0; i < tags.length; i++) {
                        console.log('tags[i].tagtype', tags[i].tagtype );
                        if (tags[i].tagtype == 'ingredients') {
                            tagsIngredients.push(tags[i]);
                        }
                    }

                    //On réduit le nombre de recettes à tester à celles dont la longueur de la liste d'ingrédient correspond à la longueur de la liste de tags
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
            document.querySelector('.tagsList').appendChild(optionClone);
        })

        return option;
    }
}