var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// import user_controller from "../controllers/user_controller";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'Express' });
});
router.post('/reg', function(req, res) {
  console.log(req.body);
  return res.redirect('/');
});

module.exports = router;
