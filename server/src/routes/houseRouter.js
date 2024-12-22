const express = require("express");
const houseController = require("../controllers/house/houseController");
const router = express.Router();

router.get("/profile/:houseId", houseController.getHouseProfileByFields);

module.exports = router;
