function testElement (type, regex, element, elementToTest, matchArray, noMatchArray) {
    //console.log(type, element, elementToTest);

    switch (type ) {

        case 'string' :
            //On cherche une correspondance au niveau de l'élément à tester 
            if (strNoAccent(elementToTest.toLowerCase()).match(regex)) {
                //S'il y a correspondance, on ajoute l'élémént à un tableau de correspondance
                matchArray.push(element);
            } else {
                //Sinon, on ajout l'élémént à un tableau de nom correspondance
                noMatchArray.push(element);  
            }  
        break;

        case 'arrayIngredients' :
            let test = false;
            for (let j = 0; j < elementToTest.length; j++) {
                //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                if (strNoAccent(elementToTest[j].ingredient.toLowerCase()).match(regex)) {
                    test = true;
                    matchArray.push(element);
                    break;
                }
            }
            if (test == false) {
                noMatchArray.push(element);  
            }
        break;
    }
}