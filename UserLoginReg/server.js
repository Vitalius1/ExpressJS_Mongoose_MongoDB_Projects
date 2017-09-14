const express = require('express');
const app = express();
const path = require('path');

// --------- Body Parser ----------
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// --------- EJS templating engine -----------
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

// ---------- Session ---------------
const session = require('express-session');
app.use(session({ secret: 'mysecretkey' }));

// ------------ Flash ----------------
var flash = require('express-flash');
app.use(flash());


// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

// Routes now in folder config/server/routes.js
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
