const express = require('express');
const app = express();
const port = 4000
const data = require("../data/books.json")
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:3030" //On autorise webpack / le Front à contacter l'API afin d'éviter des erreurs de CORS
                                    //puisque les deux serveurs ne se trouvent pas sur le même port
}

app.get("/books",cors(corsOptions),(req,res) => {
    if(req.query.length == 0)
        res.json(data.books);
    else
        res.json(data.books.filter(book => book[req.query.q].includes([req.query.v])));
})


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
