const express = require("express");
const {
  User,
  Spot,
  SpotImage,
  Booking,
  Review,
  ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// Get All Reviews of the Current User --DONE
router.get("/current", requireAuth, async (req, res) => {
  let allUserReviews = [];
  const user = req.user.id;

  const allReviews = await Review.findAll({
    where: {
      userId: user,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            attributes: ["url"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!allReviews.length) allUserReviews = "No Reviews Yet";

  for (let eachReview of allReviews) {
    if (eachReview.ReviewImages.length == 0)
      eachReview.ReviewImages = "No Reviews Images";

    allUserReviews.push({
      id: eachReview.id,
      userId: eachReview.userId,
      spotId: eachReview.spotId,
      review: eachReview.review,
      stars: eachReview.stars,
      createdAt: eachReview.createdAt,
      updatedAt: eachReview.updatedAt,
      User: {
        id: eachReview.User.id,
        firstName: eachReview.User.firstName,
        lastName: eachReview.User.lastName,
      },
      Spot: {
        id: eachReview.Spot.id,
        ownerId: eachReview.Spot.ownerId,
        address: eachReview.Spot.address,
        city: eachReview.Spot.city,
        state: eachReview.Spot.state,
        country: eachReview.Spot.country,
        lat: eachReview.Spot.lat,
        lng: eachReview.Spot.lng,
        name: eachReview.Spot.name,
        price: eachReview.Spot.price,
        previewImage: eachReview.Spot.SpotImages[0].url,
      },
      ReviewImages: eachReview.ReviewImages,
    });
  }

  return res.status(200).json({ Reviews: allUserReviews });
});

// Delete a Review -- DONE
router.delete("/:reviewId", requireAuth, async (req, res) => {
  let { reviewId } = req.params;
  let user = req.user.id;

  const userReview = await Review.findByPk(reviewId);

  if (!userReview)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (user !== userReview.userId)
    return res.status(403).json({ message: "Forbidden" });

  await userReview.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
