'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedMacarenaPassword = await encrypt('Patitasnobles.adoptahuellas@');

    await queryInterface.bulkInsert('refugios', [
      {
        id: 1,
        nombre: 'Patitas Nobles',
        direccion: 'Jácome Clavijo y Av. Victor Hugo',
        idCiudad: 6,
        idProvincia: 4,
        celular: '0969015885',
        email: 'patitasnobles.adoptahuellas@gmail.com',
        rol: 'refugio',
        estado: 'activo',
        latitud: -1.268676,
        longitud: -78.633545,
        clave: hashedMacarenaPassword,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('refugios', null, {});
  }
};
