# Outil veille — API

## Description

Ce projet est une API construite avec Nest.js. Elle fournit des endpoints pour accéder à diverses ressources de veille, comme YouTube, des sites web, des podcasts, et plus encore. Cette API est conçue pour être exécutée localement pour le développement et les tests pour le moment.

## Endpoints

L'API fournit les endpoints suivants :

- **IA** : `http://localhost:3000/ai`
- **FAQ** : `http://localhost:3000/faq`
- **Podcasts** : `http://localhost:3000/podcasts`
- **RSS** : `http://localhost:3000/rss`
- **Twitter** : `http://localhost:3000/twitter`
- **Sites Web** : `http://localhost:3000/websites`
- **YouTube** : `http://localhost:3000/youtube`
- **YouTubeById** : `http://localhost:3000/youtube/latest?channelId=`

## Installation et démarrage

Pour installer et démarrer l'API, suivez les étapes ci-dessous :

### Prérequis

Assurez-vous que vous avez Node.js et Yarn ou Npm installés sur votre machine.

### Installation

Clonez le dépôt Git :

```bash
git clone https://github.com/Nilyss/outil_veille_api.git
cd outil_veille_api
```

Installez les dépendances :

```
yarn install
```
ou
```
npm install
```

### Démarrage de l'API

Pour démarrer l'API en mode développement, exécutez :

```
yarn start:dev
```
ou
```
npm start:dev
```