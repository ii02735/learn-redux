//Définition des constantes pour les différentes actions
const constants = {
    SET_COMPTEUR: "SET_COMPTEUR",
    SET_USER: "SET_USER",
    ADD_BOOK: "ADD_BOOK",
    REMOVE_BOOK: "REMOVE_BOOK",
    ADD_ERROR: "ADD_ERROR",
    BORROW_BOOK: "BORROW_BOOK", //pour réserver / emprunter un livre
    GIVE_BACK_BOOK: "GIVE_BACK_BOOK", //rendre un livre
    FETCHING_DATA: "FETCHING_DATA",
    FINISHED_FETCHING: "FINISHED_FETCHING"
}

//On définit des constantes pour obliger JS à choisir des actions existantes que de taper des string


export default constants;

