const mongoose = require('mongoose');

//creating a schema to store data as so into database
const AddressBookSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
}, {
    //generates the time stamp the data has been added
    timestamps: true
});

const AddressBookInfoModel = mongoose.model("AddressBook", AddressBookSchema);

//created a class to write functions
class AddressBookModel {
    /**
     * @description function is written to add data into database
     * @param {*} a valid addressBookData is expected
     * @param {*} according to data callBack will be returned
     */
    createContact(addressBookData, callBack) {
        const addressBook = new AddressBookInfoModel ({
            firstName: addressBookData.firstName,
            lastName: addressBookData.lastName,
            address: addressBookData.address,
            city: addressBookData.city,
            state: addressBookData.state,
            zipCode: addressBookData.zipCode,
            phoneNumber: addressBookData.phoneNumber,
            email: addressBookData.email
        });

        addressBook.save({}, (error, data) => {
            return((error) ? (callBack(error, null)) : (callBack(null, data)));
        })
    }
}

module.exports = new AddressBookModel();