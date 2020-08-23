/**
 * Il nous est possible d'utiliser la syntaxe ES6 grâce à Babel
 * Et pour dire à Babel qu'il faudra lancer ce script, il faudra modifier le package.json
 */
import CONSTANTS from "./constants"
import { allBooks, booksBorrowed } from "./initialState.json"

console.log(`
    Voici les livres :
    ${allBooks}
`)