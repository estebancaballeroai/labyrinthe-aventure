# ELC Éducation — Labyrinthe Aventure — Rapport de validation V4.1.2 → V4.2

**Date :** 29 octobre 2026. Les versions ont été construites dans l'ordre : V4.1.2, V4.1.3 puis V4.2. La V4.1.1 est préservée intacte.

## Objectif et invariants

- Conserver les 60 niveaux de campagne, 16 expéditions, 12 chapitres, 336 questions et 8 personnages.
- Ne jamais bloquer la sortie par un livre, y compris si le livre est ignoré ou la réponse erronée.
- Préserver le stockage de progression **`elc_labyrinthe_aventure_v10`** et isoler les préférences dans **`elc_labyrinthe_a11y_v1`**.
- Maintenir l'interface de labyrinthe épurée de la V4.1.1, sans retour des éléments décoratifs précédemment retirés.

## V4.1.2 — Lisibilité

- Réglages persistants : texte 100/120/140/170/200 %, commandes normales/grandes/très grandes, contraste classique/renforcé.
- Taille des textes des questions, réponses, corrections, titres et menus modifiable sans changer le labyrinthe.
- Valeur initiale 140 % à partir de 700 px de large, 120 % sur les écrans plus étroits ; retour aux valeurs par défaut sans toucher aux progrès.
- Accès aux réglages depuis l'accueil et depuis le menu de pause, sans nouveau bandeau pendant la partie.

## V4.1.3 — Confort des déplacements

- Zoom normal (jusqu'à 11 × 11 cases visibles), rapproché (9 × 9) ou très rapproché (7 × 7) ; la carte générale reste disponible.
- Maintien d'une flèche tactile ou souris : répétition lente/normale/rapide ; pressions courtes sans double déplacement.
- Réduction facultative des animations, y compris l'oscillation du personnage et les effets CSS.

## V4.2 — Lecture et voix

- Mode lecture confortable : interlignes et espaces légèrement agrandis.
- Lecture des questions et explications par voix française du système : désactivée, à la demande ou automatique.
- Si la synthèse vocale ou la voix française est absente, message explicatif ; **aucune voix anglaise n'est utilisée à sa place**. Le jeu reste pleinement utilisable sans voix.
- Arrêt de la lecture lors d'un passage de question, d'une réponse, de la fermeture du livre ou du retour à l'accueil.

## Tests effectués

| Contrôle | V4.1.2 | V4.1.3 | V4.2 |
|---|---:|---:|---:|
| Cartes fixes résolubles (60 + 16 + 12) | 88/88 | 88/88 | 88/88 |
| Labyrinthes générés résolubles (clés, levier, cristaux) | 150/150 | 150/150 | 150/150 |
| Questions / niveaux / personnages conservés | 336 / 60 / 8 | 336 / 60 / 8 | 336 / 60 / 8 |
| UI 320, 390 et 768 px, aucun débordement horizontal | OK | OK | OK |
| Police des questions (ex. 20 px puis 34 px sur téléphone) | OK | OK | OK |
| Préférences et partie conservées après rechargement simulé | OK | OK | OK |
| Questions facultatives et explication après erreur | OK | OK | OK |
| JavaScript : aucune exception détectée | OK | OK | OK |
| Zoom visuellement différent, carte intacte | — | OK | OK |
| Pression tactile simple = un pas, appui long répété | — | OK | OK |
| Voix fr-FR, auto, indisponibilité fr et arrêt | — | — | OK (simulation) |

Le zoom modifie plus de 100 000 pixels de la carte d'essai ; un appui tactile bref génère **exactement un déplacement**. Lors d'un maintien rapide, le personnage a parcouru huit cases dans le couloir de test.

## Limites et validation terrain

- Le navigateur Chromium de test interdit les navigations HTTP/locales : le code a été exécuté dans un onglet vierge avec document injecté et stockage local simulé. L'accès réseau, l'installation PWA et la compatibilité matérielle Android restent à confirmer sur l'appareil réel.
- La voix française dépend des voix installées sur l'appareil ; elle n'a pas été testée acoustiquement sur tablette, mais les cas français/anglais/absent ont été simulés.
- Les captures de test ne chargent pas toutes les images externes : le rendu du jeu publié conserve les assets GitHub existants.
- La progression est conservée lors d'une mise à jour parce que la clé de progression et la structure des cartes sont inchangées. Les sauvegardes restent stockées localement dans le navigateur de chaque appareil.