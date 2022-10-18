# Mon Budget API
Une API web pour le suivi des dépenses personnelles.

## Les fonctionnalités
L'API permet :
- La récupération des catégories des transactions en base de données
- L'inscription et la connexion des utilisateurs
- La possibilité pour les utilisateurs de modifier et/ou supprimer leur profil
- La possibilité pour les utilisateurs de modifier et/où supprimer leurs catégories et leurs transactions

## Lancer le projet en développement
**`npm install`** pour installer les dépendences nécessaires au projet

**`npm run dev`** dans le répertoire à la racine du projet

## Lancer le projet en production
**`npm install`** pour installer les dépendences nécessaires au projet

**`npm start`** dans le répertoire à la racine du projet

## Installer la base de données
La base de données est versionnée avec l'outil [Sqitch](https://sqitch.org/).
- Pour la déployer (après configuration de Sqitch) :
**`sqitch deploy`**
- Pour revenir en arrière :
**`sqitch revert`**
- Pour vérifier que les requêtes SQL fonctionne bien :
**`sqitch verify`**
- Pour ajouter une nouvelle migration :
**`sqitch add nom-de-la-migration`**

L'API Mon Budget a été développée avec :
- Node.js et le framework Express
- PostgreSQL pour la base de données
