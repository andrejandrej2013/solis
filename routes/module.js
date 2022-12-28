const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const authMiddleware = require ("../middleware/authMiddleware")


router.get('/modules',[authMiddleware.decodeToken], moduleController.selectModules);
router.get('/module/:id',[authMiddleware.isAuthenticated], (req,res)=>{
    res.send("Module number "+req.params.id)
});

module.exports = router;