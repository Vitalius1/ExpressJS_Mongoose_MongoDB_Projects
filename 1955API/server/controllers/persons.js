var mongoose = require('mongoose');
var Person = mongoose.model("Person");
module.exports = {
    showall: function (req, res) {
        Person.find({}, function (err, persons) {
            if (err) {
                console.log(err);
            } else {
                res.json(persons);
            }
        });
    },
    create: function (req, res) {
        var person = new Person({ name: req.params.name });
        person.save(function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully added a person!');
                res.redirect('/');
            }
        });
    },
    findOne: function (req, res) {
        Person.findOne({ name: req.params.name }, function (err, person) {
            if (err) {
                console.log(err);
            } else {
                res.json(person);
            }
        });
    },
    remove: function (req, res) {
        Person.findOneAndRemove({ name: req.params.name }, function (err) {
            if (err) {
                console.log("No such person to remove");
            } else {
                res.redirect('/');
            }
        });
    }
};