const moduleModel = require("../_database/models").module;
const levelCompletenessModel = require("../_database/models").level_completeness;
const levelModel = require("../_database/models").level;
const roleModel = require("../_database/models").role;
const userModel = require("../_database/models").user;
const {Sequelize} = require('sequelize');




class moduleController {
    async selectModules(req, res) {
        try {
            let modules=await moduleModel.findAll({
                raw: true,
                nest: true
            }).catch((err) => {
                console.log("Error: ", err);
            });
            if(modules){
                modules.sort((module1, module2) => module1.next_module_id - module2.next_module_id);
                modules.push(modules.shift())
                modules.forEach(module => {
                    module.userPercentage=0
                });
                let obj={}
                modules.forEach(module => {
                    obj[module["id"]] = module;
                });
                modules=obj
            }
            let userId=req.userId
            let modulesCompleteness
            if(typeof userId!=="undefined"){
                modulesCompleteness = await levelModel.findAll({
                    attributes:["module_id"],
                    include:{
                        model:levelCompletenessModel,
                        where: {user_id: userId},
                        attributes: [[Sequelize.fn('AVG',Sequelize.col('completeness')), 'moduleCompleteness']]

                    },
                    raw: true,
                    nest: true,
                    group: ['module_id'],
                    }).catch((err) => {
                        console.log("Error: ", err);
                });

                for (let i = 0; i < modulesCompleteness.length; i++) {
                    let moduleCompleteness=modulesCompleteness[i]["level_completenesses"]["moduleCompleteness"]
                    
                    modules[modulesCompleteness[i]["module_id"]]["userPercentage"]=Math.floor(moduleCompleteness);
                    
                }
                console.log(modules)
            }


            return res.render('modules',{modules});
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}

module.exports = new moduleController()