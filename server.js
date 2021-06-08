const express = require('express');
const app = express();
const databaseConnection = require('./config/dbConfig');

databaseConnection();

//parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

//parse the request from user
app.use(express.json());

require('./app/routes/addressBook')(app);

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Address Book Backend App!</h1>");
})


//declaring a port number for server to run
app.listen(8000, ()=>{
    console.log("Server is up and running on port 8000");
})