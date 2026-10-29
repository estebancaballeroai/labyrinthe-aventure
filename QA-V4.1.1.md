# Labyrinthe Aventure V4.1.1 — Correctif tablette

## Source
Le correctif est dérivé de la **V4.1 publiée** (et non de la V4.0) afin de conserver l'interface épurée et les dernières fonctionnalités.

## Correctifs
- Grand plateau sur tablette portrait : jusqu'à 720 pixels utiles (712 px mesurés à 768 px de largeur).
- Tablette paysage : plateau ajusté à la hauteur disponible, flèches et menu sur le côté.
- Boutons directionnels avec repli compatible anciens navigateurs Android (sans dépendance CSS Grid).
- Fenêtre des livres réellement superposée à l'écran avec `top/right/bottom/left` explicites pour les anciens navigateurs ne comprenant pas `inset`.
- Icône de carte SVG pour remplacer le caractère emoji parfois invisible sur une vieille tablette.
- Pas de changement des données, du programme CE2–CM1, des règles, des sauvegardes ou des interactions.

## Tests (Chromium automatisé)
- 5 formats : 320 × 670, 390 × 844, 768 × 1180, 820 × 1250, 1024 × 680.
- Aucun débordement horizontal / aucune erreur JavaScript dans les scénarios simulés.
- Livres affichés en popup fixe, lisibles et toujours facultatifs ; bouton « Passer sans répondre » fonctionnel.
- 88 cartes fixes (60 campagne + 16 expéditions + 12 chapitres) : structure identique à V4.1.
- 336 questions et 8 personnages conservés.
- Le cache hors ligne est renouvelé sur V4.1.1.

## Limites
- Navigations locales interdites par l'environnement de test, injection du HTML dans Chromium utilisée pour les mesures.
- Le chargement des fichiers personnages depuis GitHub et le comportement sur la **tablette Samsung physique** doivent encore être vérifiés après déploiement. Le jeu n'a pas été testé directement sur cet appareil.