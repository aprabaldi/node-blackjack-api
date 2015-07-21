var express	= require('express');
var bodyParser	= require('body-parser');
hat = require('hat');

var app	= express(); 				// define our app using express
app.use(bodyParser.json());

deckModel = require('./models/deck');
deckModel.remove({}, function(err){
	if(err)
		console.error("error deleting decks!");
});
deck = new deckModel();

playerModel = require('./models/player');
playerModel.remove({}, function(err){
	if(err)
		console.error("error deleting players!");
});

var startgame = require('./routes/startgame');
var hit = require('./routes/hit');
var stick = require('./routes/stick');
var dealerplay = require('./routes/dealerplay');
var playerjoin = require('./routes/playerjoin');
var nextplayer = require('./routes/nextplayer');
var getplayers = require('./routes/getplayers');

var router = express.Router();

router.route('/').get(function(req, res){
	res.send("This is BlackJack!!");
});
router.route('/startGame').post(startgame.post);
router.route('/hit').post(hit.post);
router.route('/stick').post(stick.post);
router.route('/dealerPlay').post(dealerplay.post);
router.route('/playerJoin').post(playerjoin.post);
router.route('/nextPlayer').post(nextplayer.post);

router.route('/getPlayers').get(getplayers.get);

app.use('/blackjack', router);

app.listen('8888');
console.log('Listening on port 8888');

