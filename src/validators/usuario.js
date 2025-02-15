const { check, validationResult } = require('express-validator')
const validateResults = require('../utils/handleValidators')

const validatorCrearUsuario = [
    check('nombres').exists().notEmpty().isLength({min:3}),
    check('apellidos').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorCrearUsuario }