function lookForStringInSecondary(array, value) {
    let matchingOptions = [];
    //on cherche une correspondance au niveau de chaque option
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    for (let i = 0; i < array.length; i++) {
        let option = array[i];
        //s'il y a correspondance sur le texte de l'option, on ajoute l'option au tableau des correspondance et on passe à l'option suivante (si celle-ci existe)
        if (strNoAccent(option.textContent.toLowerCase()).match(regexForString)) {
            matchingOptions.push(option);
        }
        //sinon on ajoute l'option dans le table des non-correspondance et on passe à l'option suivante (si celle-ci existe) 
        else {
            notMatchingOptions.push(option);  
        }     
    }
    if (matchingOptions.length == 0) {
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