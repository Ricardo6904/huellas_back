const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const RedSocial = sequelize.define('redes_sociales', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:DataTypes.INTEGER
      },
      nombre:{
        type: DataTypes.STRING,
        allowNull: false
      },
      url:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idRefugio: {
        type: DataTypes.INTEGER,
        references: {
          model: 'refugios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
},{
    tableName: 'redes_sociales',
    timestamps: false
})

module.exports = RedSocial