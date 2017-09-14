const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');

var validate = require('validator');

let UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minlength: [2, 'First name should be at least 2 characters long'],
        required: [true, 'Please include your first name.'],
        match: [/^[a-zA-Z]+$/, 'First name can be only letter characters']
    },
    last_name: {
        type: String,
        minlength: [2, 'Last name should be at least 3 characters long'],
        required: [true, 'Please include your last name.'],
        match: [/^[a-zA-Z]+$/, 'Last name can be only letter characters']
    },
    birthdate: {
        type: Date,
        required: [true, 'Please include your birthdate.'],
    },
    email: {
        type: String,
        required: [true, 'Please include your email.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters long'],
        required: [true, 'Please include your password.']
    },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashed_password) => {
            this.password = hashed_password;
            next();
        })
        .catch(err => console.log(err));
}, function (err) {
    console.log(err);
});

mongoose.model('User', UserSchema);