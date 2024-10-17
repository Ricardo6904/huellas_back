'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('storage', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('storage');
     
  }
};
