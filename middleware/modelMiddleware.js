const userModel = require("../_database/models").user;
const moduleModel = require("../_database/models").module;
const levelModel = require("../_database/models").level;
const levelCompletenessModel = require("../_database/models").level_completeness;
const {Sequelize} = require('sequelize');



class authMiddleware{
    async moduleAccessCheck (req, res, next){
        try {

            const userRole = await userModel.findOne({
                attributes:["user_role_id"],
                where:{id:req.userId},
                raw: true,
                nest: true
            })
            console.log(userRole);
            if(userRole["user_role_id"]>=2){
                return next();
            }
            const prev_module= await moduleModel.findOne({
                attributes:["prev_module_id"],
                where:{id:req.params.moduleId},
                raw: true,
                nest: true,
            })
            console.log(prev_module);
            
            if(prev_module.prev_module_id==null){
                console.log("pass");
                return next();
            }
            const prev_module_id=prev_module["prev_module_id"]
            console.log("not pass")

            const levelCount = await levelModel.findAll({
                where:{module_id:prev_module_id},
                attributes:["module_id",[Sequelize.fn('COUNT',Sequelize.col('id')), 'levelCount']],
                raw: true,
                nest: true,
                group: ['module_id'],
                }).catch((err) => {
                    console.log("Error: ", err);
            });
            console.log(levelCount)

            const modelPercentageSum = await levelModel.findAll({
                where:{module_id:prev_module_id},
                attributes:["module_id"],
                include:{
                    model:levelCompletenessModel,
                    where: {user_id: req.userId},
                    attributes: [[Sequelize.fn('SUM',Sequelize.col('completeness')), 'moduleCompleteness']]

                },
                raw: true,
                nest: true,
                group: ['module_id'],
                }).catch((err) => {
                    console.log("Error: ", err);
            });
            console.log("modelPercentageSum");
            console.log(modelPercentageSum);
            
            if (modelPercentageSum && levelCount) {
                const avarageModuleComplitnes=modelPercentageSum[0]["level_completenesses"]["moduleCompleteness"]/levelCount[0]["levelCount"]
                console.log(avarageModuleComplitnes);
                
                if(avarageModuleComplitnes<=70){

                    res.redirect('/modules')
                }
                return next()
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(500);
        }
    }
}
module.exports = new authMiddleware;