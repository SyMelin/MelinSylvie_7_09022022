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
/*
    <div tabindex="0" id="listbox-label" class="tabindex0 inMain">Trier par </div>
        <div tabindex="-1" class="listbox-container">
          <div tabindex="0" role="listbox" aria-expanded="false" aria-labelledby="listbox-label" class="tabindex0 inMain listbox listbox--close">
            <div tabindex="-1" role="option" aria-selected="false" id="popularity" class="tabindex0 inMain option option--notSelected option1">Popularité</div>
            <div tabindex="-1" role="option" aria-selected="true" id="date" class="tabindex0 inMain option option--selected option2">Date</div>
            <div tabindex="-1" role="option" aria-selected="false" id="title" class="tabindex0 inMain option option--notSelected option3">Titre</div>
          </div>
          <div tabindex="0" role="button" aria-haspopup="listbox" aria-expanded="false" class="tabindex0 inMain expandBtn expandBtn--more"></div>
        </div>
      </div>
*/


    create () {
        const comboboxContainer = document.createElement('div');
        comboboxContainer.classList.add('combobox-container', `combobox-container--${this._number}`);
        [this._comboboxHeader, this._comboboxDatalist].map(element => comboboxContainer.appendChild(element));

        const filters = document.querySelector('.filters');
        console.log(filters);
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
        comboboxButton.classList.add('combobox__btn', 'expandBtn', 'expandBtn--more');

        //////////// Fonction utile pour l'évenement sur le bouton expand de la combobox /////////////////
        function changeDatalistDisplay (label, input, datalist) {

           // const comboboxDatalist = document.querySelector(`combobox__datalist--${this._number}`);
            let state = datalist.getAttribute('aria-expanded');
            console.log("HELLO", state);

            //On masque le label, on affiche l'input du combobox
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


        //////////// Evenement sur le bouton expand de la listbox /////////////////

        //au  clic sur le bouton expand
        comboboxButton.addEventListener('click', function(e){
            e.preventDefault();
            const label = e.target.parentElement.firstChild;
            const input = label.nextSibling;
            const datalist = e.target.parentElement.parentElement.lastChild;
            console.log("datalist", datalist);
            changeDatalistDisplay(label, input, datalist);
        });

        return comboboxButton;
    }

    createComboboxLabel () {
        //console.log(this._options);
       //// console.log(this._name);
        const label = document.createElement('div');
        console.log(this._number);
        label.setAttribute('id', `combobox__label--${this._number}`); //
        label.setAttribute('for', `${this._name}`)
        label.classList.add('combobox__label');
        label.textContent = this._name;
        console.log(label);
        return label;
    }

    //<label for="monNavigateur">Veuillez choisir un navigateur parmi ceux-ci :</label>
    //<input list="navigateurs" id="monNavigateur" name="monNavigateur"/>

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
        option.classList.add('option', 'option--notSelected');
        option.textContent = text;
        return option;
    }
}