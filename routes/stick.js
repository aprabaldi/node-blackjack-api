
module.exports.post = function(req, res) {
    if(!req.body.playerId){
		res.send("Invalid playerId");
		return;
	}
	else{
		playerModel.findOne({playerId: req.body.playerId, status: 'playing'}, function(err, player){
			if(err || !player)
				res.send('Player is not playing.');
			else{
				playerModel.update({ playerId: player.playerId }, { $set: { status: 'stick', result: player.getValue() }}, function(){
					res.send({ total: player.getValue(), hand: player.hand});
				});
			}
		});
	}
};