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
     fetchingData: fetchingDataReducer
 })