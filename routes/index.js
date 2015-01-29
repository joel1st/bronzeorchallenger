var express = require('express');
var router = express.Router();
var YoutubeVideo = require('../models/youtubeVideo');

var totalPerPage = 10;
var minVotes = 10;

var pageData = {
	description: "Vote on what league of legends plays are from Challenger or Bronze players",
	title: "Video List"
}

function getHomeData(type, page, res, session, callback){
	var query = {};
	var sort = {};

	if (type === 'new'){
		sort.dateAdded = -1;
	} else if (type === 'top'){
		sort.totalVotes = -1;
	} else if (type === 'hot'){
		sort.dateAdded = -1;
		query.totalVotes = {$gt: 5}
	}
	YoutubeVideo.count({}, function(err, num){
		if(err){
			console.log(err);
		} else {
			var totalPages = Math.ceil(num/totalPerPage);
			if(totalPages < page && num !== 0){
				res.redirect('/');
			} else {
				var skip = totalPerPage*(page-1);
				YoutubeVideo.find(query).sort(sort).skip(skip).limit(10).exec(function(err, data){
					if(session.votes){
						for( var i = 0; i < data.length; i++){
							if(session.votes.hasOwnProperty(data[i]._id)){
								data[i].voted = session.votes[data[i]._id];
							}
						}
					}
					if(err){
						console.log(err);
					}
					var num = {
						totalPages : totalPages,
						currentPage : page,
						type: type
					}; 
					callback(num, data);
				});
			}
		}
		
	})
	
		
		

}
/* GET home page. */
router.get('/', function(req, res) {

	var page = Number(req.query.page)
  var type =  (req.query.type === 'new' || req.query.type === 'hot' || req.query.type === 'top') ? req.query.type : 'new';
  var page = (!isNaN(page) && page > 0) ? page : 1;
 
  getHomeData(type, page, res, req.session, function(num, data){
  	res.render('index', { pageData: pageData, page:num, videoData: data});
  });
  
});



module.exports = router;
