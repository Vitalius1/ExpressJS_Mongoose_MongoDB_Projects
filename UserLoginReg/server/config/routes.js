var user = require('../controllers/users_controller.js');
var dash = require('../controllers/dashboard_controller.js');

module.exports = function (app) {
    app.get('/', (req, res, next) => {
        user.index(req, res);
    });

    app.post('/users', (req, res, next) => {
        user.register(req, res);
    });

    app.post('/sessions', (req, res, next) => {
        user.login(req, res);
    });

    app.get('/success', (req, res, next) => {
        dash.showSuccess(req, res);
    });

    app.get('/sessions/destroy', (req, res, next) => {
        user.destroy(req, res);
    });
};