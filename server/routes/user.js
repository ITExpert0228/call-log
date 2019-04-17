"use strict";

var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userCtrl = require('../controllers/user');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', userCtrl.test);


router.post('/register', userCtrl.user_register);

router.post('/login', userCtrl.user_login);

router.post('/logout', userCtrl.user_logout);

router.get('/:id', userCtrl.user_details);

router.get('/?', userCtrl.user_list);

router.put('/:id/update', userCtrl.user_update);

router.delete('/:id/delete', userCtrl.user_delete);


module.exports = router;