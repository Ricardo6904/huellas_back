const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = require('./storage');
const refugio = require('./refugios');
const Especies = require('./especies');
const Razas = require('./razas');

const animalRescatado = sequelize.define('animal_rescatado', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
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
    type: DataTypes.INTEGER,
    references: {
      model: 'storage',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true
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
  solicitudesPendientes: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'animal_rescatado', // El nombre de la tabla en la base de datos
  timestamps: true // Si no tienes campos de timestamp (createdAt, updatedAt)
});

/**
 * Implementando modelo personalizado
 */
animalRescatado.belongsTo(Storage, {
  foreignKey: 'idStorage',
});
animalRescatado.belongsTo(refugio, {
  foreignKey: 'idRefugio'
})

animalRescatado.belongsTo(Especies, {
  foreignKey: 'idEspecie'
})

animalRescatado.belongsTo(Razas, {
  foreignKey: 'idRaza'
})

animalRescatado.findAllData = function () {
  return animalRescatado.findAll({ include: [Storage, refugio] })
}



animalRescatado.findAndCountAllData = function (limit, offset, filtro) {

  return animalRescatado.findAndCountAll({
    include: [Storage, {
      model: refugio,
      attributes: { exclude: ['clave'] },
      include: [Storage],
    },
      {
        model: Razas
      }],
    where: filtro,
    limit: limit,
    offset: offset
  })
}

animalRescatado.findOneData = function (id) {
  animalRescatado.belongsTo(Storage, {
    foreignKey: 'idStorage'
  })
  return animalRescatado.findOne({
    where: { id: id }, include: [Storage, {
      model: refugio,
      include: [Storage]
    }]
  })
}

module.exports = animalRescatado;