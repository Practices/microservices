var mongoose    = require('mongoose');

mongoose.connect('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT + '/Articles');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error:' + err.message);
});
db.once('open', function callback () {
    console.log('Connected to db');
});

var Schema = mongoose.Schema;

var Article = new Schema({
    text: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});

var ArticleModel = mongoose.model('Article', Article);

module.exports.ArticleModel = ArticleModel;
