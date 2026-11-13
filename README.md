# TP3 – CampusAgenda

## Présentation
CampusAgenda est une application mobile développée avec React Native et TypeScript. Elle permet d'afficher les événements du campus, leur état d'inscription et le nombre de places restantes.

## Composants
- **BadgeEtat :** affiche le statut de chaque événement avec une couleur adaptée.
- **CarteEvenement :** affiche les informations d'un événement à partir des props.
- **BlocStatistique :** présente les statistiques globales de manière réutilisable.

## Fonctionnement
Les données sont stockées localement dans un tableau. Les fonctions `filter()`, `map()` et `reduce()` permettent de filtrer les événements et de calculer les statistiques.

La FlatList affiche les événements avec `renderItem` et `keyExtractor`. Le composant `ListEmptyComponent` affiche un message lorsque la liste est vide.

Deux modes sont disponibles : `tous` et `ateliers`. Le changement se fait en modifiant la constante `mode` dans le code.

## Tests
Les deux modes d'affichage, les calculs des places restantes, les différents statuts et le cas d'une liste vide ont été testés.
