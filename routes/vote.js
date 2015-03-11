var express = require('express');
var router = express.Router();
var YoutubeVideo = require('../models/youtubeVideo');

/* GET home page. */
router.post('/', function(req, res) {
    var videoId = req.body.videoId;
    var league = req.body.league;

    console.log(videoId);
    console.log(league);

    if (videoId.length) {
        //determine if user has already voted
        if (!req.session.votes) {
            req.session.votes = {};
        } else if (req.session.votes.hasOwnProperty(videoId)) {
            res.send('already-have-access');
            return;
        }

        //if user votes for bronze or challenger add it to the db
        if (league === 'bronze' || league === 'challenger') {
            var increment = {
                totalVotes: 1
            };
            if (league === 'bronze') {
                increment.bronzeVotes = 1;
            } else {
                increment.challengerVotes = 1;
            }

            YoutubeVideo.findByIdAndUpdate(videoId, {
                $inc: increment
            }, {
                "new": true
            }, function(err, data) {
                if (err) {
                    res.send('error occured');
                }
                req.session.votes[videoId] = league;
                data = JSON.parse(JSON.stringify(data));
                data.voted = league;
                res.send(data);
            });
        } else {
            YoutubeVideo.findOne({
                _id: videoId
            }, function(err, data) {
                if (err) {
                    res.send('error occured');
                }
                req.session.votes[videoId] = 'bronze';
                data = JSON.parse(JSON.stringify(data));
                data.voted = bronze;
                res.send(data);
            });
        }

    } else {
        res.send('no-data-found');
    }

});

module.exports = router;