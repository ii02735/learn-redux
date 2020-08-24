import React from "react";

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

                <p>Valeur actuelle du compteur : {100}</p>
            </div>
        )
    }
}

export default App;