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

        let filtro = {};

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
        let filtro = {};
        filtro.idRefugio = idRefugio
        
        //filtro por nombre
        const { nombreMascota } = req.query;

        if (nombreMascota) {
            filtro.nombreMascota = { [Op.like]: `%${nombreMascota}%` };
        }


        const { count, rows } = await mascotaModel.findAndCountAllData(
            limit,
            offset,
            filtro
        )

        if (!rows || rows.length === 0) {
            handleHttpError(res, 'MASCOTA_FUNDACION_NOT_EXIST', 404)
            return
        }

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
        console.log(req.params);
        
        const body = req.body;
        const update = await mascotaModel.update(body, { where: { id: idMascota } })
        const data = await mascotaModel.findByPk(idMascota)
        res.send({ data })
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}


controller.eliminarMascota = async (req, res) => {
    try {
        const idMascota = req.params.idMascota
        const mascota = await mascotaModel.findOneData(idMascota)
        const data = await mascotaModel.destroy({ where: { idMascota } })
        const idStorage = mascota.idStorage

        const dataFile = await storageModel.findByPk(idStorage)
        const { filenameStorage } = dataFile

        const filePath = `${MEDIA_PATH}/${filenameStorage}`

        fs.unlinkSync(filePath)

        const dataStorage = await storageModel.destroy({ where: { idStorage } })

        res.send({ msg: 'Mascota eliminado' })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_DELETE_MASCOTA', 403)
    }
}

module.exports = controller