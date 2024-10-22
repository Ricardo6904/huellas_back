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
        celular: '0983041387',
        email: 'mnzioss@gmail.com',
        clave: hashedPsw1,
        rol: 'usuario',
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
