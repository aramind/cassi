const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyHouse = require("../middlewares/verifyHouse");
const announcementController = require("../controllers/announcements/announcementController");
const { model } = require("mongoose");
const router = express.Router();

router.use(verifyJWT);
router.use(verifyHouse);
console.log("IN ANNOUNCEMENT CONTROLLER");
router.post("/add", announcementController.add);

model.exports = router;
