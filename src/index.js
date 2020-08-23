/**
 * Il nous est possible d'utiliser la syntaxe ES6 grâce à Babel
 * Par conséquent, le fichier index.js sera indiqué comme étant un module ES
 * Un Module ES est pratique pour pouvoir exposer des fonctionnalités à d'autres fichiers
 * Et pour dire à Babel qu'il faudra lancer ce script, il faudra modifier le package.json
 * 
 */
import CONSTANTS from "./constants"
/**
 * Chaque clé qui se trouve dans initialState devrait avoir son propre reducer
 */
import { compteur } from "./initialState"
import { compteurReducer } from "./store/reducers";

//Ici on définit une action pour mettre à jour notre compteur
//L'action sera envoyée à redux pour mettre à jour le state du compteur
/**
 * Une action se définit de la façon suivante :
 * {
 *      type: TYPE_ACTION,
 *      payload ("charge utile", ou data, state... : information qui devra être envoyée): DATA 
 * }
 */

const state = compteur; //ici compteur est la valeur renseignée depuis le fichier JSON

//Une action représente une mutation / un changement d'état
 const action = {
     type: CONSTANTS.SET_COMPTEUR,
     payload: 10
 } //l'action ici signifie qu'on souhaite modifier le compteur, et on souhaite lui donner la valeur 10

const nextState = compteurReducer(state,action); //la fonction compteurReducer va justement gérer les différents types d'action pour gérer notre compteur

console.log(`
    initial compteur: ${state},
    action: ${JSON.stringify(action)},
    new compteur: ${nextState}
`)