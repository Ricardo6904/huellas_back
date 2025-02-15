const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')
const animalRescatado = require('./animalRescatado')
const Storage = require('./storage')
const Usuario = require('./usuarios')
const Provincia = require('./provincias')
const Ciudad = require('./ciudades')

const adopcion = sequelize.define(
    'adopciones',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAnimalRescatado: {
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
adopcion.belongsTo(animalRescatado, { foreignKey: 'idAnimalRescatado', as: 'animalRescatado'  });
animalRescatado.belongsTo(Storage, { foreignKey: 'idStorage'});
adopcion.belongsTo(Usuario, { foreignKey: 'idUsuario' })
Usuario.belongsTo(Provincia, {foreignKey: 'idProvincia', as: 'Provincia'})
Usuario.belongsTo(Ciudad, {foreignKey: 'idCiudad', as: 'Ciudad'})
adopcion.findAllData = function (idRefugio, estado) {
    return adopcion.findAll({
        where: {estado: estado},
        include: [
            {
                model: animalRescatado,
                include: [Storage],
                where: {idRefugio: idRefugio },
                as: 'animalRescatado'
            },
            {
                model: Usuario,
                include: [{model: Provincia, as: 'Provincia'}, {model: Ciudad, as: 'Ciudad'}]
            }
        ]
    })
}

module.exports = adopcion