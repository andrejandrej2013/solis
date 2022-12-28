const jwt =require('jsonwebtoken')
const {secret, accessExpiresIn} = require("../config")
const { v4: uuidv4 } = require('uuid');
const generateAccessToken = (id,expiresIn,uuid=uuidv4()) => {
    const payload = {
        id,
        uuid
    }
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}
class authMiddleware{
    async isAuthenticated (req, res, next){
        try {

            const tokenCookie = req.cookies.Authorization;
            const refreshTokenCookie = req.cookies.refreshToken;
            if(typeof tokenCookie !== 'undefined' && typeof refreshTokenCookie !== 'undefined'){
                const token = tokenCookie.split(' ')[1];
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        const refreshToken = refreshTokenCookie.split(' ')[1];
                        jwt.verify(refreshToken, secret, (err, decoded)=>{
                            if(err){
                                console.log("Error: ", err);
                                let errors = [];
                                req.errors = errors.push({
                                    value: err.name,
                                    msg: err.message,
                                }) ;
                                res.redirect('/login')
                            }
                            else if(decoded){
                                req.userId=decoded.id
                                const accessToken = generateAccessToken(decoded.id,accessExpiresIn);
                                res.cookie('Authorization',`Bearer ${accessToken}`,{
                                    httpOnly:false,
                                });
                                next();
                                
                            }
                        })
                    }
                    else if(decoded){
                        req.userId=decoded.id
                        next();
                    }
                });
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
            return res.status(403).json({message:"User is not authorized"})
        }
    }
    async decodeToken (req, res, next){
        try {

            const tokenCookie = req.cookies.Authorization;
            const refreshTokenCookie = req.cookies.refreshToken;
            if(typeof tokenCookie !== 'undefined' && typeof refreshTokenCookie !== 'undefined'){
                const token = tokenCookie.split(' ')[1];
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        const refreshToken = refreshTokenCookie.split(' ')[1];
                        jwt.verify(refreshToken, secret, (err, decoded)=>{
                            if(decoded){
                                req.userId=decoded.id
                                const accessToken = generateAccessToken(decoded.id,accessExpiresIn);
                                res.cookie('Authorization',`Bearer ${accessToken}`,{
                                    httpOnly:false,
                                });
                            }
                        })
                    }
                    else if(decoded){
                        req.userId=decoded.id
                    }
                });
            }
            next();

        } catch (error) {
            console.log(error)
            return res.status(403).json({message:"User is not authorized"})
        }
    }
}
module.exports = new authMiddleware;
