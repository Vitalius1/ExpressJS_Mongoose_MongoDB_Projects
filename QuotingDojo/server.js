var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var moment = require('moment');

var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];

mongoose.connect('mongodb://localhost:27017/quoting_dojo');

var QuotesSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, validate: nameValidator },
    quote: { type: String, required: true, maxlength: 1000 },
}, {timestamps:true});
mongoose.model('Quote', QuotesSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote', QuotesSchema); // We are retrieving this Schema from our Models, named 'User'

mongoose.Promise = global.Promise;


// Routes
// Root Request
app.get('/', function (req, res) {
    res.render("index");
});
app.get('/quotes', function (req, res) {
    Quote.find({}).sort('-createdAt').exec(function (err, quotes) {
        if(err){
            console.log(err);
        } else {

            res.render("quotes", { quotes:quotes, moment:moment });
        }
    });
});


// Add Quote Request 
app.post('/quotes', function (req, res) {
    console.log("POST DATA", req.body);
    // create a new Quote with the name and quote corresponding to those from req.body
    var quote = new Quote({ name: req.body.name, quote: req.body.quote });
    // Try to save that new quote to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            res.render("index", { errors: quote.errors });
        } else { // else console.log that we did well and then redirect to the quotes page
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
