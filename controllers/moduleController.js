const moduleModel = require("../_database/models").module;
const levelCompletenessModel = require("../_database/models").level_completeness;
const levelModel = require("../_database/models").level;
const userModel = require("../_database/models").user;
const lvWordModel = require("../_database/models").lv_word;
const enWordModel = require("../_database/models").en_word;
const wordJoinModel = require("../_database/models").en_lv_join;
const wordLevelJoinModel = require("../_database/models").word_level_join;
const { Result } = require("express-validator");
const {Sequelize, where} = require('sequelize');


const generateTask=async (levelId)=> {
    const taskType = Math.floor(Math.random() * 4+1);
    console.log(taskType);
    let task={};
    let pairWords;
    const numberOfPairs =4;
    let taskCode = "",
    tmp= "";
    const templateAskedWord = (id,word)=>`
    <div class="card l-card asked-word" joinId="${id}">
            ${word}
    </div>
    `;
    const templateflax = (content)=>`
    <div class="d-flex justify-content-around">
        ${content}
    </div>
    `;

    const templatePickWord = (word)=>`
        <div class="card">
            ${word}
        </div>
    `;
    const template = (en,lv)=>`
        <div class="d-flex justify-content-around">
            <div class="card l-card">
                ${en}
            </div>
            <div class="card r-card">
                ${lv}
            </div>
        </div>
    `;
    const templateInput = ()=>`
        <div><input type="text" id="answer" name="answer"></div>
    `;

    switch (taskType) {
        case 1:
            //match 4 words
            task["taskType"]=1;
            task["englishWords"]={}
            task["latvianWords"]=[]
            // task={
            //     task_type:1,
            //     englishWords:{id:word,...},
            //     latvianWords:[word,...],
            // }


            join = await wordJoinModel.findAll({
                order: [
                    [Sequelize.fn('RANDOM')]
                ],
                attributes:["id","lv_id","en_id"],
                raw: true,
                nest: true,
                limit: numberOfPairs,
                include:
                [
                    {
                        attributes:["word"],
                        model:lvWordModel
                    },
                    {
                        attributes:["word"],
                        model:enWordModel
                    },
                    {
                        model:wordLevelJoinModel,
                        where:{level_id:levelId}
                    }
                ]
                }).catch((err) => {
                    console.log("Error: ", err);
            });

            join.forEach(word => {
                task["englishWords"][word.en_id]=word.en_word.word
                task["latvianWords"].push(word.lv_word.word);
            });
            task["englishWords"];
            

            const englishWords=Object.values(task["englishWords"])
            for (let i = 0; i < task["latvianWords"].length; i++) {
                taskCode+=template(englishWords[i],task["latvianWords"][i])
                
            }

            return taskCode;

        case 2:
            //pick correct english word
            task["taskType"]=2;
            task["englishWords"]=[];
            task["lvId"]={};
            // task={
            //     task_type:2,
            //     englishWords:[word,...],
            //     latvianWord:{id:word}
            // }


            join = await wordJoinModel.findAll({
                order: [
                    [Sequelize.fn('RANDOM')]
                ],
                attributes:["id","lv_id","en_id"],
                raw: true,
                nest: true,
                limit: numberOfPairs,
                include:
                [
                    {
                        attributes:["word"],
                        model:lvWordModel
                    },
                    {
                        attributes:["word"],
                        model:enWordModel
                    },
                    {
                        model:wordLevelJoinModel,
                        where:{level_id:levelId}
                    }
                ]
                }).catch((err) => {
                    console.log("Error: ", err);
            });
            console.log(join);
            
            
            
            taskCode+=templateAskedWord(join[0]["id"],join[0]["lv_word"]["word"]);
            
            join.forEach(element => {
                tmp+=templatePickWord(element["en_word"]["word"]);
            });
            taskCode+=templateflax(tmp);
            console.log(taskCode)

            return taskCode;

        case 3:
            //pick correct lv word
            task["taskType"]=3;
            task["correctId"]=[];
            task["lvId"]={};
            // task={
            //     taskType:3,
            //     correctId:Id
            // }

            join = await wordJoinModel.findAll({
                order: [
                    [Sequelize.fn('RANDOM')]
                ],
                attributes:["id","lv_id","en_id"],
                raw: true,
                nest: true,
                limit: numberOfPairs,
                include:
                [
                    {
                        attributes:["word"],
                        model:lvWordModel
                    },
                    {
                        attributes:["word"],
                        model:enWordModel
                    },
                    {
                        model:wordLevelJoinModel,
                        where:{level_id:levelId}
                    }
                ]
                }).catch((err) => {
                    console.log("Error: ", err);
            });
            console.log(join);
            
            taskCode+=templateAskedWord(join[0]["id"],join[0]["en_word"]["word"]);
            join.forEach(element => {
                tmp+=templatePickWord(element["lv_word"]["word"]);
            });
            taskCode+=templateflax(tmp);
            console.log(taskCode);

            return taskCode;


        case 4:
            task["taskType"]=3;
            task["correctId"]=[];

            join = await wordJoinModel.findAll({
                order: [
                    [Sequelize.fn('RANDOM')]
                ],
                attributes:["id","lv_id","en_id"],
                raw: true,
                nest: true,
                limit: 1,
                include:
                [
                    {
                        attributes:["word"],
                        model:lvWordModel
                    },
                    {
                        attributes:["word"],
                        model:enWordModel
                    },
                    {
                        model:wordLevelJoinModel,
                        where:{level_id:levelId}
                    }
                ]
                }).catch((err) => {
                    console.log("Error: ", err);
            });
            console.log(join);

            taskCode+=templateAskedWord(join[0]["id"],join[0]["en_word"]["word"]);
            
            taskCode+=templateInput();
            
            return taskCode;
    }
}

const checkLevel =async(level)=>{
    // [
    //     {
    //         template:id,
    //         correctJoinId:[],
    //         answers:{}
    //     },...
    // ]
    let result=0;
    level.forEach(async task => {
        const join = await wordJoinModel.findAll({
            attributes:["id","lv_id","en_id"],
            raw: true,
            nest: true,
            where: {"id":task["correctJoinId"]}
            }).catch((err) => {
                console.log("Error: ", err);
        });
        console.log(join);
        switch (task["template"]) {
            case 1:
                
                // for (let i = 0; i < task["correctJoinId"].length; i++) {
                //     task
                // }
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            default:
                break;
        }
    });
    return result;
}



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
                



                for (let i = 0; i < modulesCompleteness.length; i++) {
                    let moduleCompleteness=modulesCompleteness[i]["level_completenesses"]["moduleCompleteness"]/levelsCount[modulesCompleteness[i]["module_id"]];
                    
                    modules[modulesCompleteness[i]["module_id"]]["userPercentage"]=Math.floor(moduleCompleteness);
                    
                }
                
            }
            modules = Object.values(modules);
            

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
        return res.render('level',{levels,moduleId:req.params.moduleId});
    }

    async sendTaskPage(req,res){
        try {
            // let task=generateTask(req.params.levelId)

            return res.render('task');
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
    async getTask(req,res){
        const levelId = req.query.levelId;
        let task=await generateTask(levelId);
        res.send(task)
        
    }
    async checkLevel(req,res){
        // [
        //     {
        //         template:id,
        //         correctJoinId:[],
        //         answers:{}
        //     },...
        // ]
        const level = req.query.level;
        console.log(level)
        let result=0;
        // level.forEach(async task => {
        //     const join = await wordJoinModel.findAll({
        //         attributes:["id","lv_id","en_id"],
        //         raw: true,
        //         nest: true,
        //         where: {"id":task["correctJoinId"]}
        //         }).catch((err) => {
        //             console.log("Error: ", err);
        //     });
        //     console.log(join);
        //     switch (task["template"]) {
        //         case 1:
                    
        //             // for (let i = 0; i < task["correctJoinId"].length; i++) {
        //             //     task
        //             // }
        //             break;
        //         case 2:
                    
        //             break;
        //         case 3:
                    
        //             break;
        //         case 4:
                    
        //             break;
        //         default:
        //             break;
        //     }
        // });
        const templateResult = (result)=>`
            <div class="card l-card asked-word">
                ${result}
            </div>
        `;
        return res.send(templateResult(result));

    }
}

module.exports = new moduleController()