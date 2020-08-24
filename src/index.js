/**
 * C'est dans ce fichier qu'on va mettre en application les fonctionnalités de Redux
 */

 //L'utilisation des constantes est importante afin de ne pas se tromper dans l'appel des différentes actions

 import CONSTANTS from "./actions/constants"
 import mainReducer from "./store/reducers"
 import initialState from "./initialState.json"
 
 //Il est inutile de passer par le mainReducer manuellement pour gérer / muter notre état
 //C'est justement le STORE qui gère la mutation d'état 

 import { createStore, applyMiddleware } from "redux"
 import { borrowBookAction, loginUser, fetchSuggestions } from "./actions/actionsCreators"
 /**
  * redux-thunk est un middleware de redux
  * Cela nous permet de créer des actionsCreators évolués
  * nommés "thunk" et on peut contrôler dans ces actionsCreators
  * le dispatch des actions, à l'instar d'un middleware classique
  * 
  * Mais ce qui est intéressant ici, c'est que cette notion de contrôle
  * n'est pas global comme un middleware classique, mais rattaché à des actions
  */
 import thunkMiddleware from "redux-thunk"

 /**
  *  Les middlewares
  *  
  *  Les middlewares sont des concepts importants qui peuvent
  *  modifier le cheminement de l'exécution d'une action
  *  
  *  On peut donc exécuter de la logique avant que la modification d'état ne se produise
  *  ou après
  * 
  *  Si on souhaite par exemple, logger les différentes valeurs du store avant et après un changement
  */ 

 const loggerMiddleware = (store) => {
    //Ce bloc s'exécute dès création de loggerMiddleware
    //On peut accéder au store ici
    console.info("Création Logger Middleware")
    return (next) => {
       //ici on accès à la fonction qui va dispatch au store
       //ce n'est pas trop utile
       return (action) => {
         //La partie la plus intéressante est ce bloc
         console.groupCollapsed("PRÉPARATION DISPATCH")
         console.warn("Action demandée : ",action.type)
         console.log("État actuel du store", store.getState())
         console.groupEnd();
         //Ici a lieu l'exécution de l'action avec le dispatch
         //grâce à l'instruction suivante :
         const result = next(action);
         //Toute instruction après le next sera donc forcément exécuté après la réalisation du dispatch
         //Et toute instruction AVANT, sera exécuté avant réalisation du dispatch
         console.groupCollapsed("DISPATCH EXÉCUTÉ")
         console.log("Nouvel état du store : ", store.getState())
         console.groupEnd();
         
         //Les middlewares sont importants, car ils peuvent exécuter du code APRÈS changement de states
         //Ou même avant, ce qui est utile pour gérer de l'asynchronicité (dans des promesses, on fait appel à des dispatch, ce qui
         //va entrer à nouveau dans le cycle du middleware !)
         
         //Pour s'assurer que le changement de l'état soit bien pris en compte, il faut retourner le résultat du dispatch

         return result;
       }
    }
 } 


 //Il faut ATTACHER le middleware à notre store afin que ce dernier soit rajouté dans l'exécution des dispatch de ces derniers


                              //Ajout du middleware de thunk-redux
const store = applyMiddleware(thunkMiddleware,loggerMiddleware)(createStore)(/** arguments de createStore */mainReducer,initialState)

store.dispatch({
   type: CONSTANTS.SET_COMPTEUR,
   payload: 1000
});

store.dispatch({
   type: CONSTANTS.BORROW_BOOK,
   payload: store.getState().allBooks.filter((book) => book.titre === "Le républicain vert")[0]
 });

 store.dispatch({
    type: CONSTANTS.ADD_BOOK,
    payload: {
       id: 6,
       titre: "Redux et RxJS",
       auteur: "Abramov",
       sortie: "2018",
       genre: "Développement web"
    }
 })

 store.dispatch(borrowBookAction(store.getState(),28));

 store.dispatch(borrowBookAction(store.getState(),2));

 store.dispatch(loginUser({username: "M. Librarian", role: "Librarian"}))

 //On utilise le thunk pour dispatch
 //Dès qu'on essaye de dispatch un 
 store.dispatch(fetchSuggestions())