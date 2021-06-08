const addressBookController = require('../controller/addressBook');

module.exports = (app) => {
    app.post('/addressBook/create', addressBookController.createApi);
}