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
router.get('/reg', async function(req, res, next) {
  res.render('reg');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/profile', [
  authMiddleware.decodeToken,
  getUserMiddleware('id','username','email','firstName')
], profileController.profile)

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
