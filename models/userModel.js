const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please, provide a name, so, we know who you are!']
    },
    email: {
        type: String,
        required: [true, 'A email is required for this signup process!'],
        unique: true,
        validate: [validator.isEmail, 'Please, provide a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'A password is required for this signup process!'],
        minLength: 5,
        // never show password in DB
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please, confirm your password'],
        validate: {
            // This only works on CREATE and SAVE
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        }
    },

})


// add User model to DB

const User = mongoose.model('User', userSchema)

module.exports = User