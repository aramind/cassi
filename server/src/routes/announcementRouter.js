const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyHouse = require("../middlewares/verifyHouse");
const announcementController = require("../controllers/announcements/announcementController");
const router = express.Router();

router.use(verifyJWT);
router.use(verifyHouse);
console.log("IN ANNOUNCEMENT CONTROLLER");
router.post("", announcementController.add);
router.get("/:id", announcementController.getById);
router.get("", announcementController.getAnnouncements);
router.patch("/:id", announcementController.update);

module.exports = router;
