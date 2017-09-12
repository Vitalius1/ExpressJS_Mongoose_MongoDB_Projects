var mongoose = require('mongoose');
var Dog = mongoose.model("Dog");
module.exports = {
    showall: function (req, res) {
        Dog.find({}).sort('age').exec(function (err, dogs) {
            if (err) {
                console.log(err);
            } else {
                res.render("all", { dogs: dogs });
            }
        });
    },
    updateOne: function (req, res) {
        Dog.findByIdAndUpdate(req.params.id, { name: req.body.name, age: req.body.age }, function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully updated a dog!');
                res.redirect('/');
            }
        });
    },
    create: function (req, res) {
        var dog = new Dog({ name: req.body.name, age: req.body.age });
        dog.save(function (err) {
            if (err) {
                console.log('something went wrong');
                res.render("addnew", { errors: dog.errors });
            } else {
                console.log('successfully added a dog!');
                res.redirect('/');
            }
        });
    },
    findOne: function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                console.log(err);
            } else {
                res.render("onedog", { dog: dog });
            }
        });
    },
    showEditForm: function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                console.log(err);
            } else {
                res.render("edit", { dog: dog });
            }
        });
    },
    destroy: function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err, dog) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/");
            }
        });
    }
};