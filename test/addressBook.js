const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const server = require('../server');
const userInputs = require('./addressBookData.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);

/**
 * /POST request test
 * Positive and Negative - Creation of contact into address book Testing
 */
describe('POST addressBook /create', () => {
    it('Given the valid data it should be able to make POST request to create contact to address book with status code as 200', (done) => {
        let addressBookData = userInputs.addressBookCreatePos
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Contact created successfully!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in firstName and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegFirstName
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" length must be at least 3 characters long");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in lastName and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegLastName
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in address and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegAddress
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"address\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in city and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegCity
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"city\" length must be at least 2 characters long");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in state and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegState
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"state\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in phoneNumber and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegPhoneNumber
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"phoneNumber\" with value \"6740120A4545\" fails to match the required pattern: /^[0-9 ]{8,30}$/");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid data in email and all other valid data it should not be able to make POST request to create contact into address book and status code as 400', (done) => {
        let addressBookData = userInputs.addressBookCreateNegEmail
        chai.request(server)
            .post('/addressBook/create')
            .send(addressBookData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});


/**
* /GET request test
* Positive and Negative - Get all contacts from address book
*/
describe('GET addressBook /addressBook', () => {
    it('Given the valid request it should be able to make GET request to get all contacts from address book with status code as 200', (done) => {
        chai.request(server)
            .get('/addressBook')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});

/**
* /GET request test
* Positive and Negative - Get single contact data from database Test 
*/
describe('GET addressBook /addressBook/:addressBookId', () => {
    it('Given the valid request it should be able to make GET request to get single contact from address book with status code as 200', (done) => {
        chai.request(server)
            .get('/addressBook/' ,userInputs.addressBookGetInfoByID)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid ID it should not be able to make GET request to get single contact from address book with status code as 200', (done) => {
        chai.request(server)
            .get('/addressBook/' ,userInputs.addressBookGetInfoByID)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});

/**
* /PUT request test
* Positive and Negative - Updating a single contact using ID into database 
*/
describe('PUT /addressBook/:addressBookId', () => {
    it('Given all valid data it should be able to get update or PUT contact successfully by using ID to database', (done) => {
        chai.request(server)
            .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
            .send(userInputs.addressBookPutPos)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address book successfully updated!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given all valid data into firstName it should be not able to get update or PUT contact successfully by using ID to database', (done) => {
        chai.request(server)
            .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
            .send(userInputs.addressBookPutNegFirstName)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" length must be at least 3 characters long");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given all valid data into email it should be not able to get update or PUT contact successfully by using ID to database', (done) => {
        chai.request(server)
            .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
            .send(userInputs.addressBookPutNegEmail)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});


/**
* /DELETE request test
* Positive and Negative - Ability to delete contact using ID from database Test 
*/
describe('DELETE addressBook /addressBook/delete/:addressBookId', () => {
    it('Given the valid req it should be able to DELETE contact from address book with status code as 200', (done) => {
        chai.request(server)
            .delete('/addressBook/delete/60c0cd0c50e0709e13f50624')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address book Deleted!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given the invalid ID it should not be able to DELETE contact from address book with status code as 200', (done) => {
        chai.request(server)
            .delete('/addressBook/delete/60c0cd0c500709e13f50624')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Address book Deleted!");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});
