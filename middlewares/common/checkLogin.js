const jwt = require('jsonwebtoken');

const checkLogin = async function (req, res, next){
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if(cookies){
        try{
            const token = cookies[process.env.COOKIE_NAME];
            const decode = jwt.decode(token, process.env.JWT_SECTRET)
            req.user = decode;
            if(res.locals.html){
                res.locals.loggedInUser = decode;
            }
            next();
        }catch(err){
            if(res.locals.html){
                res.redirect("/")
            }else{
                res.status(500).json({
                    errors: {
                        common: {
                            msg : "Please Login..."
                        }
                    }
                })
            }
        }
    }else{
        if(res.locals.html){
            res.redirect("/")
        }else{
            res.status(400).json({
                errors: {
                    common: {
                        msg : "Authorization failure..."
                    }
                }
            })
        }
    }

}

const redirectLoggedIn = function (req, res, next ){
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
   if(!cookies){
    next()
   }else{
    res.redirect("/inbox");
   }
}

module.exports = {
    checkLogin,
    redirectLoggedIn
}