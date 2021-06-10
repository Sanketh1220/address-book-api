const addressBookController = require('../controller/addressBook');
const userController = require('../controller/user');
const tokenCheck = require('../middleware/helper');


//exporting it to server.js
module.exports = (app) => {

    //registration api POST request
    app.post('/user/register', userController.registrationApi);

    //login api POST request
    app.post('/user/login', userController.loginApi);

    //create API post request
    app.post('/addressBook/create', tokenCheck.tokenChecker, addressBookController.createApi);

    //retrieve all data API
    app.get('/addressBook', tokenCheck.tokenChecker, addressBookController.getAllDataApi);

    //retrieve one address book using ID
    app.get('/addressBook/:addressBookId', tokenCheck.tokenChecker, addressBookController.getDataByIdApi);

    //updating a address book using ID
    app.put('/addressBook/update/:addressBookId', tokenCheck.tokenChecker, addressBookController.updateApi);

    //deleting an address book using ID
    app.delete('/addressBook/delete/:addressBookId', tokenCheck.tokenChecker, addressBookController.deleteApi);
}