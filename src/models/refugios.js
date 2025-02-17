const { sequelize } = require('../config/mysql')
const { DataTypes, Sequelize } = require('sequelize')
const Storage = require('./storage')
const RedSocial = require('./redesSociales');

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
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    horarioAtencion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente'
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
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
}, {
    tableName: 'refugios',
    timestamps: false
})

refugio.belongsTo(Storage, {
    foreignKey: 'idStorage',
});

refugio.hasMany(RedSocial, {
    foreignKey: 'idRefugio',
    as: 'redesSociales' // Alias para la relación
});

refugio.findOneData = function (idRefugio) {
    return refugio.findOne({
        where: { id: idRefugio },
        include: [
            {
                model: Storage,
                as: 'Storage' // Alias para la relación con Storage
            },
            {
                model: RedSocial,
                as: 'redesSociales' // Alias para la relación con redes sociales
            }
        ]
    });
};

module.exports = refugio;