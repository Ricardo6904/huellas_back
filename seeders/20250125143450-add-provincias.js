'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('provincias', [
      { id: 1, nombre: 'Azuay' },
      { id: 2, nombre: 'Pichincha' },
      { id: 3, nombre: 'Guayas' },
      { id: 4, nombre: 'Tungurahua' },
      { id: 5, nombre: 'Chimborazo' },
      { id: 6, nombre: 'Cotopaxi' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provincias', null, {});
  }
};
