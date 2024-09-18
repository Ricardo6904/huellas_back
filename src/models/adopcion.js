const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const adopcion = sequelize.define(
    'adopcion',
    {
        idAdopcion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idMascota: {
            type: DataTypes.INTEGER
        },
        idUsuario: {
            type: DataTypes.INTEGER
        },
        estado: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true,
        tableName: 'adopcion'
    }
)

module.exports = adopcion