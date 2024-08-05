const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: {
      type: DataTypes.STRING
    },
    apellidos: {
      type: DataTypes.STRING
    },
    cedula: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING
    },
    clave: {
      type: DataTypes.STRING,
      select: false
    },
    rol:{
      type: DataTypes.ENUM(["usuario", "administrador"]),
    },
    provincia:{
      type: DataTypes.STRING
    },
    ciudad:{
      type: DataTypes.STRING
    },
    /*parroquia:{
      type: DataTypes.STRING
    }*/
  }, {
    tableName: 'usuario', // El nombre de la tabla en la base de datos
    timestamps: false // Si no tienes campos de timestamp (createdAt, updatedAt)
  });
  
  module.exports = Usuario;