const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const server = require('../server');
const userInputs = require('./addressBook.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);

/**
 * /POST request test
 * Positive and Negative - Registration of User Testing
 */
describe('POST user/register', () => {
    it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs200', (done) => {
        let userData = userInputs.userCreatePos
        chai.request(server)
            .post('/user/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User registered!");
                res.body.should.have.property("data").should.be.a('object');
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidFirstName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegFirstName
        chai.request(server)
            .post('/user/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidLastName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegLastName
        chai.request(server)
            .post('/user/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidEmail_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegEmail
        chai.request(server)
            .post('/user/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenEmptyDataInPasswordField_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegPassword
        chai.request(server)
            .post('/user/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });
});

/**
 * /POST request test
 * Positive and Negative - Login of User Testing
 */
describe('POST user/login', () => {
    it('givenValidDataItShould_makePOSTRequestAndLoginUser_andReturnsStatusCodeAs200_andUniqueToken', (done) => {
        let userData = userInputs.userLoginPos
        chai.request(server)
            .post('/user/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User login successful!");
                res.body.should.have.property("token")
                if (error) {
                    return done(error);
                }
                done();
            });
    });
});

describe('Employee Payroll API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/user/login')
            .send(userInputs.userLoginPos)
            .end((error, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    /**
     * /POST request test
     * Positive and Negative - Creation of contact into address book Testing
     */
    describe('POST addressBook /create', () => {
        it('givenValidDataItShould_makePOSTRequestAndCreateContactInToAddressBook_andReturnsStatusCodeAs200', (done) => {
            let addressBookData = userInputs.addressBookCreatePos
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Contact created successfully!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidFirstName_andOtherValidData_failsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegFirstName
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"firstName\" length must be at least 3 characters long");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidLastName_andOtherValidData_failsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegLastName
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidAddress_andOtherValidData_failsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegAddress
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"address\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidCity_andOtherValidData_failsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegCity
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"city\" length must be at least 2 characters long");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidState_andOtherValidData_failsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegState
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"state\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidPhoneNumber_andOtherValidDatafailsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegPhoneNumber
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"phoneNumber\" with value \"6740120A4545\" fails to match the required pattern: /^[0-9 ]{8,30}$/");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidEmail_andOtherValidDatafailsToMakePOSTRequestToCreate_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.addressBookCreateNegEmail
            chai.request(server)
                .post('/addressBook/create')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"email\" must be a valid email");
                    if (error) {
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
        it('givenValidRequest_successfullyMakesGETRequestToGetAllContactsFromAddressBook_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/addressBook')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
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
        it('givenValidRequest_successfullyMakesGETRequest_toGetSingleContactFromAddressBook_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/addressBook/', userInputs.addressBookGetInfoByID)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidID_failsToMakeGETRequest_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .get('/addressBook/', userInputs.addressBookGetInfoByID)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address Book data successfully retrieved!");
                    if (error) {
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
        it('givenValidDataItShould_updateOrPUTContactSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
                .send(userInputs.addressBookPutPos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address book successfully updated!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidFirstName_andOtherValidData_failsToMakePUTRequestToUpdate_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
                .send(userInputs.addressBookPutNegFirstName)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"firstName\" length must be at least 3 characters long");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidEmail_andOtherValidData_failsToMakePUTRequestToUpdate_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addressBook/update/60c03a51ac9b1b6a9b753f45')
                .send(userInputs.addressBookPutNegEmail)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"email\" must be a valid email");
                    if (error) {
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
        it('givenValidReqItShould_successfullyMakesDELETERequestToDeleteContact_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .delete('/addressBook/delete/60c0cd0c50e0709e13f50624')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address book Deleted!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidID_failsToDELETEContact_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .delete('/addressBook/delete/60c0cd0c500709e13f50624')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Address book Deleted!");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

});