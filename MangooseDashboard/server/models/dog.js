var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var validate = require('mongoose-validator');
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\-\s]+$/i,
        message: 'Name should contain alpha-numeric characters only'
    })
];

var DogsSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, validate: nameValidator },
    age: { type: Number, required: true, min: 1 },
}, { timestamps: true });

mongoose.model('Dog', DogsSchema);