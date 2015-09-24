var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.send('hello');
});

app.listen(3000);

module.exports = app;