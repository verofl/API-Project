"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "5351 Starlight Rd",
          city: "Velaris",
          state: "Night Court",
          country: "Prythian",
          lat: 46.0207,
          lng: 7.7491,
          name: "The Town House",
          description:
            "Home to where the stars listen and dreams are answered.",
          price: 356.53,
        },
        {
          ownerId: 2,
          address: "702 Riorson Ave",
          city: "Aretia",
          state: "Tyrrendor",
          country: "Navarre",
          lat: 52.6505,
          lng: -7.2493,
          name: "Shadow Estate",
          description: "Most prized estate overlooking the city.",
          price: 881.79,
        },
        {
          ownerId: 3,
          address: "6531 Serpent St",
          city: "Nightborn",
          state: "Obitraes",
          country: "Nyaxia",
          lat: 52.954,
          lng: -1.55,
          name: "The House of Night",
          description:
            "Elegant estate featuring spacious grounds and modern amenities, perfect for a relaxing getaway.",
          price: 359.89,
        },
        {
          ownerId: 1,
          address: "4216 Moonbeam Ln",
          city: "Hewn City",
          state: "Night Court",
          country: "Prythian",
          lat: 46.2044,
          lng: 6.1432,
          name: "Moonstone Palace",
          description:
            "Towering moonstone palace, perched above a gray-stoned mountain. A bookworm's perfect getaway location",
          price: 894.1,
        },
        {
          ownerId: 2,
          address: "4081 Sorrengail St",
          city: "Basgiath",
          state: "Morraine",
          country: "Navarre",
          lat: 55.2107,
          lng: -6.5796,
          name: "War College Castle",
          description: "Ancient castle, isolated in a stunning field of green.",
          price: 617.93,
        },
        {
          ownerId: 3,
          address: "7832 Oraya Dr",
          city: "Raihn",
          state: "Obitraes",
          country: "Nyaxia",
          lat: 52.4862,
          lng: -1.898575,
          name: "Nightfire Mansion",
          description: "Grand mansion surrounded by lush trees.",
          price: 702.99,
        },
        {
          ownerId: 1,
          address: "2621 Midnight St",
          city: "Velaris",
          state: "Night Court",
          country: "Prythian",
          lat: 46.1136,
          lng: 7.4961,
          name: "River House",
          description: "Captivating manor along the turquoise river.",
          price: 818.97,
        },
        {
          ownerId: 2,
          address: "4108 Andarna Dr",
          city: "Montserrat",
          state: "Morraine",
          country: "Navarre",
          lat: 51.4843,
          lng: -9.3661,
          name: "Quaint Home",
          description: "Cozy town home; sought after location.",
          price: 241.58,
        },
        {
          ownerId: 3,
          address: "5793 Rishan Rd",
          city: "Salinae",
          state: "Rishan",
          country: "Nyaxia",
          lat: 51.509865,
          lng: -0.118092,
          name: "Crown of Nyaxia",
          description: "Charming townhome nestled in a quaint neighborhood.",
          price: 218.45,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: [
            "5351 Starlight Rd",
            "702 Riorson Ave",
            "6531 Serpent St",
            "4216 Moonbeam Ln",
            "4081 Sorrengail St",
            "7832 Oraya Dr",
            "2621 Midnight St",
            "4108 Andarna Dr",
            "5793 Rishan Rd",
          ],
        },
      },
      {}
    );
  },
};
