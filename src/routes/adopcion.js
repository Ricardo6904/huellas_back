const express = require('express')
const router = express.Router()
const controller = require('../controllers/adopcionController')
const validator = require('../validators/adopcion')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')


//router.get('/', authMiddleware, checkRol(['admin', 'supervisor']), controller.obtenerAdopciones)
router.get('/', controller.obtenerAdopciones)

router.get('/:id',)

//router.post('/', authMiddleware, validator.validatorCrearAdopcion, controller.crearAdopcion)
router.post('', controller.crearAdopcion)

module.exports = router