const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage');
const provincia = require('./provincias');

const ciudad = sequelize.define('ciudades', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idProvincia: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'provincias',
          key: 'id'
        }
      }
    }, {
      tableName: 'ciudades',
      timestamps: false
})

ciudad.belongsTo(provincia, { foreignKey: 'idProvincia', as: 'provincia' });

module.exports = ciudad;