const express = require("express");
const {
  User,
  Spot,
  SpotImage,
  Booking,
  Review,
  ReviewImage,
} = require("../../db/models");

const router = express.Router();

// Get All Spots
router.get("/", async (req, res, next) => {
  const spotsArray = [];
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
  });
  for (let eachSpot of spots) {
    spotsArray.push(eachSpot);
  }

  return res.json(spotsArray);
});

module.exports = router;
