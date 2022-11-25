const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {check} = require("express-validator");
const authMiddleware = require ("../middleware/authMiddleware")
const getUserMiddleware = require('../middleware/getUserMiddleware');
const profileController = require("../controllers/profileController")



router.post('/reg', [
    check('username', "Cannot be emplty").notEmpty(),
    check('firstName', "Cannot be emplty").notEmpty(),
    check('lastName', "Cannot be emplty").notEmpty(),
    check('email', "Cannot be emplty").isEmail(),
    check('password', "Must be between 10 and 30 characters").isLength({min:10,max:30}),
    check('dateOfBirth', "Cannot be emplty").isDate(),

], authController.registration) 
router.post('/login',[
    check('email', "Cannot be emplty").isEmail(),
    check('password', "Cannot be emplty").notEmpty(),
    authMiddleware.login,//create token
    getUserMiddleware('firstName','lastName','email'),//get info about user
], profileController.profile);


module.exports = router;