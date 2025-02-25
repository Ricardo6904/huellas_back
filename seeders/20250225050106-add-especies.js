'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('especies', [
      { id: 1, nombre: 'Perro' },
      { id: 2, nombre: 'Gato' },
      { id: 3, nombre: 'Otro' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('especies', null, {});
  }
};
