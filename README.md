# node-blackjack-api
Api to play blackjack

Endpoints:

* '/startGame'
* * Starts game, initializes collections.
* '/playerJoin'
* * Initializes a new player
* '/nextPlayer'
* * Shows the Id of the next player and maks it as 'playing'
* '/hit'
* * Takes the playerId in json format and gives a card to him. If he's over 21, he's marked as 'out'
* '/stick'
* * Takes the playerId in json format, sets the result field and marks the player as 'stick'
* '/dealerPlay'
* * If all the players have played, the dealer plays and gets a result, shows who has won.

Installation:
npm install
node blackjack.js