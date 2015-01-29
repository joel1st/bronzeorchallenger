var mongoose = require('mongoose');

var youtubeVideo = new mongoose.Schema({
	dateAdded : {type: Number, 'default': Date.now},
	_id: String,
	league: String,
	bronzeVotes: {type: Number, 'default': 0},
	challengerVotes: {type: Number, 'default': 0},
	totalVotes: {type:Number, 'default': 0}
});

module.exports = mongoose.model('YoutubeVideo', youtubeVideo);