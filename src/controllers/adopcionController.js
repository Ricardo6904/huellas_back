const { matchedData } = require('express-validator')
const { adopcionModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

const controller = {}

controller.obtenerAdopciones = async (req, res) => {
    try {
        const data = await adopcionModel.findAll()
        res.send({data})
    } catch (error) {
        console.log(error);
        
        handleHttpError(res, 'ERROR_GET_ADOPCION_LIST', 403)
    }
}

//TODO
controller.obtenerAdopcionPorRefugio = async (req, res) => {
    try {
        const idRefugio = req.idRefugio
        const data = await adopcionModel.findOne(idRefugio)
        usuario.set('claveUsuario', undefined, {strict: false})
        res.send({data, usuario})
    } catch (error) {
        console.log(error);
        
        handleHttpError(res, 'ERROR_GET_ADOPCION_LIST', 403)
    }
}

controller.crearAdopcion = async (req, res) => {
    try {
        const usuario = req.usuario
        req = matchedData(req)
        const data = await adopcionModel.create(req)
        res.send({data, usuario})
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ADOPCION', 403)
    }
}

module.exports = controller