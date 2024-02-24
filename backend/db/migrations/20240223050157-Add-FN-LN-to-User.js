"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const table = { tableName: "Users", ...options };

    await queryInterface.addColumn(
      table,
      "firstName",
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options
    );
    await queryInterface.addColumn(
      table,
      "lastName",
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const table = { tableName: "Users", ...options };
    await queryInterface.removeColumn(table, "firstName");
    await queryInterface.removeColumn(table, "lastName");
  },
};
