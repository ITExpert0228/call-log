var Category = require('../models/category');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.category_create = function (req, res, next) {
    var category = new Category(
        req.body.category
    );

    category.save(function (err, newCat) {
        if (err) {
            return next(err);
        }
        res.send(newCat)
    })
};

exports.category_details = function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send(category);
    })
};

exports.category_list = function (req, res, next) {
    Category.find({cIsTopic: false}, function (err, categorylist) {
        if (err) return next(err);
        res.send(categorylist);
    })
};

exports.topic_list = function (req, res, next) {
    Category.find({cIsTopic: true}, function (err, categorylist) {
        if (err) return next(err);
        res.send(categorylist);
    })
};

exports.category_update = function (req, res, next) {
    Category.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, category) {
        if (err) return next(err);
        res.send(category);
    });
};

exports.category_delete = function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.category_upload = async function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    return res.send(file);
};

exports.category_uploads = function (req, res, next) {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
 
    res.send(files)
};