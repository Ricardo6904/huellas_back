'use strict';

const { sequelize } = require('../src/config/mysql');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mascotas', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER 
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      raza: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      edad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tamano: {
        allowNull: false,
        type: Sequelize.STRING
      },
      historia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      caracteristica: {
        allowNull: false,
        type: Sequelize.STRING
      },
      condicion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idStorage: {
        type: Sequelize.INTEGER,
        references: {
          model: 'storage',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      esEsterilizado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      idRefugio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'refugios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'disponible'
      },
      especie: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      solicitudesPendientes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0 
      }
      });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('mascotas');
     
  }
};
