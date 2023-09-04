// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getInbox} = require('../controllers/inboxConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')


router.get('/', decorateHtmlResponse('users') ,getInbox);

module.exports = router;