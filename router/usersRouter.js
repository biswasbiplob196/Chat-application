// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getUsers, addUser, removeUser} = require('../controllers/usersConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const avatarUpload = require('../middlewares/users-middlewares/avater-upload')
const {addUserValidator, addUserValidationHandler} = require('../middlewares/users-middlewares/users-validator')
const {checkLogin} = require('../middlewares/common/checkLogin');

router.get('/',decorateHtmlResponse('users'), checkLogin, getUsers);
router.post('/',avatarUpload, addUserValidator, checkLogin, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);
module.exports = router;