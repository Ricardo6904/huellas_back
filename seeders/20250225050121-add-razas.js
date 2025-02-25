'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('razas', [
      { id: 1, nombre: 'Mestizo', idEspecie: 1 },
      { id: 2, nombre: 'Labrador', idEspecie: 1 },
      { id: 3, nombre: 'Mestizo', idEspecie: 2 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
