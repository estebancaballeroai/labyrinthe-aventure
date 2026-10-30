# Labyrinthe Aventure — ELC Éducation — V4.3

**Jouer :** https://estebancaballeroai.github.io/labyrinthe-aventure/

Jeu éducatif et ludique gratuit pour les 8–10 ans (CE2–CM1), sans inscription ni publicité, conçu pour smartphone, ordinateur et tablette Android ancienne.

## Nouveauté V4.3 : 28 mondes accessibles immédiatement

La sélection des mondes est visible dès l'accueil. Le Royaume des licornes, la Vallée des dragons, le Jardin des fées et le Pays des bonbons sont proposés en tête. Les **28 mondes sont accessibles dès la première partie** ; il suffit de choisir un monde. Chaque monde dispose de **six étapes** qui se débloquent progressivement **à l'intérieur de ce seul monde**, indépendamment de la progression des autres mondes.

Progression dans chaque monde :

| Étape | Taille | Livres | Mécanique |
|---|---|---|---|
| 1 | 9×9 | 2 | Découverte / sortie |
| 2 | 11×11 | 3 | Bifurcations |
| 3 | 13×13 | 3 | Cristaux à découvrir |
| 4 | 15×15 | 4 | Clé ou levier |
| 5 | 17×17 | 4 | Défi lié à l'ambiance du monde : brouillard, portail, gardien ou levier |
| 6 | 19×19 | 5 | Clé + levier et plusieurs itinéraires |

**Total :** 168 nouveaux niveaux progressifs, 588 livres placés dans ces nouveaux niveaux ; 60 niveaux historiques de campagne conservés dans les six premiers mondes, ainsi que 16 expéditions éducatives et 12 chapitres déjà existants.

## Livres CE2 et CM1

- 672 nouvelles questions contextualisées par monde, réparties entre mathématiques et un domaine associé au monde (français, sciences, histoire/repères temporels, géographie, citoyenneté, découverte du monde, logique).
- 336 questions précédentes conservées, soit **1 008 questions** au total.
- Deux degrés scolaires indépendants : CE2 et CM1. Dans chacun, les questions des nouveaux parcours progressent avec l'étape.
- Chaque livre est identifiable par la couleur de sa matière. Les réponses comportent une explication.
- **Aucune question n'est obligatoire** pour ouvrir un passage ou quitter le labyrinthe.

## Nouveaux visuels

28 vignettes illustrées originales WebP (`assets/world-cards/`) de 280×192 px, issues d'un atlas graphique conçu pour cette application. Le labyrinthe en jeu conserve le style épuré voulu par les enfants (pas de petits arbres ni de cailloux ajoutés), avec des palettes propres aux nouveaux mondes. Les anciens mondes conservent leur moteur et leurs assets.

## Versions et sauvegardes

- V4.2 sauvegardée dans `backup/index-v4.2.html`.
- V4.3 dans `index.html` et `versions/v4.3/index.html`.
- Les identifiants des 60 niveaux historiques, des questions d'origine, et la clé de progression `elc_labyrinthe_aventure_v10` restent inchangés.
- Dernier monde choisi mémorisé localement. Les préférences d'accessibilité V4.2 restent conservées (police, zoom, taille des boutons, etc.).

## Documentation

- `CATALOGUE-V4.3.md` : les 28 mondes et leur progression.
- `QA-V4.3.md` : contrôle des 168 nouveaux niveaux, des 88 cartes fixes existantes, des questions et des écrans.
- `ROADMAP-V5.md` : prochaines étapes de perfectionnement des mécanismes.

**Limites :** les niveaux V4.3 sont construits avec des graines fixes et des variantes de mécanismes éprouvés ; ils ne sont pas encore tous conçus individuellement à la main. Les premiers tests sont automatisés dans Chromium ; le comportement sur l'ancienne tablette Samsung doit être confirmé par un essai réel.