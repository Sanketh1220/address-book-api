const addressBookController = require('../controller/addressBook');

module.exports = (app) => {

    // create API post request
    app.post('/addressBook/create', addressBookController.createApi);

    // retrieve all data API
    app.get('/addressBook', addressBookController.getAllDataApi);
}