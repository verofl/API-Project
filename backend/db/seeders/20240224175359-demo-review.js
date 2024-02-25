"use strict";
const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review:
          "I will never forget this vacation! Every morning I would wake up to the most stunning views. The home was very clean, cozy, and comfortable. Definitely will be booking again in the future.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review:
          "My stay here was magnificent. The views were breathtaking, and the estate was massive. My host, was very kind and responsive. Amazing getaway!",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review:
          "Wow. I am literally speechless with my time here at The House of Night. I cannot wait to come back.",
        stars: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: {
          [Op.in]: [
            "I will never forget this vacation! Every morning I would wake up to the most stunning views. The home was very clean, cozy, and comfortable. Definitely will be booking again in the future.",
            "My stay here was magnificent. The views were breathtaking, and the estate was massive. My host, was very kind and responsive. Amazing getaway!",
            "Wow. I am literally speechless with my time here at The House of Night. I cannot wait to come back.",
          ],
        },
      },
      {}
    );
  },
};
