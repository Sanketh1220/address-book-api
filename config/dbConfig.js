require('dotenv').config();
require('../.env');
const mongoose = require('mongoose');

/**
 * @description function is written to connect app to mongo database
 * @returns connection
 */
function databaseConnection() {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    return mongoose.connection
    .once('open', () => console.log("MongoDB is connected Successfully!"))
    .on('error', (error) => {
        console.log("Error while connecting to mongoDB is", error);
    });
}

//exporting function to utilize where ever it is imported
module.exports = databaseConnection;