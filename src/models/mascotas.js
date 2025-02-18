const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize');
const Storage = require('./storage');
const Usuario = require('./usuarios');

const Mascotas = sequelize.define('mascotas', {
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
      especie: {
        allowNull: false,
        type: DataTypes.ENUM('perro', 'gato', 'otro')
      },
      raza: {
        allowNull: true,
        type: DataTypes.STRING
      },
      edad: {
        allowNull: true,
        type: DataTypes.STRING
      },
      sexo: {
        allowNull: false,
        type: DataTypes.ENUM('macho', 'hembra')
      },
      tamano: {
        allowNull: false,
        type: DataTypes.ENUM('pequeño', 'mediano', 'grande')
      },
      descripcion: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      estado: {
        allowNull: true,
        type: DataTypes.STRING
      },
      urlQR: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      idStorage: {
        type: DataTypes.INTEGER,
        references: {
          model: 'storage',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idUsuario:{
        type: DataTypes.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
}, {
  tableName: 'mascotas',
  timestamps: false
});

Mascotas.belongsTo(Storage, {
  foreignKey: 'idStorage',
});

Mascotas.belongsTo(Usuario, {
  foreignKey: 'idUsuario'
})

Mascotas.findAndCountAllData = function (limit, offset, filtro) {

  return Mascotas.findAndCountAll({
    include: [Storage, {
      model: Usuario,
      attributes: { exclude: ['clave'] },
    }],
    where: filtro,
    limit: limit,
    offset: offset
  })
}

Mascotas.findOneData = function (id) {
  Mascotas.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return Mascotas.findOne({
    where: { id: id }, include: [Storage, {
      model: Usuario
    }]
  })
}



module.exports = Mascotas;