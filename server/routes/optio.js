"use strict";

var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var optioCtrl = require('../controllers/optio');

var multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      let fixedExt = extension=='jpeg'?'jpg':extension;
      cb(null, file.fieldname + '-' + Date.now()+ '.' +fixedExt)
    }
})
  
var upload = multer({ storage: storage });
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', optioCtrl.test);

router.post('/create', optioCtrl.optio_create);

router.get('/:id', optioCtrl.optio_details);

router.get('/?', optioCtrl.optio_list);

router.put('/:id/update', optioCtrl.optio_update);

router.delete('/:id/delete', optioCtrl.optio_delete);

router.post('/upload', upload.single('optio'), optioCtrl.optio_upload);
router.post('/uploads', upload.array('optios', 12), optioCtrl.optio_uploads);

module.exports = router;