# Création d'une API avec NodeJS

Après avoir installé NodeJS en prenant la version LTS (dernière version stable), on créer un répertoire qui va héberger l'application et qui sera le lieu de travail

1/ nmp init
npm est le gestionnaire de paquets pour Node.js. Il gère les téléchargements des dépendances du projet. Il installera le dossier node_modules à la racine du projet
création d'un fichier package.json pour l'application 
On définit le "name"(chemin) du répertoire qui héberge les fichiers. On peut y ajouter une description. Le "main" correspond au fichier .js. On y informe l'auteur également 

2/nmp install express fs
ligne de commande qui permet d'installer express, qui permet de tester l'application sans avoir à passer par un serveur http 
fs (FileSystem) permet de gérer la création et la lecture des fichiers. Il s'agit d'un descripteur de fichier

3/ nmp install nodemon --save-dev
--save-dev est un drapeau qui installe et ajoute l'entrée au fichier package.json devDependencies. Contient les outils de développement comme la bibliothèque de test. 
L'échec de la construciton fait échouer l'installation. 
On installe nodemon de cette façon pour ne pas surcharger l'application

4/création de l'app .js
On enregistre les variables constantes express et fs qui renvoie au librairies requises pour fonctionner installées précédemment. 
On utilise GET pour lire avec le chemin du fichier les données qu'il contient.
La lecture de la chaîne de caractère sera transformé en objet JSON (JavaScriptObjectAnnotation) avec la fonction JSON.Parse(). 
On peut insérer la propriété statusCode pour une réponse fausse avec le code (500) si un problème de lecture survient ou définir la propriété statusCode à (200) pour indiquer une réponse réussie
On y spécificie le port d'écoute (ici 3000) pour renvoyer les informations de l'app

5/ajout du chemin de l'app.js
Dans le fichier package.json à la balise "scripts":{... on insère "start":"nodemon app.js"} pour initialiser la lecture du document requis

6/ npm start
Lance la relation du serveur qui nous permettra via l'extension Thunder Client d'afficher via l'url http://localhost:3000/menu la base de donnée

7/ Thunder Client
Avec l'extension qu'on installe sur VSCode, on permet la relation serveur client pour afficher les données stockés dans le JSON
