const express = require('express');
const app = express();
const port = 4000
const data = require("../data/books.json")

app.get("/books",(req,res) => {
    if(req.query.length == 0)
        res.json(data.books);
    else
        res.json(data.books.filter(book => book[req.query.q].includes([req.query.v])));
})


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
