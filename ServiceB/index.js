var express = require('express');
var request = require('request');
var app = express();

var port = 8080;
var serviceUrl = 'http://' +
  process.env.MICROSERVICES_WEBSERVICE1_1_PORT_8080_TCP_ADDR +
  ':' +
  process.env.MICROSERVICES_WEBSERVICE1_1_PORT_8080_TCP_PORT;

app.get('/api', function (req, res) {
  res.send('Hello from serviceB');
});

app.get('/articles', function (req, res) {
  var url = serviceUrl + '/api/articles';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return res.send(body);
    }
  })
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
