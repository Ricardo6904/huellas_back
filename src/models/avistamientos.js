const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage')

const avistamiento = sequelize.define('avistamientos', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  idMascotaPerdida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.STRING
  },
  ubicacion: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'avistamientos', // El nombre de la tabla en la base de datos
  timestamps: false // Si no tienes campos de timestamp (createdAt, updatedAt)
});

/**
 * Implementando modelo personalizado
 */
avistamiento.belongsTo(Storage, {
  foreignKey: 'idStorage',
});

avistamiento.findAllData = function () {
  /* mascota.belongsTo(Storage, {
    foreignKey: 'idStorage',
  }) */
  return avistamiento.findAll({ include: Storage })
}



avistamiento.findAndCountAllData = function (limit, offset, filtro) {
  

  return avistamiento.findAndCountAll({
    include: Storage,
    where: filtro,
    limit: limit,
    offset: offset
  })
}

avistamiento.findOneData = function (idMascota) {
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return avistamiento.findOne({ where: { id: idMascota }, include: Storage })
}

module.exports = avistamiento;