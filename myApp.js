require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + "/public"))
console.log("Hello World")


const middleware = (req, res, next) => {
    req.time = new Date().toString()
    next()
}

const time = (req, res) => {
    res.send({ time: req.time });
}

app.get("/now", middleware, time);






























module.exports = app;
