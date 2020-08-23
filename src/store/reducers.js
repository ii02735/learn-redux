/**
 * Dans les reducers, on définit les fonctions pour les constantes qu'on a défini
 * Les constantes représentent les actions qu'on souhaite réaliser
 * 
 * Mais les actions en elle-mêmes doivent être définies pour effectuer la mutation d'états
 */

import CONSTANTS from "../constants"

/**
 * Structure de reducer
 * @param {Object} state État initial 
 * @param {string} action Action à exécuter pour changer l'état
 */
export const compteurReducer = (state,action) => {
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

export const utilisateurReducer = (state,action) => {

    switch(action.type)
    {
        case CONSTANTS.SET_USER:
            return action.payload;
        default:
            return state;
    }
}

//On peut emprunter plusieurs livres, d'où la structure Array dans initialState
export const bookBorrowReducer = (state=[],action) => {

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
export const fetchingDataReducer = (state=false,action) => {
    switch (action.type) {
        case CONSTANTS.FETCHING_DATA:
            return true;
        
        case CONSTANTS.FINISHED_FETCHING:
            return false;    

        default:
            return state;
    }
}