controller = {}
const { body } = require('express-validator')
const { especiesModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtener = async (req, res) => {
    try {
        const data = await especiesModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_ESPECIES', 403)
    }

}

controller.obtenerEspecie = async (req, res) => {
    try {
        const idEspecie = req.params.id
        
        const data = await especiesModel.findOneData(idEspecie)
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_ESPECIE', 403)
        console.log(error);
        
    }
}

controller.crear = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
        const data = await especiesModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_ESPECIE', 403)
    }

}

controller.actualizar = async (req, res) => {
    try {
        const body = req.body
        const idEspecie = req.params.id
        console.log(req.body);
       
        const update = await especiesModel.update(body, { where: { id:idEspecie } })
        const data = await especiesModel.findByPk(idEspecie)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_ESPECIE', 403)
    }
}

controller.eliminar = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller