//Définition des constantes pour les différentes actions
const constants = {
    SET_COMPTEUR: "SET_COMPTEUR",
    SET_USER: "SET_USER",
    ADD_BOOK: "ADD_BOOK",
    SET_BOOKS: "SET_BOOKS", //Pour récupérer les livres suggérés depuis le serveur HTTP
    REMOVE_BOOK: "REMOVE_BOOK",
    ADD_ERROR: "ADD_ERROR",
    REMOVE_ERROR: "REMOVE_ERROR",
    BORROW_BOOK: "BORROW_BOOK", //pour réserver / emprunter un livre
    GIVE_BACK_BOOK: "GIVE_BACK_BOOK", //rendre un livre
    FETCHING_DATA: "FETCHING_DATA"
}

//On définit des constantes pour obliger JS à choisir des actions existantes plutôt que de taper des string (ce qui accroît le risque de typo)


export default constants;

