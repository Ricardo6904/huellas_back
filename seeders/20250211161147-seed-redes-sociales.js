'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("redesSociales", [
      {
        idRefugio: 1, // Asegúrate de que existe un refugio con este ID
        nombre: "facebook",
        url: "https://www.facebook.com/Patitanoble",
      },
      {
        idRefugio: 1,
        nombre: "instagram",
        url: "https://www.instagram.com/patitanoble/",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("redesSociales", null, {});
  }
};
