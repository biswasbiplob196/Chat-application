// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getInbox} = require('../controllers/inboxConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const {checkLogin} = require('../middlewares/common/checkLogin');

router.get('/', decorateHtmlResponse('users'), checkLogin,getInbox);

module.exports = router;