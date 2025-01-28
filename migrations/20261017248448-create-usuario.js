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
        allowNull: false,
        type:Sequelize.STRING,
        unique: true
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email:{
        allowNull: false,
        type:Sequelize.STRING,
        unique: true
      },
      clave:{
        allowNull: false,
        type:Sequelize.STRING
      },
      rol:{
        allowNull: false,
        type:Sequelize.STRING
      },
      idProvincia:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ciudades',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idCiudad:{
        type:Sequelize.INTEGER,
        references: {
          model: 'provincias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      direccion: {
        allowNull: false,
        type:Sequelize.STRING
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'activo'
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
