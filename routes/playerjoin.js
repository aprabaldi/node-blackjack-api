
module.exports.post = function(req, res) {
	var player = new playerModel();
	var playerId = player.iniz();
	player.save();
	res.send("You have joined the game: Id:" + playerId);
};