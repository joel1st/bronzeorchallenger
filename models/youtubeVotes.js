var mongoose = require('mongoose');

var championDataSchema = new mongoose.Schema({
	videoUrl : Number,
	bronzeVotes: Number,
	challengerVotes: Number,
	cookieVotes: {
		cookieId: String,
		votedFor: String
	}
});

module.exports = mongoose.model('ChampionData', championDataSchema);