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
            allowNull: true,
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

adopcion.findAllData = function (idRefugio, estado) {
    return adopcion.findAll({
        where: {estado: estado},
        include: [
            {
                model: Mascota,
                include: [Storage],
                where: {idRefugio: idRefugio }
            },
            {
                model: Usuario,

            }
        ]
    })
}

module.exports = adopcion