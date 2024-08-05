const { matchedData } = require('express-validator')
const { adopcionModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

const controller = {}

controller.obtenerAdopciones = async (req, res) => {
    try {
        const usuario = req.usuario
        const data = await adopcionModel.findAll()
        usuario.set('claveUsuario', undefined, {strict: false})
        res.send({data, usuario})
    } catch (error) {
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