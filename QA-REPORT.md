# Labyrinthe Aventure — Contrôle qualité des itérations

- V1.1 : 46/46 cartes des 30 niveaux + 16 défis résolubles ; niveau pilote 21×21, 3 chemins, choix persistant après reprise ; aucune erreur JS détectée.
- V1.2 : 33 grands niveaux/expéditions disposent de carrefours ; mêmes contrôles de résolubilité validés.
- V1.3 : carnet de collection et coffres persistants ; tests des parcours de la V1.2 renouvelés.
- V2.0 : 133/133 cartes résolubles : 30 campagne, 16 éducation, 6 chapitres, 1 pilote, 80 tirages infinis ; 107 cartes avec carrefour et aucun carrefour manquant.
- Livres : contournement sans réponse ; une mauvaise réponse affiche la bonne réponse et sa justification ; absence de blocage de la sortie.
- Affichage : Chromium en 320, 390 et 768 pixels sans débordement horizontal, tests en environnement local via set_content (navigation automatique restreinte par l'environnement).
- À compléter sur appareil réel : tablette Android ancienne (dont tests de cache hors-ligne, tactile et mémoire), retours d'enfants, autonomie.

La génération procédurale utilise des graines fixes pour les campagnes et les chapitres, et préserve la sauvegarde V1.0. Les illustrations WebP sont réelles et chargées dans l'interface et le moteur du jeu.