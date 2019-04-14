"use strict";

var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var mediaCtrl = require('../controllers/media');

var multer = require('multer');
var upload = multer();
// var multer = require('multer');
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       let fixedExt = extension=='jpeg'?'jpg':extension;
//       cb(null, file.fieldname + '-' + Date.now()+ '.' +fixedExt)
//     }
// })
  
// var upload = multer({ storage: storage });


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', mediaCtrl.test);

router.post('/create', mediaCtrl.media_create);

router.post('/upload', upload.single('media'), mediaCtrl.media_upload);
router.post('/uploads', upload.array('medias', 12), mediaCtrl.media_uploads);

router.get('/:id', mediaCtrl.media_details);

router.get('/?', mediaCtrl.media_list);

router.put('/:id/update', mediaCtrl.media_update);

router.delete('/:id/delete', mediaCtrl.media_delete);


module.exports = router;