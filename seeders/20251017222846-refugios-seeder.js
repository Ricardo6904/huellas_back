'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword = await encrypt('refugio');
    const hashedMacarenaPassword = await encrypt('Patitasnobles.adoptahuellas@');

    await queryInterface.bulkInsert('refugios', [
      {
        nombre: 'Administrador',
        direccion: 'admin',
        idCiudad: 6,
        idProvincia: 4,
        celular: '0983041387',
        email: 'mnzioss@gmail.com',
        rol: 'admin',
        estado: 'activo',
        clave: hashedPassword,
      },
      {
        nombre: 'Patitas Nobles',
        direccion: 'Jácome Clavijo y Av. Victor Hugo',
        idCiudad: 6,
        idProvincia: 4,
        celular: '0969015885',
        email: 'papitasnobles.adoptahuellas@gmail.com',
        rol: 'refugio',
        estado: 'activo',
        clave: hashedMacarenaPassword,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('refugios', null, {});
  }
};
