'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('users',
    //   [
    //     {
    //       "id": 1,
    //       "username": "bayu",
    //       "email": "bkprasetya@gmail.com",
    //       "point": 50,
    //       "password": "abc123"
    //     },
    //     {
    //       "id": 2,
    //       "username": "haekal",
    //       "email": "haekal@gmail.com",
    //       "point": 40,
    //       "password": "abc123"
    //     },
    //     {
    //       "id": 3,
    //       "username": "andrean",
    //       "email": "andrean@gmail.com",
    //       "point": 2,
    //       "password": "abc123"
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
