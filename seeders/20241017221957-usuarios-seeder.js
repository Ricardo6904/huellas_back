'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //hash
    const hashedPsw1 = await encrypt('mnzioss')

    await queryInterface.bulkInsert('usuarios', [
      {
        nombres: 'Ricardo Esteban',
        apellidos: 'Supe',
        cedula: '1805096904',
        email: 'mnzioss@gmail.com.com',
        clave: hashedPsw1,
        rol: 'admin',
        provincia: 'Tungurahua',
        ciudad: 'Ambato',
        direccion: 'Carihuayrazo y Sangay'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
