const express = require("express");
const houseController = require("../controllers/house/houseController");
const router = express.Router();

router.get("/profile/:houseId", houseController.getHouseProfile);

module.exports = router;
