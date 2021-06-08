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

    /**
     * @description function written to get data by ID
     * @param {*} addressBookInfo 
     * @param {*} callBack 
     */
    getDataById(addressBookInfo, callBack) {
        addressBookModel.getDataById(addressBookInfo, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function written to update the data as requested by user
     * @param {*} a valid addressBookId is expected
     * @param {*} a valid addressBookData is expected to update
     * @param {*} callBack 
     */
    updateAddressBook(addressBookId, addressBookData, callBack) {
        addressBookModel.updateInfo(addressBookId, addressBookData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function is written to delete address book using ID
     * @param {*} a valid addressBookData that is ID is expected
     * @param {*} callBack 
     */
    deleteAddressBook(addressBookData, callBack) {
        addressBookModel.deleteById(addressBookData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        })
    } 
}

module.exports = new AddressBookService();