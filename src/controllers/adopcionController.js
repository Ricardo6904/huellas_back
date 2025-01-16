const { matchedData } = require('express-validator')
const { adopcionModel, usuarioModel } = require('../models')
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


controller.obtenerAdopcionPorIdRefugio = async (req, res) => {
    try {
        console.log(req.params);
        const idRefugio = req.params.idRefugio

        const data = await adopcionModel.findAllData(idRefugio)

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
        //const usuario = req.usuario

        req = matchedData(req)

        const adopcionExistente = await adopcionModel.findOne({
            where: {
                idMascota: req.idMascota,
                idUsuario: req.idUsuario,
            }
        })

        const usuario = await usuarioModel.findOne({
            where: {
                id: req.idUsuario
            }
        })
        console.log(req);
        
        if(usuario.adopcionPendiente === true){
            return res.status(400).send({
                message: "Solo puede realizar una adopción a la vez",
            });
        }

        if (adopcionExistente && adopcionExistente.estado === 'pendiente') {
            return res.status(400).send({
                message: "Ya tiene una solicitud pendiente para esta mascota",
            });
        }

        const data = await adopcionModel.create(req)
        res.send({ data, usuario })


    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_CREATE_ADOPCION', 403)
    }
}

module.exports = controller