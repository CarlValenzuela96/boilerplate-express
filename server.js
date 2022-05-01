/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function () {
  bGround.log('Node is listening on port ' + port + '...')
});

myApp.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

myApp.get('/json',
  (req, res, next) => {
    console.log(req.method, req.path, '-', req.ip)
    next()
  },
  (req, res) => {
    const message = "Hello json"
    return res.send({ "message": process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message })
  })

const middleware = (req, res, next) => {
  req.time = new Date().toString()
  next()
}

myApp.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    setTimeout(200)
    res.send({
      time: req.time
    });
  }
);

myApp.get('/:word/echo', (req, res) => {
  res.send({ echo: req.params.word })
})

myApp.get('/name', (req, res) => {
  res.send({ name: req.query.first + ' ' + req.query.last })
})

myApp.post('/name', (req, res) => {
  res.send({ name: req.body.first + ' ' + req.body.last })
})

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

