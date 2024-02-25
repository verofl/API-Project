"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "https://www.imghippo.com/i/4hJrH1708837093.jpg",
      },
      {
        reviewId: 2,
        url: "https://www.imghippo.com/i/9nH4A1708837152.jpg",
      },
      {
        reviewId: 3,
        url: "https://www.imghippo.com/i/fa17p1708837185.jpg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://www.imghippo.com/i/4hJrH1708837093.jpg",
            "https://www.imghippo.com/i/9nH4A1708837152.jpg",
            "https://www.imghippo.com/i/fa17p1708837185.jpg",
          ],
        },
      },
      {}
    );
  },
};
