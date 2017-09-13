var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

mongoose.model('Task', TaskSchema);