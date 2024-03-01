const express = require("express");
const {
  User,
  Spot,
  SpotImage,
  Booking,
  Review,
  ReviewImage,
} = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validates Spots to ensure everything will pass before creating it later
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

// Validate Dates
const validateDates = [
  check("startDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      const today = new Date();
      if (new Date(value) < today) {
        return false;
      }
      return true;
    })
    .withMessage("startDate cannot be in the past"),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        return false;
      }
      return true;
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

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

    let avgRating = totalStars / totalReviews;
    if (!avgRating) avgRating = "No Reviews Yet";

    let previewImage;
    if (!eachSpot.SpotImages.length) {
      previewImage = "No Preview Image";
    } else {
      previewImage = eachSpot.SpotImages[0].url; // Take the first spot image URL
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
      previewImage = eachSpot.SpotImages[0].url; // Take the first spot image URL
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
      previewImage: previewImage,
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

// Create a Spot -- DONE
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const ownerId = req.user.id;

  const spotDetails = {
    ownerId,
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

  res.status(201).json(newSpot);
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

// Edit a Spot --DONE
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let user = req.user.id;
  let { spotId } = req.params;
  const updatedSpot = await Spot.findByPk(spotId);
  if (!updatedSpot)
    return res.status(404).json({ message: "Spot couldn't be found" });
  if (user !== userSpot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  if (address) updatedSpot.address = address;
  if (city) updatedSpot.city = city;
  if (state) updatedSpot.state = state;
  if (country) updatedSpot.country = country;
  if (lat) updatedSpot.lat = lat;
  if (lng) updatedSpot.lng = lng;
  if (name) updatedSpot.name = name;
  if (description) updatedSpot.description = description;
  if (price) updatedSpot.price = price;
  updatedSpot.updatedAt = new Date();

  await updatedSpot.save();

  return res.status(200).json(updatedSpot);
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

  // Find the specific spot
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });

  const allReviews = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  return res.json({ Reviews: allReviews });
});

// Create a Review for a Spot based on the Spot's id -- DONE
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReviews,
  async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const reviewSpot = await Spot.findByPk(spotId);
    if (!reviewSpot)
      return res.status(404).json({ message: "Spot couldn't be found" });

    const existingReview = await Review.findOne({
      where: {
        userId,
        spotId,
      },
    });
    if (existingReview)
      return res
        .status(500)
        .json({ message: "User already has a review for this spot" });

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    return res.status(201).json(newReview);
  }
);

// Get All Bookings for a Spot Based on the Spot's Id -- DONE
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  // Find the specific spot
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });

  // If you are not the owner of the spot
  let allBookings;
  if (userId !== spot.ownerId) {
    allBookings = await Booking.findAll({
      where: {
        spotId,
        userId,
      },
    });
    // If  you are not the owner of the spot or have any bookings there (so you can see what dates are available)
    if (userId !== allBookings.userId) {
      allBookings = await Booking.findAll({
        where: {
          spotId,
        },
        attributes: ["id", "spotId", "startDate", "endDate"],
      });
      // return res.status(403).json({ message: "Forbidden" });
    }

    // If you are the owner of the spot
  } else if (userId == spot.ownerId) {
    allBookings = await Booking.findAll({
      where: {
        spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  }

  return res.status(200).json({ Bookings: allBookings });
});

// Create a Booking from a Spot Based on the Spot's Id
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateDates,
  async (req, res) => {
    let userId = req.user.id;
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;

    const bookingSpot = await Spot.findByPk(spotId);
    if (!bookingSpot)
      return res.status(404).json({ message: "Spot couldn't be found" });
    if (userId == bookingSpot.ownerId)
      return res.status(403).json({ message: "Forbidden" });

    const existingBooking = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: new Date(endDate) } },
              { endDate: { [Op.gte]: new Date(startDate) } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    const newBooking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate,
    });
    return res.status(200).json(newBooking);
  }
);

module.exports = router;
