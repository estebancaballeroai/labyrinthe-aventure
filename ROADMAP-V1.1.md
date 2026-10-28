# Labyrinthe Aventure — Plan V1.1 : Exploration vivante

Statut : préparation sur la branche `experimental/v1.1-exploration`.
La V1.0 sur `main` reste inchangée jusqu'aux tests et à validation.

## Priorité produit
Le jeu doit être un jeu d'aventure accessible en autonomie (8–10 ans), pas une série de QCM. Les livres CE2–CM1 restent facultatifs, sans aucune porte bloquée par la réponse.

## Benchmark
- Thinkrolls Space : niveaux progressifs, personnages à collectionner, essais illimités, pas de pression.
- Monument Valley : contrôle simple, découverte visuelle, scénographie.
- Labyrinth (Ravensburger) : détour, chemins alternatifs, objectifs de trésors.

## Vertical slice V1.1 (premier monde)
1. **Trois parcours différents** dans une même mission : un raccourci risqué, un détour sûr et une branche secrète avec trésor. Le choix a des effets visibles et sauvegardés, sans bloquer définitivement la progression.
2. **5 à 8 salles remarquables** dans un niveau pilote : clairière, pont, grotte, porte, bibliothèque, chambre au trésor.
3. **Carte locale + mini-carte** consultables d'un geste ; indication du prochain objectif sans flèche imposant l'unique solution.
4. **Livres facultatifs** sur les trois chemins : couleurs disciplinaires conservées, action « passer » permanente, correction détaillée.
5. **Récompenses ludiques** : coffre facultatif, collection de badges, secrets visibles dans le carnet et défis d'exploration.
6. **Commandes et lisibilité** : déplacement au glissement et gros boutons ; vérification à 320, 390, 768 px et sur ancienne tablette Android.

## Direction artistique — assets d'abord
Créer hors code des éléments originaux en PNG/WebP :
- tuiles/décors (forêt, chemins, ruines, grotte), objets et livres par sujet ;
- sprites réels de 8 héros (garçon, fille, dragon, licorne, renard, robot, chat, panda), avec animation de marche ou états ;
- décors spéciaux, coffres, portes, passage secret, éléments HUD.
Intégrer les assets réellement dans le moteur. Ne pas présenter des emojis/CSS comme des sprites illustrés. Prévoir un mode dégradé sur appareil ancien, et tester le chargement/cache hors ligne.

## Régression / invariants
- V1 sauvegardée sur main ; travail sur branche.
- Les 30 niveaux et 196 questions restent accessibles.
- Une mauvaise réponse et « passer » ne bloquent jamais la sortie.
- Les clés, leviers, portails et gardiens restent fonctionnels.
- Aucune collecte de données, inscription, publicité ou achat.
- Partie interrompue puis reprise : personnage, position, objets, questions lus conservés.
- Tests automatisés de résolubilité des niveaux et vérification manuelle mobile.
- Fusion uniquement après validation du nouveau niveau pilote.

## Jalons
- V1.1 : niveau pilote d'exploration + refonte graphique + tests.
- V1.2 : propagation contrôlée aux trois mondes, diversité des chemins.
- V1.3 : nouvelles zones, compagnons et collection.
- V2.0 : grande aventure scénarisée en plusieurs régions.
