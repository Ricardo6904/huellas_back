const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = ('./storage.js')

const refugio = sequelize.define('refugios', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    provincia: {
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
        type: DataTypes.ENUM(["refugio", "administrador"]),
    },
    redesSociales: {
        type: DataTypes.JSON
        
    }
}, {
    tableName: 'refugios',
    timestamps: false
})

/* refugio.belongsTo(Storage, {
    foreignKey: 'idStorage',
  });

  refugio.findOneData = function (idRefugio) {
    refugio.belongsTo(Storage, {
      foreignKey: 'idStorage'
    })
    return refugio.findOne({ where: { id: idRefugio }, include: Storage })
  } */

module.exports = refugio;