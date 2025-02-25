const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize');

const Razas = sequelize.define('razas', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
      idEspecie: {
        type: DataTypes.INTEGER,
        references: {
          model: 'especies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
}, {
  tableName: 'razas',
  timestamps: false
});

module.exports = Razas;

