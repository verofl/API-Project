const express = require("express");
const { Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// Delete a Spot Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  let { imageId } = req.params;
  let user = req.user.id;

  const spotImage = await SpotImage.findByPk(imageId);
  if (!spotImage)
    return res.status(404).json({ message: "Spot Image couldn't be found" });

  const spot = await Spot.findByPk(spotImage.spotId);
  // return res.json(spot);
  // return res.json(spot.ownerId);
  if (user !== spot.ownerId)
    return res.status(403).json({ message: "Forbidden" });

  await spotImage.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
