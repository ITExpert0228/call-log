"use strict";

var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var voteCtrl = require('../controllers/vote');
  
router.post('/create', voteCtrl.vote_create);

router.get('/:id', voteCtrl.vote_details);

router.get('/?', voteCtrl.vote_list);

router.put('/:id/update', voteCtrl.vote_update);

router.delete('/:id/delete', voteCtrl.vote_delete);

module.exports = router;