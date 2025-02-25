'use strict';

const { sequelize } = require('../src/config/mysql');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('animal_rescatado', {
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
      idRaza: {
        type: Sequelize.INTEGER,
        references: {
          model: 'razas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
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
        allowNull: true,
        type: Sequelize.STRING
      },
      caracteristica: {
        allowNull: true,
        type: Sequelize.STRING
      },
      condicion: {
        allowNull: true,
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
        allowNull: true,
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
      idEspecie: {
        type: Sequelize.INTEGER,
        references: {
          model: 'especies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      solicitudesPendientes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('animal_rescatado');

  }
};
