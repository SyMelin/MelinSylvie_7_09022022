class Api {

    /**
     * @param {URL} url url de récupération des données (ici, chemin du fichier js)
     */

    constructor (url) {
        this._url = url;
    }

    //Un tableau contenant tous les objets données profil des photographes est retourné - sans attribut alt
    async get() {
        return fetch(this._url) //on interroge le service web: ici le fichier json est déjà fourni en exemple
                .then(function(res) {
                    if (res.ok) {
                        return res.json(); //si la requête s'est bien passée, les données sont retournées au format Json
                    }
                })
                .catch(function(err){ //En cas d'erreur, la fonction affiche le type d'erreur
                    console.log(err);
                });
    };
};