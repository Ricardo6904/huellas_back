'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('avistamientos', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMascotaPerdida: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mascotas-perdidas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ubicacion: {
        allowNull: true,
        type: Sequelize.STRING
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING
      }
     });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('avisatamientos');
     
  }
};
