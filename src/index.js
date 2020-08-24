/**
 * Passage à React
 */

import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { createStore } from "redux";
//Le provider est un élément spécifique à redux pour React
//Cela consiste à rendre disponible le store au niveau d'un arbre de composants
import { Provider } from "react-redux";
import mainReducer from "./store/reducers";
import initialState from "./initialState.json";
//On crée notre store 
//Et on incorpore le reducer combiné
//N'oublions pas que ce sont ces reducers qui forment
//le store (cf. combineReducer : on a la structure de notre état)

//Ne pas oublier d'injecter des valeurs par défauts si existant
const store = createStore(mainReducer,initialState)

function Root()
{
   return (
   <Provider store={store}>
      <App/>{/** App et ses enfants auront désormais le store de visible */}
   </Provider>
   )
}

ReactDOM.render(<Root/>,document.getElementById("root"))