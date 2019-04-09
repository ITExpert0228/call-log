"use strict";

var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var categoryCtrl = require('../controllers/category');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', categoryCtrl.test);

router.post('/create', categoryCtrl.category_create);

router.get('/:id', categoryCtrl.category_details);

router.get('/?', categoryCtrl.category_list);

router.put('/:id/update', categoryCtrl.category_update);

router.delete('/:id/delete', categoryCtrl.category_delete);


module.exports = router;