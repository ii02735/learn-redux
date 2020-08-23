/**
 * Dans les reducers, on définit les fonctions pour les constantes qu'on a défini
 * Les constantes représentent les actions qu'on souhaite réaliser
 * 
 * Mais les actions en elle-mêmes doivent être définies pour effectuer la mutation d'états
 */

import CONSTANTS from "../constants"
//CombineReducers nous permet de combiner plusieurs reducers en un seul
//Et c'est à partir de de ce moment-là que Redux entre en jeu
import { combineReducers } from "redux";
//Il faut que chaque reducer ait un état par défaut
import initialState from "../initialState.json";
/**
 * Structure de reducer
 * @param {Object} state État initial 
 * @param {string} action Action à exécuter pour changer l'état
 */
export const compteurReducer = (state=initialState.compteur,action) => {
    /**
     * Ici on doit définir l'exécution de chaque action
     * selon les différentes valeurs
     */
    switch(action.type)
    {
        case CONSTANTS.SET_COMPTEUR:
            return action.payload; //La valeur de retour sera la valeur du nouvel état, le contenu du payload
                                   /**
                                    *  Ce qui est logique, car on stocke le résultat de compteurReducer dans 
                                    *  la constante nextState (const nextState = compteurReducer(state,action)
                                    **/ 
        default: //Si l'action n'est pas reconnue, on retourne la valeur initiale
            return state;
    }
}

//Définition d'un reducer pour gérer l'utilisateur

export const utilisateurReducer = (state=initialState.utilisateur,action) => {

    switch(action.type)
    {
        case CONSTANTS.SET_USER:
            return action.payload;
        default:
            return state;
    }
}

//On peut emprunter plusieurs livres, d'où la structure Array dans initialState
export const bookBorrowReducer = (state=initialState.booksBorrowed,action) => {

    switch(action.type)
    {
        case CONSTANTS.BORROW_BOOK:
            //on ne souhaite pas faire un push car sinon on risque modifier l'état initial
            //il faut retourner un nouveau tableau
            const stateCpy = [...state];
            stateCpy.push(action.payload);
            return stateCpy;
        default:
            return state;    
    }
}

//Reducer pour la récupération de données (depuis un serveur HTTP par exemple)
export const fetchingDataReducer = (state=initialState.fetchingData,action) => {
    switch (action.type) {
        case CONSTANTS.FETCHING_DATA:
            return true;
        
        case CONSTANTS.FINISHED_FETCHING:
            return false;    

        default:
            return state;
    }
}

//Reducer pour gérer la liste de tous les livres
export const booksReducer = (state=initialState.allBooks,action) => {
    let stateCpy = null;
    switch(action.type) {
        case CONSTANTS.ADD_BOOK:
            stateCpy = state.slice();
            stateCpy.push(action.payload);
            return stateCpy;
        case CONSTANTS.REMOVE_BOOK:
            stateCpy = state.slice();
            //On prend l'id du book qu'on souhaite supprimer
            stateCpy.splice(stateCpy.find((book) => book.id === action.payload.id))
            return stateCpy;
        default:
            return state;
    }
}

export const errorsReducer = (state=initialState.errors,action) => {
    let stateCpy = null;
    switch(action.type) {
        case CONSTANTS.ADD_ERROR:
            stateCpy = state.slice();
            stateCpy.push(action.payload);
            return stateCpy;
        case CONSTANTS.REMOVE_ERROR:
            stateCpy = state.slice();
            //On prend l'id du book qu'on souhaite supprimer
            stateCpy.splice(stateCpy.find((book) => book.id === action.payload.id))
            return stateCpy;
        default:
            return state;
    }
}

//CombineReducer est une fonction qui intègre plusieurs reducers :
/**
 * const reducer = combineReduer({ compteurReducer, utilisateurReducer, bookBorrowReducer, fetchingDataReducer })
 * Mais plutôt qu'exporter une variable, autant exporter le résultat de la fonction
 */

 //Si on inspecte que le fichier initialState, on s'aperçoit qu'on a repris la structure de ce dernier : chaque clé a son propre reducer
/**
  * Attention !!!
  * Il faut que chaque reducer ait un attribut
  * qui est le nom de l'état auquel il est rattaché
  */
export default combineReducers({
     compteur: compteurReducer,
     utilisateur: utilisateurReducer,
     booksBorrowed: bookBorrowReducer,
     fetchingData: fetchingDataReducer,
     allBooks: booksReducer,
     errors: errorsReducer,
     /**
      * comment et comment_compteur
      * doivent être compris aussi étant donné qu'ils appartiennent
      * à l'objet state initial
      * Mais puisqu'on n'en a pas besoin, on crée de "faux" reducers
      */
     comment: (state,action) => null, 
     comment_compteur: (state,action) => null
})