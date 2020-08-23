## Utilisation de Webpack

**Redux** est certes un gestionnaire d'état pratique qui permet d'abstraire des opérations.
Cependant, il est destiné à l'utilisation d'applications **clientes**, il n'y a pas d'intérêt pour des applications **back**

Pour préserver la structure de nos fichiers (Babel, ES6...), on utilisera **Webpack** qui va combiner nos fichiers en un seul fichier JS.
En effet, pour le moment, uniquement NodeJS est en mesure **de compiler index.js** grâce Babel.
Mais ce n'est pas le cas du côté Front : il faut fournir un fichier qui sera interprétable par le navigateur.

On lancera un serveur client à partir de **webpack-dev-server**

Par conséquent, on va rattacher Babel, non à NodeJS, mais à Webpack, par l'intermédiaire de **loaders** (qui sont pour rappel, des outils permettant à Webpack de faire de la transpilation).