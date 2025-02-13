const { body } = require('express-validator');
const { check, validationResult } = require('express-validator')
const validateResults = require('../utils/handleValidators')

const validarInfoAdicional = [
    body('infoAdicional.tienePatio').optional().isBoolean(),
    body('infoAdicional.tieneCerramiento').optional().isBoolean(),
    body('infoAdicional.viveEnCasaODepartamento').optional().isIn(['casa', 'departamento']),
    body('infoAdicional.arriendoOPropia').optional().isIn(['arriendo', 'propia'])
];

module.exports = {
    validarInfoAdicional
};