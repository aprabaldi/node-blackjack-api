
module.exports.post = function(req, res) {
    var deckId = deck.iniz();
    deck.shuffle();
    deck.save();
    res.send("Game Started with Id: " + deckId);
};