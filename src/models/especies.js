const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize');
const Storage = require('./storage');
const Usuario = require('./usuarios');

const Especies = sequelize.define('especies', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
}, {
  tableName: 'especies',
  timestamps: false
});

module.exports = Especies;