# Labyrinthe Aventure — Vérification V4.1

## Périmètre
Interface de jeu simplifiée appliquée dans la fonction de rendu commune à tous les modes : campagne, défis éducatifs, chapitres et génération infinie.

- Retrait de la décoration automatique sur murs et chemins : petits arbres/buissons, rochers, champignons et pierres.
- Retrait des jauges et badges de statut permanents, de la légende, du long objectif et de la phrase sous le plateau.
- Maintien du titre, du labyrinthe, des 4 flèches de déplacement, de la carte et du menu.
- Menu secondaire : indice, livre, fouille, attente, son, redémarrage, accueil, informations de progression.
- Action contextuelle discrète près d'un livre ou d'un passage secret.
- Les règles des cartes, questions et sauvegardes ne sont pas modifiées.

## Tests exécutés
- 60 niveaux de campagne, 16 expéditions éducatives et 12 chapitres : 88/88 cartes résolubles.
- 150 labyrinthes générés : 150/150 résolubles avec clés, leviers et cristaux exigés.
- Génération des 88 cartes comparée avec la V4.0 : signatures de toutes les cartes et positions des livres inchangées.
- 336 questions, 8 personnages et 60 niveaux conservés.
- Livre : ouvrir, passer, rouvrir, répondre, recevoir la correction.
- Carte et indice accessibles depuis le menu secondaire. Attendre referme correctement le menu.
- Sauvegarde sérialisée et restaurée.
- Interfaces Playwright simulées à 320, 390 et 768 px : aucune erreur JavaScript, aucun débordement horizontal.
- Affichage du plateau et des flèches vérifié sur capture à 390 px.

## Limitations
Essais automatisés Chromium effectués par injection du document (l'environnement de test bloque les navigations locales et HTTP). Compatibilité physique avec l'ancienne tablette Android et rendu final GitHub Pages à contrôler après déploiement. Le stockage local a été simulé dans ce contexte de test ; le comportement sur les appareils reste à tester.