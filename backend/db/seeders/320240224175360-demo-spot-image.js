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
        url: "https://i.imghippo.com/files/LiMYh1708836742.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 1
        id: 2,
        spotId: 1,
        url: "https://i.imghippo.com/files/xRQZo1710779730.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 2
        id: 3,
        spotId: 1,
        url: "https://i.imghippo.com/files/YCMaQ1710779764.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 3
        id: 4,
        spotId: 1,
        url: "https://i.imghippo.com/files/Liq4t1710779819.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 4
        id: 5,
        spotId: 1,
        url: "https://i.imghippo.com/files/1DwFF1710779850.jpg",
        preview: true,
      },

      {
        // Shadow Estate
        id: 6,
        spotId: 2,
        url: "https://i.imghippo.com/files/cshes1708836771.jpg",
        preview: true,
      },
      {
        // The House of Night
        id: 11,
        spotId: 3,
        url: "https://i.imghippo.com/files/vEC4I1708836810.jpg",
        preview: true,
      },
      {
        // Moonstone Palace
        id: 16,
        spotId: 4,
        url: "https://i.imghippo.com/files/JsDUV1710704395.jpg",
        preview: true,
      },
      {
        // War College Castle
        id: 21,
        spotId: 5,
        url: "https://i.imghippo.com/files/lllBQ1708836858.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion
        id: 26,
        spotId: 6,
        url: "https://i.imghippo.com/files/VGz7T1708836880.jpg",
        preview: true,
      },
      {
        // River House
        id: 31,
        spotId: 7,
        url: "https://i.imghippo.com/files/hSSyD1708836896.jpg",
        preview: true,
      },
      {
        // Quaint Home
        id: 36,
        spotId: 8,
        url: "https://i.imghippo.com/files/mA3251708836921.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia
        id: 41,
        spotId: 9,
        url: "https://i.imghippo.com/files/ayyov1708836946.jpg",
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
            "https://www.imghippo.com/i/LiMYh1708836742.jpg",
            "https://www.imghippo.com/i/cshes1708836771.jpg",
            "https://www.imghippo.com/i/vEC4I1708836810.jpg",
            "https://www.imghippo.com/i/SBulX1708836835.jpg",
            "https://www.imghippo.com/i/lllBQ1708836858.jpg",
            "https://www.imghippo.com/i/VGz7T1708836880.jpg",
            "https://www.imghippo.com/i/hSSyD1708836896.jpg",
            "https://www.imghippo.com/i/mA3251708836921.jpg",
            "https://www.imghippo.com/i/ayyov1708836946.jpg",
          ],
        },
      },
      {}
    );
  },
};
