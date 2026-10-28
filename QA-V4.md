# Labyrinthe Aventure — QA V3.1 à V4.0

## Tests intermédiaires automatisés (Node.js, moteur réel)

Chaque jalon V3.1, V3.2, V3.3, V3.4 et V4.0 : **168 cartes résolubles**, soit 60 niveaux de campagne, 16 expéditions pédagogiques, 12 chapitres et 80 labyrinthes générés. Les sorties ont été contrôlées en tenant compte des clés, leviers et cristaux ; aucune question scolaire n'est nécessaire pour sortir.

- Les **336 questions** et les 8 personnages ont été conservés.
- La compatibilité des sauvegardes a été contrôlée en comparant la géométrie, les objets et les portes des **88 cartes fixes** à V3.0.2 : aucune divergence.
- Les récompenses des lieux, rencontres et passages ne sont pas attribuées plusieurs fois en rejouant.
- Les rencontres sont placées hors des caisses, leviers et plaques (bug détecté pendant les tests, corrigé).
- Les passages secrets sont facultatifs, réouvrables après chargement d'une partie.
- Les 10 éléments illustrés ont été extraits de l'art ImageGen et enregistrés comme véritables fichiers WebP, contrôlés et compressés.
- Le mode hors ligne précache les nouvelles ressources et utilise désormais une stratégie réseau-d'abord pour les pages.

## Limites et validation enfants

Le navigateur Chromium de cet environnement refuse les navigations locales (`ERR_BLOCKED_BY_ADMINISTRATOR`) : **l'affichage final n'a pas pu être certifié par une capture navigateur**. Les contrôles ci-dessus valident la logique, pas le rendu pixel près ni les performances sur une vieille tablette Android. Un test manuel sur l'appareil reste indispensable avant de considérer le rendu graphique comme définitivement validé.

## Régression à surveiller

- Livres toujours facultatifs, sortie non bloquée par une erreur de réponse.
- Animations de déplacement et caméra sur les cartes 25–29 cases.
- Bouton « Fouiller » accessible sur un téléphone de largeur 320 px.
- Navigation hors ligne après une première visite connectée.