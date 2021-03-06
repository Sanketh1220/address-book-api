const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/ 
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,30}$/
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        required: true
    },
}, {
    // generates the time stamp the data is been added
    timestamps: true,
    versionKey: false
})

UserInfoSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserInfoSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//created constant variable to assign schema
const UserInfoModel = mongoose.model('UserInfo', UserInfoSchema);

module.exports = mongoose.model('UserInfo', UserInfoSchema)

//created a class to write functions
class UserModel {

    /**
     * @description function written to create user data into database 
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    createInfo(userData, callBack) {
        const user = new UserInfoModel ({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        });

        user.save({}, (error, data) => {
            return((error) ? (callBack(error, null)) : (callBack(null, data)));
        })
    }

    /**
     * @description checks if user is present and generates JWT token
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    loginUser(userData, callBack) {
        UserInfoModel.findOne({'email': userData.email}, (error, data) => {
            if(error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack ("This user doesn't exist! Please register.", null);
            }
            return callBack(null, data); 
        });
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserModel();