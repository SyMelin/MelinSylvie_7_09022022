function testElement (type, regex, element, elementToTest, matchArray, noMatchArray) {
    //console.log(type, element, elementToTest);

    switch (type) {

        case 'string' :
            //On cherche une correspondance au niveau de l'élément à tester
            //replaceAll(/\)|\(/g, "") enlève les parenthèse
            if (strNoAccent(elementToTest.toLowerCase()).replaceAll(/\)|\(/g, "").match(regex)) {
                //S'il y a correspondance, on ajoute l'élémént à un tableau de correspondance
                matchArray.push(element);
            } else {
                //Sinon, on ajoute l'élémént à un tableau de non-correspondance
                noMatchArray.push(element);  
            }  
        break;

        case 'arrayIngredients' :
            let test = false;
            for (let j = 0; j < elementToTest.length; j++) {
                //s'il y a correspondance sur un ingédient, le test sur les ingrédients s'arrête, on ajoute la recette au tableau des correspondances et on passe à la recette suivante (si celle-ci existe)
                //replaceAll(/\)|\(/g, "") enlève les parenthèse
                if (strNoAccent(elementToTest[j].ingredient.toLowerCase()).replaceAll(/\)|\(/g, "").match(regex)) {
                    test = true;
                    matchArray.push(element);
                    break;
                }
            }
            //Si le test est toujours faux, on ajoute l'élémént à un tableau de non-correspondance
            if (test == false) {
                noMatchArray.push(element);  
            }
        break;
    }
}