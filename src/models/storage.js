const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const Storage = sequelize.define('Storage', {
    idStorage:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    urlStorage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filenameStorage: {
        type: DataTypes.STRING
    }
},{
    tableName: 'storage',
    timestamps: false
})

module.exports = Storage