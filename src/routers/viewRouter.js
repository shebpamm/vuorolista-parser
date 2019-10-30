var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

router.get('/asd', function (req, res) {
  res.send("asdasd")
})

module.exports = router;
