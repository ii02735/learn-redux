## **Le store de REDUX**

Le store de REDUX est l'élément central de la gestion des états.
C'est justement à partir du store qu'on va gérer et récupérer les états dont on en a le besoin.

**Le fonctionnement de REDUX est le suivant :**

**action** --> **dispatch** --> **reducer***--> **store** --*contient*--> **état** --*transmet*--> **composant / vue**

La création de **reducers** se comporte en la rédaction de ***fonctions JS pures** : ce sont ces dernières qui joueront avec le store et ses états.

**Redux** est juste là pour abstraire la manipulation des reducers et du store :

- On combine les différents reducers entre-eux à l'aide de `combineReducers`

- Il procure aussi des outils très intéressants pour écouter **les modifications** du store : `subscribe` 

- Contrôler / exécuter de la logique avant exécution du `dispatch` grâce aux ***middlewares***
  **Par conséquent, le fonctionnement de REDUX se modifie :**
**action** --> **MIDDLEWARE** --> **dispatch** --> **reducer***--> **store** --*contient*--> **état** --*transmet*--> **composant / vue**

- Exécuter de la logique avant transmission / envoi d'une action à un reducer particulier, à l'aide des ***actions creators***
  En effet, il n'est pas possible d'écrire directement dans la logique **DANS un REDUCER** : ce dernier est destiné seulement à muter des états du store.