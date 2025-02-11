controller = {}
const { body } = require('express-validator')
const { refugioModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtenerRefugios = async (req, res) => {
    try {
        const data = await refugioModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_REFUGIOS', 403)
    }

}

controller.obtenerRefugio = async (req, res) => {
    try {
        const idRefugio = req.params.idRefugio
        const data = await refugioModel.findOneData(idRefugio)
        //const data = await refugioModel.findOne({idRefugio})
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_REFUGIO', 403)
        console.log(error);
        
    }
}

controller.crearRefugio = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
        if (typeof body.redesSociales === 'string') {
            body.redesSociales = JSON.parse(body.redesSociales);
        }
        const data = await refugioModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_REFUGIO', 403)
    }

}

controller.actualizarRefugio = async (req, res) => {
    try {
        const body = req.body
        const idRefugio = req.params.idRefugio
        console.log(req.body);
        
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
        if (typeof body.redesSociales === 'string') {
            body.redesSociales = JSON.parse(body.redesSociales);
        }
        
        const update = await refugioModel.update(body, { where: { id:idRefugio } })
        const data = await refugioModel.findByPk(idRefugio)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_REFUGIO', 403)
    }
}

controller.eliminarRefugio = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller