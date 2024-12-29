const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const houseOccupantController = require("../controllers/houseOccupants/houseOccupantController");
const router = express.Router();

console.log("IN HO ROUTER");
router.use(verifyJWT);
router.post("/add", houseOccupantController.addHouseOccupant);

module.exports = router;
