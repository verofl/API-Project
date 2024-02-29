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
const router = express.Router();

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

// Get All Current User Bookings -- DONE
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  let allUserBookings = [];

  const allBookings = await Booking.findAll({
    where: {
      userId,
    },
    include: {
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
  });
  for (let eachBooking of allBookings) {
    let previewImage;
    if (!eachBooking.Spot.SpotImages.length) {
      previewImage = "No Preview Images";
    } else {
      previewImage = eachBooking.Spot.SpotImages[0].url;
    }

    allUserBookings.push({
      id: eachBooking.id,
      spotId: eachBooking.spotId,
      Spot: {
        id: eachBooking.Spot.id,
        ownerId: eachBooking.Spot.ownerId,
        address: eachBooking.Spot.address,
        city: eachBooking.Spot.city,
        state: eachBooking.Spot.state,
        country: eachBooking.Spot.country,
        lat: eachBooking.Spot.lat,
        lng: eachBooking.Spot.lng,
        name: eachBooking.Spot.name,
        price: eachBooking.Spot.price,
        previewImage,
      },
      userId,
      startDate: eachBooking.startDate,
      endDate: eachBooking.endDate,
      createdAt: eachBooking.createdAt,
      updatedAt: eachBooking.updatedAt,
    });
  }
  if (!allUserBookings.length)
    allUserBookings.push("You do not have any bookings yet");
  return res.status(200).json({ Bookings: allUserBookings });
});

// Edit a Booking
// router.put("/:bookingId", requireAuth, validateDates, async (req, res) => {
//   const user = req.user.id;
//   const { startDate, endDate } = req.body;
//   const { bookingId } = req.params;

//   const userBooking = await Booking.findByPk(bookingId);
//   if (!userBooking)
//     return res.status(404).json({ message: "Booking couldn't be found" });
// });

// Delete an Existing Booking -- DONE
router.delete("/:bookingId", requireAuth, async (req, res) => {
  let { bookingId } = req.params;
  let user = req.user.id;

  const userBooking = await Booking.findByPk(bookingId);
  if (!userBooking)
    return res.status(404).json({ message: "Booking couldn't be found" });

  const spot = await Spot.findByPk(userBooking.spotId);
  // console.log(userBooking.Spot.ownerId);
  // console.log(new Date(userBooking.startDate));

  // if the user is not the original booking user or the spot owner
  if (user !== userBooking.userId && user !== spot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  if (new Date(userBooking.startDate) <= new Date())
    return res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });

  await userBooking.destroy();

  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;