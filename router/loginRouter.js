// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getLogin} = require('../controllers/loginConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')


router.get('/', decorateHtmlResponse('users'), getLogin);

module.exports = router;