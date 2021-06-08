const addressBookService = require('../services/addressBook');

class AddressBookController {
    createApi(req, res) {
        const addressBookData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }

        addressBookService.createAddressBook(addressBookData, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while creating contact to address book"}) : res.send({success: true, message: "Contact created successfully!", data: data}));
        })
    }
}

module.exports = new AddressBookController();