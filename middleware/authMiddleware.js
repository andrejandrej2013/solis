const jwt =require('jsonwebtoken')
const {secret} = require("../config")

class authMiddleware{
    async decodeToken (req, res, next){
        try {

            const tokenCookie = req.cookies.Authorization;
            if(typeof tokenCookie !== 'undefined'){
                const token = tokenCookie.split(' ')[1];
                try {
                    const decodedData = jwt.verify(token,secret);
                    req.user = decodedData;
                    console.log(req.user);
                } catch (err) {
                    console.log("Error: ", err);
                        let errors = [];
                        req.errors = errors.push({
                            value: 'undefine',
                            msg: 'invalid token',
                            param: '-',
                            location: 'body'
                        }) ;
                        res.redirect('/login')
                }
                
                next();
            }else{
                let errors = [];
                req.errors = errors.push({
                    value: 'undefine',
                    msg: 'You must be logged in',
                    param: '-',
                    location: 'body'
                }) ;
                res.redirect('/login')

            }

        } catch (error) {
            console.log(error)
            return res.status(403).json({message:"User is not authorized 2"})
        }
    }
    async notAuthenticated (req, res, next){
        const tokenCookie = req.cookies.Authorization;
            if(typeof tokenCookie === 'undefined'){
                next();
            }else{
                let errors = [];
                req.errors = errors.push({
                    value: 'undefine',
                    msg: 'You must be logged in',
                    param: '-',
                    location: 'body'
                }) ;
                res.redirect('/profile')

            }
    }
}
module.exports = new authMiddleware;
