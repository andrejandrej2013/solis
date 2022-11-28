var express = require('express');
var router = express.Router();
// const Sequelize  = require('sequelize');
const authMiddleware = require ("../middleware/authMiddleware")
const profileController = require("../controllers/profileController")
const registerApi = require("./reg");
const getUserMiddleware = require('../middleware/getUserMiddleware');

//use routes
router.use(registerApi);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Solis' });
});
// users reg
router.get('/reg',[
  authMiddleware.notAuthenticated,
], async function(req, res, next) {
  res.render('reg');
});

router.get('/login',[
  authMiddleware.notAuthenticated,
], function(req, res, next) {
  res.render('login');
});
router.get('/profile', [
  authMiddleware.decodeToken,
  getUserMiddleware('username','email','firstName','lastName'),
], profileController.profile)

router.get('/modules', function(req, res, next) {
  res.render('modules');
});
router.get('/dict', function(req, res, next) {
  res.render('dict');
});
router.get('/teacher',[
  authMiddleware.decodeToken,
], function(req, res, next) {
  res.render('teacher');
});
router.get('/chat',[
  authMiddleware.decodeToken,
], function(req, res, next) {
  res.render('chat');
});
router.get('/knowledge', function(req, res, next) {
  res.render('knowledge');
});

module.exports = router;
