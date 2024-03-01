const express = require("express");
const { Spot, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  let { imageId } = req.params;
  let user = req.user.id;

  const reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage)
    return res.status(404).json({ message: "Spot Image couldn't be found" });

  const spot = await Spot.findByPk(reviewImage.reviewId);

  if (user !== spot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  await reviewImage.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
