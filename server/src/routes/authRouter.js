const express = require("express");
const authController = require("../controllers/auth/authContoller");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);

module.exports = router;
