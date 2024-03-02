const express = require("express");
const { Spot, SpotImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Validate Dates -- DONE
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
        lat: parseFloat(eachBooking.Spot.lat),
        lng: parseFloat(eachBooking.Spot.lng),
        name: eachBooking.Spot.name,
        price: parseFloat(eachBooking.Spot.price),
        previewImage,
      },
      userId,
      startDate: new Date(eachBooking.startDate).toLocaleDateString(),
      endDate: new Date(eachBooking.endDate).toLocaleDateString(),
      createdAt: new Date(eachBooking.createdAt).toLocaleString(),
      updatedAt: new Date(eachBooking.updatedAt).toLocaleString(),
    });
  }
  if (!allUserBookings.length)
    allUserBookings.push("You do not have any bookings yet");
  return res.status(200).json({ Bookings: allUserBookings });
});

// Edit a Booking -- DONE
router.put("/:bookingId", requireAuth, validateDates, async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.body;
  const { bookingId } = req.params;
  const today = new Date();

  const userBooking = await Booking.findByPk(bookingId);
  if (!userBooking)
    return res.status(404).json({ message: "Booking couldn't be found" });

  if (userBooking.userId !== userId)
    return res.status(403).json({ message: "Forbidden" });

  if (today > userBooking.endDate)
    return res.status(403).json({ message: "Past bookings can't be modified" });

  if (startDate && endDate) {
    const conflictingBookings = await Booking.findOne({
      where: {
        spotId: userBooking.spotId,
        [Op.or]: [
          // Finding booking dates with startDate between old Booking booking timeline
          {
            startDate: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
          // Finding booking dates with endDate between old Booking booking timeline
          {
            endDate: { [Op.between]: [new Date(startDate), new Date(endDate)] },
          },
          {
            [Op.and]: [
              // Finding startDate before AND endDate after
              { startDate: { [Op.lte]: new Date(startDate) } },
              { endDate: { [Op.gte]: new Date(endDate) } },
            ],
          },
        ],
        id: { [Op.not]: bookingId },
      },
    });

    if (conflictingBookings) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  if (startDate)
    userBooking.startDate = new Date(startDate).toLocaleDateString();
  if (endDate) userBooking.endDate = new Date(endDate).toLocaleDateString();
  userBooking.updatedAt = new Date(userBooking.updatedAt).toLocaleString();
  userBooking.createdAt = new Date(userBooking.createdAt).toLocaleString();

  await userBooking.save();
  return res.status(200).json(userBooking);
});

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
