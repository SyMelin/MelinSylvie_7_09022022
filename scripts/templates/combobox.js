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
        this._comboboxDatalist = this.createComboboxDatalist();
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
        comboboxContainer.appendChild(this._comboboxLabel);
        comboboxContainer.appendChild(this._comboboxDatalist);
        const filters = document.querySelector('.filters');
        console.log(filters);
        filters.appendChild(comboboxContainer);
    }

    createComboboxLabel () {
        //console.log(this._options);
       //// console.log(this._name);
        const label = document.createElement('div');
        console.log(this._number);
        label.setAttribute('id', `combobox__label--${this._number}`); //
        label.classList.add('combobox__label');
        label.textContent = this._name;
        console.log(label);
        return label;
    }

    createComboboxDatalist () {
        const datalist = document.createElement('ul');
        datalist.setAttribute('role', 'datalist');
        datalist.setAttribute('aria-expanded', false);
        datalist.setAttribute('aria-labelledby', `combobox__label--${this._number}`);
        ['datalist', 'datalist--close'].map(element => datalist.classList.add(element));

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
        ['option', 'option--notSelected'].map(element => option.classList.add(element));
        option.textContent = text;
        return option;
    }
}