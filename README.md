# Groupomania

Groupomania est un projet d'intranet d'entreprise destiné à améliorer la productivité et l'échange ntre les employés de l'entreprise.

## Frontend

Ouvrir le terminal et se positionner dans le dossier frontend

```bash
cd frontend
```

puis installer tout le package.json

```bash
npm install
```

pour finir lancer le serveur

```bash
npm start
```

si le serveur ne s'ouvre pas allez à :
[http://localhost:3000/](http://localhost:3000/)

## Backend

Ouvrir le terminal et se positionner dans le dossier backend

```bash
cd backend
```

puis installer tout le package.json

```bash
npm install
```

pour finir lancer le serveur

```bash
node server
```

## Base de données

Se connecter au serveur MySql de votre choix. Exécuter la commande: CREATE DATABASE groupomania; Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier database_groupomania.sql

## Utilisation

L'application a plusieurs fonctionnalitées

    * Inscription / Connexion / Déconnexion
    * Suppression de son compte
    * Affichage des posts de tout les utilisateurs
    * Afficher le profil de chaque utilisateur + ses posts postés + ses posts likés
    * Possibilité de commenter et liker les posts
    * Poster des post avec des messages et des images ou des video(youtube)
    * L'administrateur peut supprimer les posts, les commentaire et les utilisateurs souhaités
