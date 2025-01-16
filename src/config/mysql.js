// config/mysql.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Detecta si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';

// Configura las variables de entorno según el entorno actual
const db = isProduction ? process.env.PROD_MYSQL_DB : process.env.MYSQL_DB;
const user = isProduction ? process.env.PROD_MYSQL_USER : process.env.MYSQL_USER;
const password = isProduction ? process.env.PROD_MYSQL_PASSWORD : process.env.MYSQL_PASSWORD;
const host = isProduction ? process.env.PROD_MYSQL_HOST : process.env.MYSQL_HOST;
const port = isProduction ? process.env.PROD_MYSQL_PORT : process.env.MYSQL_PORT;

// Configura Sequelize
const sequelize = new Sequelize(db, user, password, {
    host,
    port,
    dialect: 'mysql',
});

// Función para conectar a la base de datos
const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL conectado correctamente');
    } catch (error) {
        console.error('MYSQL error de conexión:', error);
    }
};

module.exports = { sequelize, dbConnectMySql };
