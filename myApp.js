require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + "/public"))
console.log("Hello World")

































module.exports = app;
