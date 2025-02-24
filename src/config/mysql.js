//config/mysql.js
const { Sequelize } = require('sequelize')
const db = process.env.MYSQL_DB;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    db,
    user,
    password,
    {
        host,
        dialect: "mysql",
        dialectOptions: {
            connectTimeout: 100000, 
        }
    },
    {
        max: 5,
        min: 0,
        acquire: 100000, // Tiempo máximo para intentar adquirir una conexión (100 segundos)
        idle: 10000 // Tiempo de inactividad antes de liberar la conexión
    }
    
)

const dbConnectMySql = async() => {
    try {
        await sequelize.authenticate()
        console.log('MYSQL conectado correctamente');
    } catch (error) {
        console.log('MYSQL error conexion',error);
    }
}

module.exports = { sequelize, dbConnectMySql }