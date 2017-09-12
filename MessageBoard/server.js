var express = require('express');
var session = require('express-session');
var app = express();
app.use(session({ secret: 'codingdojorocks' }));  // string for encryption
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
        arguments: [4, 50],
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
    msgCreator: { type: String, required: true, validate: nameValidator },
    message: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

// define Comment Schema
var CommentSchema = new mongoose.Schema({
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    comCreator: { type: String, required: true, validate: nameValidator },
    comment: { type: String, required: true },
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
    Post.find()
        .lean()
        .populate('comments')
        .exec(function (err, posts) {
            res.render('index', { posts: posts, Merrors: req.session.Merror, Cerrors: req.session.Cerror });

        });
    // res.render("index");
});

app.post('/post_message', function (req, res) {
    var post = new Post(req.body);
    post.save(function (err) {
        if (err) {
            console.log('something went wrong');
            req.session.Merror = "Fields can not be empty";
            console.log(req.session.Merror);
            res.redirect("/");
        } else {
            console.log('successfully added a post!');
            res.redirect('/');
        }
    });
});

app.post('/post_comment/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        var comment = new Comment(req.body);
        comment._post = post._id;
        post.comments.push(comment);
        comment.save(function (err) {
            if(err){
                req.session.Cerror = "Fields can not be empty";
                res.redirect("/");
            } else {
                post.save(function (err) {
                    if (err) { console.log('Error'); }
                    else { res.redirect('/'); }
                });
            }
        });
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
