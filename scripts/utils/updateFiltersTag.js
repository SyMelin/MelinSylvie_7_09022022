//Actualise les filtres au clic sur les options (= comboboxes)
function updateFiltersTag (data, list) {
    getFiltersLists(data);
    let tags = [];
    for (let i = 0; i < list.length; i++) {
        const tagName = strNoAccent(list[i].textContent.toLocaleLowerCase());
        const tagId = list[i].getAttribute('id');
        const tagType = tagId.substring(tagId.indexOf('--'), tagId.indexOf('-') + 1);
       // console.log('tagtype', tagType);
        const tag = {"tagname": tagName, "tagtype": tagType};
        tags.push(tag);
    }
    console.log('tags', tags);
    for (let i = 0; i < tags.length; i++) {
        type = tags[i].tagtype;
        //console.log('type', type);
        let regex = "\\b" + tags[i].tagname;
        let regexForString = new RegExp(regex, 'g');
       // console.log('regexforstring', regexForString);
        switch (type) {
            case 'ingredients' :
                let newArray1 = [];
                for (let j=0; j < allIngredients.length; j++) {
                    if(!(strNoAccent(allIngredients[j].toLocaleLowerCase()).match(regexForString))) {
                        newArray1.push(allIngredients[j]);
                    }
                }
                console.log('newArray1', newArray1);
                allIngredients = newArray1;
            break;
            case 'appliance' :
                let newArray2 = [];
                for (let j=0; j < allAppliances.length; j++) {
                    if(!(strNoAccent(allAppliances[j].toLocaleLowerCase()).match(regexForString))) {
                        newArray2.push(allAppliances[j]);
                    }
                }
                console.log('newArray1', newArray2);
                allAppliances = newArray2;
            break;
            case 'ustensils' :
                let newArray3 = [];
                for (let j=0; j < allUstensils.length; j++) {
                    if(!(strNoAccent(allUstensils[j].toLocaleLowerCase()).match(regexForString))) {
                        newArray3.push(allUstensils[j]);
                    }
                }
                console.log('newArray3', newArray3);
                allUstensils = newArray3;
            break;
        }
    }
    //console.log('allIngredients', allIngredients);
    //console.log('allAppliances', allAppliances);
    //console.log('allUstensils', allUstensils);
    updateAllComboboxDatalist();//situé sur pages/index.js
}