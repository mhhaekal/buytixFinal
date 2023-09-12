'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('categories',
    //   [
    //     {
    //       "id": 1,
    //       "name": "Music"
    //     },
    //     {
    //       "id": 2,
    //       "name": "Comedy"
    //     },
    //     {
    //       "id": 3,
    //       "name": "Education"
    //     },
    //     {
    //       "id": 4,
    //       "name": "Racing"
    //     },
    //     {
    //       "id": 5,
    //       "name": "Football"
    //     },
    //     {
    //       "id": 6,
    //       "name": "Basketball"
    //     },
    //     {
    //       "id": 7,
    //       "name": "Tennis"
    //     },
    //     {
    //       "id": 8,
    //       "name": "Badminton"
    //     }
    //   ], {});
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
