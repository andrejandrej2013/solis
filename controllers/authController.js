const userModel = require("../_database/models").user;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');//add token
// const dotenv = require('dotenv');
const {validationResult} = require("express-validator");
const saltRounds = 10;

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
                // return res.render('reg', {errors : [{
                //     value: dateOfBirth,
                //     msg: 'Incorrect date of birth',
                //     param: 'dateOfBirth',
                //     location: 'body'
                // }]});
            }
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

                // return res.render('reg', {errors : [{
                //     value: email,
                //     msg: 'User with this email address already exists',
                //     param: 'email',
                //     location: 'body'
                // }]});
            }

            //sends errors
            console.log(errors)
            console.log(errors.length)

            if(errors.length){
                return res.render('reg', {errors:errors});
            }

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
    async login(req, res) {
        // var password = "Fkdj^45ci@Jad";  // Original Password
        // var password2 = "Fkdj^45ci@Jad";
        // bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
        // bcrypt.compare(password2, hash, function(err, result) {  // Compare
        //     // if passwords match
        //     if (result) {
        //         console.log("It matches!")
        //     }
        //     // if passwords do not match
        //     else {
        //         console.log("Invalid password!");
        //     }
        // });
        // });

        console.log(req.body);
        const user = await userModel.findOne({where:{email: req.body.email}}).catch(
            (err) => {
            console.log("Error: ", err);
            }
        );
        if(user){
            // console.log(`password : ${user.password}`)

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    console.log("It matches!")
                    // token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.firstName },process.env.SECRET);
                    // res.status(200).json({ token : token });
                }
                else {
                  console.log("Invalid password!");
                  res.status(400).json({ error : "Password Incorrect" });
                }
              });
            // const password_valid = await bcrypt.compare(req.body.password,user.password);
            
            // if(password_valid){
            //     token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.firstName },process.env.SECRET);
            //     res.status(200).json({ token : token });
            // } else {
            // res.status(400).json({ error : "Password Incorrect" });
            // }
        
        }else{
            res.status(404).json({ error : "User does not exist" });
        }
    }
    async getUser(req, res) {

    }
}

module.exports = new authController()