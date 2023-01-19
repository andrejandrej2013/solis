const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const authMiddleware = require ("../middleware/authMiddleware")
const modelMiddleware = require ("../middleware/modelMiddleware")


router.get('/modules',[authMiddleware.decodeToken], moduleController.selectModules);
router.get('/module/:moduleId',[authMiddleware.isAuthenticated,modelMiddleware.moduleAccessCheck], moduleController.selectLevel);
router.get('/generate_level/:moduleId/:levelId',[authMiddleware.isAuthenticated,modelMiddleware.moduleAccessCheck], moduleController.sendTaskPage);
router.get("/getTask",[authMiddleware.isAuthenticated],moduleController.getTask);
router.post("/checkLevel",[authMiddleware.isAuthenticated],moduleController.checkLevel);


module.exports = router;