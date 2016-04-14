var express = require('express');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//loading mongoose
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/webdev');

console.log(mongoose);

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var bodyParser    = require('body-parser');
var multer        = require('multer');


var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/webdev';

//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}

//passport session
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

mongoose.connect(connectionString);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);