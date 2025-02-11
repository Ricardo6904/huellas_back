controller = {}
const { body } = require('express-validator')
const { redesSocialesModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const { where } = require('sequelize')

controller.obtener = async (req, res) => {
    try {
        const data = await redesSocialesModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_REDES_SOCIALES', 403)
    }

}

controller.obtenerRedSocialPorIdRefugio = async (req, res) => {
    try {
        const idRefugio = req.params.idRefugio
        
        const data = await redesSocialesModel.findAll({where: {idRefugio: idRefugio}})

        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_RED_SOCIAL', 403)
        console.log(error);
        
    }
}

controller.crear = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
        const data = await redesSocialesModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_REDES_SOCIALES', 403)
    }

}

controller.actualizar = async (req, res) => {
    try {
        const body = req.body
        const idProvincia = req.params.idProvincia
        console.log(req.body);
       
        const update = await redesSocialesModel.update(body, { where: { id:idProvincia } })
        const data = await redesSocialesModel.findByPk(idProvincia)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_REDES_SOCIALES', 403)
    }
}

controller.eliminar = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller