const express = require("express");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Validate Reviews
const validateReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

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
    let previewImage;
    if (!eachReview.ReviewImages.length) {
      previewImage = "No Reviews Images";
    } else {
      previewImage = eachReview.Spot.SpotImages[0].url;
    }

    allUserReviews.push({
      id: eachReview.id,
      userId: eachReview.userId,
      spotId: eachReview.spotId,
      review: eachReview.review,
      stars: parseFloat(eachReview.stars),
      createdAt: new Date(eachReview.createdAt).toLocaleDateString(),
      updatedAt: new Date(eachReview.updatedAt).toLocaleDateString(),
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
        lat: parseFloat(eachReview.Spot.lat),
        lng: parseFloat(eachReview.Spot.lng),
        name: eachReview.Spot.name,
        price: parseFloat(eachReview.Spot.price),
        previewImage: previewImage,
      },
      ReviewImages: eachReview.ReviewImages,
    });
  }

  return res.status(200).json({ Reviews: allUserReviews });
});

// Add an Image to a Review Based on the Review's Id -- DONE
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  let user = req.user.id;
  let { reviewId } = req.params;
  let { url } = req.body;

  const userReview = await Review.findByPk(reviewId);

  if (!userReview)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (user !== userReview.userId)
    return res.status(403).json({ message: "Forbidden" });
  const existingImages = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });
  if (existingImages.length >= 10)
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });

  const newReviewImage = await ReviewImage.create({ reviewId, url });

  return res.status(200).json({
    id: newReviewImage.id,
    url: newReviewImage.url,
  });
});

//Edit a Review --DONE
router.put("/:reviewId", requireAuth, validateReviews, async (req, res) => {
  const { review, stars } = req.body;
  let { reviewId } = req.params;
  let user = req.user.id;
  const updatedReview = await Review.findByPk(reviewId);

  if (!updatedReview)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (user !== updatedReview.userId)
    return res.status(403).json({ message: "Forbidden" });

  if (review) updatedReview.review = review;
  if (stars) updatedReview.stars = parseFloat(stars);
  updatedReview.updatedAt = new Date().toLocaleDateString();

  await updatedReview.save();

  return res.status(200).json(updatedReview);
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
