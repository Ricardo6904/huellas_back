const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize');
const Storage = require('./storage');
const Usuario = require('./usuarios');

const HistorialMascotas = sequelize.define('historial_mascotas', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  idMascota: {
    type: DataTypes.INTEGER,
    references: {
      model: 'mascotas',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  latitud: {
    allowNull: true,
    type: DataTypes.FLOAT
  },
  longitud: {
    allowNull: true,
    type: DataTypes.FLOAT
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'historial_mascotas',
  timestamps: true
});


module.exports = HistorialMascotas;