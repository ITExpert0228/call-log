
  
exports.assets_upload = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading Icon file.");
        } else {
            return res.end(req.files.file.name);
        }
    });
};

exports.assets_uploads = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading Icon file.");
        } else {
            return res.end(req.files.file.name);
        }
    });
};