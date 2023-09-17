// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getLogin, login, logout} = require('../controllers/loginConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {doLoginValidator, doLoginValidationHandler} = require('../middlewares/login/loginValidator')
const {redirectLoggedIn} = require('../middlewares/common/checkLogin')

const page_title = "Login";

router.get('/', decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

router.post('/', decorateHtmlResponse(page_title), doLoginValidator, doLoginValidationHandler, login);

router.delete('/', logout)

module.exports = router;