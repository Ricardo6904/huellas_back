const validator = {}
const { check } = require('express-validator')
const validateResults = require('../utils/handleValidators')

validator.validatorCrearAdopcion = [
    check('idMascota').exists().notEmpty().isNumeric(),
    check('idUsuario').exists().notEmpty().isNumeric(),
    check('estado').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = validator