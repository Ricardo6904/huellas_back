'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('razas', [
      // Perros
      { id: 1, nombre: 'Mestizo', idEspecie: 1 },
      { id: 2, nombre: 'Labrador', idEspecie: 1 },
      { id: 3, nombre: 'Pastor Alemán', idEspecie: 1 },
      { id: 4, nombre: 'Bulldog', idEspecie: 1 },
      { id: 5, nombre: 'Chihuahua', idEspecie: 1 },

      // Gatos
      { id: 6, nombre: 'Mestizo', idEspecie: 2 },
      { id: 7, nombre: 'Siamés', idEspecie: 2 },
      { id: 8, nombre: 'Persa', idEspecie: 2 },
      { id: 9, nombre: 'Angora', idEspecie: 2 },

      // Otros
      { id: 10, nombre: 'Conejo', idEspecie: 3 },
      { id: 11, nombre: 'Hamster', idEspecie: 3 },
      { id: 12, nombre: 'Ave', idEspecie: 3 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('razas', null, {});
  }
};
