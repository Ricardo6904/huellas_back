const validator = {}
const { check } = require('express-validator')
const validateResults = require('../utils/handleValidators')

validator.validatorCrearAdopcion = [
    check('idAnimalRescatado').exists().notEmpty().isNumeric(),
    check('idUsuario').exists().notEmpty().isNumeric(),
    check('estado').exists().notEmpty(),
    check('tipo').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = validator