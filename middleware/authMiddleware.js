const jwt =require('jsonwebtoken')
const {secret, expiresIn} = require("../config")
const userModel = require("../_database/models").user;
const bcrypt = require("bcrypt");




const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username,
    }
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}

class authMiddleware{
    async login(req, res,next) {
        try {

            const user = await userModel.findOne({where:{email: req.body.email}}).catch(
                (err) => {
                console.log("Error: ", err);
                }
            );
            if(!user){
                res.status(404).json({ error : "User does not exist" });
            }

            //check password
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err){
                    return res.render('login', {message:"Login cannot be done at the moment. Please try it later"});
                }
            });
            
            const token = generateAccessToken(user.id, user.username);
            console.log(user.id);

            req.userId=user.id;
            req.token=token;

            next();
        } catch (e) {
            console.log("Error: ", e);
            return res.render('login', {message:"Login cannot be done at the moment. Please try it later"});
        }
    }
    async decodeToken (req, res, next){
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(403).json({message:"User is not authorized"})
            }
            const decodedData = jwt.verify(token,secret)
            req.user = decodedData
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({message:"User is not authorized 2"})
        }
    }
}
module.exports = new authMiddleware;
