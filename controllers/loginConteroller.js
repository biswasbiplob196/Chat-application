const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const creatError = require('http-errors');

const {errorHandler} = require('../middlewares/common/errorHandlers')
const User = require('../models/people');

async function getLogin (req,res, next) {
    await res.render("index");
    console.log(res.locals);
}

// login post data handler 
async function login(req, res, next){
        // pocess login 
    try{
        const user = await User.findOne({
            $or: [{email: req.body.username},{mobile: req.body.username}]
        });
        if(user && user._id){
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            console.log('is valid pass', isValidPassword)
            if(isValidPassword){
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user",
                }
                console.log(userObject)
                // jwt set
                const token =  jwt.sign(userObject,process.env.JWT_SECTRET,{
                    expiresIn: process.env.JWT_EXPIREY
                });
                console.log('token', token)
                
                // set cookie
                await res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIREY,
                    httpOnly: true,
                    signed: true
                });
                // set loggedIn info to locals
                res.locals.loggedInUser = userObject;
                console.log(res.locals.loggedInUser)
                res.render("inbox");
            }else{
                throw creatError('LoggedIn failed!')
            }
        }else{
            throw creatError('LoggedIn failed!')
        }
    }catch(e){
        await res.render("index", {
            data: {
                username: req.body.username
            },
            errors: {
                common: {
                    msg: e.msg
                }
            }
        })
    }
}

function logout(req, res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('logout')
}

module.exports = {
    getLogin,
    login,
    logout
}