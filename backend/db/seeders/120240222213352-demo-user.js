"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "highlady@nightcourt.com",
          username: "HighLady",
          hashedPassword: bcrypt.hashSync("Rhysand"),
          firstName: "Feyre",
          lastName: "Archeron",
        },
        {
          email: "shadowrebel@dragon.com",
          username: "Shadow",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Xaden",
          lastName: "Riorson",
        },
        {
          email: "nightfire@vampire.com",
          username: "NightFire",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Oraya",
          lastName: "Ashraj",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["HighLady", "Shadow", "NightFire"] },
      },
      {}
    );
  },
};
