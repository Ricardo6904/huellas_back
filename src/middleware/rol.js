const handleHttpError = require('../utils/handleErrors')
/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (rol) => (req, res, next) => {
    try {
        const { usuario } = req
        console.log({ usuario });
        const rolesPorUsuario = usuario.rolUsuario

        const checkValueRol = rol.some((rolSingle) => rolesPorUsuario.includes(rolSingle))
        if (!checkValueRol) {
            handleHttpError(req, 'USER_NOT_PERMISSIONS', 403)
            return
        }

        next()
    } catch (error) {
        handleHttpError(res, 'ERROR_PERMISSIONS', 403)
    }

}

module.exports = checkRol