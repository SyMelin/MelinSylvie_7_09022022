function lookForStringInSecondary(array, value) {
    let matchingOptions = [];
    //on cherche une correspondance au niveau de chaque option
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    //console.log(regexForString);
    for (let i = 0; i < array.length; i++) {
        //console.log("option", array[i]);
        let option = array[i];
        //s'il y a correspondance sur le texte de l'option, on ajoute l'option au tableau des correspondance et on passe à l'option suivante (si celle-ci existe)
        //console.log(option.childNodes[0].nodeValue);
       // console.log(option.textContent);
        if (strNoAccent(option.textContent.toLowerCase()).match(regexForString)) {
            matchingOptions.push(option);
        }
        //sinon on ajoute l'option dans le table des non-correspondance et on passe à l'option suivante (si celle-ci existe) 
        else {
            notMatchingOptions.push(option);  
        }     
    }
    //console.log("matchingOptions", matchingOptions);
    //console.log("unmatch", notMatchingOptions);
    if (matchingOptions.length == 0) {
       // document.querySelector('.main-search__formField'). setAttribute('data-error-visible', true);
    }

    // On actualise le tableau des options affichées
    displayedOptions = matchingOptions;
    for (let i = 0; i < displayedOptions.length; i++) {
        displayedOptions[i].classList.add('option--visible');
        displayedOptions[i].classList.remove('option--hidden');
    }
    //notDisplayedOptions = notMatchingOptions;
    for (let i = 0; i < notMatchingOptions.length; i++) {
        notMatchingOptions[i].classList.remove('option--visible');
        notMatchingOptions[i].classList.add('option--hidden');
    }
}


function searchOnCombobox (element) {
    //on rend visible toutes les options au début du test
    const optionsI = document.querySelectorAll('.combobox__datalist--1 .option');
    for (let i = 0; i < optionsI.length; i++) {
        let option = optionsI[i];
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
                lookForStringInSecondary (optionsI, modifiedInput);
            }
            //on stocke  la valeur entrée
            secondarySearchFieldValue = modifiedInput;
            //console.log("mainSearchFieldValue", mainSearchFieldValue);
        } else {
            console.log("le format du texte n'est pas valide");           
            //On n'affiche aucune option
            for (let i = 0; i < optionsI.length; i++) {
                let option = optionsI[i];
                option.classList.add('option--hidden');
                option.classList.remove('option--visible');
            }
        }
    } else {
        //element.parentElement.parentElement.setAttribute("data-error-visible", false);
        // On affiche un message invitant l'utilisateur à saisir le nombre minimum de caractères
       // document.querySelector('.data-info').classList.add('data-info--visible');
       // document.querySelector('.data-info').classList.remove('data-info--hidden');
    }
}