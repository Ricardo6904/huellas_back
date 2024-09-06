const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Storage = ('./storage.js')

const refugio = sequelize.define('Refugio', {
    idRefugio: {
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
    telefono: {
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
}, {
    tableName: 'refugio',
    timestamps: false
})

module.exports = refugio;