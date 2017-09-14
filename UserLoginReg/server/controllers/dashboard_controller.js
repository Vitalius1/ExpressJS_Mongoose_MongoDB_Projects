var mongoose = require('mongoose');
var User = mongoose.model("User");


module.exports = {
    showSuccess: (req, res) => {
        console.log("GET | '/success'");
        User.findById(req.session.user_id, (err, user) => {
            if (err) {
                return console.log(err)
            } else if (user) {
                return res.render('success', {
                    first_name: user.first_name,
                });
            } else {
                req.flash('notLoggedTry', 'You must login to access this page');
                return res.redirect('/');
            }
        });
    }
};