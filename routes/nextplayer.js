
module.exports.post = function(req, res) {
	playerModel.findOne({status: 'playing'}, function(err, player){
		if(player)
			res.send(player.playerId);
		else{
			playerModel.findOne({status: 'waiting'}, function(err, player){
				if(err)
					res.send("No players or game finished.");
				else{
					playerModel.update({ playerId: player.playerId }, { $set: { status: 'playing' }}, function(){
						player.save();
					});
					res.send(player.playerId);
				}
			});	
		}
	});
};