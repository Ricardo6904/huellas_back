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
      idProvincia:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'provincias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idCiudad:{
        type:Sequelize.INTEGER,
        references: {
          model: 'ciudades',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clave: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcion:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      horarioAtencion:{
        allowNull: true,
        type: Sequelize.STRING
      },
      estado:{
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue:'pendiente'
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
      mapaUrl: {
        type:Sequelize.TEXT,
        allowNull: true
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('refugios');

  }
};
