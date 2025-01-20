const { matchedData } = require('express-validator')
const { adopcionModel, usuarioModel, mascotaModel } = require('../models')
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
        const estado = 'pendiente'
        const data = await adopcionModel.findAllData(idRefugio, estado)

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

        if (usuario.adopcionPendiente === true) {
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

controller.aprobarSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const adopcion = await adopcionModel.findOne({
            where: { id: id }
        })

        const mascota = await mascotaModel.findOne({
            where: {
                id: adopcion.idMascota
            }
        })

        if (mascota.estado !== 'disponible') {
            return res.status(400).send({
                message: "Mascota no disponible",
            });
        }

        adopcion.estado = 'aprobado'
        mascota.estado = 'adoptado'
        await mascota.save()
        await adopcion.save()
        res.send({ adopcion })

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_CHANGE_ESTADOS_ADOPCION', 403)
    }
}
controller.rechazarSolicitud = async (req, res) => {
    try {
        const { id } = req.params;

        const adopcion = await adopcionModel.findOne({
            where: { id: id }
        })

        const mascota = await mascotaModel.findOne({
            where: {
                id: adopcion.idMascota
            }
        })

        console.log(mascota);
        
        if (mascota.estado !== 'disponible') {
            return res.status(400).send({
                message: "Mascota no disponible",
            });
        }

        adopcion.estado = 'rechazado'
        mascota.estado = 'disponible'
        await mascota.save()
        await adopcion.save()
        res.send({ adopcion })

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_CHANGE_ESTADOS_ADOPCION', 403)
    }
}


module.exports = controller