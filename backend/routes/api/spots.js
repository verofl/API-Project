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
  for (let spot of spots) {
    spotsArray.push({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      spotImage: spot.spotImage,
      /*
      avgRating: ,            Need to get the average rating of the spot
      spotImage: ,            Need to grab the url of the place
      */
    });
  }

  return res.json({ Spots: spotsArray });
});

// Get All Spots Owned By the Current User
// router.get("./current", async);

module.exports = router;
