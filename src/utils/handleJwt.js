const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Debes pasar el objeto del usuario
 * @param {*} usuario 
 */

const tokenSign = async (usuario) => {
    const sign = jwt.sign(
        {
            id: usuario.idUsuario,
            rol: usuario.rolUsuario
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    )
    return sign
}

/**
 * Pasar el token de session jwt
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken}