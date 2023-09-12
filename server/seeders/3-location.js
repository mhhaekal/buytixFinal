"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "locations",
      [
        {
          id: 1,
          location: "Indonesia",
        },
        {
          id: 2,
          location: "USA",
        },
        {
          id: 3,
          location: "Singapore",
        },
        {
          id: 4,
          location: "Other Countries",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("locations", null, {});
  },
};
