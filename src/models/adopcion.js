const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Mascota = require('./mascota')
const Storage = require('./storage')
const Usuario = require('./usuario')

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

//definir relaciones
adopcion.belongsTo(Mascota, {foreignKey: 'idMascota'});
Mascota.belongsTo(Storage, {foreignKey: 'idStorage'});
adopcion.belongsTo(Usuario, {foreignKey: 'idUsuario'})

adopcion.findAllData = function () {
    return adopcion.findAll({
        include: [
            {
                model:Mascota,
                include: [Storage]
            },
            {
                model: Usuario,

            }
        ]
    })
}

module.exports = adopcion