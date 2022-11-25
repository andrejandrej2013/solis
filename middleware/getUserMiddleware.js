const userModel = require("../_database/models").user;

module.exports=function(...args){
    return async (req, res, next)=>{
        try {
            const userId = req.userId;
            const user = await userModel.findOne({
                where:{id: userId},
            })
            req.user = user;
            next();
        } catch (error) {
            console.log(error)
            return res.status(403).json({message:"There are some problems. Please try again later"})
        }
    }
        
}