const userModel = require("../_database/models").user;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');//add token
// const dotenv = require('dotenv');
const {validationResult} = require("express-validator");
const saltRounds = 10;
// const {secret, expiresIn} = require("../config")
// const profileController = require("./profileController")

// const generateAccessToken = (id, username) => {
//     const payload = {
//         id,
//         username,
//     }
//     return jwt.sign(payload, secret, {expiresIn: expiresIn})
// }

class authController {
    async registration(req, res) {
        try{
            let errors = validationResult(req).errors
            console.log(errors)
            const {username, firstName, lastName, email, password, dateOfBirth} = req.body;

            //validate birthday 
            const currentYear = new Date().getFullYear();
            const minAge = 4;
            const maxAge = 150;
            console.log(dateOfBirth.substring(0, 4))
            console.log(currentYear)
            console.log(!(dateOfBirth.substring(0, 4)<currentYear-minAge && dateOfBirth.substring(0, 4)>currentYear-maxAge))

            if(!(dateOfBirth.substring(0, 4)<currentYear-minAge && dateOfBirth.substring(0, 4)>currentYear-maxAge)){
                errors.push({
                    value: dateOfBirth,
                    msg: 'Incorrect date of birth',
                    param: 'dateOfBirth',
                    location: 'body'
                }) ;
            }

            //check for unique email
            const alreadyExistsUser = await userModel.findOne({where:{email: email}}).catch(
                (err) => {
                    console.log("Error: ", err);
                }
                );
            if(alreadyExistsUser){
                errors.push({
                    value: email,
                    msg: 'User with this email address already exists',
                    param: 'email',
                    location: 'body'
                });
            }

            // sends errors if there are
            if(errors.length){
                return res.render('reg', {errors:errors});
            }

            // hash password and saves user
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                // Store hash in database here
                const newUser = userModel.build({username:username, firstName:firstName, lastName:lastName, email:email, password:hash, dateOfBirth:dateOfBirth});
                const savedUser = await newUser.save().catch(
                    (err) => {
                        console.log("Error: ", err);
                        return res.render('reg', {message:"Registration cannot be done at the moment. Please try it later"});
                    }
                    );
                    if(savedUser){
                        return res.redirect('/');
                    }
                });
        }catch(e){
            console.log("Error: ", e);
            return res.render('reg', {message:"Registration cannot be done at the moment. Please try it later"});
        }
    }

    // async login(req, res,next) {
    //     try {

    //         const user = await userModel.findOne({where:{email: req.body.email}}).catch(
    //             (err) => {
    //             console.log("Error: ", err);
    //             }
    //         );
    //         if(!user){
    //             res.status(404).json({ error : "User does not exist" });
    //         }

    //         //check password
    //         bcrypt.compare(req.body.password, user.password, function(err, result) {
    //             if(err){
    //                 return res.render('login', {message:"Login cannot be done at the moment. Please try it later"});
    //             }
    //         });
            
    //         const token = generateAccessToken(user.id, user.username);
            
    //         req.token=token
    //         req.user = {id:user.id, username:user.username}
    //         console.log(`Token = ${req.token}`)
    //         // return profileController.profile(req, res)
            
    //         next();

    //     } catch (e) {
    //         console.log("Error: ", e);
    //         return res.render('login', {message:"Login cannot be done at the moment. Please try it later"});
    //     }
        
        
    // }
}

module.exports = new authController()