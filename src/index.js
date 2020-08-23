/**
 * C'est dans ce fichier qu'on va mettre en application les fonctionnalités de Redux
 */

 //L'utilisation des constantes est importante afin de ne pas se tromper dans l'appel des différentes actions

 import CONSTANTS from "./constants"
 import mainReducer from "./store/reducers"
 import initialState from "./initialState.json"

 let state = initialState;
//On affiche les différents attributs de l'état initial
 console.log(`
    
    Initial state
    =======================
    Compteur: ${state.compteur}
    Utilisateur: ${JSON.stringify(state.utilisateur)}
    Tous les livres: ${JSON.stringify(state.allBooks)}
    Livres empruntés: ${JSON.stringify(state.booksBorrowed)}
    Récupération des données en cours ? : ${state.fetchingData}

 `);

 //On procède ensuite à la modification

 state = mainReducer(state,{
    type: CONSTANTS.SET_COMPTEUR,
    payload: 200
 })

 //Ce qui est intéressant c'est que mainReducer englobe tout le state
 //Car il contient la structure de l'objet du state (puisqu'on a renseigné les clés du state initial)


 /**
  * Ainsi l'objet "state" contient toutes les clés du stateInitial, et cela grâce au combineReducer
  * donc grâce à Redux
  */

  state = mainReducer(state,{
      type: CONSTANTS.BORROW_BOOK,
      payload: state.allBooks.find((book) => book.id === 1)
  })

  state = mainReducer(state,{
    type: CONSTANTS.BORROW_BOOK,
    payload: state.allBooks.find((book) => book.id === 2)
  })

  //on a changé le state pour le compteur, et pour les livres empruntés

 console.log(`
    
    Next state
    =======================
    Compteur: ${state.compteur}
    Utilisateur: ${JSON.stringify(state.utilisateur)}
    Tous les livres: ${JSON.stringify(state.allBooks)}
    Livres empruntés: ${JSON.stringify(state.booksBorrowed)}
    Récupération des données en cours ? : ${state.fetchingData}

`);

console.log("hello world")