"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ticket_images",
      [
        {
          id: 1,
          url: "https://assets.loket.com/imgdir/2023-05-05/48/48f966262aea4deda759e8353bf5cabc2a0ac6a3127393267168104395.jpg",
          ticket_id: 1,
        },
        {
          id: 2,
          url: "https://cdn06.pramborsfm.com/storage/app/media/Prambors/Editorial%202/BLACKPINK-20220921171557.jpg?tr=w-8009",
          ticket_id: 2,
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
    await queryInterface.bulkDelete("ticket_images", null, {});
  },
};
