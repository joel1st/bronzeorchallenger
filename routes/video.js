var express = require('express');
var router = express.Router();
var produceError = require('../produceError');
var YoutubeVideo = require('../models/youtubeVideo');

var pageData = {
	description: "Vote on what League of Legends plays are from Challenger or Bronze players",
	title: "Video"
};
/* GET home page. */
router.get('/:video', function(req, res, next) {
	var videoId = req.params.video;
	if(!videoId.length){
		res.redirect('/');
	} else {
		YoutubeVideo.findOne({_id:videoId}, function(err, data){
			
			if(!err && data){
				data = JSON.parse(JSON.stringify(data));
				console.log(data);
				if(req.session.votes && req.session.votes.hasOwnProperty(videoId)){
					var voted =  req.session.votes[videoId];
				}
				res.render('video', { pageData: pageData, videoData: data, voted: voted });
			} else if(err) {
				return next(produceError('databaseError'));
			} else {
				return next(produceError('notFound'));
			}
		})
	}
	
});

module.exports = router;
