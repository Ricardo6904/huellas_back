controller = {}
const { body } = require('express-validator')
const { provinciaModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtenerProvincias = async (req, res) => {
    try {
        const data = await provinciaModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_PROVINCIAS', 403)
    }

}

controller.obtenerProvincia = async (req, res) => {
    try {
        const idProvincia = req.params.idProvincia
        
        const data = await provinciaModel.findOneData(idProvincia)
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_PROVINCIA', 403)
        console.log(error);
        
    }
}

controller.crearProvincia = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
        const data = await provinciaModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_PROVINCIA', 403)
    }

}

controller.actualizarProvincia = async (req, res) => {
    try {
        const body = req.body
        const idProvincia = req.params.idProvincia
        console.log(req.body);
       
        const update = await provinciaModel.update(body, { where: { id:idProvincia } })
        const data = await provinciaModel.findByPk(idProvincia)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_PROVINCIA', 403)
    }
}

controller.eliminarProvincia = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller