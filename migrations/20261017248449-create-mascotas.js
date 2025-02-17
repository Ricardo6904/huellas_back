'use strict';

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
      especie: {
        allowNull: false,
        type: Sequelize.ENUM('perro', 'gato', 'otro')
      },
      raza: {
        allowNull: true,
        type: Sequelize.STRING
      },
      edad: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.ENUM('macho', 'hembra')
      },
      tamano: {
        allowNull: false,
        type: Sequelize.ENUM('pequeño', 'mediano', 'grande')
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      estado: {
        allowNull: true,
        type: Sequelize.STRING
      },
      urlQR: {
        allowNull: true,
        type: Sequelize.TEXT
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
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('mascotas');
  }
};
