const express = require('express')
const app = express()
const port = 3000
const authorsProvider = require("./providers/authorProviders.js")

app.use(express.json());

app.get('/authors', (req, res) => {
    res.json(authorsProvider.getAllUsers());
});

app.get("/authors/:username", (req, res) => {
    const { username } = req.params;
    console.log(username);
    let user = authorsProvider.getUser(username);
    if(!user)
        res.status(404).json({"message":"User not found"});
    res.json(user);
});

/* prova
app.get("/authors/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json(authorsProvider.getUserbyId(parseInt(id, 10)));
});
*/

app.get("/authors", (req, res) => {
    const { age } = req.query;//querry usato per i filtri
    console.log(age);
    res.json(authorsProvider.getAllUsers()); 
});

//patch usate per la modifica di un autore specifico
app.patch("/authors/:id", (req, res) => {
    const { id } = req.params;
    const{ username, name, surname, age } = req.body;
    let user = authorsProvider.updateUser(id, username, name, surname, age);
    if(!user)
        res.status(404).json({"message":"User not found"});
    res.json(user);
});

app.put("/authors/:id", (req, res) => {
    const { id } = req.params; 
    const{ username, name, surname, age } = req.body;
    res.json(authorsProvider.updateUser(id, username, name, surname, age));
});


//delete usato per cancelare un autore
app.delete("/authors/:username", (req, res) => {
   const { username } = req.params;
   res.json(authorsProvider.removeUser(username));
});

app.post("/authors", (req, res) => {
   const{ id,username, name, surname, age } = req.body;
    res.json(authorsProvider.addUser(id, username, name, surname, age ));
});

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`);
});