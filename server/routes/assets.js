"use strict";

var express = require('express');
var router = express.Router();
var multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})
  
var upload = multer({ storage: storage });

var assetsCtrl = require('../controllers/assets');

router.post('/upload', assetsCtrl.assets_upload);
router.post('/uploads', assetsCtrl.assets_uploads);

module.exports = router;