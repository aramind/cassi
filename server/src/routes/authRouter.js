const express = require("express");
const authController = require("../controllers/auth/authContoller");

const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
