var Media = require('../models/media');
const sharp = require('sharp');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.media_create = function (req, res, next) {
    var media = new Media(
        req.body.media
    );

    media.save(function (err, newCat) {
        if (err) {
            return next(err);
        }
        res.send(newCat)
    })
};

exports.media_upload = async function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    const filename = Date.now() + '.jpg';
    const thumbname = 'thumb-' + filename;

    sharp(file.buffer)
        .toFile('uploads/'+filename, (err, info) => {  });
    sharp(file.buffer)
        .resize(100, 100)
        .toFile('uploads/'+thumbname, (err, info) => {  });
    return res.send(filename);
};

exports.media_uploads = function (req, res, next) {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
 
    res.send(files)
};

exports.media_details = function (req, res, next) {
    Media.findById(req.params.id, function (err, media) {
        if (err) return next(err);
        res.send(media);
    })
};

exports.media_list = function (req, res, next) {
    Media.find({}).populate('mCategory').exec(function (err, medialist) {
        if (err) return next(err);
        res.send(medialist);
    })
};

exports.media_update = function (req, res, next) {
    Media.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, media) {
        if (err) return next(err);
        res.send(media);
    });
};

exports.media_delete = function (req, res, next) {
    Media.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};