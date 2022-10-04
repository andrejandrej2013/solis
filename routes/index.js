var express = require('express');
var router = express.Router();

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! every time I add this add this the web app stops !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const User = require('../_database/models/user.js');
// import user_controller from "../controllers/user_controller";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Solis' });
});
// users login/reg
router.get('/reg', function(req, res, next) {
  res.render('reg');
});
router.post('/reg', async (req, res) => {
  console.log(req.body);
  const {username, firstName, lastName, email, password, date_of_birth} = req.body;
  const alreadyExistsUser = await User.findOne({where:{email}}).catch(
    (err) => {
      console.log('!!!!!!!!!  1 !!!!!!!');
      console.log("Error: ", err);
    }
  );
  console.log('!!!!!!!!!  2 !!!!!!!');
  if(alreadyExistsUser){
    console.log('!!!!!!!!!  3 !!!!!!!');
    return res.json({message:"User with such email already exist!"});
  }
  console.log('!!!!!!!!!  4 !!!!!!!');
  const newUser = User.build({username, firstName, lastName, email, password, date_of_birth});
  console.log('!!!!!!!!!  5 !!!!!!!');
  const savedUser = await newUser.save().catch(
    (err) => {
      console.log('!!!!!!!!!  6 !!!!!!!');
      console.log("Error: ", err);
      return res.json({message:"Registration cannot be done at the moment. Please try it later"});
    }
  );
  if(savedUser){
    return res.redirect('/');
  }
  // console.log(req.body);
  // return res.redirect('/');



});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res) {
  console.log(req.body);
  return res.redirect('/');
});
router.get('/profile', function(req, res, next) {
  res.render('profile');
});
//navigation
router.get('/modules', function(req, res, next) {
  res.render('modules');
});
router.get('/dict', function(req, res, next) {
  res.render('dict');
});
router.get('/teacher', function(req, res, next) {
  res.render('teacher');
});
router.get('/chat', function(req, res, next) {
  res.render('chat');
});
router.get('/knowledge', function(req, res, next) {
  res.render('knowledge');
});

module.exports = router;
