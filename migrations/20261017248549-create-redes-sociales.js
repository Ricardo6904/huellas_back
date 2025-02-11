'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('redesSociales', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:Sequelize.INTEGER
      },
      nombre:{
        type: Sequelize.STRING,
        allowNull: false
      },
      url:{
        type: Sequelize.TEXT,
        allowNull: false
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
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('redesSociales');
  }
};
