// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getUsers} = require('../controllers/usersConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')

router.get('/',decorateHtmlResponse('users') ,getUsers);

module.exports = router;