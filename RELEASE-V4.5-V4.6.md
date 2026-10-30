# Labyrinthe Aventure — Versions 4.5 et 4.6

## V4.5 — Des labyrinthes qui ne se ressemblent plus
- 28 silhouettes existantes conservées, et 9 familles de topologie internes : clairières, cours, grottes, ponts, cristaux, anneaux, pétales, crêtes, circuits.
- Des variations de chambres et de passages au fil des six étapes dans chaque monde.
- Murs et sols thématiques ; livres éducatifs facultatifs, portes et trésors toujours accessibles.
- Une partie enregistrée en V4.4 conserve son ancien parcours grâce au marqueur `shapeVersion=2`. Les nouvelles parties sont en `shapeVersion=3`.
- Contrôle de régression de la génération déterministe de 244 labyrinthes.

## V4.6 — Le Grand Album
- 4 souvenirs par monde, soit **112 objets** : carte (une étape finie), trésor (2 cristaux récupérés dans une partie), savoir (une bonne réponse au livre du monde) et couronne (les six étapes du monde terminées).
- Chaque objet est nommé selon l'univers, avec l'illustration existante du monde.
- Les doublons ne donnent pas d'objet supplémentaire ; aucune récompense n'est achetable.
- 12 médailles de progression : exploration, mondes, collections, lecture, connaissances, secrets, rencontres et camp.
- Une page Album dédiée, avec filtres, volets par monde et barres de progression ; liens directs vers le monde concerné.
- Un camp illustré dont les quatre bâtiments gagnent visuellement en niveau en échange des étincelles déjà collectées. Prix 15, 30 puis 45 étincelles ; aucun achat réel.
- Les nouveaux objets apparaissent à la fin de l'étape ou après une réponse juste ; les livres restent facultatifs pour terminer les niveaux.
- Migration non destructive des anciennes étoiles, coffres, trésors, étapes, étincelles et bâtiments.

## Compatibilité et qualité
- Mobile, tablette paysage et navigateur ordinateur. Écran tactile, clavier et boutons conservés.
- Pas de publicité, de compte, de synchronisation, de paiement ni de mécanique quotidienne obligatoire.
- Sauvegarde locale automatique et service worker hors ligne ; révision de cache V4.6.
- Tests automatisés GitHub Actions : logique, objets/accessibilité, sauvegardes et migration ; test Chromium sur 390 × 844 et 800 × 600, captures enregistrées en artefact Actions.

## Versions sauvegardées
- `backup-v4-4-before-v4-5`
- `backup-v4-5-before-v4-6`

## Plan de tests manuel sur ancienne tablette
1. Ouvrir GitHub Pages avec internet pour actualiser le cache. Vérifier que la version indiquée est V4.6.
2. Entrer dans Licornes, jouer, récupérer des cristaux et lire un livre ; consulter les récompenses dans l'album.
3. Passer la tablette en paysage et vérifier les flèches, le zoom et la lisibilité.
4. Déconnecter Internet, recharger une fois le site et vérifier le lancement et la progression sauvegardée.
