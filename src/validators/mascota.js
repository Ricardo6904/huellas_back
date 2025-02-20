const { check, validationResult } = require('express-validator')
const validateResults = require('../utils/handleValidators')

const validatorCrearMascota = [
    check('nombreMascota').exists().notEmpty().isLength({min:2}),
    check('razaMascota').exists().notEmpty(),
    check('sexoMascota').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorCrearMascota }