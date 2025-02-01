'use strict';

const { sequelize } = require('../src/config/mysql');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adopciones', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:Sequelize.INTEGER
      },
      idMascota:{
        type: Sequelize.INTEGER,
        references: {
          model: 'mascotas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idUsuario:{
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      estado:{
        allowNull: true,
        type: Sequelize.STRING
      },
      tipo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adopciones');
     
  }
};
