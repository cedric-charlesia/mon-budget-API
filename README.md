# mon-budget-API
Une application web pour suivre ses dépenses

L'API Mon Budget a été développée avec :
- Node.js et le framework Express
- PostgreSQL pour la conception de la base de données

## Lancer le projet en développement
**`npm run dev`** dans le répertoire à la racine du projet

## Lancer le projet en production
**`npm start`** dans le répertoire à la racine du projet

## Installer la base de données
La base de données est versionnée avec l'outil [Sqitch](https://sqitch.org/).
- Pour la déployer, après configuration de Sqitch :
**`sqitch deploy`**
- Pour revenir en arrière :
**`sqitch revert`**
- Pour vérifier que les requêtes SQL fonctionne bien :
**`sqitch verify`**
- Pour ajouter une nouvelle migration :
**`sqitch add nom-de-la-migration`**

## Les fonctionnalités
L'API permet :
- La récupération des catégories des transactions en base de données
- L'inscription et la connexion des utilisateurs
- La possibilité pour les utilisateurs de modifier et/ou supprimer leur profil
- La possibilité pour les utilisateurs de modifier et/où supprimer leurs catégories et leurs transactions
