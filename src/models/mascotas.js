const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage');
const refugio = require('./refugios');

const mascota = sequelize.define('mascotas', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING
  },
  sexo: {
    type: DataTypes.STRING
  },
  edad: {
    type: DataTypes.STRING
  },
  tamano: {
    type: DataTypes.STRING
  },
  historia: {
    type: DataTypes.STRING
  },
  caracteristica: {
    type: DataTypes.STRING,
  },
  condicion: {
    type: DataTypes.STRING,
  },
  idStorage: {
    type: DataTypes.INTEGER
  },
  esEsterilizado: {
    type: DataTypes.TINYINT
  },
  idRefugio: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'disponible'
  },
  especie: {
    allowNull: false,
    type: DataTypes.STRING
  },
  solicitudesPendientes: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'mascotas', // El nombre de la tabla en la base de datos
  timestamps: false // Si no tienes campos de timestamp (createdAt, updatedAt)
});

/**
 * Implementando modelo personalizado
 */
mascota.belongsTo(Storage, {
  foreignKey: 'idStorage',
});
mascota.belongsTo(refugio, {
  foreignKey: 'idRefugio'
})

mascota.findAllData = function () {
  /* mascota.belongsTo(Storage, {
    foreignKey: 'idStorage',
  }) */
  return mascota.findAll({ include: [Storage, refugio] })
}



mascota.findAndCountAllData = function (limit, offset, filtro) {


  return mascota.findAndCountAll({
    include: [Storage, {
      model: refugio,
      include: [Storage]
    }],
    where: filtro,
    limit: limit,
    offset: offset
  })
}

mascota.findOneData = function (idMascota) {
  mascota.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return mascota.findOne({
    where: { id: idMascota }, include: [Storage, {
      model: refugio,
      include: [Storage]
    }]
  })
}

module.exports = mascota;