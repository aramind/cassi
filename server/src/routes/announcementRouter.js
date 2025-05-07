const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyHouse = require("../middlewares/verifyHouse");
const announcementController = require("../controllers/announcements/announcementController");
const router = express.Router();

router.use(verifyJWT);
router.use(verifyHouse);

router.post("", announcementController.add);
router.get("/:id", announcementController.getById);
router.get("", announcementController.getAnnouncements);
router.patch("/:id/soft-delete", announcementController.softDelete);
router.patch("/:id/restore", announcementController.restoreDeleted);
router.patch("/:id", announcementController.update);
router.delete("/:id", announcementController.hardDelete);

module.exports = router;
