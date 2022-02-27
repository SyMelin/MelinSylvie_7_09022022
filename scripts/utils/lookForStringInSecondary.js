function lookForStringInSecondary(array, value) {
    let matchingOptions = [];
    //on cherche une correspondance au niveau de chaque option
    let regex = "\\b" + value;
    let regexForString = new RegExp(regex, 'g');
    for (let i = 0; i < array.length; i++) {
        let option = array[i];
        testElement('string', regexForString, option, option.textContent, matchingOptions, notMatchingOptions);
        //console.log('TestmatchArray', matchingOptions);
        //console.log('TestnoMatchArray', notMatchingOptions);
    }

    //on actualise le tableau des options affichées
    displayedOptions = matchingOptions;
    for (let i = 0; i < displayedOptions.length; i++) {
        displayedOptions[i].classList.add('option--visible');
        displayedOptions[i].classList.remove('option--hidden');
    }
    //on masque les options non-correspondantes
    for (let i = 0; i < notMatchingOptions.length; i++) {
        notMatchingOptions[i].classList.remove('option--visible');
        notMatchingOptions[i].classList.add('option--hidden');
    }
}