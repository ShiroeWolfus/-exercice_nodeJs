//constante pour les framework de construction du serveur(express) et lecture des fichier (fs)
const express = require('express');
const fs = require('fs');
// On déclare une constante qui lance la fonction 
const app = express();
//On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require('body-parser');
// Je vais dire à express d'utiliserbodyParser pour lire le contenu du body en json
app.use(bodyParser.json());


//c'est une route qui permet d'afficher les données contenues dans le fichier menu.json en JSON dans la requête
//on indique le chemin du fichier que va récupérer le GET 
//ex http://localhost:3000/menu
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

//C'est une route qui me permet de récupérer une data par son tableau et son id
// GET "/menu/:titre/:id"
//ex: http://localhost:3000/menu/
app.get("/:categoriePlat/:numeroPlat", (request, response)=>{
    //On va récupérer le fichier et le lire avec la méthode readFile du module fs
    fs.readFile("menu.json", (err, menu)=>{
        //Je mets une condition pour les erreurs
        if(err){
            //Je renvoie une réponse status 500 (error server) avec un message
            response.status(500).json({
                message: "Non, non, non. Vous n'avez pas le mot magique!",
                error: err,
            });
        } else {
            //Je parse la chaine de caractère en JSON pour la transformer en objet JSON
            const menuJson = JSON.parse(menu);
            //Je vais chercher dans le fichier menu si l'ID donné en paramètre correspond à un plat dans le corps du fichier
            //Dans le fichier menu, je vais regarder dans les tableau en clé :titre
                const platById = menuJson.menu[request.params.categoriePlat].find(
                    //le plat qui lui correspond :nb appelé en valeur
                    (obj)=> obj.id === parseInt(request.params.numeroPlat)
                );
            // Si correspondance de l'objet avec l'ID demandé
            if(platById){
                //On renvoie une réponse status200 et l'objet
                response.status(200).json(platById);
            } else{
                //on renvoie une erreur 404 et son message
                response.status(404).json({
                    message : "C'est la hess! On a rien trouvé avec cet Id!"
                });
            }
        }
    });
});


//POST "/menu/:titre/:nb"
//ex: http://localhost:3000/menu
app.post("/:categoriePlat/", (request, response)=>{
    //Lecture du contenu du fichier appresto.js
    fs.readFile("menu.json", (err, menu)=> {
        //si une erreur sur la lecture du fichier 
        if(err){
            response.status(500).json({
                message: "Une horreur est survenue lors de la lecture des données !",
            });
        } else {
            //stocker les données existantes
            const menuExistant = JSON.parse(menu);
            //J'ajoute mes données et j'espère que ça marche pour pas appeller Le Chef!
            //sinon ma blague en com tombe à l'eau. j'espère que ça marche pas une fois ^^
            menuExistant.menu[request.params.categoriePlat].push(request.body)
            //j"écris la nouvelle entrée sur le fichier et l'écrase sur l'ancien
            fs.writeFile("menu.json", JSON.stringify(menuExistant), (writeErr)=>{
                if(writeErr){
                    //si l'écriture n'a pas lieu, on renvoie un message d'erreur
                    response.status(500).json({
                        message : "Hasta la vista. Revoie ton code",
                    });
                } else {
                    //si la donnée dans le body est bien faite, on renvoie un message de réussite
                    response.status(200).json({
                        message : "Bien joué la plume est plus forte que l'épée",
                    });
                }
            });
        }
    });
});