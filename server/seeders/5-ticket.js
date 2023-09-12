"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          id: 1,
          name: "Coldplay : Music of The Spheres Concert",
          price: 3500000,
          details:
            "Jakarta, 9 May 2023 - Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. The announcement marks the band’s first ever show in Jakarta, taking place on 15 November at Gelora Bung Karno Stadium.",
          date: "2023-11-15",
          time: "20:00",
          seller_id: 1,
          category_id: 1,
          location_id: 1,
          address: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
        },
        {
          id: 2,
          name: "BLACKPINK: Born Pink",
          price: 2500000,
          details:
            "Get ready to experience a musical extravaganza like no other as BLACKPINK, the global sensation, takes the stage in an electrifying concert that will leave you breathless. Mark your calendars for a night of sensational performances, captivating visuals, and unforgettable moments.",
          date: "2023-11-20",
          time: "20:00",
          seller_id: 2,
          category_id: 1,
          location_id: 1,
          address: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
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
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
