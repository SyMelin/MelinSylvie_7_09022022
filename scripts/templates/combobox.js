//La class Combobox correspond visuellement aux filtres, qui, une fois ouverts, affichent un champs de recherche ainsi qu'une liste d'options

class Combobox {

    /**
     *  @param {Array} options tableau regroupant les options
     *  @param {String} number chiffre de numérotation
     *  @param {String} name nom de la liste à afficher (en français)
     *  @param {String} type nom de la liste pour le code (en anglais)
     *  @param {} secondarySearchFieldValue variable de stockage de la valeur saisie sur le champ de recherche secondaire
     */

    constructor (options, number, name, type, secondarySearchFieldValue) {
        this._options = options;
        this._number = number;
        this._name = name;
        this._type = type;
        this._secondarySearchFieldValue = secondarySearchFieldValue;
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
        input.setAttribute('placeholder', `Rechercher un ${this._name.toLowerCase().substring(0, this._name.length - 1)}`);//On enlève le 's' à la fin de this._name
        input.classList.add('combobox__input',`combobox__input--${this._number}`, 'combobox__input--hidden');

        //Evènement à l'input sur le champ de recherche secondaire
        input.addEventListener('input', (e) => {
            console.log('second', this._secondarySearchFieldValue)
            searchOnCombobox(e.target, this._secondarySearchFieldValue);
        });

        //on évite le rechargement de la page avec la touche Entrée sur le champ de saisie principale
        input.addEventListener('keydown', function(e){
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });

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
            const optionDOM = this.createOption(integer, option, this._type, this._number, this._secondarySearchFieldValue);
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
            const optionDOM = this.createOption(integer, option, this._type, this._number, this._secondarySearchFieldValue);
            datalist.appendChild(optionDOM);
            integer++ ;
        })

        return datalist;
    }

    createOption (integer, text, type, number, secondarySearchFieldValue) {
        const option = new Option (integer, text, type, number, secondarySearchFieldValue);
        const optionDOM = option.getOptionDOM();

        return optionDOM;
    }
}