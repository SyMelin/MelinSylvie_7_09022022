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
        //console.log(filters);
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

            
            clickIndex++ ;
            datalist.setAttribute('click-index', clickIndex);


            //On masque le label, on affiche l'input du combobox ou l'inverse
            label.classList.toggle('combobox__label--hidden');
            input.classList.toggle('combobox__input--hidden');

            //On affiche les options de la datalist
            comboboxButton.setAttribute('aria-expanded', true);
            comboboxButton.classList.toggle('expandBtn--less');
            ['combobox__datalist--closed', 'combobox__datalist--open'].map(element => datalist.classList.toggle(element));

            /*
            options.forEach((option) => {
                option.setAttribute('tabindex', 0);

                option.addEventListener('keydown', function(e) {
                    moveToOption (e, option);
                });

                if (option.classList.contains('option--notSelected')) {
                    ['option--notSelected', 'option--selected'].map(element => option.classList.toggle(element));
                }
            });
            */

            //Selon l'état de la comboboxDatalist enregistré au clic
            if (state == "false") {
                datalist.setAttribute('aria-expanded', true);

                //On ferme les filtres déjà ouverts
        /*    const allDatalists = Array.from(document.getElementsByClassName('combobox__datalist'));
            console.log(allDatalists);
            allDatalists.forEach((list) => {
                let a = list.getAttribute('click-index');
                let b = datalist.getAttribute('click-index');
                console.log(list.getAttribute('aria-expanded'));
                if (a < b) {
                    console.log("inférieur");
                } else {
                    console.log("c'est le même");
                }
                if (list.getAttribute('click-index') < datalist.getAttribute('click-index')) {
                    console.log( list.parentElement.firstChild);
                    const listLabel = list.parentElement.firstChild.firstChild;
                    const listInput = listLabel.nextSibling;
                    const listButton = listInput.nextSibling;
                    listLabel.classList.remove('combobox__label--hidden');
                    listInput.classList.add('combobox__input--hidden');
                    listButton.classList.toggle('expandBtn--less');
                    ['combobox__datalist--closed', 'combobox__datalist--open'].map(element => list.classList.toggle(element));
                    listButton.setAttribute('aria-expanded', false);
                    list.setAttribute('aria-expanded', false);
                } else {
                    console.log("c l'élément cliqué");
                }
            })*/











            } else {
                comboboxButton.setAttribute('aria-expanded', false);
                datalist.setAttribute('aria-expanded', false);
                /*
                options.forEach((option)=> {
                    option.setAttribute('tabindex', -1);
                    if ((option.getAttribute('aria-selected')) == "false") { 
                        ['option--notSelected', 'option--selected'].map(element => option.classList.toggle(element));
                    }
                })*/ 
            }
        }


        //////////// Evenement sur le bouton expand de la listbox au  clic sur le bouton expand /////////////////
        comboboxButton.addEventListener('click', function(e){
            e.preventDefault();
            const label = e.target.parentElement.firstChild;
            const input = label.nextSibling;
            const datalist = e.target.parentElement.parentElement.lastChild;
            //console.log("datalist", datalist);
            changeDatalistDisplay(label, input, datalist);
        });

        return comboboxButton;
    }


    createComboboxLabel () {
        //console.log(this._options);
       //// console.log(this._name);
        const label = document.createElement('div');
        //console.log(this._number);
        label.setAttribute('id', `combobox__label--${this._number}`); //
        label.setAttribute('for', `${this._name}`)
        label.classList.add('combobox__label');
        label.textContent = this._name;
        //console.log(label);
        return label;
    }


    createComboboxInput () {
        const input = document.createElement('input');
        input.setAttribute('id', `${this._name}`);
        input.setAttribute('name', `${this._name}`);
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', `Rechercher un ${this._name}`);
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

    createOption (integer, text) {
        const option = document.createElement('li');
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', false);
        option.setAttribute('id', `'option--${integer}'`);
        option.classList.add('option', 'option--notSelected', `option--${this._number}`);
        option.textContent = text;

        option.addEventListener('click', function(e) {
            e.preventDefault();
            const optionClone = e.target.cloneNode(true);
            optionClone.setAttribute('aria-selected', true);

            const closeBtn = document.createElement('div');
            closeBtn.setAttribute('role', 'button');
            closeBtn.classList.add('closeBtn');

            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const option = e.target.parentElement;
                option.parentElement.removeChild(option);
            })

            optionClone.appendChild(closeBtn);
            document.querySelector('.tagsList').appendChild(optionClone);
        })

        return option;
    }
}