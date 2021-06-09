require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const app = express();
const logger = require('./config/logger');

databaseConnection();

//parsing the requests from user
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
app.listen(PORT, ()=>{
    logger.log("info", "Server is up and running!");
})

module.exports = app;