'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword = await encrypt('refugio');

    await queryInterface.bulkInsert('refugios', [
      {
        nombre: 'Refugio San Francisco',
        direccion: 'Av. Central 456',
        ciudad: 'Ambato',
        provincia: 'Tungurahua',
        celular: '0987654321',
        email: 'mnzioss@gmail.com',
        rol: 'admin',
        clave: hashedPassword,
      },
      {
        nombre: 'Refugio Esperanza',
        direccion: 'Calle Esperanza 123',
        ciudad: 'Quito',
        provincia: 'Pichincha',
        celular: '0976543210',
        email: 'motenezaca@gmail.com',
        rol: 'refugio',
        clave: hashedPassword
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('refugios', null, {});
  }
};
