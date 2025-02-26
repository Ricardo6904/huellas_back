const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize');
const Storage = require('./storage');
const Usuario = require('./usuarios');
const Razas = require('./razas');
const Especies = require('./especies');

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
      idEspecie: {
        type: DataTypes.INTEGER,
        references: {
          model: 'especies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      idRaza: {
        type: DataTypes.INTEGER,
        references: {
          model: 'razas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
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
  as: 'Storage'
});

Mascotas.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'Usuario'
})

Mascotas.belongsTo(Razas, {
  foreignKey: 'idRaza'
})

Mascotas.belongsTo(Especies, {
  foreignKey: 'idEspecie',
  as: 'especie'
})

Mascotas.findAndCountAllData = function (limit, offset, filtro) {

  return Mascotas.findAndCountAll({
    include: [
      { 
        model:Storage,
        as: 'Storage'  
      }, {
      model: Usuario,
      as:'Usuario',
      attributes: { exclude: ['clave'] },
    }],
    where: filtro,
    limit: limit,
    offset: offset
  })
}

Mascotas.findOneData = function (id) {
  return Mascotas.findOne({
    where: { id: id }, 
    include: [
      {
        model: Storage,
        as: 'Storage',
      }, 
      {
        model: Usuario,
        as: 'Usuario',
        attributes: ['nombres', 'apellidos', 'celular', 'email']
    },
    {
      model: Razas
    },
    {
      model: Especies,
      as: 'especie'
    }
  ]
  })
}

module.exports = Mascotas;