var task = require('../controllers/tasks.js');

module.exports = function (app) {
    app.get('/tasks', function (req, res) {
        task.showall(req, res);
    });
    
    app.post('/tasks', function (req, res) {
        task.create(req, res);
    });

    app.get('/tasks:id', function (req, res) {
        task.findOne(req, res);
    });
    
    app.put('/tasks/:id', function (req, res) {
        task.updateOne(req, res);
    });

    app.delete('/tasks/:id', function (req, res) {
        task.deleteOne(req, res);
    });
};