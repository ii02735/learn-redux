import React from "react";


/**
 * Attacher des éléments du state du store
 * aux propriétés d'un composant
 * 
 * -->On passe donc par les props
 * car ce sont les seules informations disponibles
 * à l'extérieur de chaque composant
 * 
 * Pour cela on utilise une fonction spéciale à Redux pour React : connect
 */

import { connect } from "react-redux";

/**
 * Nous devons faire un mapping des différentes informations
 * du state du store aux informations du composant qu'on souhaite rattacher
 * Pour cela, nous devons créer une fonction
 */

//Le nom de la fonction est purement choisie, mais très significative
//En paramètre se trouve le STATE DU STORE
const mapStateToProps = (storeState) => {

    //il faut retourner un objet qui fera la correspondance suivante :
    /**
     * storeState <----> props
     */
    //Donc un objet qui remplit les différents props qu'on a besoin
    //Il nous faut juste récupérer des informations sur le compteur

    //Rappel, les attributs de storeState sont en réalité définis au niveau du combineReducer
    return {
        compteur: storeState.compteur
    }
}

class App extends React.Component {
    
    constructor(props)
    {
        super(props);
    }


    render()
    {
        return (
            <div>
                <h2>Bienvenue à notre bibliothèque !</h2>
                <h3>Voici la liste des livres que nous vous proposons pour le moment :</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                {/**
                 * Pour rendre notre composant dynamique, on souhaite
                 * le récupérer depuis notre store, qui joue le rôle de state
                 * de tous les composants qui sont englobés par Provider
                 * 
                 * On parvient à récupérer la valeur du compteur grâce
                 * à l'appel du mapStateToProps
                 */}
                <p>Valeur actuelle du compteur : {this.props.compteur}</p>
            </div>
        )
    }
}

/**
 * Afin de dire à React que les propriétés seront injectées
 * à partir de notre mapping du state du store (cf ci-dessus), il faut englober
 * le composant initial avec le connect
 * 
 * Et lui fournir en argument, l'élément qui permet de réaliser le mapping
 */
export default connect(mapStateToProps)(App);