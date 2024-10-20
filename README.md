# Dispositif Interactif Web (Va’a Sprint)

## Transfert des compétences

Ce projet a pour but de mettre en œuvre un dispositif interactif web pour la gestion de courses de pirogues Va'a. Ce guide explique comment installer et exécuter le projet localement ainsi que les étapes pour héberger votre propre version sur GitHub.

## Prérequis

Avant de commencer, vous devez installer les outils suivants :

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en)

## Installation

Une fois que vous avez installé Git et Node.js, suivez ces étapes pour cloner et installer le projet :

1. Créez un nouveau dossier pour le projet et exécutez les commandes suivantes :

   ```bash
   git clone https://github.com/ORBECK-Matthew/vaa-builder.git
   cd vaa-builder
   ```

2. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

3. Lancez le projet :

   ```bash
   npm run start
   ```

## Hébergement du projet sur votre propre repository GitHub

Si vous souhaitez héberger le projet dans votre propre repository, suivez ces étapes :

1. **Supprimez le lien avec l’ancien répertoire GitHub :**

   - Ouvrez un terminal et allez dans le répertoire du projet cloné.
   - Exécutez la commande suivante pour supprimer l'ancienne origine :

     ```bash
     git remote remove origin
     ```

2. **Créez un nouveau repository sur GitHub :**

   - Rendez-vous sur [GitHub](https://github.com) et cliquez sur le bouton "New" pour créer un nouveau repository.
   - Donnez un nom à votre repository et configurez-le comme vous le souhaitez (public ou privé).

3. **Ajoutez le nouveau repository comme origine :**

   - Dans le terminal, ajoutez votre nouveau repository GitHub en tant qu'origine :

     ```bash
     git remote add origin https://github.com/ton-username/ton-nouveau-repository.git
     ```

4. **Poussez votre projet vers le nouveau repository :**

   - Changez de branche pour passer sur `main` :

     ```bash
     git branch -m master main
     ```

   - Ajoutez les fichiers à suivre par Git, si ce n'est pas déjà fait :

     ```bash
     git add .
     ```

   - Faites un commit pour sauvegarder vos modifications :

     ```bash
     git commit -m "Premier commit"
     ```

   - Poussez votre code vers votre nouveau repository GitHub :

     ```bash
     git push -u origin main
     ```

## Déploiement sur Vercel

Pour déployer votre projet, suivez ces étapes :

1. Rendez-vous sur le lien suivant : [Vercel](https://vercel.com/home).
2. Créez-vous un compte et liez-le avec votre compte GitHub.
3. Suivez ensuite les instructions dans cette vidéo pour le déploiement : [Déploiement sur Vercel - Vidéo](https://www.youtube.com/watch?v=KT95H6mLkeM).
