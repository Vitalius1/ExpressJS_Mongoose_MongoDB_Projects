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

var QuotesSchema = new mongoose.Schema({
    name: { type: String, required: true, validate: nameValidator },
    quote: { type: String, required: true, maxlength: 1000 },
}, {timestamps:true});
var Quote = mongoose.model('Quote', QuotesSchema);
