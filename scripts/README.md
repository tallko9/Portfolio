# Scripts de Cache-Busting

## Description

Le script `cache-bust.js` génère automatiquement des versions uniques pour tous les fichiers CSS et JavaScript dans votre portfolio, garantissant que les navigateurs téléchargent toujours les versions les plus récentes après un déploiement.

## Fonctionnement

Le script :
1. Génère un hash unique basé sur le timestamp
2. Parcourt tous les fichiers HTML du projet
3. Met à jour automatiquement toutes les références `?v=...` dans les liens CSS et JS
4. Ajoute des versions aux fichiers qui n'en ont pas

## Utilisation

### Automatique (recommandé)

Le script s'exécute automatiquement lors du déploiement sur Vercel grâce à la configuration dans `vercel.json` et `package.json`.

### Manuel

Si vous voulez tester ou exécuter manuellement :

```bash
npm run cache-bust
```

Ou directement :

```bash
node scripts/cache-bust.js
```

## Résultat

Après exécution, tous vos fichiers HTML auront des versions mises à jour :

```html
<!-- Avant -->
<link rel="stylesheet" href="css/global.css?v=1.2">
<script src="js/common.js?v=1.3"></script>

<!-- Après -->
<link rel="stylesheet" href="css/global.css?v=a3f5b2c1">
<script src="js/common.js?v=a3f5b2c1"></script>
```

## Note

Les versions sont générées à chaque exécution, donc chaque déploiement aura une version unique, forçant les navigateurs à télécharger les nouveaux fichiers.

