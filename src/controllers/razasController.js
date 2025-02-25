controller = {}
const { body } = require('express-validator')
const { razasModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

controller.obtener = async (req, res) => {
    try {
        const data = await razasModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error);
        handleErrors(res, 'ERROR_GET_ESPECIES', 403)
    }

}

controller.obtenerRaza = async (req, res) => {
    try {
        const idCiudad = req.params.idCiudad
        
        const data = await razasModel.findOneData(idCiudad)
        //const data = await razasModel.findOne({idRefugio})
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_ESPECIE', 403)
        console.log(error);
        
    }
}

controller.obtenerRazaPorIdEspecie = async (req, res) => {
    try {
        const idEspecie = req.params.idEspecie
        
        const data = await razasModel.findAll({where: {idEspecie:idEspecie}})
        console.log(data);
        
        res.send({data})
    } catch (error) {
        handleErrors(res, 'ERROR_GET_RAZAS_ESPECIES', 403)
        console.log(error);
        
    }
}

controller.crear = async (req, res) => {
    try {
        const { body } = req
        // Verifica si `redesSociales` es una cadena y la convierte a JSON
    
        const data = await razasModel.create(body)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_RAZA', 403)
    }

}

controller.actualizar = async (req, res) => {
    try {
        const body = req.body
        const idRaza = req.params.id
        
        const update = await razasModel.update(body, { where: { id:idRaza } })
        const data = await razasModel.findByPk(idRaza)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_UPDATE_RAZA', 403)
    }
}

controller.eliminar = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = controller