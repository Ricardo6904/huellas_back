const { check, validationResult } = require('express-validator')
const validateResults = require('../utils/handleValidators')

const validatorCrearUsuario = [
    check('nombresUsuario').exists().notEmpty().isLength({min:3}),
    check('apellidosUsuario').exists().notEmpty(),
    check('correoUsuario').exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorCrearUsuario }