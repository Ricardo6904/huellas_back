'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres:{
        allowNull: false,
        type:Sequelize.STRING
      },
      apellidos:{
        allowNull: false,
        type:Sequelize.STRING
      },
      cedula:{
        allowNull: true,
        type:Sequelize.STRING
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email:{
        allowNull: false,
        type:Sequelize.STRING
      },
      clave:{
        allowNull: false,
        type:Sequelize.STRING
      },
      rol:{
        allowNull: false,
        type:Sequelize.STRING
      },
      provincia:{
        allowNull: false,
        type:Sequelize.STRING
      },
      ciudad:{
        allowNull: false,
        type:Sequelize.STRING
      },
      direccion: {
        allowNull: false,
        type:Sequelize.STRING
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'ACTIVO'
      },
      adopcionPendiente: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
