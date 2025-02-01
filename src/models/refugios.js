const { sequelize } = require('../config/mysql')
const { DataTypes, Sequelize } = require('sequelize')
const Storage = require('./storage')

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
        type: DataTypes.ENUM(["refugio", "admin"]),
    },
    redesSociales: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    horarioAtencion:{
        type:Sequelize.STRING,
        allowNull: true
    },
    estado:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'refugios',
    timestamps: false
})

refugio.belongsTo(Storage, {
    foreignKey: 'idStorage',
});

refugio.findOneData = function (idRefugio) {
    refugio.belongsTo(Storage, {
        foreignKey: 'idStorage'
    })
    return refugio.findOne({ where: { id: idRefugio }, include: Storage })
}

module.exports = refugio;