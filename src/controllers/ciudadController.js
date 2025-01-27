controller = {}
const { body } = require('express-validator')
const { ciudadModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtenerCiudades = async (req, res) => {
    try {
        const data = await ciudadModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_CIUDADES', 403)
    }

}

controller.obtenerCiudad = async (req, res) => {
    try {
        const idCiudad = req.params.idCiudad
        
        const data = await ciudadModel.findOneData(idCiudad)
        //const data = await ciudadModel.findOne({idRefugio})
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_CIUDAD', 403)
        console.log(error);
        
    }
}

controller.obtenerCiudadPorIdprovincia = async (req, res) => {
    try {
        const idProvincia = req.params.idProvincia
        
        const data = await ciudadModel.findOne({where: {idProvincia:idProvincia}})
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_CIUDADES_PROVINCIA', 403)
        console.log(error);
        
    }
}

controller.crearCiudad = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
    
        const data = await ciudadModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_CIUDAD', 403)
    }

}

controller.actualizarCiudad = async (req, res) => {
    try {
        const body = req.body
        const idCiudad = req.params.idCiudad
        
        const update = await ciudadModel.update(body, { where: { id:idCiudad } })
        const data = await ciudadModel.findByPk(idCiudad)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_CIUDAD', 403)
    }
}

controller.eliminarCiudad = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller