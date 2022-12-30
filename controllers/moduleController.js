const moduleModel = require("../_database/models").module;
const levelCompletenessModel = require("../_database/models").level_completeness;
const levelModel = require("../_database/models").level;
const userModel = require("../_database/models").user;
const {Sequelize} = require('sequelize');




class moduleController {
    async selectModules(req, res) {
        try {
            let modules=await moduleModel.findAll({
                attributes:["id","prev_module_id","next_module_id","title"],
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
            let userRoleId=0
            if(typeof userId!=="undefined"){
                let userRole = await userModel.findOne({
                    where:{id: userId},
                    attributes:["user_role_id"],
                    raw: true,
                    nest: true
                }).catch((err) => {
                    console.log("Error: ", err);
                });

                userRoleId=userRole.user_role_id
                
                modulesCompleteness = await levelModel.findAll({
                    attributes:["module_id"],
                    include:{
                        model:levelCompletenessModel,
                        where: {user_id: userId},
                        attributes: [[Sequelize.fn('sum',Sequelize.col('completeness')), 'moduleCompleteness']]

                    },
                    raw: true,
                    nest: true,
                    group: ['module_id'],
                    }).catch((err) => {
                        console.log("Error: ", err);
                });
                console.log(modulesCompleteness)
                let levelsCount = await levelModel.findAll({
                    attributes:["module_id",[Sequelize.fn('COUNT',Sequelize.col('id')), 'levelCount']],
                    raw: true,
                    nest: true,
                    group: ['module_id'],
                    }).catch((err) => {
                        console.log("Error: ", err);
                });
                
                let obj={}
                levelsCount.forEach(levelCount => {
                    obj[levelCount["module_id"]] = levelCount["levelCount"];
                });
                levelsCount=obj
                
                console.log(levelsCount)
                console.log(modules)



                for (let i = 0; i < modulesCompleteness.length; i++) {
                    let moduleCompleteness=modulesCompleteness[i]["level_completenesses"]["moduleCompleteness"]/levelsCount[modulesCompleteness[i]["module_id"]];
                    
                    modules[modulesCompleteness[i]["module_id"]]["userPercentage"]=Math.floor(moduleCompleteness);
                    
                }
                
            }
            modules = Object.values(modules);
            
            console.log(modules)

            return res.render('modules',{modules,userRoleId});
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    async selectLevel(req,res){
        const levels= await levelModel.findAll({
            attributes:["id"],
            where:{module_id:req.params.moduleId},
            include:{
                model:levelCompletenessModel,
                where: {user_id: req.userId},
                attributes: ['completeness'],
                
                required:false,
            },
            raw: true,
            nest: true,
        }).catch((err) => {
            console.log("Error: ", err);
        });
        console.log(levels);
        return res.render('level',{levels,moduleId:req.params.moduleId});
    }

    async generateLevel(req,res){
        return res.sendStatus(200)
    }
}

module.exports = new moduleController()