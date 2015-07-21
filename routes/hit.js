
module.exports.post = function(req, res) {
    if(!req.body.playerId){
		res.send("Invalid playerId");
		return;
	}
	else{
		playerModel.findOne({playerId: req.body.playerId, status: 'playing'}, function(err, player){
			if(player && !err){
				var card = deck.drawCard();
				var handArr = player.hand;
				handArr.push(card);
				playerModel.update({ playerId: req.body.playerId }, { $set: { hand: handArr }}, function(err){
					if(err)
						console.error(err);
					else{
						deck.save();
						var val = player.getValue();
						if(val > 21){
							playerModel.update({ playerId: player.playerId }, { $set: { status: 'out' }}, function(err){ if(err) console.error("error");});
							res.send({ total: val, hand: handArr, status: 'out'});
						}
						else
							res.send({ total: val, hand: handArr, status: 'playing'});
					}
				});
			}
			else
				res.send('No player!');
		});
	}
};