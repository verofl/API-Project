"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2024-12-23",
        endDate: "2024-12-27",
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2024-04-10",
        endDate: "2024-04-25",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2024-08-18",
        endDate: "2024-08-26",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        startDate: {
          [Op.in]: ["2024-12-23", "2024-04-10", "2024-08-18"],
        },
      },
      {}
    );
  },
};
