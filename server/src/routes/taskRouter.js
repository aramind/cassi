const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyHouse = require("../middlewares/verifyHouse");
const taskController = require("../controllers/tasks/taskController");
const router = express.Router();

router.use(verifyJWT);
router.use(verifyHouse);
// routes
router.post("", taskController.add);

module.exports = router;
