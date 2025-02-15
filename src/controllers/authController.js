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

        const codigoVerificacion = generarCodigoVerificacion();
        const fechaExpiracion = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de expiración


        const usuarioExistente = await usuarioModel.findOne({
            where: {
                identificacion: req.identificacion,
                email: req.email
            }
        });


        if (usuarioExistente) {
            res.status(400).send({ message: 'Correo o Número de Identificacion ya registrados' })
        }

        const clave = await encrypt(req.clave)
        const body = {
            ...req, clave, verificado: false, codigoVerificacion,
            fechaExpiracionCodigo: fechaExpiracion,
        }
        const dataUsuario = await usuarioModel.create(body)
        dataUsuario.set('clave', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUsuario),
            usuario: dataUsuario
        }


        await mensajeriaController.enviarVerificacionEmail(req.email, codigoVerificacion)

        res.send({ data, message: 'Usuario registrado. Por favor, revisa tu correo.' })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_REGISTER_USUARIO', 403)
    }

}

const generarCodigoVerificacion = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
};

controller.verificarCodigo = async (req, res) => {
    try {
        const { token, codigo } = req.body;

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const email = decoded.email;

        const usuario = await usuarioModel.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verificar si el código coincide y no ha expirado
        if (
            usuario.codigoVerificacion !== codigo ||
            new Date() > usuario.fechaExpiracionCodigo
        ) {
            return res.status(400).send({ message: 'Código inválido o expirado' });
        }

        // Marcar el correo como verificado
        usuario.verificado = true;
        usuario.codigoVerificacion = null; // Limpiar el código
        usuario.fechaExpiracionCodigo = null; // Limpiar la fecha de expiración
        await usuario.save();

        res.status(200).send({ message: 'Correo electrónico verificado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al verificar el código' });
    }
};

controller.resendCode = async (req, res) => {
    try {
        const { token } = req.body;

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email; // Extraer el email del token

        // Generar un nuevo código de verificación
        const codigoVerificacion = generarCodigoVerificacion();
        const fechaExpiracion = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de expiración

        // Actualizar el código en la base de datos
        const usuario = await usuarioModel.findOne({ where: { email } });
        usuario.codigoVerificacion = codigoVerificacion;
        usuario.fechaExpiracionCodigo = fechaExpiracion;
        await usuario.save();

        // Enviar el nuevo código por correo
        await enviarCorreoVerificacion(email, codigoVerificacion);

        res.status(200).send({ message: 'Código reenviado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al reenviar el código' });
    }
  };

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

controller.recuperarContrasena = async (req, res) => {
    try {
        const email = req.body.email
        const usuario = await usuarioModel.findOne({
            where: { email: email }
        })

        if (!usuario) {
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

        res.send({ message: 'Contraseña recuperada con éxito' })

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