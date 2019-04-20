var Vote = require('../models/vote');

exports.vote_create = function (req, res, next) {
    var vote = new Vote(
        req.body.vote
    );

    vote.save(function (err, newCat) {
        if (err) {
            return next(err);
        }
        res.send(newCat)
    })
};

exports.vote_details = function (req, res, next) {
    Vote.findById(req.params.id).populate('oLMedia oRMedia').exec(function (err, vote) {
        if (err) return next(err);
        res.send(vote);
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