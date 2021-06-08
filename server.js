const express = require('express');
const databaseConnection = require('./config/dbConfig');
const app = express();

databaseConnection();

//parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

//parse the request from user
app.use(express.json());

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Address Book Backend App!</h1>");
})

require('./app/routes/addressBook')(app);

//declaring a port number for server to run
app.listen(8000, ()=>{
    console.log("Server is up and running on port 8000");
})