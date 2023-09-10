"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "referral_codes",
      [
        {
          user_id: 1,
          code: "58489",
          id: 1,
        },
        {
          user_id: 2,
          code: "95256",
          id: 2,
        },
        {
          user_id: 3,
          code: "16462",
          id: 3,
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
    await queryInterface.bulkDelete("referral_codes", null, {});
  },
};
