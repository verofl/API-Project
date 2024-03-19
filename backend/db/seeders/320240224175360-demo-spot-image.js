"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        // The Town House Preview Image
        id: 1,
        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Town%20House/Preview%20Image/town-house_j5wqvi.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 1
        id: 2,
        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image3_vjracv.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 2
        id: 3,
        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image2_yil3q2.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 3
        id: 4,
        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862827/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image4_pojqnv.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 4
        id: 5,
        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image1_rrazw1.jpg",
        preview: true,
      },

      {
        // Shadow Estate
        id: 6,
        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Shadow%20Estate/Preview%20Image/shadow-estate_mc9uvu.jpg",
        preview: true,
      },
      {
        // The House of Night
        id: 11,
        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/House%20of%20Night/Preview%20Image/house-of-night_znawfo.jpg",
        preview: true,
      },
      {
        // Moonstone Palace
        id: 16,
        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Moonstone%20Palace/Preview%20Image/moonstone-palace_gn1xmr.jpg",
        preview: true,
      },
      {
        // War College Castle
        id: 21,
        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862809/MythicalBnB%20API%20Project/War%20College%20Castle/Preview%20Image/war-college-castle_t6eqk9.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion
        id: 26,
        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862808/MythicalBnB%20API%20Project/Nightfire%20Mansion/Preview%20Image/nightfire-mansion_qcgz92.jpg",
        preview: true,
      },
      {
        // River House
        id: 31,
        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862810/MythicalBnB%20API%20Project/River%20House/Preview%20Image/river-house_vagpfx.jpg",
        preview: true,
      },
      {
        // Quaint Home
        id: 36,
        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Quaint%20Home/Preview%20Image/quaint-home_l6hbft.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia
        id: 41,
        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Preview%20Image/crown-of-nyaxia_dq4dwv.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Town%20House/Preview%20Image/town-house_j5wqvi.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image3_vjracv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image2_yil3q2.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862827/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image4_pojqnv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image1_rrazw1.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Shadow%20Estate/Preview%20Image/shadow-estate_mc9uvu.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/House%20of%20Night/Preview%20Image/house-of-night_znawfo.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Moonstone%20Palace/Preview%20Image/moonstone-palace_gn1xmr.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862809/MythicalBnB%20API%20Project/War%20College%20Castle/Preview%20Image/war-college-castle_t6eqk9.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862808/MythicalBnB%20API%20Project/Nightfire%20Mansion/Preview%20Image/nightfire-mansion_qcgz92.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862810/MythicalBnB%20API%20Project/River%20House/Preview%20Image/river-house_vagpfx.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Quaint%20Home/Preview%20Image/quaint-home_l6hbft.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Preview%20Image/crown-of-nyaxia_dq4dwv.jpg",
          ],
        },
      },
      {}
    );
  },
};
