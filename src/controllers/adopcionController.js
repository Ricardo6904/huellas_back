const { matchedData } = require('express-validator')
const { adopcionModel, mascotaModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

const controller = {}

controller.obtenerAdopciones = async (req, res) => {
    try {
        const data = await adopcionModel.findAll()
        res.send({ data })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_GET_ADOPCION_LIST', 403)
    }
}

//TODO
controller.obtenerAdopcionPorIdRefugio = async (req, res) => {
    try {
        const idRefugio = req.params.idRefugio
        const data = await adopcionModel.findAllData({
            where: { idRefugio: idRefugio }
        })

        if (!data) {
            handleHttpError(res, 'ADOPCION_MASCOTA_NOT_EXIST', 403)
            return
        }
        //usuario.set('claveUsuario', undefined, { strict: false })
        res.send({ data })
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
        res.send({ data, usuario })
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ADOPCION', 403)
    }
}

module.exports = controller