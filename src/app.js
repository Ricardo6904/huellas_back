require('dotenv').config();
const morganBody = require('morgan-body')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require("./docs/swagger");
const loggerStream = require('./utils/handleLogger')

const cors = require('cors');
const express = require('express');
const {dbConnectMySql} = require('./config/mysql')
const path = require('path')
const app = express();

app.use(express.json());



//configuraciones
app.set('port', process.env.PORT || 8080)
/* app.use(cors({
    origin: 'https://www.adoptahuellas.pet',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); */
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'/storage')))

// Intercepción de solicitudes
morganBody(app, {
    noColors: true,
    //stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400
    }
})

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => { res.redirect('/api-docs') })

dbConnectMySql();

//importando rutas
app.use('/api', require('./routes'))


app.listen(app.get('port'), () => {
    console.log('Servidor escuchando por el puerto', app.get('port'));
});
