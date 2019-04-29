"use strict";

var express = require('express');
var router = express.Router();

var multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/category')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, 'c' + Date.now()+ '.' +extension)
    }
})
  
var upload = multer({ storage: storage });
// Require the controllers WHICH WE DID NOT CREATE YET!!
var categoryCtrl = require('../controllers/category');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', categoryCtrl.test);

router.post('/create', categoryCtrl.category_create);

router.get('/:id', categoryCtrl.category_details);

router.get('/?', categoryCtrl.category_list);
router.get('/topic/all?', categoryCtrl.topic_list);

router.put('/:id/update', categoryCtrl.category_update);

router.delete('/:id/delete', categoryCtrl.category_delete);

router.post('/upload', upload.single('category'), categoryCtrl.category_upload);
router.post('/uploads', upload.array('categorys', 12), categoryCtrl.category_uploads);


module.exports = router;