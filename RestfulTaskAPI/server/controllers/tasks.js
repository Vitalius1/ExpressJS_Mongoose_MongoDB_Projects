var mongoose = require('mongoose');
var Task = mongoose.model("Task");
module.exports = {
    showall: function (req, res) {
        Task.find({}, function (err, tasks) {
            if (err) {
                console.log(err);
            } else {
                res.json(tasks);
            }
        });
    },
    create: function (req, res) {
        var task = new Task(req.body);
        task.save(function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully added a task!');
                res.redirect('/tasks');
            }
        });
    },
    findOne: function (req, res) {
        Task.findById(req.params.id, function (err, task) {
            if (err) {
                console.log(err);
            } else {
                res.json(task);
            }
        });
    },
    updateOne: function (req, res) {
        Task.findByIdAndUpdate(req.params.id, req.body, function (err) {
            if (err) {
                console.log("No such task to update");
            } else {
                res.redirect(303, '/tasks');
            }
        });
    },
    deleteOne: function (req, res) {
        Task.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log("No such task to remove");
            } else {
                console.log(`Successufuly removed by id: ${req.params.id}`);
                res.redirect(303, '/tasks');
            }
        });
    }
};