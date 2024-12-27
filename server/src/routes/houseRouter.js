const express = require("express");
const houseController = require("../controllers/house/houseController");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/profile/:houseId", houseController.getHouseProfile);

module.exports = router;
