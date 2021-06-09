const addressBookService = require('../services/addressBook');

class AddressBookController {

    /**
     * @description api created to post request to create a address book
     * @param {*} a valid req is expected 
     * @param {*} res 
     */
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
        });
    }

    /**
     * @description api created to get all the data from the database
     * @param {*} a valid req is expected
     * @param {*} res 
     */
    getAllDataApi(req, res) {
        addressBookService.getAllInfoAddressBook((error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while retrieving data"}) : res.send({success: true, message: "Address Book data successfully retrieved!", data: data}));
        });
    }

    /**
     * @description api created to get data by Id from database
     * @param {*} a valid req is expected 
     * @param {*} res 
     */
    getDataByIdApi(req, res) {
        let addressBookId = req.params;
        
        addressBookService.getDataById(addressBookId, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while retrieving address book"}) : res.send({success: true, message: "Address Book data successfully retrieved!", data: data}));
        });
    }

    /**
     * @description api created to update data by ID into database
     * @param {*} req 
     * @param {*} res 
     */
    updateApi(req, res) {
        let addressBookId = req.params;

        const addressBookData = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }

        addressBookService.updateAddressBook(addressBookId, addressBookData, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while updating address book"}) : res.send({ success: true, message: "Address book successfully updated!", data: data}));
        });
    }

    /**
     * @description api written to delete address book by ID from address book
     * @param {*} a valid req is expected
     * @param {*} res 
     */
    deleteApi(req, res) {
        let addressBookData = req.params;

        addressBookService.deleteAddressBook(addressBookData, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while deleting address book"}) : res.send({success: true, message: "Address book Deleted!", data: data}));
        });
    }
}

//exporting the class to utilize or call function created in this class where ever it is imported
module.exports = new AddressBookController();