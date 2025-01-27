const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage')

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

module.exports = ciudad;