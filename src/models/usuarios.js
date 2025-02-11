const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Provincias = require('./provincias');
const Ciudades = require('./ciudades');

const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING
  },
  apellidos: {
    type: DataTypes.STRING
  },
  cedula: {
    type: DataTypes.STRING
  },
  celular: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  clave: {
    type: DataTypes.STRING,
    select: false
  },
  rol: {
    type: DataTypes.ENUM(["usuario", "admin"]),
  },
  idProvincia: {
    type: DataTypes.INTEGER,
    references: {
      model: 'provincias',
      key: 'id'
    }
  },
  idCiudad: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ciudades',
      key: 'id'
    }
  },
  direccion: {
    type: DataTypes.STRING
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'activo'
  },
  adopcionPendiente: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  verificado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
}, {
  tableName: 'usuarios',
  timestamps: false
});

Usuario.belongsTo(Provincias, { foreignKey: 'idProvincia', as: 'ciudad' });
Usuario.belongsTo(Ciudades, { foreignKey: 'idCiudad', as: 'provincia' });

Usuario.findOneData = function (idUsuario) {

  return Usuario.findOne({
    where: { id: idUsuario },
    attributes: { exclude: ['clave'] },
    include: [{
      model: Provincias,
      as: 'ciudad',
      attributes: ['id', 'nombre']
    },
    {
      model: Ciudades,
      as: 'provincia',
      attributes: ['id', 'nombre']
    }
    ]
  })
}

module.exports = Usuario;