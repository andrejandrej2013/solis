const userModel = require("../_database/models").user;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');//add token
// const dotenv = require('dotenv');
const {validationResult} = require("express-validator");
const saltRounds = 10;
const {secret, expiresIn} = require("../config")
// const profileController = require("./profileController")

const generateAccessToken = (id,token) => {
    const payload = {
        id,
        token
    }
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}
const rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};
const tokenGenerator = function() {
    return rand() + rand(); // to make it longer
};

class authController {
    async registration(req, res) {
        try{
            let errors = validationResult(req).errors
            console.log(errors)
            const {firstName, lastName, email, password, dateOfBirth} = req.body;

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
                const newUser = userModel.build({firstName:firstName, lastName:lastName, email:email, password:hash, birthday:dateOfBirth,token:tokenGenerator()});
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

    async login(req, res) {
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
            
            const token = generateAccessToken(user.id,user.token);
            console.log(user.id);

            req.userId=user.id;
            res.cookie('Authorization',`Bearer ${token}`,{
                httpOnly:false,
            });
            res.redirect('/profile')
        } catch (e) {
            console.log("Error: ", e);
            return res.render('login', {message:"Login cannot be done at the moment. Please try it later"});
        }
        
        
    }
}

module.exports = new authController()