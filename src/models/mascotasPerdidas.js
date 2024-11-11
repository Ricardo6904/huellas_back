const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage')

const mascotaPerdida = sequelize.define('mascotas-perdidas', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING
  },
  raza: {
    type: DataTypes.STRING
  },
  sexo: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  fecha: {
    type: DataTypes.DATE
  },
  ubicacion: {
    type: DataTypes.STRING
  },
  idStorage: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'mascotas-perdidas', // El nombre de la tabla en la base de datos
  timestamps: false // Si no tienes campos de timestamp (createdAt, updatedAt)
});

/**
 * Implementando modelo personalizado
 */
mascotaPerdida.belongsTo(Storage, {
  foreignKey: 'idStorage',
});

mascotaPerdida.findAllData = function () {
  /* mascota.belongsTo(Storage, {
    foreignKey: 'idStorage',
  }) */
  return mascotaPerdida.findAll({ include: Storage })
}



mascotaPerdida.findAndCountAllData = function (limit, offset, filtro) {
  

  return mascotaPerdida.findAndCountAll({
    include: Storage,
    where: filtro,
    limit: limit,
    offset: offset
  })
}

mascotaPerdida.findOneData = function (idMascota) {
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return mascotaPerdida.findOne({ where: { id: idMascota }, include: Storage })
}

module.exports = mascotaPerdida;