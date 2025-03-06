controller = {}
const { Op } = require('sequelize')
const { animalRescatadoModel } = require('../models')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const fs = require('fs')

const MEDIA_PATH = `${__dirname}/../storage`


controller.obtenerMascota = async (req, res) => {
    try {
        const id = req.params.id

        const data = await animalRescatadoModel.findOneData(id)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
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
        const { count, rows } = await animalRescatadoModel.findAndCountAllData(
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
}

controller.obtenerMascotasPorIdFundacion = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const idRefugio = req.params.idRefugio

        let filtro = {};
        filtro.idRefugio = idRefugio

        //filtro por nombre
        const { nombre } = req.query;
        if (nombre) {
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        }

        const { count, rows } = await animalRescatadoModel.findAndCountAllDataRefugio(
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
        
        handleErrors(res, 'ERROR_GET_MASCOTA_FUNDACION', 403)
    }
}

controller.obtenerMascotasPorIdFundacionOld = async (req, res) => {
    try {

        const idRefugio = req.params.idRefugio


        const data = await animalRescatadoModel.findAllData({
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
        const data = await animalRescatadoModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_MASCOTA', 403)
    }

}

controller.actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.params;

        // Buscar la mascota
        const mascota = await animalRescatadoModel.findByPk(id);

        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Si cambia a "adoptado", restablecer solicitudes pendientes
        if (estado === 'adoptado') {
            mascota.solicitudesPendientes = 0;
        }


        const body = req.body;
        const update = await animalRescatadoModel.update(body, { where: { id: id } })
        const data = await animalRescatadoModel.findByPk(id)
        res.send({ message: 'Mascota actualizada', data: mascota });
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}


controller.eliminarMascota = async (req, res) => {
    try {
        const id = req.params.id
        const mascota = await animalRescatadoModel.findOneData(id)
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

//todo
controller.mascotaAdoptada = async(req,res) => {
    try {
        const { id } = req.params;
        
        // Buscar la mascota por ID
        const mascota = await animalRescatadoModel.findByPk(id);

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