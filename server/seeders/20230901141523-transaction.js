'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('transactions',
    //   [
    //     {
    //       "first_name": "MH",
    //       "last_name": "Haekal",
    //       "email": "haekal123@gmail.com",
    //       "phone_number": "082110055558",
    //       "referral_code_id": null,
    //       "ticket_id": 1,
    //       "id": 1,
    //       "user_id": 1
    //     },
    //   ]
    //   , {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
