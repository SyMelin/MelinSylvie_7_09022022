class Listbox {

    /**
     *  @param {Array} options tableau regroupant les options
     *  @param {String} number chiffre de numérotation
     *  @param {String} name nom de la liste
     */

    constructor (options, number, name) {
        this._options = options;
        this._number = number;
        this._name = name;
        this._label = this.createListboxLabel();
        this._listbox = this.createListbox();
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
        const listboxContainer = document.createElement('div');
        listboxContainer.classList.add('listbox-container', `'listbox-container--${this._number}'`);
        listboxContainer.appendChild(this._label);
        listboxContainer.appendChild(this._listbox);
        const filters = document.querySelector('.filters');
        console.log(filters);
        filters.appendChild(listboxContainer);
    }

    createListboxLabel () {
        //console.log(this._options);
       //// console.log(this._name);
        const listboxLabel = document.createElement('div');
        console.log(this._number);
        listboxLabel.setAttribute('id', `'listbox-label--${this._number}'`); //
        listboxLabel.classList.add('listox-label');
        listboxLabel.textContent = this._name;
        console.log(listboxLabel);
        return listboxLabel;
    }

    createListbox () {
        const listbox = document.createElement('ul');
        listbox.setAttribute('role', 'listbox');
        listbox.setAttribute('aria-expanded', false);
        listbox.setAttribute('aria-labelledby', `'lisbox-label--${this._number}'`);
        ['listbox', 'listbox--close'].map(element => listbox.classList.add(element));

        let integer = 1;
        this._options.forEach((option) => {
            const optionDOM = this.createOption(integer, option);
            listbox.appendChild(optionDOM);
            integer++ ;
        })

        return listbox;
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