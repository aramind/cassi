const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const houseOccupantController = require("../controllers/houseOccupants/houseOccupantController");
const router = express.Router();

router.use(verifyJWT);
router.post("/house-occupant/add", houseOccupantController.addHouseOccupant);

module.exports = router;
