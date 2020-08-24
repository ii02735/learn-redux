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