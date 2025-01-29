const handleHttpError = require('../utils/handleErrors')
const { verifyToken } = require('../utils/handleJwt')
const { usuarioModel, refugioModel } = require('../models')

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, 'NOT_TOKEN', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        
        const dataToken = await verifyToken(token)
        if(!dataToken.id){
            handleHttpError(res, 'ERROR_ID_TOKEN')
            return
        }

        const usuario = await usuarioModel.findOne({where:{id:dataToken.id}})
        if(!usuario){
            const refugio = await refugioModel.findOne({where: {id:dataToken.id}})
            req.refugio = refugio
        }
        req.usuario = usuario

        next()
        
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'NOT_SESSION', 401)
    }
}

module.exports = authMiddleware