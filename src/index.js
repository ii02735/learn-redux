/**
 * Il nous est possible d'utiliser la syntaxe ES6 grâce à Babel
 * Par conséquent, le fichier index.js sera indiqué comme étant un module ES
 * Un Module ES est pratique pour pouvoir exposer des fonctionnalités à d'autres fichiers
 * Et pour dire à Babel qu'il faudra lancer ce script, il faudra modifier le package.json
 * 
 */
import CONSTANTS from "./constants"
import { allBooks, booksBorrowed } from "./initialState.json"

console.log(`
    Voici les livres :
    ${allBooks.map((book) => book.titre).join(', ')}

    Ainsi que les actions :
    ${Object.keys(CONSTANTS).join('\n       ')}
`)