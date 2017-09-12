var mongoose = require('mongoose');
var Quote = mongoose.model("Quote");
var moment = require('moment');
module.exports = {
    show: function (req, res) {
        Quote.find({}).sort('-createdAt').exec(function (err, quotes) {
            if (err) {
                console.log(err);
            } else {

                res.render("quotes", { quotes: quotes, moment: moment });
            }
        });
    },
    create: function (req, res) {
        var quote = new Quote({ name: req.body.name, quote: req.body.quote });
        quote.save(function (err) {
            if (err) {
                console.log('something went wrong');
                res.render("index", { errors: quote.errors });
            } else {
                console.log('successfully added a quote!');
                res.redirect('/quotes');
            }
        });
    }
};