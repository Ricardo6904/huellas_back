const express = require('express')
const router = express.Router()
const controller = require('../controllers/adopcionController')
const validator = require('../validators/adopcion')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')


//router.get('/', authMiddleware, checkRol(['admin', 'supervisor']), controller.obtenerAdopciones)
router.get('/', authMiddleware, controller.obtenerAdopciones)

//Lista de adopciones por refugio
router.get('/mascota/refugio/:idRefugio', authMiddleware, controller.obtenerAdopcionPorIdRefugio)

//router.post('/', authMiddleware, validator.validatorCrearAdopcion, controller.crearAdopcion)
router.post('/', authMiddleware, validator.validatorCrearAdopcion, controller.crearAdopcion)

router.put('/:id/aprobarSolicitud', authMiddleware, controller.aprobarSolicitud)
router.put('/:id/rechazarSolicitud', authMiddleware, controller.rechazarSolicitud)

module.exports = router