/**
 * C'est dans ce fichier qu'on va mettre en application les fonctionnalités de Redux
 */

 //L'utilisation des constantes est importante afin de ne pas se tromper dans l'appel des différentes actions

 import CONSTANTS from "./constants"
 import mainReducer from "./store/reducers"
 import initialState from "./initialState.json"

 //Il est inutile de passer par le mainReducer manuellement pour gérer / muter notre état
 //C'est justement le STORE qui gère la mutation d'état 

 import { createStore } from "redux"

 
 const store = createStore(mainReducer, initialState); //création d'un store
                              //On récupère l'état actuel du store (soit l'état global)
                              /**
                               * Chaque valeur du state est la valeur par défaut renseignée
                               * dans les fonctions des reducers
                               */
//grâce au createStore, il est inutile d'appeler le mainReducer et de créer des variables différentes qui vont stocker les différents states
//getState() permet donc de récupérer l'état global
 console.log("Initial state", store.getState());

 /**
  * Pour MUTER un état, on utilise la fonction DISPATCH
  */
  
  //Exemple pour muter le compteur
  /**
   * dispatch contacte les reducers, et le bon reducer (d'après le type)
   * procèdera au changement de l'état
   */
  store.dispatch({
     type: CONSTANTS.SET_COMPTEUR,
     payload: 2000
  })

 /**
  * Il est possible d'exécuter une callback à chaque fois après
  * que le store / le state est modifié
  * à l'aide de la fonction SUBSCRIBE
  * 
  * Ainsi on ajoute un écouteur à redux qui va gérer un événement
  * 
  * Attention, l'ordre est critique
  * Il faut que cette fonction soit définie AVANT la modification du store
  */

  const listener = store.subscribe(() => console.log("Hey the store has been updated !", store.getState()))

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

  //Il est possible de UNSUBSCRIBE (désincrire) un événement on invoquant l'objet qui a stocké le résultat du subscribe
  
  listener();

  //À ce stade là, le dispatch ci-dessous n'invoquera plus la callback du listener

  store.dispatch({
   type: CONSTANTS.ADD_BOOK,
   payload: {
      id: 6,
      titre: "Redux et API Context",
      auteur: "Abramov",
      sortie: "2020",
      genre: "Développement web"
     }
  })

  console.log("New books : ", store.getState().allBooks)