function searchOnCombobox (element, secondarySearchFieldValue) {
    //on rend visible toutes les options au début du test
   const optionsOfDatalist = element.parentElement.nextSibling.children;
   //console.log(optionsOfDatalist);
    for (let i = 0; i < optionsOfDatalist.length; i++) {
        let option = optionsOfDatalist[i];
        option.classList.add('option--visible');
        option.classList.remove('option--hidden');
    }
     //on vérifie qu'au moins 3 caractères sont saisis
    if (element.value.length >= element.getAttribute('minlength')) {
        if (isTextValid (element) === true){
            let modifiedInput = strNoAccent(element.value.toLowerCase());
            //Si la longueur de la valeur nouvellement saisie est supérieure à celle de la valeur stockée
            if (modifiedInput.length > secondarySearchFieldValue.length) {
                lookForStringInSecondary (displayedOptions, modifiedInput);
            } else {
                notMatchingOptions = [];
                lookForStringInSecondary (optionsOfDatalist, modifiedInput);
            }
            //on stocke  la valeur entrée
            secondarySearchFieldValue = modifiedInput;
            //console.log("mainSearchFieldValue", mainSearchFieldValue);
        } else {
            console.log("le format du texte n'est pas valide");           
            //On n'affiche aucune option
            for (let i = 0; i < optionsOfDatalist.length; i++) {
                let option = optionsOfDatalist[i];
                option.classList.add('option--hidden');
                option.classList.remove('option--visible');
            }
        }
    } else {
        console.log('le nombre de carcatères saisis est insuffisant');
    }
}