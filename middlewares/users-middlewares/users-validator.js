const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const {unlink} = require('fs');


// model import 
const User = require('../../models/people');

// add user
const addUserValidator = [
    body("name")
        .isLength({min : 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: " -" })
        .withMessage("Name must contain alphabet without any special charactar.")
        .trim(),
    body("email").isEmail().withMessage("Inalid Email Address").trim().custom(async (value)=>{
        try{
            const user = await User.findOne({email: value});
            if(user){
                throw createError("Email already existed!")
            }
        }catch(err){
            throw createError(err.message)
        }
    }),
    body("mobile").isMobilePhone("bn-BD", {
        strictMode: true
    }).withMessage("mobile Number must be valid bangladeshi mobile number!")
    .custom( async (value)=>{
        try{
            const user = await User.findOne({mobile: value});
            if(user){
                throw createError("Mobile already existed!")
            }
        }catch(err){
            throw createError(err.message)
        }
    }),
    body("password").isStrongPassword().withMessage("Password must be 8 character with special charcters!")
];

const addUserValidationHandler =  (req, res, next)=>{
    console.log(req.body)
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if(Object.keys(mappedError).length ===0){
        next();
    }else{
        // remove the uploaded file 
        if(req.files.length > 0){
            const {filename} =req.files[0];
            unlink(
                path.join(__dirname, `../public/uploads/avatars/${filename}`),(err)=>{
                    if(err){
                        console.log(err);
                    }
                }
            )
        }

        // res send
        res.status(500).json({
            errors : mappedError
        })
    }
}

module.exports = {
    addUserValidator,
    addUserValidationHandler
}
