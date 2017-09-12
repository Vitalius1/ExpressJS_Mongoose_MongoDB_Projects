var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var PersonSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
});

mongoose.model('Person', PersonSchema);