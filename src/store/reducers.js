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