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
router.get("/", async (req, res) => {
  const spotsArray = [];
  const allSpots = await Spot.findAll({
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

  for (let eachSpot of allSpots) {
    // Function to get the average rating of each spot
    let totalStars = 0;
    let totalReviews = 0;

    for (let eachReview of eachSpot.Reviews) {
      totalStars += eachReview.stars; // total amount of stars for all reviews
      totalReviews++; // total amount of reviews for each spot
    }

    let avgRating = totalStars / totalReviews;
    if (avgRating !== "null") avgRating = "No Reviews Yet";

    spotsArray.push({
      id: eachSpot.id,
      ownerId: eachSpot.ownerId,
      address: eachSpot.address,
      city: eachSpot.city,
      state: eachSpot.state,
      country: eachSpot.country,
      lat: eachSpot.lat,
      lng: eachSpot.lng,
      name: eachSpot.name,
      description: eachSpot.description,
      price: eachSpot.price,
      createdAt: eachSpot.createdAt,
      updatedAt: eachSpot.updatedAt,
      avgRating: avgRating,
      previewImage: eachSpot.SpotImages[0].url, // Take the first spot image URL
    });
  }

  return res.status(200).json({ Spots: spotsArray });
});

module.exports = router;
