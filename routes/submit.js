var express = require('express');
var request = require('request');
var produceError = require('../produceError');
var YoutubeVideo = require('../models/youtubeVideo');
var router = express.Router();
function validUrl(url){
	//http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
	  return match[2];
	} else {
	  return false;
	}
}

function checkVideoExists(url){
	request() 
}
/* GET home page. */
router.post('/video', function(req, res, next) {
	var urlPosted = req.body.videourl;
	var league = req.body.league;
	var youtubeId = validUrl(urlPosted);
	if(urlPosted.length >= 1 && (league === 'bronze' || league === 'challenger') && youtubeId){

		request('http://img.youtube.com/vi/'+youtubeId+'/0.jpg', function (error, response, body) {
	  	
	  		if (error) {
	  			return next(produceError('databaseError'));
	  		} else if (response && response.statusCode != 200){
	  			return next(produceError('youtubeVideoNotFound'));
	  		} else {
	  			var youtubeSubmission = new YoutubeVideo({
	  				_id: youtubeId,
	  				league: league
	  			});
	  			youtubeSubmission.save(function(err, nInserted){
	  				if(err){
	  					console.log('db error');
	  					return next(produceError('databaseError'));

	  				} else if (nInserted === 0){
	  					console.log('already exist');
	  					res.redirect('/video/'+youtubeId);

	  				} else {
	  					console.log('submitted');
	  					res.redirect('/video/'+youtubeId);
	  				}
	  			});
	  		}
	  	});

	} else {

	}
  //res.render('index', { pageData: pageData });
});

module.exports = router;
