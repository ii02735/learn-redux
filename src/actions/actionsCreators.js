/**
 * Les actions creators sont des fonctions qui contiennent
 * de la logique utile avant transmission d'un objet qui
 * aboutira à un changement du store, à l'aide du dispatch
 */
 import CONSTANTS from "./constants";

  
 /**
  * Supposons qu'on souhaite vérifier l'existance d'un livre
  * avant son emprunt
  */ 
 export const borrowBookAction = ({allBooks},id) => {

    const searchedBook = allBooks.find((book) => book.id === id);
    //Si le livre n'existe pas...
    if(!searchedBook)
        return {
            type: CONSTANTS.ADD_ERROR,
            payload: "Le livre recherché n'existe pas"
        }
    if(searchedBook.exemplaires < 1)
        return {
            type: CONSTANTS.ADD_ERROR,
            payload: "Il n'y a plus d'exemplaire disponible"
        }    
    return {
        type: CONSTANTS.BORROW_BOOK,
        payload: searchedBook
    }    
 }

 export const loginUser = ({username,role}) => {
    return {
        type: CONSTANTS.SET_USER,
        payload: {
            username, role
        }
    }
 }

 export const addBookAction = (book, currentUser) => {
     if(currentUser.role != "ADMIN")
        return {
            type: CONSTANTS.ADD_ERROR,
            payload: `L'utilisateur ${currentUser.username} n'est pas autorisé à faire cette action`
        }
     return {
         type: CONSTANTS.ADD_BOOK,
         payload: book
     }   
 }

 /**
  * Création d'un thunk
  * Il s'agit, comme pour les instructions ci-dessus
  * de fonctions classiques
  * Mais à la différence, il retourne une FONCTION et pas un objet
  * Et on peut gérer justement les différents moments des dispatch
  */

  /**
   * Les thunks (ou action creators de react-thunk)
   * injectent automatiquement la fonction dispatch pour pouvoir
   * l'utiliser à volonté, ainsi que la méthode getState pour pouvoir
   * consulter le state du store
   */
 export const fetchSuggestions = () => (dispatch, getState) => {
     //Il est totalement possible d'utiliser dispatch pour justement envoyer des actions
     //de manière classique
     console.group("fetchSuggestions")
     console.log(getState())
     console.groupEnd();
     dispatch({
         type: CONSTANTS.FETCHING_DATA,
         payload: true
     })

     //setTimeout est une action asynchrone
     //le dispatch de la callback sera exécuté plus tard
     //après que le temps s'est écoulé
     setTimeout(() => {
         dispatch({
             type: CONSTANTS.FETCHING_DATA,
             payload: false
         })
     },3000)


 }