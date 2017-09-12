var dogs = require('../controllers/dogs.js');

module.exports = function (app) {
    app.get('/', function (req, res) {
        dogs.showall(req, res);
    });

    app.get('/dogs/new', function (req, res) {
        res.render("addnew");
    });

    app.post('/dogs', function (req, res) {
        dogs.create(req, res);
    });

    app.post('/dogs/:id', function (req, res) {
        dogs.updateOne(req, res);
    });

    app.get('/dogs/:id', function (req, res) {
        dogs.findOne(req, res);
    });

    app.get('/dogs/edit/:id', function (req, res) {
        dogs.showEditForm(req, res);
    });

    app.get('/dogs/destroy/:id', function (req, res) {
        dogs.destroy(req, res);
    });
}