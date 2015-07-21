
module.exports.post = function(req, res) {
    playerModel.find({status: {$in: ['playing', 'waiting']}}, function(err, players){
		if(players[0]){
			res.send('Wait until all the players end please.');
		}
		else{
			var value = deck.dealerPlay();
			if(value > 21)
				res.send({ house: 'looses', winners: 'everyone'});
			else{
				playerModel.find({status: 'stick'}, function(err, players){
					if(err || !players)
						res.send("Unknown problem.");
					else{
						var winners = [];
						for (var i = players.length - 1; i >= 0; i--) {
							var player = players[i];
							if(players[i].result > value){
								winners.push(players[i].playerId);
							}
						};
						if(winners[0])
							res.send({ house: 'looses', winners: winners })
						else
							res.send({ house: 'wins with ' + value });
					}
				});	
			}
		}
	});
};