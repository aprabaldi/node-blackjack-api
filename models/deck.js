var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blackjack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to MongoDB ");
});
var Schema = mongoose.Schema;

var DECK = [
    { suit: 'clubs', rank: 'Ace', value: [ 1, 10 ] },
    { suit: 'clubs', rank: '2', value: 2 },
    { suit: 'clubs', rank: '3', value: 3 },
    { suit: 'clubs', rank: '4', value: 4 },
    { suit: 'clubs', rank: '5', value: 5 },
    { suit: 'clubs', rank: '6', value: 6 },
    { suit: 'clubs', rank: '7', value: 7 },
    { suit: 'clubs', rank: '8', value: 8 },
    { suit: 'clubs', rank: '9', value: 9 },
    { suit: 'clubs', rank: '10', value: 10 },
    { suit: 'clubs', rank: 'Jack', value: 10 },
    { suit: 'clubs', rank: 'Queen', value: 10 },
    { suit: 'clubs', rank: 'King', value: 10 },

    { suit: 'diamonds', rank: 'Ace', value: [ 1, 10 ] },
    { suit: 'diamonds', rank: '2', value: 2 },
    { suit: 'diamonds', rank: '3', value: 3 },
    { suit: 'diamonds', rank: '4', value: 4 },
    { suit: 'diamonds', rank: '5', value: 5 },
    { suit: 'diamonds', rank: '6', value: 6 },
    { suit: 'diamonds', rank: '7', value: 7 },
    { suit: 'diamonds', rank: '8', value: 8 },
    { suit: 'diamonds', rank: '9', value: 9 },
    { suit: 'diamonds', rank: '10', value: 10 },
    { suit: 'diamonds', rank: 'Jack', value: 10 },
    { suit: 'diamonds', rank: 'Queen', value: 10 },
    { suit: 'diamonds', rank: 'King', value: 10 },

    { suit: 'hearts', rank: 'Ace', value: [ 1, 10 ] },
    { suit: 'hearts', rank: '2', value: 2 },
    { suit: 'hearts', rank: '3', value: 3 },
    { suit: 'hearts', rank: '4', value: 4 },
    { suit: 'hearts', rank: '5', value: 5 },
    { suit: 'hearts', rank: '6', value: 6 },
    { suit: 'hearts', rank: '7', value: 7 },
    { suit: 'hearts', rank: '8', value: 8 },
    { suit: 'hearts', rank: '9', value: 9 },
    { suit: 'hearts', rank: '10', value: 10 },
    { suit: 'hearts', rank: 'Jack', value: 10 },
    { suit: 'hearts', rank: 'Queen', value: 10 },
    { suit: 'hearts', rank: 'King', value: 10 },

    { suit: 'spades', rank: 'Ace', value: [ 1, 10 ] },
    { suit: 'spades', rank: '2', value: 2 },
    { suit: 'spades', rank: '3', value: 3 },
    { suit: 'spades', rank: '4', value: 4 },
    { suit: 'spades', rank: '5', value: 5 },
    { suit: 'spades', rank: '6', value: 6 },
    { suit: 'spades', rank: '7', value: 7 },
    { suit: 'spades', rank: '8', value: 8 },
    { suit: 'spades', rank: '9', value: 9 },
    { suit: 'spades', rank: '10', value: 10 },
    { suit: 'spades', rank: 'Jack', value: 10 },
    { suit: 'spades', rank: 'Queen', value: 10 },
    { suit: 'spades', rank: 'King', value: 10 }
];

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var DeckSchema = new Schema({ deckId: String, deck: [], dealerHand: []}, { strict: false });

DeckSchema.methods.iniz = function(){
  this.deckId = hat();
  this.deck = DECK;
  return this.deckId;
};

DeckSchema.methods.shuffle = function(){
  shuffle(this.deck);
};

DeckSchema.methods.drawCard = function(){
  var card = this.deck.pop();
  return card;
};

DeckSchema.methods.dealerPlay = function(){
    var result = 0;
    var has_a = false;
    while(result < 17){
        var card = this.deck.pop();
        this.dealerHand.push(card);
        if(Array.isArray(card.value)){
            result += 1;
            has_a = true;
        }
        else
            result += card.value;
        
        if(has_a && (result + 10) <= 21)
            result + 10;
    }
    return result;
};

var DeckModel = mongoose.model('Deck', DeckSchema);

module.exports = DeckModel;