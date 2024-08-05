const controller = {};
const { matchedData } = require('express-validator');
const { usuarioModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

controller.obtenerUsuarios = async (req, res) => {
    try {
        const data = await usuarioModel.findAll({})
        res.send({ data })
        
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_GET_USUARIOS', 403)
    }
}



controller.crearUsuario = async (req, res) => {
    try {
        //const body = matchedData(req)
        const body = req.body
        const data = await usuarioModel.create(body)
        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_USUARIOS', 403)
    }

}

controller.obtenerUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario
        const data = await usuarioModel.findByPk(idUsuario)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_USUARIO', 403)
    }
}

controller.eliminarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario
        const data = await usuarioModel.destroy({where:{idUsuario}})
        res.send({msg:'Usuario eliminado'})
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_USUARIO', 403)
    }
}

controller.actualizarUsuario = async (req,res) => {
    try {
        const {idUsuario, ...body} = req.body
        const [rows] = await usuarioModel.update(body, {where:{idUsuario}});
        if(rows === 0) return handleHttpError(res, 'USUARIO_NOT_FOUND', 404)
        const data = await usuarioModel.findByPk(idUsuario)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_USUARIO', 403)
    }
}

module.exports = controller;