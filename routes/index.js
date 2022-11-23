var express = require('express');
var router = express.Router();
const Sequelize  = require('sequelize');
const sequelize = new Sequelize("postgres://user:pass@postgres:5432/codes");



//routes
const registerApi = require("./reg");

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
