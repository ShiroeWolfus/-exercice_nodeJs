// Les variables constantes relatives aux librairies installées suite au npm init à la racine du fichier pour créer
// les modules. On y ajoute express et fs. Nodemon est en sauvegarde pour le fichier final
const express = require('express');
const fs = require('fs');
const app = express();

// Commentaire du fichier resto-menu : Je nomme le tableau menu et j'y ajoute la ref du plat, son nom ainsi que son prix. Chaque 
    // index du tableau doit être séparé par une virgule sauf le dernier

//on indique le chemin du fichier que va récupérer le GET 
app.get('/menu', (requet, response)=> {
    //Je demande à FS d'importer les données du JSON que j'ai crée et d'afficher un message d'erreur si la lecture ne s'effectue pas
    fs.readFile('menu.json', (err, menu)=> {
        if (err){
            response.status(500).json({
                //si le GET ne passe pas sur le fichier. On affiche ce message sur la console Thunder request
                message: "Une erreur est survenue lors de la lecture des données du menu",
                error: err
            })
            //si la lecture s'effectue, il atteint les données et les affiche
        } else{
            response.status(200).json(JSON.parse(menu));
        }
    });
});
//console log pour  que la communication s'établisse avec l'application façon client serveur
app.listen(3000, ()=> {
    console.log("l'application tourne sur le port Andre3000... Hey Ya !");
})

//dans le fichier package.json on ajoute la ligne     "start": "nodemon appresto.js" sous la balise script pour lancer la lecture du fichier demandé comportant la fonction fléché ligne 11
//je mets mes commentaires ici car j'avais une erreur sur les fichier .json.
//après avoir lancé le fichier via le terminal pour simuler la relation client serveur, je lance une requête sur Thunder Client pour afficher le JSON avec les plats et prix ainsi que leur id
//la commande http://localhost:3000/menu pour afficher le JSON 