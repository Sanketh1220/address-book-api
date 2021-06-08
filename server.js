const express = require('express');
const app = express();
const databaseConnection = require('./config/dbConfig');

databaseConnection();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Address Book Backend App!</h1>");
})

app.listen(8000, ()=>{
    console.log("Server is up and running on port 8000");
})