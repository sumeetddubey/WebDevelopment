var express = require('express');
var cors = require('cors');

//loading mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev');

console.log(mongoose);

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var bodyParser    = require('body-parser');
var multer        = require('multer');

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