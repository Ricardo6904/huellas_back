const { matchedData } = require("express-validator")
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign, tokenSignRefugio } = require('../utils/handleJwt')
const { usuarioModel } = require('../models')
const { refugioModel } = require('../models')
const handleHttpError = require('../utils/handleErrors')
const jwt = require('jsonwebtoken')
const mensajeriaController = require('./mensajeriaController')

controller = {}

/**
 * Controlador encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
controller.register = async (req, res) => {
    try {
        req = matchedData(req)

        //token
        //const token = jwt.sign({email: req.email}, 'secret', { expiresIn: '1h' })
        const usuarioExistente = await usuarioModel.findOne({
            where: {
                cedula: req.cedula,
                email: req.email
            }
        });


        if (usuarioExistente) {
            res.status(400).send({ message: 'Correo o Cédula ya registrados' })
        }
        const clave = await encrypt(req.clave)
        const body = { ...req, clave, verificado: false }
        const dataUsuario = await usuarioModel.create(body)
        dataUsuario.set('clave', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUsuario),
            usuario: dataUsuario
        }

        const verificationlink = `https://app.adoptahuellas.pet/api/auth/verify-email?token=${data.token}`

        mensajeriaController.enviarVerificacionEmail(req.email, verificationlink)

        res.send({ data, message: 'Usuario registrado. Por favor, verifica tu correo.' })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_REGISTER_USUARIO', 403)
    }

}

controller.registerRefugio = async (req, res) => {
    try {
        req = matchedData(req)
        const clave = await encrypt(req.clave)
        const body = { ...req, clave }
        const dataRefugio = await refugioModel.create(body)


        dataRefugio.set('claveRefugio', undefined, { strict: false })

        const data = {
            token: await tokenSignRefugio(dataRefugio),
            usuario: dataRefugio
        }

        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'ERROR_REGISTER_REFUGIO', 403)
    }
}

/**
 * Controlador encargado de logear
 * @param {*} req 
 * @param {*} res 
 */
/*controller.login = async (req, res) => {
    try {
        req = matchedData(req)
        const usuario = await usuarioModel.findOne({
            where: { email: req.email },
            attributes: ['id', 'clave', 'nombres', 'rol', 'email']
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
}*/

controller.login = async (req, res) => {
    try {
        req = matchedData(req)

        const { email, clave } = req;

        // Primero, busca en la tabla de usuarios
        let user = await usuarioModel.findOne({
            where: { email: email },
            attributes: ['id', 'clave', 'nombres', 'rol', 'email']
        });

        if (user) {
            const hashPassword = user.get('clave');
            const check = await compare(clave, hashPassword);

            if (!check) {
                return handleHttpError(res, 'INVALID_PASSWORD', 401);
            }

            user.set('clave', undefined, { strict: false });
            const token = await tokenSign(user.toJSON());


            return res.send({ token, user, rol: 'usuario' });

        } else {
            // Si no es usuario, busca en la tabla de refugios
            let refugio = await refugioModel.findOne({
                where: { email: email },
                attributes: ['id', 'clave', 'nombre', 'rol', 'email']
            });

            if (!refugio) {
                return handleHttpError(res, 'USER_OR_REFUGIO_NOT_EXIST', 404);
            }

            const hashPassword = refugio.get('clave');
            const check = await compare(clave, hashPassword);

            if (!check) {
                return handleHttpError(res, 'INVALID_PASSWORD', 401);
            }

            refugio.set('clave', undefined, { strict: false });
            const token = await tokenSignRefugio(refugio.toJSON());

            return res.send({ token, refugio, rol: 'refugio' });
        }

    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_LOGIN_UNIFIED', 403);
    }
}


controller.loginRefugio = async (req, res) => {
    try {
        req = matchedData(req)

        const refugio = await refugioModel.findOne({
            where: { email: req.email },
            attributes: ['id', 'clave', 'nombre', 'rol', 'email']
        })
        if (!refugio) {
            handleHttpError(res, 'REFUGIO_NOT_EXIST', 404)
            return

        }
        const hashPassword = refugio.get('clave')
        const check = await compare(req.clave, hashPassword)

        if (!check) {
            handleHttpError(res, 'INVALID PASSWORD', 401)
            return
        }

        refugio.set('clave', undefined, { strict: false })

        const refugioData = refugio.toJSON()
        const data = {
            token: await tokenSignRefugio(refugioData),
            refugio
        }

        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'ERROR_LOGIN_REFUGIO', 403)
    }
}

controller.recuperarContrasena = async(req,res) =>{
    try {
        const email = req.body.email
        const usuario = await usuarioModel.findOne({
            where: { email: email }
        })
        
        if(!usuario){
            handleHttpError(res, 'INVALID EMAIL', 401)
            return 
        }
        
        // Generar una nueva contraseña de 7 caracteres
        const nuevaContrasena = generarContrasenaAleatoria(7);

        // Encriptar la nueva contraseña
        const claveEncriptada = await encrypt(nuevaContrasena);

        await usuarioModel.update(
            { clave: claveEncriptada },
            { where: { email: email } }
        );

        mensajeriaController.recuperarContrasena(email, nuevaContrasena)
    
        res.send({message:'Contraseña recuperada con éxito'})
        
    } catch (error) {        
        res.status(500).send({ message: 'Error al reenviar contraseña' });
    }
}

controller.verificarCorreo = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).send({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de usar la misma clave secreta que usaste para firmar el token
        const usuario = await usuarioModel.findByPk(decoded.id);

        // Enviar el token al frontend con el estado de verificación
        const authToken = jwt.sign({ id: usuario.id, verificado: usuario.verificado }, process.env.JWT_SECRET);

        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        usuario.verificado = true;
        await usuario.save();

        const encodedToken = encodeURIComponent(authToken);

        // Redirigir a la página de Angular
        res.redirect(`https://www.adoptahuellas.pet/verification-success?token=${encodedToken}`); // Cambia la URL según tu entorno
        //res.send({ message: 'Correo electrónico verificado con éxito' });

  
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al verificar el correo electrónico' });
    }
}

const generarContrasenaAleatoria = (longitud) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
    }
    return contrasena;
};


module.exports = controller