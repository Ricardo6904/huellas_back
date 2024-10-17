'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword1 = await encrypt('refugio');
    const hashedPassword2 = await encrypt('refugio');

    await queryInterface.bulkInsert('refugios', [
      {
        nombre: 'Refugio San Francisco',
        direccion: 'Av. Central 456',
        ciudad: 'Ambato',
        provincia: 'Tungurahua',
        celular: '0987654321',
        email: 'refugio@gmail.com',
        rol: 'admin',
        clave: hashedPassword1,
      },
      {
        nombre: 'Refugio Esperanza',
        direccion: 'Calle Esperanza 123',
        ciudad: 'Quito',
        provincia: 'Pichincha',
        celular: '0976543210',
        email: 'esperanza@example.com',
        rol: 'user',
        clave: hashedPassword2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('refugios', null, {});
  }
};
