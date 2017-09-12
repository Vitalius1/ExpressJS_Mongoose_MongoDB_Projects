var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//======================= Validators ================================
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
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

mongoose.connect('mongodb://localhost:27017/message_board_db');

// define Schema variable
var Schema = mongoose.Schema;

// define Post Schema
var PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

// define Comment Schema
var CommentSchema = new mongoose.Schema({
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    text: { type: String, required: true }
}, { timestamps: true });

// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);

// store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


// Routes
// Root Request
app.get('/', function (req, res) {
    res.render("index");
});

// app.post('/dogs', function (req, res) {
//     var dog = new Dog({ name: req.body.name, age: req.body.age });
//     dog.save(function (err) {
//         if (err) {
//             console.log('something went wrong');
//             res.render("addnew", { errors: dog.errors });
//         } else {
//             console.log('successfully added a dog!');
//             res.redirect('/');
//         }
//     });
// });

// app.post('/dogs/:id', function (req, res) {
//     console.log(req.body.name);
//     Dog.findByIdAndUpdate(req.params.id, { name: req.body.name, age: req.body.age }, function (err) {
//         if (err) {
//             console.log('something went wrong');
//         } else {
//             console.log('successfully updated a dog!');
//             res.redirect('/');
//         }
//     });
// });


// app.get('/dogs/:id', function (req, res) {
//     Dog.findById(req.params.id, function (err, dog) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("onedog", { dog: dog });
//         }
//     });
// });

// app.get('/dogs/edit/:id', function (req, res) {
//     Dog.findById(req.params.id, function (err, dog) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("edit", { dog: dog });
//         }
//     });
// });

// app.get('/dogs/destroy/:id', function (req, res) {
//     Dog.findByIdAndRemove(req.params.id, function (err, dog) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/");
//         }
//     });
// });


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
