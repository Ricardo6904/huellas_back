controller = {}
const { Op } = require('sequelize')
const { historialMascotasModel, mascotasModel } = require('../models')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const fs = require('fs')


controller.obtener = async (req, res) => {
    try {

        
        const id = req.params.id

        const data = await historialMascotasModel.findOneData(id)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}

controller.obtenerHistorialMascotas = async (req, res) => {
    try {

        const data = await historialMascotasModel.findAll()
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_HISTORIAL_MASCOTAS', 403)
    }
}

/* 
controller.obtenerHistorialMascotas = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        //filtros de búsqueda
        const { nombre, edad, raza, tamano } = req.query;

        let filtro = {
            estado: {
                [Op.notIn]: ['adoptado','pendiente']
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
        const { count, rows } = await historialMascotasModel.findAndCountAllData(
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
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
} */

controller.obtenerHistorialMascotasPorIdUsuario = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const idUsuario = req.params.id

        

        let filtro = {idUsuario};
        //filtro.id = idUsuario

        //filtro por nombre
        const { nombre } = req.query;
        if (nombre) {
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        }


        const { count, rows } = await historialMascotasModel.findAndCountAllData(
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
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA_USUARIO', 403)
    }
}

controller.crear = async (req, res) => {
    try {
        const { body } = req
        const historialMascota = await historialMascotasModel.create(body)
        const mascotaUsuario = await mascotasModel.findByPk(historialMascota.idMascota)
        console.log(mascotaUsuario);
        
        const mascotaUrl = `${historialMascota.urlQR}/${historialMascota.id}`

        historialMascota.urlQR = mascotaUrl
        mascotaUsuario.estado = 'perdido'

        await historialMascota.save()
        await mascotaUsuario.save()

        res.send({ historialMascota })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_HISTORIAL_MASCOTA', 403)
    }

}

controller.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.params;

        // Buscar la mascota
        const mascota = await historialMascotasModel.findByPk(id);

        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Si cambia a "adoptado", restablecer solicitudes pendientes
        if (estado === 'adoptado') {
            mascota.solicitudesPendientes = 0;
        }


        const body = req.body;
        const update = await historialMascotasModel.update(body, { where: { id: id } })
        const data = await historialMascotasModel.findByPk(id)
        res.send({ message: 'Mascota actualizada', data: mascota });
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}


controller.eliminar = async (req, res) => {
    try {
        const id = req.params.id
        const mascota = await historialMascotasModel.findOneData(id)
        const data = await animalRescatado.destroy({ where: { id: id } })
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




module.exports = controller