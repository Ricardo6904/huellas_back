const controller = {};
const { matchedData } = require('express-validator');
const { usuarioModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

controller.obtenerUsuarios = async (req, res) => {
    try {
        const data = await usuarioModel.findAll({
            attributes: { exclude: ['clave'] }
        })
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
        const id = req.params.idUsuario
        const data = await usuarioModel.findOneData(id)
        res.send({ data })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_GET_USUARIO', 403)
    }
}

controller.eliminarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario
        const data = await usuarioModel.destroy({ where: { idUsuario } })
        res.send({ msg: 'Usuario eliminado' })
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_USUARIO', 403)
    }
}

controller.actualizarUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params
        const body = req.body

        const data = await usuarioModel.findByPk(idUsuario)
        if (!data) return handleHttpError(res, 'USUARIO_NOT_FOUND', 404)
        
        await usuarioModel.update(body, { where: { id: idUsuario } });
        
        res.send({ msg:'Usuario Actualizado.' })
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_USUARIO', 403)
    }
}

controller.actualizarCampoSolicitud = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar usuario por ID
        const usuario = await usuarioModel.findByPk(id);

        // Verificar si usuario existe
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verificar el estado del usuario
        if (usuario.estado === 'bloqueado') {
            return res.status(400).send({ message: 'Usuario bloqueado' });
        }

        if (usuario.adopcionPendiente === true) {
            usuario.adopcionPendiente = false
        } else {
            usuario.adopcionPendiente = true
        }

        await usuario.save();

        res.send({ message: 'Solicitud registrada', data: usuario });
    } catch (error) {
        console.error(error);
        handleErrors(res, 'ERROR_INCREMENTAR_SOLICITUDES', 500);
    }
}

controller.actualizarInfoAdicional = async (req, res) => {
   /*  try {
        const { idUsuario } = req.params;
        const { infoAdicional } = req.body;

        // Buscar el usuario
        const usuario = await usuarioModel.findByPk(idUsuario);
        if (!usuario) {
            return handleHttpError(res, 'USUARIO_NOT_FOUND', 404);
        }

        usuario.infoAdicional = infoAdicional;
        await usuario.save();

        res.send({ message: 'Información adicional actualizada', data: usuario });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_UPDATE_INFO_ADICIONAL', 403);
    } */
};

controller.obtenerInfoAdicional = async (req, res) => {
    try {
        const { idUsuario } = req.params;

        // Buscar el usuario
        const usuario = await usuarioModel.findByPk(idUsuario);
        if (!usuario) {
            return handleHttpError(res, 'USUARIO_NOT_FOUND', 404);
        }

        res.send({ infoAdicional: usuario.infoAdicional });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_GET_INFO_ADICIONAL', 403);
    }
};

module.exports = controller;