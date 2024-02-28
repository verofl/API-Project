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
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { isFloat } = require("validator");

const router = express.Router();

// Get All Spots -- DONE
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

  // Get the average rating of each spot
  for (let eachSpot of allSpots) {
    let totalStars = 0;
    let totalReviews = 0;

    for (let eachReview of eachSpot.Reviews) {
      totalStars += eachReview.stars; // total amount of stars for all reviews
      totalReviews++; // total amount of reviews for each spot
    }

    if (!avgRating) avgRating = "No Reviews Yet";
    let avgRating = totalStars / totalReviews;

    let previewImage;
    if (!eachSpot.SpotImages.length) {
      previewImage = "No Preview Image";
    } else {
      previewImage = eachSpot.SpotImages[0].url;
    }

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
      previewImage: previewImage, // Take the first spot image URL
    });
  }

  return res.status(200).json({ Spots: spotsArray });
});

// Get All Spots Owned By the Current User -- DONE
router.get("/current", requireAuth, async (req, res) => {
  let allOwnerSpots = [];

  const user = req.user.id;

  const allSpots = await Spot.findAll({
    where: {
      ownerId: user,
    },
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

  // Get the average rating of each spot
  for (let eachSpot of allSpots) {
    let totalStars = 0;
    let totalReviews = 0;

    for (let eachReview of eachSpot.Reviews) {
      totalStars += eachReview.stars; // total amount of stars for all reviews
      totalReviews++; // total amount of reviews for each spot
    }

    let avgRating = totalStars / totalReviews;
    if (!avgRating) avgRating = "No Reviews Yet";

    let previewImage;
    if (!eachSpot.SpotImages.length) {
      previewImage = "No Preview Image";
    } else {
      previewImage = eachSpot.SpotImages[0].url;
    }

    allOwnerSpots.push({
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
      previewImage: previewImage, // Take the first spot image URL
    });
  }
  return res.status(200).json({ Spots: allOwnerSpots });
});

// Get Details of a Spot from an Id -- DONE
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
      include: [
        {
          model: Review,
          attributes: ["stars"],
        },
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    // Get the average rating of each spot
    let totalStars = 0;
    let totalReviews = 0;

    for (let eachReview of spot.Reviews) {
      totalStars += eachReview.stars; // total amount of stars for all reviews
      totalReviews++; // total amount of reviews for each spot
    }

    let avgRating = totalStars / totalReviews;
    if (!avgRating) avgRating = "No Reviews Yet";

    return res.status(200).json({
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
      numReviews: totalReviews,
      avgStarRating: avgRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    });
  } catch {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
});

// Validates Spots to Ensure everything will pass before creating it later
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

// Create a Spot -- DONE
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const user = req.user.id;

  const spotDetails = {
    ownerId: user,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  };

  const newSpot = await Spot.create(spotDetails);

  res.status(201).json({
    id: newSpot.id,
    ownerId: user,
    address: newSpot.address,
    city: newSpot.city,
    state: newSpot.state,
    country: newSpot.country,
    lat: newSpot.lat,
    lng: newSpot.lng,
    name: newSpot.name,
    description: newSpot.description,
    price: newSpot.price,
  });
});

// Add an Image to a Spot based on the Spot's Id --DONE
router.post("/:spotId/images", requireAuth, async (req, res) => {
  let user = req.user.id;
  let { spotId } = req.params;
  let { url, preview } = req.body;
  const userSpot = await Spot.findByPk(spotId);

  if (!userSpot)
    return res.status(404).json({ message: "Spot couldn't be found" });
  if (user !== userSpot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  const newImage = await SpotImage.create({ spotId, url, preview });

  return res.status(200).json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});

// Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let { spotId } = req.params;
  const updatedSpot = await Spot.findByPk(spotId);
  if (!updatedSpot)
    return res.status(404).json({ message: "Spot couldn't be found" });

  if (address) updatedSpot.address = address;
  if (city) updatedSpot.city = city;
  if (state) updatedSpot.state = state;
  if (country) updatedSpot.country = country;
  if (lat) updatedSpot.lat = lat;
  if (lng) updatedSpot.lng = lng;
  if (name) updatedSpot.name = name;
  if (description) updatedSpot.description = description;
  if (price) updatedSpot.price = price;

  await updatedSpot.save();

  return res.status(200).json({
    id: updatedSpot.id,
    ownerId: updatedSpot.ownerId,
    address: updatedSpot.address,
    city: updatedSpot.city,
    state: updatedSpot.state,
    country: updatedSpot.country,
    lat: updatedSpot.lat,
    lng: updatedSpot.lng,
    name: updatedSpot.name,
    description: updatedSpot.description,
    price: updatedSpot.price,
    createdAt: updatedSpot.createdAt,
    updatedAt: new Date(),
  });
});

// Delete a Spot --DONE
router.delete("/:spotId", requireAuth, async (req, res) => {
  let { spotId } = req.params;
  let user = req.user.id;

  const userSpot = await Spot.findByPk(spotId);
  if (!userSpot)
    return res.status(404).json({ message: "Spot couldn't be found" });
  if (user !== userSpot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  await userSpot.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

// Get All Reviews by a Spot's id --DONE
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const allReviews = [];
  // Find the specific spot
  try {
    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
      include: [
        {
          model: Review,
          attributes: [
            "id",
            "userId",
            "spotId",
            "review",
            "stars",
            "createdAt",
            "updatedAt",
          ],
          include: [ReviewImage],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    for (let eachReview of spot.Reviews) {
      const reviewImages = [];
      for (let image of eachReview.ReviewImages) {
        reviewImages.push({
          id: image.id,
          url: image.url,
        });
      }

      allReviews.push({
        id: eachReview.id,
        userId: eachReview.userId,
        spotId: eachReview.spotId,
        review: eachReview.review,
        stars: eachReview.stars,
        createdAt: eachReview.createdAt,
        updatedAt: eachReview.updatedAt,
        User: spot.User,
        ReviewImages: reviewImages,
      });
    }

    res.json({ Reviews: allReviews });
  } catch {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
});

// Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {});

module.exports = router;
