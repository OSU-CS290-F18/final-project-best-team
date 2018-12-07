let express = require("express");
let mdb = require("./models/dbhelper");
var cookieParser = require("cookie-parser");
var exphbs = require('express-handlebars');
var router = require("./router/router")

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('dist'));

app.use(cookieParser());


app.use('/', router);

app.listen(80);