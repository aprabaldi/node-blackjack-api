
module.exports.get = function(req, res) {
	playerModel.find({}, function(err, players){
		if(err)
			res.send("No players or game finished.");
		res.send(players);
	});
};