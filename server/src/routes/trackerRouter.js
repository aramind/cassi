const express = require("express");
const router = express.Router();
const trackerController = require("../controllers/tracker/trackerController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyHouse = require("../middlewares/verifyHouse");

router.use(verifyJWT);
router.use(verifyHouse);
// console.log("IN TRACKER ROUTER");
router.post("/add", trackerController.addTracker);
router.get("", trackerController.getTrackers);

module.exports = router;
