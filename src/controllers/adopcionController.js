const { matchedData } = require('express-validator')
const { adopcionModel, usuarioModel, animalRescatadoModel } = require('../models')
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
                idAnimalRescatado: req.idAnimalRescatado,
                idUsuario: req.idUsuario,
            }
        })

        const usuario = await usuarioModel.findOne({
            where: {
                id: req.idUsuario
            }
        })

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

        await animalRescatadoModel.update(
            { estado: 'pendiente' }, // Cambiar el estado
            { where: { id: req.idAnimalRescatado } } // Mascota correspondiente
        );


        const data = await adopcionModel.create(req);
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

        const mascota = await animalRescatadoModel.findOne({
            where: {
                id: adopcion.idAnimalRescatado
            }
        })

        const usuario = await usuarioModel.findOne({
            where: { id: adopcion.idUsuario }
        });

        if (!mascota) {
            return res.status(400).send({
                message: "Mascota no encontrada",
            });
        }

        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        adopcion.estado = 'aprobado'
        mascota.estado = 'adoptado'
        usuario.adopcionPendiente = !usuario.adopcionPendiente;

        await Promise.all([mascota.save(), adopcion.save(), usuario.save()]);
        
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

        const mascota = await animalRescatadoModel.findOne({
            where: {
                id: adopcion.idAnimalRescatado
            }
        })

        const usuario = await usuarioModel.findOne({
            where: { id: adopcion.idUsuario }
        });

        if (!mascota) {
            return res.status(400).send({
                message: "Mascota no encontrada",
            });
        }

        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }


        adopcion.estado = 'rechazado'
        mascota.estado = 'disponible'
        usuario.adopcionPendiente = !usuario.adopcionPendiente;

        await Promise.all([mascota.save(), adopcion.save(), usuario.save()]);

        res.send({ adopcion })

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_CHANGE_ESTADOS_ADOPCION', 403)
    }
}


module.exports = controller