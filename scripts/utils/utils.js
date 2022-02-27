//"strNoAccent" est une fonction JavaScript qui retourne un texte passé en paramètre de la fonction après en avoir retiré tous les accents.
function strNoAccent(a) {
    var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
        c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
        d="";
    for(var i = 0, j = a.length; i < j; i++) {
      var e = a.substr(i, 1);
      d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
    }
    return d;
  }
  
  //strNoAccent('tést');
  //console.log(strNoAccent("évènement"));
  // renvoie : "test"

  
//"capitaliseString" est une fonction qui retourne une chaîne de caractère dont le premier caractère est une majuscule et le reste en minuscule
function capitaliseString(item) {
  item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  return item;
}