//constante pour les framework de construction du serveur(express) et lecture des fichier (fs)
const express = require('express');
const fs = require('fs');

const app = express();

//on indique le chemin du fichier que va récupérer le GET 
app.get('/menu', (requet, response)=> {
    //Je demande à FS d'importer les données du JSON que j'ai crée 
    fs.readFile('menu.json', (err, menu)=> {
        //si la récupération n'a pas lieu, la propriété statusCode renvoie une erreur
        if (err){
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture des données du menu",
                error: err
            })
            //si la lecture s'effectue, il atteint les données et les affiche en objet avec la fonction JSON.parse
        } else{
            response.status(200).json(JSON.parse(menu));
        }
    });
});
//console log pour  que la communication s'établisse avec l'application façon client serveur
app.listen(3000, ()=> {
    console.log("l'application tourne sur le port Andre3000... Hey Ya !");
})
