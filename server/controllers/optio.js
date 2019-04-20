var Optio = require('../models/optio');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.optio_create = function (req, res, next) {
    var optio = new Optio(
        req.body.optio
    );

    optio.save(function (err, newCat) {
        if (err) {
            return next(err);
        }
        res.send(newCat)
    })
};

exports.optio_details = function (req, res, next) {
    Optio.findById(req.params.id).populate('oLMedia oRMedia').exec(function (err, optio) {
        if (err) return next(err);
        res.send(optio);
    })
};
// Story.findOne({ title: 'Casino Royale' }).populate('authors');
exports.optio_list = function (req, res, next) {
    Optio.find({}).populate('oLMedia oRMedia').exec(function (err, optiolist) {
        
        if (err) return next(err);
        res.send(optiolist);
    })
};

exports.optio_update = function (req, res, next) {
    Optio.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, optio) {
        if (err) return next(err);
        res.send(optio);
    });
};

exports.optio_delete = function (req, res, next) {
    Optio.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.optio_upload = function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
};

exports.optio_uploads = function (req, res, next) {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
 
    res.send(files)
};