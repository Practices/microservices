var express = require('express');
var bodyParser = require('body-parser');
var ArticleModel = require('./src/articleModel').ArticleModel;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 8080;

app.get('/api', function (req, res) {
  res.send('Hello from serviceA');
});

app.get('/api/articles', function(req, res) {
  return ArticleModel.find(function (err, articles) {
      if (!err) {
          return res.send(articles);
      } else {
          res.statusCode = 500;
          console.log('Internal error' + res.statusCode + ':' + err.message);
          return res.send({ error: 'Server error' });
      }
  });
});

app.post('/api/articles', function(req, res) {
    var article = new ArticleModel({
        text: req.body.text,
    });

    article.save(function (err) {
        if (!err) {
            console.log("article created");
            return res.send({ status: 'OK', article:article });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            console.log('Internal error' + res.statusCode + ':' + err.message);
        }
    });
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
