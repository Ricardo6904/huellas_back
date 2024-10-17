const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const Mascota = require('./mascotas')
const Storage = require('./storage')
const Usuario = require('./usuarios')

const adopcion = sequelize.define(
    'adopciones',
    {
        id: {
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
            type: DataTypes.STRING
        },
        tipo: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
        tableName: 'adopciones'
    }
)

//definir relaciones
adopcion.belongsTo(Mascota, { foreignKey: 'idMascota' });
Mascota.belongsTo(Storage, { foreignKey: 'idStorage' });
adopcion.belongsTo(Usuario, { foreignKey: 'idUsuario' })

adopcion.findAllData = function () {
    return adopcion.findAll({
        include: [
            {
                model: Mascota,
                include: [Storage]
            },
            {
                model: Usuario,

            }
        ]
    })
}

module.exports = adopcion