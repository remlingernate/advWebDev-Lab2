var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    board: {
        type: [String],
        "default": ['', '', '', '', '', '', '', '', ''],
        required: true
    },
    playerOne: { type: String, required: true },
    playerTwo: { type: String, required: true },
    currentPlayer: { type: String, required: true }
});

mongoose.model('Game', gameSchema);