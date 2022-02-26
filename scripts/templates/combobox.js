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
        console.log(this._type);

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
        //option.setAttribute('id', `option--${integer}`);
        option.setAttribute('id', `${this._type}--${integer}`);
        option.classList.add('option', `optionOfDatalist--${this._number}`, 'option--notSelected', 'option--visible');
        option.textContent = text;

        function lookForTagString(array, value, type) {
            console.log(type);
            console.log("array utilisé", array);
            let matchingRecipes = [];
            //on cherche une correspondance au niveau du nom de chaque recette
            let regex = "\\b" + value;
            let regexForString = new RegExp(regex, 'g');
            //console.log(regexForString);
            for (let i = 0; i < array.length; i++) {
                let recipe = array[i];
                //console.log(array[i]);
                if (type == 'ingredients') {
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
                } else if (type == 'appliance') {
                    //console.log('appliance', recipe._appliance);
                    //console.log('nmrTags', notMatchingRecipesTag);
                    if (strNoAccent(recipe._appliance.toLowerCase()).match(regexForString)) {
                        matchingRecipes.push(recipe);
                    }
                    //sinon on ajoute l'option dans le table des non-correspondance et on passe à l'option suivante (si celle-ci existe) 
                    else {
                        notMatchingRecipesTag.push(recipe);  
                    }  
                } else if (type == 'ustensils') {
                    //On cherche une correspondance au niveau des ustensils de la recette
                   // console.log(recipe._ustensils.toString());
                    if (strNoAccent(recipe._ustensils.toString()).match(regexForString)) {
                        matchingRecipes.push(recipe);
                        //console.log(recipe);
                    } else {
                        notMatchingRecipesTag.push(recipe);  
                    }  
                } else {
                    console.log("pas de fonction");
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
            const optionTypeId = e.target.getAttribute('id');
            const optionType = optionTypeId.substring(0, optionTypeId.indexOf('--')); //Sur l'id de l'option, on détermine l'index de '--' et on extrait la chaîne de caractères se situant avant cet index pour récupérer le type de l'option
           // console.log('type', optionType);
            if (mainSearchFieldValue == 0) {
                if (indexFilterIteration == 0) {
                    lookForTagString (dataModified, optionValue, optionType);
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


            
            const optionClone = e.target.cloneNode(true);
            optionClone.setAttribute('aria-selected', true);
            e.target.classList.add('option--hidden');
            e.target.classList.remove('option--visible');

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
                const optionId = option.getAttribute('id');

                option.parentElement.removeChild(option);
                const optionOfDatalist = Array.from(option.classList).find(element => element.match('optionOfDatalist'));
                console.log(optionOfDatalist);
                const datalistNumber = optionOfDatalist.substring(optionOfDatalist.lastIndexOf('-') + 1, optionOfDatalist.length);
                console.log(datalistNumber);
                const optionInList = document.querySelector(`.combobox__datalist--${datalistNumber} #${optionId}`);
                optionInList.classList.remove('option--hidden');
                optionInList.classList.add('option--visible');

                let matchingRecipes = [];
                notMatchingRecipesTag = [];

                let tagsAll = document.querySelector('.tagsList').children;
               // console.log('tagsAll', tagsAll);
                console.log('mainValue', mainSearchFieldValue);
                if (mainSearchFieldValue == 0) {
                    displayedRecipes = dataModified;
                }
                if (tagsAll.length == 0) {
                    matchingRecipes = displayedRecipes;
                    console.log(displayedRecipes);
                    notMatchingRecipesTag = [];
                    indexFilterIteration = 0;
                    for (let i = 0; i < matchingRecipes.length; i++) {
                        const recipeCardOn = document.getElementById(`recipe-card--${matchingRecipes[i]._id}`);
                        recipeCardOn.classList.add('recipe-card--visible');
                        recipeCardOn.classList.remove('recipe-card--hidden');
                    }
                } else {
                    //console.log("tags", tagsAll);
                    let tags = [];
                    for (let i = 0; i < tagsAll.length; i++) {
                        const tagName = strNoAccent(tagsAll[i].textContent.toLocaleLowerCase());
                        const tagId = tagsAll[i].getAttribute('id');
                        const tagType = tagId.substring(0, tagId.indexOf('--'));
                        const tag = {"tagname": tagName, "tagtype": tagType};
                        //console.log ('tag', tag);
                        tags.push(tag);
                    }
                    console.log('tags', tags);

                    let tagsIngredients = [];
                    for (let i = 0; i < tags.length; i++) {
                        if (tags[i].tagtype == 'ingredients') {
                            tagsIngredients.push(tags[i]);
                        }
                    }
                    console.log('tagsIngredients', tagsIngredients);
                    
                    //On réduit le nombre de recettes à tester à celles dont la longueur de la liste d'ingrédient correspond à la longueur de la liste de tags
                    console.log("displayedRecipes", displayedRecipes);
                    console.log("tagsIngredients", tagsIngredients);
                    for (let i = 0; i < displayedRecipes.length; i++) {
                        let recipe = displayedRecipes[i];
                        //Si le nombre d'ingrédients de la liste d'ingrédients de la recette i est inférieur aux nombres de tags recherchés, on ajoute directement la recette au non correspondance par tag
                        if ((tagsIngredients.length > 0) && (recipe._ingredients.length < tagsIngredients.length) ) {
                            notMatchingRecipesTag.push(recipe); 
                        //Sinon, on l'ajoute au tableau des non-correspondance par tag
                        } else {
                            matchingRecipes.push(recipe);
                        }
                    }
                    lookForTagStringInTagList(matchingRecipes, tagsIngredients[0].tagname);
                        //console.log("tagsText[0] tableau utilisé", displayedRecipes);
                        //console.log("tagsText[0] mot", tagsText[0]);
                    for (let i = 1; i < tagsIngredients.length; i++) {
                        //console.log("tagsText[i] tableau utilisé", displayedRecipesTag);
                        //console.log("tagsText[i] tableau mot", tagsText[i]);
                        lookForTagStringInTagList(displayedRecipesTag, tagsIngredients[i].tagname);
                    }
                }
            })

            optionClone.appendChild(closeBtn);
            document.querySelector('.tagsList').appendChild(optionClone);
        })

        return option;
    }
}