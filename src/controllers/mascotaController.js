controller = {}
const { Op } = require('sequelize')
const { body, matchedData } = require('express-validator')
const { mascotaModel } = require('../models')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const fs = require('fs')

const MEDIA_PATH = `${__dirname}/../storage`


controller.obtenerMascota = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.params);

        const data = await mascotaModel.findOneData(id)
        res.send({ data })
    } catch (error) {
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}

controller.obtenerMascotas = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        //filtros de búsqueda
        const { nombre, edad, raza, tamano } = req.query;

        let filtro = {
            solicitudesPendientes: {
                [Op.lt]: 3, // Filtrar mascotas con menos de 3 solicitudes pendientes
            },
            estado: {
                [Op.ne]: 'Adoptado'
            }
        };

        if (nombre)
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        if (edad)
            filtro.edad = edad;
        if (raza)
            filtro.raza = raza;
        if (tamano)
            filtro.tamano = tamano;


        //consulta con paginación usando limit y offset
        const { count, rows } = await mascotaModel.findAndCountAllData(
            limit,
            offset,
            filtro
        )

        //devolver la respuesta con datos y paginación
        res.send({
            data: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}
controller.obtenerMascotasPorIdFundacion = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const idRefugio = req.params.idRefugio
        console.log(req.params);

        let filtro = {};
        filtro.idRefugio = idRefugio

        //filtro por nombre
        const { nombre } = req.query;
        console.log(req.query);

        if (nombre) {
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        }


        const { count, rows } = await mascotaModel.findAndCountAllData(
            limit,
            offset,
            filtro
        )



        res.send({
            data: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        handleErrors(res, 'ERROR_GET_MASCOTA_FUNDACION', 403)
    }
}

controller.obtenerMascotasPorIdFundacionOld = async (req, res) => {
    try {

        const idRefugio = req.params.idRefugio


        const data = await mascotaModel.findAllData({
            where: { idRefugio: idRefugio }
        })

        if (!data) {
            handleHttpError(res, 'MASCOTA_FUNDACION_NOT_EXIST', 404)
            return
        }
        res.send({ data })
    } catch (error) {
        handleErrors(res, 'ERROR_GET_MASCOTA_FUNDACION', 403)
    }
}


controller.crearMascota = async (req, res) => {
    try {
        const { body } = req
        const data = await mascotaModel.create(body)
        res.send({ data })
    } catch (error) {
        handleErrors(res, 'ERROR_CREATE_MASCOTA', 403)
    }

}

controller.actualizarMascota = async (req, res) => {
    try {
        const { idMascota } = req.params;
        const { estado } = req.params;

        // Buscar la mascota
        const mascota = await mascotaModel.findByPk(idMascota);

        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Si cambia a "adoptado", restablecer solicitudes pendientes
        if (estado === 'adoptado') {
            mascota.solicitudesPendientes = 0;
        }


        const body = req.body;
        const update = await mascotaModel.update(body, { where: { id: idMascota } })
        const data = await mascotaModel.findByPk(idMascota)
        res.send({ message: 'Mascota actualizada', data: mascota });
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}


controller.eliminarMascota = async (req, res) => {
    try {
        const idMascota = req.params.idMascota
        const mascota = await mascotaModel.findOneData(idMascota)
        const data = await mascotaModel.destroy({ where: { id: idMascota } })
        const idStorage = mascota.idStorage

        const dataFile = await storageModel.findByPk(idStorage)
        const { filename } = dataFile

        const filePath = `${MEDIA_PATH}/${filename}`

        fs.unlinkSync(filePath)

        const dataStorage = await storageModel.destroy({ where: { id: idStorage } })

        res.send({ msg: 'Mascota eliminada' })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_DELETE_MASCOTA', 403)
    }
}

controller.incrementarSolicitudes = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar la mascota por ID
        const mascota = await mascotaModel.findByPk(id);

        // Verificar si la mascota existe
        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Verificar el estado de la mascota
        if (mascota.estado === 'adoptado') {
            return res.status(400).send({ message: 'No se pueden realizar solicitudes para una mascota adoptada' });
        }

        // Incrementar solicitudes pendientes
        if (mascota.solicitudesPendientes < 3)
            mascota.solicitudesPendientes += 1;

        await mascota.save();

        res.send({ message: 'Solicitud registrada', data: mascota });
    } catch (error) {
        console.error(error);
        handleErrors(res, 'ERROR_INCREMENTAR_SOLICITUDES', 500);
    }
}

controller.decrementarSolicitudes = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar la mascota por ID
        const mascota = await mascotaModel.findByPk(id);
        console.log(id, mascota);
        

        // Verificar si la mascota existe
        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Verificar que el número de solicitudes pendientes sea mayor a 0
        if (mascota.solicitudesPendientes === 0) {
            return res.status(400).send({ message: 'No hay solicitudes pendientes para decrementar' });
        }

        // Decrementar solicitudes pendientes
        mascota.solicitudesPendientes -= 1;
        await mascota.save();

        res.send({ message: 'Solicitud eliminada', data: mascota });
    } catch (error) {
        console.error(error);
        handleErrors(res, 'ERROR_DECREMENTAR_SOLICITUDES', 500);
    }
};

//todo
controller.mascotaAdoptada = async(req,res) => {
    try {
        const { id } = req.params;
        
        // Buscar la mascota por ID
        const mascota = await mascotaModel.findByPk(id);

        // Verificar si la mascota existe
        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        if (mascota.estado === 'Adoptado') {
            return res.status(400).send({ message: 'Esta mascota ya ha sido adoptada.' });
        }

        // Decrementar solicitudes pendientes
        mascota.estado = 'Adoptado';
        await mascota.save();

        res.send({ message: 'Estado actualizado', data: mascota });
    } catch (error) {
        handleErrors(res, 'ERROR_CAMBIAR_ESTADO_MASCOTA', 500);
    }
}


module.exports = controller