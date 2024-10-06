const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage')

const mascota = sequelize.define('Mascota', {
  idMascota: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombreMascota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  razaMascota: {
    type: DataTypes.STRING
  },
  sexoMascota: {
    type: DataTypes.STRING
  },
  edadMascota: {
    type: DataTypes.STRING
  },
  tamanoMascota: {
    type: DataTypes.STRING
  },
  historiaMascota: {
    type: DataTypes.STRING
  },
  caracteristicaMascota: {
    type: DataTypes.STRING,
  },
  condicionMascota: {
    type: DataTypes.STRING,
  },
  idStorage: {
    type: DataTypes.INTEGER
  },
  esEsterilizado: {
    type: DataTypes.TINYINT
  },
  idRefugio: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'mascota', // El nombre de la tabla en la base de datos
  timestamps: false // Si no tienes campos de timestamp (createdAt, updatedAt)
});

/**
 * Implementando modelo personalizado
 */

mascota.findAllData = function () {
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage',
  })
  return mascota.findAll({ include: Storage })
}

mascota.findAndCountAllData = function(limit, offset){
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage',
  })
  return mascota.findAndCountAll({
    include: Storage,
    limit: limit,
    offset: offset
  }
)
}

mascota.findOneData = function (idMascota) {
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return mascota.findOne({ where: { idMascota: idMascota }, include: Storage })
}

module.exports = mascota;