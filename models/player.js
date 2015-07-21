var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blackjack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to MongoDB ");
});
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({ playerId: String, hand: [], status: String, result: Number}, { strict: false });

PlayerSchema.methods.iniz = function(){
  this.playerId = hat();
  this.hand = [];
  this.status = 'waiting';
  return this.playerId;
};

PlayerSchema.methods.getValue = function(){
    var resultado = 0;
    var has_a = false;
    if(this.hand.length > 0){
      var arrayLength = this.hand.length;
      for (var i = 0; i < arrayLength; i++) {
        if (this.hand[i] && this.hand.hasOwnProperty(i)){
          if(Array.isArray(this.hand[i].value)){
            resultado += 1;
            has_a = true;
          }
          else
            resultado += this.hand[i].value;
        }
      }
      if(has_a && (resultado + 10) <= 21)
        return resultado + 10;
    }
    return resultado;
};

var PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports = PlayerModel;