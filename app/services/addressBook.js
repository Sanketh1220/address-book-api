const addressBookModel = require('../models/addressBook');

class AddressBookService {
    /**
     * @description function is written to create contact into addressBook database
     * @param {*} addressBookData 
     * @param {*} callBack 
     */
    createAddressBook(addressBookData, callBack) {
        addressBookModel.createContact(addressBookData, (error, data) => {
            return ((error) ? (callBack(error, null)) : (callBack(null, data)));
        });
    }

    /**
     * @description function written to retrieve all data from database
     * @param {*} callBack 
     */
    getAllInfoAddressBook(callBack) {
        addressBookModel.findAll((error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }
}

module.exports = new AddressBookService();