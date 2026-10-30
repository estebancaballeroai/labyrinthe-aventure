# ELC Éducation — QA Labyrinthe Aventure V4.3

## Résultat des tests automatiques

- 28 mondes vérifiés, 168 nouvelles cartes dans 28 parcours de 6 niveaux.
- **168/168 cartes nouvelles résolubles** dans le modèle de test avec portes (clés), leviers, cristaux requis et caisses bonus considérées comme obstacles.
- **88/88 cartes historiques inchangées**, comparaison structurelle entre V4.2 et V4.3 pour les 60 niveaux de campagne + 16 expéditions + 12 chapitres, y compris les positions de livres et d'objets.
- 672 nouvelles questions CE2/CM1 vérifiées structurellement (3 options distinctes, une bonne réponse, explications), soit **1 008 questions** au total.
- 588 emplacements de livres dans les 168 niveaux, répartis 2,3,3,4,4,5 par étape.
- Les livres n'interviennent jamais dans les conditions d'accès à la sortie ; les questions restent facultatives.
- Réglages existants conservés : taille de police jusqu'à 200 %, commandes, zoom, contraste.

## Test de navigation automatisé sur Chromium (document HTML injecté)

- 28 cartes de mondes affichées ; l'illustration du monde des licornes placée en tête.
- Filtres Magie, Nature, Aventures, Sciences, Histoires vérifiés.
- Ouverture d'un monde sans progression antérieure : étape 1 accessible, étapes 2 à 6 verrouillées à l'intérieur de ce monde.
- Lecture d'un livre CE2, réponse erronée, affichage de la correction, puis sortie sans répondre au deuxième livre.
- Déblocage et lancement automatique de l'étape 2 après la sortie.
- Tailles testées : 320×740, 390×844, 768×1024, 820×1180, 1024×768 ; pas d'erreur JS ni de débordement horizontal.
- Mode police XXL à 200 % testé à 320, 390 et 768 px, sans débordement horizontal après correction du panneau de statistiques.
- Les images originales ont été vérifiées comme fichiers WebP distincts (28 × 280×192 px, ~440 Kio au total).

## Limites explicites

- Navigation directe HTTP/file du navigateur de test restreinte ; l'exécution est simulée par injection du HTML, les vignettes ont été injectées en data URL seulement pour la validation visuelle. Le chargement sur GitHub Pages doit être confirmé après déploiement.
- La compatibilité physique avec l'ancienne tablette Samsung et l'usage hors ligne réel nécessitent un test sur l'appareil.
- La conception des 168 niveaux V4.3 repose sur un moteur de génération à graines fixes ; l'apport de niveaux dessinés individuellement à la main est prévu en V4.5.
- Les 672 questions supplémentaires sont des variantes thématiques et progressives ; leur relecture pédagogique fine reste une étape à réaliser dans V4.6.

**Regressions critiques recherchées :** suppression des décors parasites, écrans de jeu épurés, huit personnages, livres facultatifs et sauvegardes existantes. Aucune modification du moteur des 88 cartes historiques.