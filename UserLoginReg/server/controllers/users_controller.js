var mongoose = require('mongoose');
var User = mongoose.model("User");
var bcrypt = require('bcrypt-as-promised');


module.exports = {
    index: (req, res) => {
        res.render('logreg', {
            registrationErrors: req.flash('registrationErrors')[0] || null,
            registrationSuccess: req.flash('registrationSuccess')[0] || null,
            loginMessage: req.flash('loginMessage')[0] || null,
            notLoggedTry: req.flash('notLoggedTry')[0] || null,
            alreadyRegistered: req.flash('alreadyRegistered')[0] || null
        });
    },

    register: (req, res) => {
        console.log("POST | '/users' | req.body: ", req.body);
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log("Registration unsuccessuful because of error: ", err);
                return res.redirect('/');
            }
            else if (user) {
                req.flash('alreadyRegistered', 'Email already registered. Please Login...');
                return res.redirect('/');
            }
            else {
                console.log(req.body.birthdate);
                console.log('====================');
                userInstance = new User(req.body);
                userInstance.save((err, user) => {
                    if (err) {
                        req.flash('registrationErrors', err);
                        return res.redirect('/');
                    }
                    req.flash('registrationSuccess', 'You have successfully registered.');
                    return res.redirect('/');
                });
            }
        });
    },

    login: (req, res) => {
        console.log("POST | '/sessions' | req.body: ", req.body);
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.redirect('/');
            }
            else if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(truth => {
                    req.session.user_id = user._id;
                    return res.redirect('/success');
                })
                .catch(err => {
                    req.flash('loginMessage', 'Invalid Login Credentials.')
                    return res.redirect('/');
                });
            }
            else {
                req.flash('loginMessage', 'Invalid Login Credentials.')
                return res.redirect('/');
            }
        });
    },
    
    destroy: (req, res) => {
        console.log("GET | '/sessions/destroy'");
        req.session.destroy( err => {
            if(err) {
                console.log("Could not terminate session because", err);
            }
            else {
                res.redirect('/');
            }
        });
    }
};