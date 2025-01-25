'use strict';

const { encrypt } = require('../src/utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //hash
    const hashedPsw1 = await encrypt('usuario')

    await queryInterface.bulkInsert('usuarios', [
      /* {
        nombres: 'Ricardo Esteban',
        apellidos: 'Supe',
        cedula: '1805096904',
        celular: '0983041387',
        email: 'mnzioss1@gmail.com',
        clave: hashedPsw1,
        rol: 'usuario',
        provincia: 'Tungurahua',
        ciudad: 'Ambato',
        direccion: 'Carihuayrazo y Sangay'
      }, */
      {
        nombres: 'Marco Orlando',
        apellidos: 'Tenezaca',
        cedula: '1805096905',
        celular: '0983041387',
        email: 'motenezaca@gmail.com',
        clave: hashedPsw1,
        rol: 'usuario',
        provincia: 'Tungurahua',
        ciudad: 'Ambato',
        direccion: 'Ambato'
      },
      {
        nombres: 'Romina María',
        apellidos: 'Sánchez Arroba',
        cedula: '1850269364',
        celular: '0992658073',
        email: 'rm.sanchezarroba@gmail.com',
        clave: hashedPsw1,
        rol: 'usuario',
        provincia: 'Tungurahua',
        ciudad: 'Ambato',
        direccion: 'Barrio La Presidencial'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
