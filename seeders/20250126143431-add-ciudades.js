'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ciudades', [
      { id: 1, nombre: 'Cuenca', idProvincia: 1 }, // Azuay
      { id: 2, nombre: 'Quito', idProvincia: 2 },  // Pichincha
      { id: 3, nombre: 'Guayaquil', idProvincia: 3 }, // Guayas
      { id: 4, nombre: 'Daule', idProvincia: 3 }, // Guayas
      { id: 5, nombre: 'Rumiñahui', idProvincia: 2 }, // Pichincha
      // Agrega más ciudades aquí
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ciudades', null, {});
  }
};
