const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const houseOccupantController = require("../controllers/houseOccupants/houseOccupantController");
const router = express.Router();

//url: root/v1/house-occupant

router.use(verifyJWT);
router.post("/add", houseOccupantController.addHouseOccupant);
router.patch(
  "/update/:houseOccupantId",
  houseOccupantController.updateHouseOccupant
);
router.get("/:_id", houseOccupantController.getHouseOccupant);

module.exports = router;
