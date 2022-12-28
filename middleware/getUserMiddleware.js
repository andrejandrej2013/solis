const userModel = require("../_database/models").user;
const {secret} = require("../config")
const jwt =require('jsonwebtoken')

module.exports=function(...args){
    return (req, res, next)=>{
        try {
            const token = req.cookies.Authorization.split(' ')[1];
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) {
                    res.redirect('/login')
                }
                else if(decoded){
                    const userId = decoded.id;
                    const user = await userModel.findOne({
                        where:{id: userId}
                    })
                    req.user = user;
                    next();
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(403).json({message:"There are some problems. Please try again later"})
        }
    }
        
}