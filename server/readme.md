
# Bitev CMS

## API creation made simple, secure and fast.
> The most advanced open-source headless CMS to build powerful APIs with no effort.


# Bitev CMS - Full backend



[<img src="https://i.ibb.co/nznpfLv/bitev.png" width="50"/>](image.png)


> Le ToolKit JS pour accélerer votre développement backend .\
> Une multitude de fonctionnalités intéressantes .

## Installation 

```js
npx create-bitev-app@latest <projet-name>
```
```js
npm init bitev-app@latest <projet-name>
```

## Prérequis

- Nodejs <=12 , Nous vous recommandons d'installer la dernière version LTS.
- Un éditeur de texte, nous recommandons VSCode 
- Un terminal, nous vous recommandons d'utiliser le terminal intégré de VSCode 
  
##### Systèmes supportés :

- Ubuntu LTS/Debian 9.x
- Windows 10+
- MacOs
  
#### Base de données

- MongoDB>=3.6 

## Démarage


> La prochaine étape est de naviguer dans le répertoire et de démarrer notre application :

```js
cd <project-name>
npm run dev
```

Notre application est maintenant en cours d'exécution sur http://localhost:5005 .

## Commandes et déploiement

Bitev est livré avec un ensemble de commandes utiles, à la fois pour le développement et la production.

#### Utilisation dans package.json

Vous devriez mettre ces commandes dans package.json:

```json

"scripts": {
    "start": "npx prisma generate && node bitev.config.js",
    "dev": "NODE_ENV=dev nodemon"
  },
```

## Liste des commandes

Vous pouvez exécuter différentes commandes en fonction de la cible :

- **npm run dev** - Lancez le serveur de développement.
```js
npm run dev
```

- **npm run start** - Lancez le serveur en production.
```js
npm run start
```

## Mise à jour du projet
```js
npx bitev.io@latest update
```