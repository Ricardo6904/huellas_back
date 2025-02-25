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
        ssl: {
            ca: path.join(__dirname, '../config/isrgrootx1.pem')
        }
    },
)

const dbConnectMySql = async() => {
    try {
        await sequelize.authenticate()
        console.log('MYSQL conectado correctamente');
        console.log(process.env.MYSQL_HOST);
    } catch (error) {
        console.log('MYSQL error conexion',error);
    }
}

module.exports = { sequelize, dbConnectMySql }