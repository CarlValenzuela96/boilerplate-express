require('dotenv').config()
var express = require('express');
var app = express();

app.use('/public',express.static(__dirname + "/public"))
console.log("Hello World")

































 module.exports = app;
