const validator = {}
const {check} = require('express-validator')
const validateResults = require('../utils/handleValidators')

validator.validatorRegistrarUsuario = [
    check('nombres').exists().notEmpty().isLength({min:2, max:45}),
    check('apellidos').exists().notEmpty().isLength({min:2, max:45}),
    check('celular').exists().notEmpty().isLength({min:8, max:10}),
    check('tipoIdentificacion').exists().notEmpty(),
    check('identificacion').exists().notEmpty().isLength({min:10, max:10}),
    check('fechaNacimiento').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    check('clave').exists().notEmpty().isLength({min:2, max:80}),
    check('rol').exists().notEmpty(),
    check('idProvincia').exists().notEmpty(),
    check('idCiudad').exists().notEmpty(),
    check('direccion').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

validator.validatorLogin = [
    check('email').exists().notEmpty().isEmail(),
    check('clave').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

validator.validatorRegistrarRefugio = [
    check('nombre').exists().notEmpty().isLength({min:2, max:45}),
    check('direccion').exists().notEmpty().isLength({min:2, max:45}),
    check('ciudad').exists().notEmpty().isLength({min:2, max:45}),
    check('provincia').exists().notEmpty(),
    check('celular').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    check('rol').exists().notEmpty(),
    check('clave').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

validator.validatorLoginRefugio = [
    check('email').exists().notEmpty().isEmail(),
    check('clave').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = validator