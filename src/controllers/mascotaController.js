controller = {}
const { body, matchedData } = require('express-validator')
const { mascotaModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtenerMascotas = async (req, res) => {
    try {
        const data = await mascotaModel.findAllData({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_MASCOTAS', 403)
    }

}

controller.obtenerMascota = async (req, res) => {
    try {
        const idMascota = req.params.idMascota
        const data = await mascotaModel.findOneData(idMascota)
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}

controller.obtenerMascotasPorIdFundacion = async (req, res) => {
    try {
        
        console.log(req.params);
        const idRefugio = req.params.idRefugio
        
        
        const data = await mascotaModel.findAllData({
            where: {idRefugio: idRefugio}
        })
        
        if(!data){
            handleHttpError(res, 'MASCOTA_FUNDACION_NOT_EXIST', 404)
            return
        }
        res.send({data})
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
        const { idMascota, ...body } = req.body
        const update = await mascotaModel.update(body, { where: { idMascota } })
        const data = await mascotaModel.findByPk(idMascota)
        res.send({ data })
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}

controller.eliminarMascota = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = controller