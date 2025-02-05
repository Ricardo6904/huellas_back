const handleHttpError = require('../utils/handleErrors')
const { verifyToken } = require('../utils/handleJwt')
const { usuarioModel, refugioModel } = require('../models')

/* const authMiddleware = async (req, res, next) => {
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
} */

const authMiddleware = async(req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        const dataToken = await verifyToken(token);
        if(!dataToken.id){
            handleHttpError(res, 'ERROR_ID_TOKEN')
            return
        }

        // Si el token está a punto de expirar (por ejemplo, en los próximos 5 minutos), genera un nuevo token
        const currentTime = Date.now() / 1000;
        if (dataToken.exp - currentTime < 600) { // 600 segundos = 10 minutos
            const newToken = jwt.sign(
                { id: dataToken.id, email: dataToken.email, rol: dataToken.rol },
                JWT_SECRET,
                { expiresIn: '1h' } // Nuevo token con 1 hora de expiración
            );

            // Envía el nuevo token en la respuesta
            res.set('New-Token', newToken);
        }

        const usuario = await usuarioModel.findOne({ where: { id: dataToken.id } })
        if (!usuario) {
            const refugio = await refugioModel.findOne({ where: { id: dataToken.id } })
            req.refugio = refugio
        }
        req.usuario = usuario
        next();
    } catch (error) {
        console.log('error1',error);
        
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = authMiddleware