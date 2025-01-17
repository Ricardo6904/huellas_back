'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refugios', {
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
      direccion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ciudad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provincia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clave: {
        allowNull: false,
        type: Sequelize.STRING
      },
      redesSociales:{
        allowNull: true,
        type: Sequelize.JSON
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
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('refugios');

  }
};
