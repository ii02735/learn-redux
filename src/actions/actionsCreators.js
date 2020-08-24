/**
 * Les actions creators sont des fonctions qui contiennent
 * de la logique utile avant transmission d'un objet qui
 * aboutira à un changement du store, à l'aide du dispatch
 */
 import CONSTANTS from "./constants";
 import fetch from "isomorphic-fetch"; //polyfill de fetch pour les navigateurs qui ne sont pas compatibles

  
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
   * 
   * Ainsi on distingue les thunks comme étant des actionsCreators
   * asynchrones
   * 
   * N'oublions pas que les thunks retournent des FONCTIONS et non des
   * OBJETS : donc de la logique peut continuellement être écrite
   */
 export const exampleThunk = (dispatch, getState) => {
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

 /**
  * 
  * @param {string} value Valeur recherchée pour récupérer des suggestions de livres
  * 
  * Étant donné que cette action est destinée à faire des requêtes d'API --> exécution
  * asynchrone, fetchSuggestions est un thunk : d'où la raison de retourner une fonction
  * avec un dispatch en paramètre
  */
 export const fetchSuggestions = (value) => (dispatch) => {
    /**
     * On souhaite faire une requête
     * On informe ceci à notre store
     */
    dispatch({ type: CONSTANTS.FETCHING_DATA, payload: true })

    /**
     * Il faudra exécuter un autre dispatch lorsqu'on aura
     * fini de récupérer les data, et cela de manière asynchrone
     * 
     * Le bloc suivant va montrer la simplicité d'écriture du thunk
     */
     
     //fetch retourne une promesse, donc un résultat qui sera disponible de manière asynchrone
     fetch(`http://localhost:4000/books?q=titre&v=${value}`)
        .then(response => response.json()) //on parse la réponse en JSON
        .then(BooksSuggestions => {
            dispatch({
                type: CONSTANTS.SET_BOOKS,
                payload: BooksSuggestions
            })//Attention ! Il ne faut pas oublier qu'on ne doit pas retourner d'action, mais juste l'exécuter, tel est le principe du thunk
        }).catch((error) => {
            dispatch({
                type: CONSTANTS.ADD_ERROR,
                payload: error.message
            })

            //Si une erreur s'est déclenchée : inutile d'aller plus loin, on annule le fetching afin que la vue soit prochainement informée

            dispatch({
                type: CONSTANTS.FETCHING_DATA,
                payload: false
            })
        })
        
        //On peut faire un autre test, asynchrone, avec setTimeout
        //Comme setTimeout sera plus lent que le fetch, il sera exécuté en dernier
        setTimeout(() => dispatch({
            type: CONSTANTS.SET_BOOKS,
            payload: []
        }),4000);
 }