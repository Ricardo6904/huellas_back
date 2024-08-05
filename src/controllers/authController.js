const { matchedData } = require("express-validator")
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')
const { usuarioModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')

controller = {}

/**
 * Controlador encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
controller.register = async (req, res) => {
    try {
        req = matchedData(req)
        const claveUsuario = await encrypt(req.claveUsuario)
        const body = { ...req, claveUsuario }
        const dataUsuario = await usuarioModel.create(body)
        dataUsuario.set('claveUsuario', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUsuario),
            usuario: dataUsuario
        }

        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'ERROR_REGISTER_USUARIO', 403)
    }

}

/**
 * Controlador encargado de logear
 * @param {*} req 
 * @param {*} res 
 */
controller.login = async (req, res) => {
    try {
        req = matchedData(req)
        const usuario = await usuarioModel.findOne({
            where: { correo: req.correo },
            attributes: ['id', 'clave', 'nombres', 'rol', 'correo']
        })
        if (!usuario) {
            handleHttpError(res, 'USER_NOT_EXIST', 404)
            return
        }
        const hashPassword = usuario.get('clave')
        const check = await compare(req.clave, hashPassword)

        if (!check) {
            handleHttpError(res, 'INVALID_PASSWORD', 401)
            return
        }

        usuario.set('clave', undefined, { strict: false })

        const usuarioData = usuario.toJSON()
        const data = {
            token: await tokenSign(usuarioData),
            usuario
        }

        res.send({ data })

    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_LOGIN_USUARIO', 403)
    }
}



module.exports = controller