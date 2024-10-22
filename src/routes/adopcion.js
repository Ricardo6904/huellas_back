const express = require('express')
const router = express.Router()
const controller = require('../controllers/adopcionController')
const validator = require('../validators/adopcion')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')


//router.get('/', authMiddleware, checkRol(['admin', 'supervisor']), controller.obtenerAdopciones)
router.get('/', controller.obtenerAdopciones)

//Lista de adopciones por refugio
router.get('/mascota/refugio/:idRefugio', controller.obtenerAdopcionPorIdRefugio)

//router.post('/', authMiddleware, validator.validatorCrearAdopcion, controller.crearAdopcion)
router.post('/', validator.validatorCrearAdopcion, controller.crearAdopcion)

module.exports = router