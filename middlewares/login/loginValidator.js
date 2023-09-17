const { render } = require('ejs');
const { check, validationResult} = require('express-validator');

const doLoginValidator = [
    check("username").isLength({min:1}).withMessage("Mobile or Email is required!"),

    check("password").isLength({min: 1}).withMessage("Password is required")
];

// validation Handler
const doLoginValidationHandler = function(req, res, next) {
    const error = validationResult(req);
    const mappedError = error.mapped();
    if(Object.keys(mappedError).length ===0){
        next();
    }else{
        render("index",{
            data: {
                username: req.body.username
            },
            errors: mappedError
        })
    }
}

module.exports = {
    doLoginValidator,
    doLoginValidationHandler
}