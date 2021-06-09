const joi = require('@hapi/joi');

//created a object validate data given each element with set of rules
const validateData = joi.object({
    firstName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    lastName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    address: joi.string().min(3).required(),
    city: joi.string().min(2).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    state: joi.string().min(2).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    zipCode: joi.string().min(6).pattern(new RegExp('^[0-9 ]{6,30}$')).required(),
    phoneNumber: joi.string().min(10).pattern(new RegExp('^[0-9 ]{8,30}$')).required(),
    email: joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")),
});

//exporting object
module.exports = {validateData};
