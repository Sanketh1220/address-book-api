const addressBookController = require('../controller/addressBook');

//exporting it to server.js
module.exports = (app) => {

    // create API post request
    app.post('/addressBook/create', addressBookController.createApi);

    // retrieve all data API
    app.get('/addressBook', addressBookController.getAllDataApi);

    // retrieve one address book using ID
    app.get('/addressBook/:addressBookId', addressBookController.getDataByIdApi);

    // updating a address book using ID
    app.put('/addressBook/update/:addressBookId', addressBookController.updateApi);

    // deleting an address book using ID
    app.delete('/addressBook/delete/:addressBookId', addressBookController.deleteApi);
}