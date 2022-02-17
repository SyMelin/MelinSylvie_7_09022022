//Regex pour validation du texte sur input
let isTextValid = function (element) {
    if (/^\b([A-zÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+$/gm.test(element.value)){
        return true;
    }};

function lookForString(element, value) {
    if (element.value != value) {
        matchingRecipes = [];
        search(element);
        console.log(matchingRecipes);
    } else {
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(value)) {
                matchingRecipes.push(recipes[i]);
            }
        }
        console.log(matchingRecipes);
    } 
}


function search(element) {
    console.log (element.value);
    console.log (element.value.length);
    //on vérifie qu'au moins 3 caractères sont saisis
    if (element.value.length >= element.getAttribute('minlength')) {
        //on vérifie que les caractères saisis sont valides
        if (isTextValid (element) === true){
            element.style.backgroundColor = 'green';
            element.parentElement.parentElement.setAttribute("data-error-visible", false);
            let input = element.value.toLowerCase();
            console.log(input);
            lookForString(element, input);
        } else {
            element.style.backgroundColor = 'yellow';
            element.parentElement.parentElement.setAttribute("data-error-visible", true);
        }
    } else {
        element.style.backgroundColor = 'pink';
        element.parentElement.parentElement.setAttribute("data-error-visible", false);
    }   
}