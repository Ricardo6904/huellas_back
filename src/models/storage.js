const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const Storage = sequelize.define('Storage', {
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING
    }
},{
    tableName: 'storage',
    timestamps: false
})

module.exports = Storage