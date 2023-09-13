// external modules 
const express = require('express');
const router = express.Router();

// internal modules 
const {getUsers, addUser, removeUser} = require('../controllers/usersConteroller'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const avatarUpload = require('../middlewares/users-middlewares/avater-upload')
const {addUserValidator, addUserValidationHandler} = require('../middlewares/users-middlewares/users-validator')

router.get('/',decorateHtmlResponse('users') ,getUsers);
router.post('/',avatarUpload, addUserValidator, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);
module.exports = router;