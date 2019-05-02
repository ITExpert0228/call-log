var Vote = require('../models/vote');
var consts = require('../consts');

exports.vote_create = function (req, res, next) {
    var reqVote = req.body.vote;
    reqVote.vUserIP = consts.IP+"-"+consts.LOCALIP;
    var vote = new Vote(
        reqVote
    );
    vote.save(function (err, newCat) {
        if (err) {
            return next(err);
        }
        res.send(newCat)
    })
};

exports.vote_details = function (req, res, next) {
    Vote.find({vOptio: req.params.id}).exec(function (err, voteList) {
        if (err) return next(err);
        res.send(voteList);
    })
};

exports.vote_rank = function (req, res, next) {
    Vote.find({}).populate('oLMedia oRMedia').exec(function (err, votelist) {
        var currentCount = 0;
        var currentOwnRank = 0;
        var currentAllCount = votelist.length;
        for (var i=0; i<votelist.length; i++) {
            if (votelist[i].vOptio == req.params.id) {
                currentCount ++;
                currentOwnRank ++;
            }
        }      
        if (err) return next(err);
        var resData = {
            ownOut: currentCount,
            ownRank:currentOwnRank,
            allOut:currentAllCount,
            allRank: currentAllCount
        }
        res.send(votelist);
    })
};

exports.vote_list = function (req, res, next) {
    Vote.find({}).populate('oLMedia oRMedia').exec(function (err, votelist) {
        
        if (err) return next(err);
        res.send(votelist);
    })
};

exports.vote_update = function (req, res, next) {
    Vote.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, vote) {
        if (err) return next(err);
        res.send(vote);
    });
};

exports.vote_delete = function (req, res, next) {
    Vote.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};